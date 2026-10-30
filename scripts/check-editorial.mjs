import assert from 'node:assert/strict';
import { readFile, readdir, mkdir, writeFile } from 'node:fs/promises';
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
const expectations = [];
let articles = 0;
for (const folder of ['src/content/articles', 'src/content/articles/sv']) {
  for (const name of await readdir(folder)) {
    if (!name.endsWith('.md')) continue;
    const source = await readFile(folder + '/' + name, 'utf8');
    const [, frontmatter, body] = source.match(/^---\r?\n([\s\S]*?)\r?\n---\r?\n([\s\S]*)$/) ?? [];
    assert(frontmatter, name + ': missing frontmatter');
    const data = yaml.load(frontmatter);
    assert.deepEqual(yaml.load(yaml.dump(data)), data, name + ': YAML round trip');
    if (data.heroImage) assert(data.heroAlt, name + ': hero alt text');
    const sections = data.sections || [];
    for (const block of sections) {
      assert(blocks.blocks.some(definition => definition.name === block.kind));
      if (block.kind === 'photo') {
        assert(block.alt && block.credit);
        if (block.layout === 'pair') assert(block.secondImage && block.secondAlt);
      }
    }
    expectations.push({ slug:data.replaces || name.slice(0,-3), replacement:!!data.replaces, language:data.language || 'en', draft:data.draft !== false,
      demonstration:!!data.demonstration, blocks:[...new Set(sections.map(block => block.kind))] });
    categories.set(data.language, new Set([...(categories.get(data.language) || []), data.category]));
    articles++;
  }
}
await mkdir('.astro', {recursive:true});
for (const entry of expectations) {
  const replacement = expectations.find(other => other.replacement && other.slug === entry.slug && other.language === entry.language);
  entry.previewSuppressed = !entry.replacement && !!replacement;
  entry.productionSuppressed = entry.previewSuppressed && !replacement.draft;
  entry.baseline = entry.replacement && expectations.some(other => !other.replacement && other.slug === entry.slug && other.language === entry.language);
}
await writeFile('.astro/editorial-checks.json', JSON.stringify(expectations));
console.log(`Checked ${articles} articles: CMS block definitions, YAML edit/save round trip, media metadata and draft/publication expectations.`);
