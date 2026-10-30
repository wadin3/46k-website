import argparse
import json
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
classes = {"text": "story-text", "photo": "story-photo", "model": "story-model", "note": "story-note", "quote": "story-pullquote"}
for article in json.loads(Path('.astro/editorial-checks.json').read_text(encoding='utf-8')):
    if article.get('previewSuppressed') and args.preview or article.get('productionSuppressed') and not args.preview:
        continue
    if article.get('replacement') and article['draft'] and not args.preview and article.get('baseline'):
        continue
    prefix = '' if article['language'] == 'sv' else article['language'] + '/'
    path = root / prefix / 'explore' / article['slug'] / 'index.html'
    expected = args.preview or not article['draft']
    assert path.exists() == expected, article['slug'] + ': draft visibility differs from build mode'
    if not expected:
        continue
    page = Story(path.read_text(encoding='utf-8'))
    if args.preview or article['demonstration'] or article['draft']:
        assert page.robots == 'noindex, nofollow', article['slug'] + ': noindex missing'
    assert 'story-cover' in page.blocks
    for block in article['blocks']:
        assert classes[block] in page.blocks, article['slug'] + ': missing ' + block
print("Editorial output passed: real components, noindex disclosures, draft excluded from production and included only in preview.")
