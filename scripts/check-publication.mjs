import assert from 'node:assert/strict';
import { readFile, writeFile, unlink, access } from 'node:fs/promises';
import { execFileSync } from 'node:child_process';
import yaml from 'js-yaml';

const primaryFiles = ['src/content/articles/sv/cms-workflow-check.md', 'src/content/articles/cms-workflow-check.md'];
const baselineFiles = ['src/content/articles/sv/cms-revision-base.md', 'src/content/articles/cms-revision-base.md'];
const replacementFiles = ['src/content/articles/sv/cms-revision-next.md', 'src/content/articles/cms-revision-next.md'];
const files = [...primaryFiles, ...baselineFiles, ...replacementFiles];
for (const file of files) {
  const exists = await access(file).then(() => true, () => false);
  assert(!exists, 'Refusing to overwrite an existing editorial file: ' + file);
}
const run = (command, args) => execFileSync(command, args, {stdio:'inherit', env:{...process.env, ASTRO_EDITORIAL_PREVIEW:''}});
const payload = (language, draft) => ({
  title:'CMS workflow check', description:'Temporary automated file-to-build check.',
  language, translationKey:'cms-workflow-check', category:'ASSESS', type:'research',
  date:'2026-10-15', readingTime:1, draft, demonstration:true,
  heroImage:'/images/editorial-feedback.webp', heroAlt:'Illustrative player and coach.',
  sections:[
    {kind:'text', heading:'Saved rich text', body:'A **formatted** paragraph with [an article link](/explore/).\n\n![Illustration](/images/editorial-feedback.webp)'},
    {kind:'quote', text:'An editorial extract.', attribution:'46K / Extract'},
    {kind:'note', label:'LIMIT', heading:'Example only', body:'No actual player data.'},
    {kind:'model', heading:'Two questions', caption:'Editorial model, not evidence.', steps:[{title:'Ask',text:'What do we need?'},{title:'Review',text:'What supports it?'}]},
    {kind:'photo', layout:'pair', image:'/images/editorial-training.webp', alt:'Illustrative training.', credit:'AI / 46K', secondImage:'/images/editorial-ground.webp',secondAlt:'Illustrative pitch.',secondCredit:'AI / 46K'},
  ],
});
try {
  for (const draft of [true,false]) {
    for (const [index,file] of primaryFiles.entries()) {
      const data = payload(index === 0 ? 'sv' : 'en', draft);
      const saved = yaml.dump(yaml.load(yaml.dump(data)));
      await writeFile(file, '---\n' + saved + '---\nAn opening saved as **Markdown**.\n');
    }
    for (let index = 0; index < 2; index++) {
      const language = index === 0 ? 'sv' : 'en';
      const base = {...payload(language, false), translationKey:'cms-revision-base', title:'Original revision fixture', sections:[{kind:'text', heading:'Original', body:'ORIGINAL_REVISION_BODY'}]};
      const replacement = {...base, draft, replaces:'cms-revision-base', title:'Replacement revision fixture', sections:[{kind:'text', heading:'Replacement', body:'REPLACEMENT_REVISION_BODY'}]};
      await writeFile(baselineFiles[index], '---\n' + yaml.dump(base) + '---\n');
      await writeFile(replacementFiles[index], '---\n' + yaml.dump(replacement) + '---\n');
    }
    run('node',['scripts/check-editorial.mjs']);
    run('npm',['run','build']);
    run('python3',['scripts/check-site.py','--base',process.env.ASTRO_BASE || '/']);
    run('python3',['scripts/check-editorial.py']);
    for (const prefix of ['', 'en/']) {
      const html = await readFile('dist/' + prefix + 'explore/cms-revision-base/index.html', 'utf8');
      assert(html.includes(draft ? 'ORIGINAL_REVISION_BODY' : 'REPLACEMENT_REVISION_BODY'));
      assert(!html.includes(draft ? 'REPLACEMENT_REVISION_BODY' : 'ORIGINAL_REVISION_BODY'));
      const base = (process.env.ASTRO_BASE || '').replace(/\/$/, '');
      const listing = await readFile('dist/' + prefix + 'explore/index.html', 'utf8');
      assert.equal(listing.split('class="journal-cover-link" href="' + base + '/' + prefix + 'explore/cms-revision-base/"').length - 1, 1);
      assert.equal(await access('dist/' + prefix + 'explore/cms-revision-next/index.html').then(() => true, () => false), false);
    }
    if (!draft) {
      const html = await readFile('dist/explore/cms-workflow-check/index.html','utf8');
      assert(html.includes('<strong>formatted</strong>'));
      const base = (process.env.ASTRO_BASE || '').replace(/\/$/,'');
      assert(html.includes('src="' + base + '/images/editorial-feedback.webp"'));
      assert(html.includes('href="' + base + '/explore/"'));
    }
  }
  console.log('PASS: CMS-shaped YAML save, Markdown rendering, draft exclusion and draft:false publication in both languages.');
} finally {
  for (const file of files) await unlink(file).catch(error => { if (error.code !== 'ENOENT') throw error; });
  run('node',['scripts/check-editorial.mjs']);
}
