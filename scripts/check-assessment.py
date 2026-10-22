import json
from html.parser import HTMLParser
from pathlib import Path


class Assessment(HTMLParser):
    def __init__(self, source):
        super().__init__(convert_charrefs=True)
        self.ids, self.images, self.text = [], [], []
        self.h1 = self.cards = self.arrows = self.showcase_cards = self.showcase_groups = 0
        self.feed(source)

    def handle_starttag(self, tag, attributes):
        attrs = dict(attributes)
        if 'id' in attrs:
            self.ids.append(attrs['id'])
        if tag == 'img':
            self.images.append(attrs)
        self.h1 += tag == 'h1'
        self.cards += 'assessment-value-card' in attrs.get('class', '').split()
        self.arrows += 'evidence-arrow' in attrs.get('class', '').split()
        self.showcase_cards += 'showcase-card' in attrs.get('class', '').split()
        self.showcase_groups += 'showcase-group' in attrs.get('class', '').split()

    def handle_data(self, text):
        self.text.append(text)


def normalize(text):
    return ' '.join(text.split())


copy = json.loads(Path('src/data/assessment.json').read_text(encoding='utf-8'))
for locale, route in [('sv', 'assessment'), ('en', 'en/assessment')]:
    page = Assessment(Path(f'dist/{route}/index.html').read_text(encoding='utf-8'))
    text = normalize(''.join(page.text))
    content = copy[locale]
    assert page.h1 == 1 and page.cards == 2 and page.arrows == 2
    assert page.showcase_cards == 12 and page.showcase_groups == 3
    assert len([image for image in page.images if '/showcase/' in image['src']]) == 12
    assert len(page.ids) == len(set(page.ids))
    assert all(section in page.ids for section in ['start', 'why', 'audience', 'outcome', 'science', 'contact'])
    strings = [content['hero']['title'], content['hero']['body'], content['hero']['status'], content['why']['title'], content['why']['quote'], content['why']['caption'], content['science']['body'], content['science']['note']]
    strings += content['why']['paragraphs'] + content['contact']['paragraphs'] + content['value']['intro']
    for card in content['value']['cards']:
        assert len(card['bullets']) == 3
        strings += [card['title'], card['closing']] + card['paragraphs'] + card['bullets']
    for string in strings:
        assert normalize(string) in text, f'{locale}: missing {string}'
    for image in ['assessment-hero.webp', 'assessment-visualize.webp']:
        assert any(item['src'].endswith(image) and item.get('alt') and item.get('width') and item.get('height') for item in page.images)
    assert all(label in text for label in ['WE KNOW', 'EVIDENCE SUGGESTS', 'WE THINK'])
print('Assessment: bilingual approved copy, six sections, two value cards, evidence progression and supplied images pass.')
