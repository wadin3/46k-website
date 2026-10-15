import assert from 'node:assert/strict';
import { readFile, writeFile, unlink, access } from 'node:fs/promises';
import { execFileSync } from 'node:child_process';
import yaml from 'js-yaml';

const files = ['src/content/articles/sv/cms-workflow-check.md', 'src/content/articles/cms-workflow-check.md'];
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
    {kind:'photo', layout:'pair', image:'/images/editorial-training.webp', alt:'Illustrative training.', credit:'AI / 46K', second:{image:'/images/editorial-ground.webp',alt:'Illustrative pitch.',credit:'AI / 46K'}},
  ],
});
try {
  for (const draft of [true,false]) {
    for (const [index,file] of files.entries()) {
      const data = payload(index === 0 ? 'sv' : 'en', draft);
      const saved = yaml.dump(yaml.load(yaml.dump(data)));
      await writeFile(file, '---\n' + saved + '---\nAn opening saved as **Markdown**.\n');
    }
    run('node',['scripts/check-editorial.mjs']);
    run('npm',['run','build']);
    run('python3',['scripts/check-site.py','--base',process.env.ASTRO_BASE || '/']);
    run('python3',['scripts/check-editorial.py']);
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
