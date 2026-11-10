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
        if tag=='a': self.links.append(attrs)
        if tag=='svg' and 'brain-sketch' in attrs.get('class',''): self.sketches+=1
    def handle_data(self, value): self.parts.append(value)

parser=argparse.ArgumentParser()
parser.add_argument('--preview',action='store_true')
args=parser.parse_args()
entries=json.loads(Path('.astro/editorial-checks.json').read_text())
def normalize(text):
    return ' '.join(text.replace('’', "'").replace('‘', "'").replace('“', '"').replace('”', '"').split())
for locale,prefix in [('sv',''),('en','en/')]:
    for slug in ['can-we-measure-it','the-2046-question']:
        assert not Path(f'dist/{prefix}explore/{slug}/index.html').exists(), slug+' must be removed'
    path=Path(f'dist/{prefix}explore/the-football-brain/index.html')
    article=next(x for x in entries if x['slug']=='the-football-brain' and x['language']==locale)
    assert path.exists()==(args.preview or not article['draft'])
    if not path.exists(): continue
    page=Page(path.read_text(encoding='utf-8'))
    visible=normalize(''.join(page.parts))
    fixture=json.loads(Path('docs/editorial/football-brain-'+('source' if locale=='sv' else 'translation')+'.json').read_text(encoding='utf-8'))
    for index,text in enumerate(fixture['paragraphs']):
        if index in [3,8,52,59]: text=text[2:].strip()
        assert normalize(text) in visible, f'{locale}: paragraph {index} missing or rewritten'
    assert page.sketches==8
    assert len([x for x in page.ids if x.startswith('reference-')])==23
    sources = [link for link in page.links if link.get('href', '').startswith(('https://doi.org/', 'https://pubmed.ncbi.nlm.nih.gov/'))]
    assert len(sources) == 23 and all(link.get('target') == '_blank' for link in sources)
print('Football Brain: source fidelity, 8 visual abilities, 23 original source links, draft visibility and retired article removal pass.')
