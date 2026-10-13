import argparse
from html.parser import HTMLParser
from pathlib import Path
from urllib.parse import unquote, urljoin, urlsplit


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
        if tag == "img" and "alt" not in attrs:
            self.missing_alt = True
        self.headings += tag == "h1"
        self.main |= tag == "main" and attrs.get("id") == "main-content"
        self.language |= tag == "html" and bool(attrs.get("lang"))
        if tag == "html":
            self.lang = attrs.get("lang")
        self.title |= tag == "title"


def main():
    parser = argparse.ArgumentParser()
    parser.add_argument("--base", default="/")
    args = parser.parse_args()
    prefix = "/" + args.base.strip("/") if args.base.strip("/") else ""
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
    if len(pages) < 16:
        failures.append(f"Expected at least 16 bilingual pages; found {len(pages)}")
    for route, page in pages.items():
        expected_language = "en" if route.startswith("/en/") else "sv"
        if page.lang != expected_language:
            failures.append(f"{route}: incorrect language {page.lang}")
        if {link.get("lang") for link in page.language_links} != {"sv", "en"}:
            failures.append(f"{route}: missing language menu destinations")

    def resolve(href, route):
        url = urlsplit(urljoin("https://site.invalid" + prefix + route, href))
        if url.scheme != "https" or url.netloc != "site.invalid":
            return None
        path = unquote(url.path)
        if prefix and path != prefix and not path.startswith(prefix + "/"):
            failures.append(f"{route}: URL escapes deployment base: {href}")
            return None
        return path[len(prefix):] or "/", unquote(url.fragment)

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
    if failures:
        raise SystemExit("\n".join(failures))
    print(f"Checked {len(pages)} pages: links, assets, deployment base and page structure pass.")


if __name__ == "__main__":
    main()
