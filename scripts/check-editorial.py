import argparse
from pathlib import Path
from html.parser import HTMLParser


class Story(HTMLParser):
    def __init__(self, html):
        super().__init__()
        self.robots = None
        self.blocks = set()
        self.feed(html)

    def handle_starttag(self, tag, attrs):
        attrs = dict(attrs)
        if tag == "meta" and attrs.get("name") == "robots":
            self.robots = attrs.get("content")
        self.blocks.update(attrs.get("class", "").split())


parser = argparse.ArgumentParser()
parser.add_argument("--preview", action="store_true")
args = parser.parse_args()
root = Path("dist")
slugs = ["why-football-intelligence", "can-we-measure-it", "the-2046-question"]
draft = "training-the-next-decision"
for prefix in ["", "en/"]:
    draft_path = root / prefix / "explore" / draft / "index.html"
    assert draft_path.exists() == args.preview, "Draft visibility differs from build mode"
    for slug in slugs + ([draft] if args.preview else []):
        page = Story((root / prefix / "explore" / slug / "index.html").read_text(encoding="utf-8"))
        assert page.robots == "noindex, nofollow", slug + ": demonstration must not be indexed"
        assert {"story-cover", "story-contents", "story-text", "story-photo", "story-model", "story-note", "story-pullquote", "story-related"}.issubset(page.blocks), slug
print("Editorial output passed: real components, noindex disclosures, draft excluded from production and included only in preview.")
