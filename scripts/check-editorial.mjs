import assert from 'node:assert/strict';
import { readFile, readdir } from 'node:fs/promises';
import yaml from 'js-yaml';

const config = yaml.load(await readFile('.pages.yml', 'utf8'));
const fields = config.content.find(entry => entry.name === 'articles').fields;
const blocks = fields.find(field => field.name === 'sections');
assert.equal(blocks.type, 'block');
assert.equal(blocks.blockKey, 'kind');
assert.deepEqual(blocks.blocks.map(block => block.name).sort(), ['model','note','photo','quote','text']);
assert.equal(fields.find(field => field.name === 'draft').default, true);
assert.equal(fields.find(field => field.name === 'heroImage').type, 'image');
const categories = new Map();
let articles = 0;
for (const folder of ['src/content/articles', 'src/content/articles/sv']) {
  for (const name of await readdir(folder)) {
    if (!name.endsWith('.md')) continue;
    const source = await readFile(folder + '/' + name, 'utf8');
    const [, frontmatter, body] = source.match(/^---\r?\n([\s\S]*?)\r?\n---\r?\n([\s\S]*)$/) ?? [];
    assert(frontmatter, name + ': missing frontmatter');
    const data = yaml.load(frontmatter);
    assert.deepEqual(yaml.load(yaml.dump(data)), data, name + ': YAML round trip');
    assert(data.demonstration, name + ': demonstration disclosure');
    assert(data.heroAlt && data.heroCredit, name + ': hero metadata');
    const text = [body, ...data.sections.map(block => block.body || block.text || '')].join(' ');
    assert(text.split(/\s+/).length > 650, name + ': full-length example');
    assert(data.sections.filter(block => block.kind === 'text').length >= 5);
    assert(data.sections.some(block => block.kind === 'model'));
    assert(data.sections.some(block => block.kind === 'note'));
    assert(data.sections.some(block => block.kind === 'quote'));
    assert(data.sections.filter(block => block.kind === 'photo').length >= 2);
    for (const block of data.sections) {
      assert(blocks.blocks.some(definition => definition.name === block.kind));
      if (block.kind === 'photo') {
        assert(block.alt && block.credit);
        if (block.layout === 'pair') assert(block.second?.image && block.second?.alt);
      }
    }
    categories.set(data.language, new Set([...(categories.get(data.language) || []), data.category]));
    articles++;
  }
}
for (const language of ['sv','en']) assert.deepEqual([...categories.get(language)].sort(), ['2046','ASSESS','DEVELOP','UNDERSTAND']);
console.log(`Checked ${articles} articles: CMS block definitions, YAML edit/save round trip, disclosures, length and four bilingual categories.`);
