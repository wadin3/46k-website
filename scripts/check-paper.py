import json
from html.parser import HTMLParser
from pathlib import Path


class Paper(HTMLParser):
    def __init__(self, html):
        super().__init__()
        self.pages = []
        self.feed(html)

    def handle_starttag(self, tag, attrs):
        attrs = dict(attrs)
        if 'data-paper-page' in attrs:
            self.pages.append(int(attrs['data-paper-page']))


for item in json.loads(Path('.astro/editorial-checks.json').read_text(encoding='utf-8')):
    prefix = '' if item['language'] == 'sv' else item['language'] + '/'
    path = Path('dist') / prefix / 'explore' / item['slug'] / 'index.html'
    if not path.exists():
        continue
    paper = Paper(path.read_text(encoding='utf-8'))
    assert len(paper.pages) >= 1 + bool(item['blocks'])
    assert paper.pages == list(range(1, len(paper.pages) + 1)), item['slug']
print('Paper editorial: sequential numbered sheets in all generated article languages pass.')
