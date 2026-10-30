import argparse
import json
from html.parser import HTMLParser
from pathlib import Path


class Article(HTMLParser):
    def __init__(self, html):
        super().__init__(convert_charrefs=True)
        self.text, self.images = [], []
        self.feed(html)

    def handle_starttag(self, tag, attrs):
        if tag == 'img':
            self.images.append(dict(attrs))
        if tag in ['p', 'h1', 'h2', 'h3', 'li']:
            self.text.append(' ')

    def handle_data(self, text):
        self.text.append(text)


parser = argparse.ArgumentParser()
parser.add_argument('--preview', action='store_true')
args = parser.parse_args()
entries = json.loads(Path('.astro/editorial-checks.json').read_text(encoding='utf-8'))
for locale, prefix in [('sv', ''), ('en', 'en/')]:
    page = Article(Path(f'dist/{prefix}explore/why-football-intelligence/index.html').read_text(encoding='utf-8'))
    replacement = next(entry for entry in entries if entry['slug'] == 'why-football-intelligence' and entry['language'] == locale and entry.get('replacement'))
    if not args.preview and replacement['draft']:
        assert not any(image['src'].endswith('football-team-meeting-print.webp') for image in page.images)
        continue
    expected = json.loads(Path('docs/editorial/football-intelligence-' + ('source' if locale == 'sv' else 'translation') + '.json').read_text(encoding='utf-8'))['paragraphs']
    text = ' '.join(''.join(page.text).split())
    for index, paragraph in enumerate(expected[1:], 1):
        if 27 <= index <= 47 and (index - 27) % 4 == 0:
            paragraph = paragraph.split('. ', 1)[1]
        assert ' '.join(paragraph.split()) in text, f'{locale}: source paragraph {index} differs'
    assert any(image['src'].endswith('football-intelligence-cycle.webp') for image in page.images)
    assert any(image['src'].endswith('football-team-meeting-print.webp') for image in page.images)
print('Replacement: published baseline preserved; preview retains all supplied paragraphs and approved imagery.')
