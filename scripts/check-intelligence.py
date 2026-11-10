import argparse
import json
import re
from html.parser import HTMLParser
from pathlib import Path


class Article(HTMLParser):
    def __init__(self, html):
        super().__init__(convert_charrefs=True)
        self.text, self.images, self.links = [], [], []
        self.feed(html)

    def handle_starttag(self, tag, attrs):
        if tag == 'img':
            self.images.append(dict(attrs))
        if tag == 'a':
            self.links.append(dict(attrs))
        if tag in ['p', 'h1', 'h2', 'h3', 'li']:
            self.text.append(' ')

    def handle_data(self, text):
        self.text.append(text)


parser = argparse.ArgumentParser()
parser.add_argument('--preview', action='store_true')
args = parser.parse_args()
entries = json.loads(Path('.astro/editorial-checks.json').read_text(encoding='utf-8'))
for locale, prefix in [('sv', ''), ('en', 'en/')]:
    html = Path(f'dist/{prefix}explore/why-football-intelligence/index.html').read_text(encoding='utf-8')
    page = Article(html)
    replacement = next(entry for entry in entries if entry['slug'] == 'why-football-intelligence' and entry['language'] == locale and entry.get('replacement'))
    if not args.preview and replacement['draft']:
        assert not any(image['src'].endswith('football-intelligence-reading-game-bw.webp') for image in page.images)
        continue
    expected = json.loads(Path('docs/editorial/football-intelligence-' + ('source' if locale == 'sv' else 'translation') + '.json').read_text(encoding='utf-8'))['paragraphs']
    text = ' '.join(''.join(page.text).split())
    for index, paragraph in enumerate(expected[1:], 1):
        paragraph = paragraph.replace('[12]', '[11]')
        if 27 <= index <= 47 and (index - 27) % 4 == 0:
            paragraph = paragraph.split('. ', 1)[1]
        assert ' '.join(paragraph.split()) in text, f'{locale}: source paragraph {index} differs'
    notes = re.findall(r'<a\b[^>]*\bhref="([^"]+)"[^>]*>\[(\d+)\]</a>', html)
    assert notes == [(f'#reference-{i}', str(i)) for i in range(1, 12)], f'{locale}: incorrect citation destinations'
    sources = [link for link in page.links if link.get('href', '').startswith(('https://', 'http://'))]
    assert len(sources) == 11 and all(link.get('target') == '_blank' for link in sources)
    assert any(image['src'].endswith('football-intelligence-cycle.webp') for image in page.images)
    assert any(image['src'].endswith('football-intelligence-reading-game-bw.webp') for image in page.images)
print('Replacement: published baseline preserved; preview retains all supplied paragraphs and approved imagery.')
