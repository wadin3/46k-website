import json
from html.parser import HTMLParser
from pathlib import Path
from urllib.parse import parse_qs, urlsplit


class Connect(HTMLParser):
    def __init__(self, source):
        super().__init__(convert_charrefs=True)
        self.text, self.actions, self.mail = [], [], []
        self.sections = self.h1 = 0
        self.feed(source)

    def handle_starttag(self, tag, attributes):
        attrs = dict(attributes)
        self.sections += tag == 'section'
        self.h1 += tag == 'h1'
        if tag == 'br':
            self.text.append(' ')
        if tag == 'a' and attrs.get('href', '').startswith('mailto:'):
            self.mail.append(attrs['href'])
        if tag == 'button' and 'connect-copy' in attrs.get('class', '').split():
            self.actions.append(attrs)

    def handle_data(self, text):
        self.text.append(text)


copy = json.loads(Path('src/data/connect.json').read_text(encoding='utf-8'))
for locale, route in [('sv', 'connect'), ('en', 'en/connect')]:
    page = Connect(Path(f'dist/{route}/index.html').read_text(encoding='utf-8'))
    content = copy[locale]
    text = ' '.join(''.join(page.text).split())
    assert page.sections == 2 and page.h1 == 1
    assert len(content['topics']) == 5
    for value in [content['eyebrow'], ' '.join(content['heading'])] + [f"{topic['title']}. {topic['body']}" for topic in content['topics']]:
        assert value in text, f'{locale}: missing {value}'
    assert len(page.mail) == 1
    mail = urlsplit(page.mail[0])
    assert mail.path == 'wadin.psykologi@gmail.com'
    assert parse_qs(mail.query)['subject'] == [content['subject']]
    assert content['emailAction'] in text
    assert len(page.actions) == 1
    assert page.actions[0]['type'] == 'button'
    assert page.actions[0]['data-copied'] == content['copied']
    assert content['action'] in text
    assert page.actions[0]['data-email'] == mail.path
    assert mail.path not in text
    about = content['about']
    for value in [about['eyebrow'], about['heading'], about['intro']]:
        assert value in text, f'{locale}: missing {value}'
    for person in about['people']:
        for value in person.values():
            assert value in text, f'{locale}: missing {value}'
print('Connect: bilingual topics, copy action and team presentation verified.')
