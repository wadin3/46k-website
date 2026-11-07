"""Verify the supplied article survives formatting and the retired examples vanish."""
import argparse
import json
from pathlib import Path
from html.parser import HTMLParser

class Page(HTMLParser):
    def __init__(self, source):
        super().__init__(convert_charrefs=True)
        self.parts=[]
        self.links=[]
        self.ids=set()
        self.sketches=0
        self.feed(source)
    def handle_starttag(self, tag, attrs):
        attrs=dict(attrs)
        if tag in ('p','h1','h2','h3','li','div'): self.parts.append(' ')
        if attrs.get('id'): self.ids.add(attrs['id'])
        if tag=='a': self.links.append(attrs.get('href',''))
        if tag=='svg' and 'brain-sketch' in attrs.get('class',''): self.sketches+=1
    def handle_data(self, value): self.parts.append(value)

parser=argparse.ArgumentParser()
parser.add_argument('--preview',action='store_true')
args=parser.parse_args()
entries=json.loads(Path('.astro/editorial-checks.json').read_text())
for locale,prefix in [('sv',''),('en','en/')]:
    for slug in ['can-we-measure-it','the-2046-question']:
        assert not Path(f'dist/{prefix}explore/{slug}/index.html').exists(), slug+' must be removed'
    path=Path(f'dist/{prefix}explore/the-football-brain/index.html')
    article=next(x for x in entries if x['slug']=='the-football-brain' and x['language']==locale)
    assert path.exists()==(args.preview or not article['draft'])
    if not path.exists(): continue
    page=Page(path.read_text(encoding='utf-8'))
    visible=' '.join(''.join(page.parts).split())
    fixture=json.loads(Path('docs/editorial/football-brain-'+('source' if locale=='sv' else 'translation')+'.json').read_text(encoding='utf-8'))
    for index,text in enumerate(fixture['paragraphs']):
        if index in [3,8,52,59]: text=text[2:].strip()
        assert ' '.join(text.split()) in visible, f'{locale}: paragraph {index} missing or rewritten'
    assert page.sketches==8
    assert len([x for x in page.ids if x.startswith('reference-')])==23
    assert len([x for x in page.links if x.startswith('https://doi.org/') or x.startswith('https://pubmed.ncbi.nlm.nih.gov/')])==23
print('Football Brain: source fidelity, 8 visual abilities, 23 original source links, draft visibility and retired article removal pass.')
