from html.parser import HTMLParser
from pathlib import Path
from urllib.parse import unquote, urljoin, urlsplit
from xml.etree import ElementTree


SITE = "https://46karat.com"
LEGACY_HOSTS = {"wadin3.github.io", "46k.com"}


class Page(HTMLParser):
    def __init__(self, source):
        super().__init__(convert_charrefs=True)
        self.links = []
        self.assets = []
        self.ids = set()
        self.headings = 0
        self.main = False
        self.language = False
        self.lang = None
        self.language_links = []
        self.title = False
        self.missing_alt = False
        self.canonical = []
        self.og_urls = []
        self.alternates = {}
        self.noindex = False
        self.feed(source)

    def handle_starttag(self, tag, attributes):
        attrs = dict(attributes)
        if attrs.get("id"):
            self.ids.add(attrs["id"])
        if tag == "a" and attrs.get("href"):
            self.links.append(attrs["href"])
            if "data-language-link" in attrs:
                self.language_links.append(attrs)
        if tag in ("img", "script") and attrs.get("src"):
            self.assets.append(attrs["src"])
        if tag == "link" and attrs.get("rel") in ("stylesheet", "icon"):
            self.assets.append(attrs.get("href", ""))
        if tag == "link" and attrs.get("rel") == "canonical":
            self.canonical.append(attrs.get("href"))
        if tag == "link" and attrs.get("rel") == "alternate" and "hreflang" in attrs:
            self.alternates[attrs["hreflang"]] = attrs.get("href")
        if tag == "meta" and attrs.get("property") == "og:url":
            self.og_urls.append(attrs.get("content"))
        if tag == "meta" and attrs.get("name") == "robots":
            self.noindex = "noindex" in attrs.get("content", "").lower()
        if tag == "img" and "alt" not in attrs:
            self.missing_alt = True
        self.headings += tag == "h1"
        self.main |= tag == "main" and attrs.get("id") == "main-content"
        self.language |= tag == "html" and bool(attrs.get("lang"))
        if tag == "html":
            self.lang = attrs.get("lang")
        self.title |= tag == "title"


def main():
    root = Path("dist").resolve()
    pages = {}
    failures = []
    for path in root.rglob("*.html"):
        if path.name == "404.html":
            continue
        relative = path.relative_to(root).as_posix()
        route = "/" + relative.removesuffix("index.html")
        page = Page(path.read_text(encoding="utf-8"))
        pages[route] = page
        if not (page.main and page.language and page.title and page.headings == 1):
            failures.append(f"{route}: missing main, language, title or unique h1")
        if page.missing_alt:
            failures.append(f"{route}: image without alt attribute")
    # Article counts change when drafts or retired examples are removed.
    # Assert the actual core routes; check-editorial verifies article routes.
    required = {prefix + route for prefix in ['/', '/en/'] for route in ['', 'assessment/', 'connect/', 'explore/', 'mission/']}
    for missing in sorted(required - pages.keys()):
        failures.append(f"Missing core page: {missing}")
    for route, page in pages.items():
        expected_language = "en" if route.startswith("/en/") else "sv"
        if page.lang != expected_language:
            failures.append(f"{route}: incorrect language {page.lang}")
        if {link.get("lang") for link in page.language_links} != {"sv", "en"}:
            failures.append(f"{route}: missing language menu destinations")
        canonical = SITE + route
        if page.canonical != [canonical] or page.og_urls != [canonical]:
            failures.append(f"{route}: incorrect canonical or Open Graph URL")
        alternates = {link["lang"]: urljoin(canonical, link["href"]) for link in page.language_links if "lang" in link}
        if "sv" in alternates:
            alternates["x-default"] = alternates["sv"]
        if page.alternates != alternates:
            failures.append(f"{route}: alternate URLs do not match the language menu")

    def resolve(href, route):
        url = urlsplit(urljoin(SITE + route, href))
        if url.hostname in LEGACY_HOSTS:
            failures.append(f"{route}: legacy site URL: {href}")
        if url.hostname != urlsplit(SITE).hostname:
            return None
        if url.scheme != "https":
            failures.append(f"{route}: insecure site URL: {href}")
        return unquote(url.path) or "/", unquote(url.fragment)

    for route, page in pages.items():
        for href in page.links:
            result = resolve(href, route)
            if result is None:
                continue
            target, fragment = result
            target_page = pages.get(target)
            if target_page is None and not (root / target.lstrip("/")).is_file():
                failures.append(f"{route}: broken link: {href}")
            if fragment and target_page and fragment not in target_page.ids:
                failures.append(f"{route}: missing fragment: {href}")
        for href in page.assets:
            result = resolve(href, route)
            if result is not None and not (root / result[0].lstrip("/")).is_file():
                failures.append(f"{route}: missing asset: {href}")
    if (root / "CNAME").read_text(encoding="utf-8").strip() != urlsplit(SITE).hostname:
        failures.append("Build CNAME does not match the custom domain")
    sitemap = ElementTree.parse(root / "sitemap.xml")
    locations = [loc.text for loc in sitemap.findall("{*}url/{*}loc")]
    indexable = {SITE + route for route, page in pages.items() if not page.noindex}
    if set(locations) != indexable or len(locations) != len(indexable):
        failures.append("Sitemap must list each indexable page exactly once")
    robots = (root / "robots.txt").read_text(encoding="utf-8").splitlines()
    if indexable and ("Sitemap: " + SITE + "/sitemap.xml" not in robots or "Disallow: /" in robots):
        failures.append("Production robots.txt must allow crawling and point to the sitemap")
    if not indexable and "Disallow: /" not in robots:
        failures.append("Preview robots.txt must block crawling")
    if failures:
        raise SystemExit("\n".join(failures))
    print(f"Checked {len(pages)} pages: links, assets, metadata, sitemap and custom domain pass.")


if __name__ == "__main__":
    main()
