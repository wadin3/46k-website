# 46K Editorial System v2

## Editing in Pages CMS

Articles remain Markdown files with YAML frontmatter. No MDX or custom HTML
is needed. Existing article URLs and translation groups are preserved.

1. Select the working branch in Pages CMS before editing; this redesign is
   prepared on `editorial-redesign-v2`, not directly on `main`.
2. Choose category, language, type and cover image. The template supplies
   category styling, numbered chapters, contents links and related reading.
3. Write the opening in the final rich-text field. Older articles may keep
   their entire Markdown body here; this remains supported.
4. Add and reorder story blocks: text, photo, quote, note or model.
5. Keep `draft: true` for new material. Save on the branch and inspect its PR
   preview artifact. Review scientific claims and image rights before merging.

### The five blocks

- Text: heading and Markdown rich text. Chapter numbering is automatic.
- Photo: wide, offset or pair. Add alt text, caption and credit. A pair needs
  the second image and alt text; failed validation prevents the build.
- Quote: short extract and explicit attribution. An editorial extract must
  not be attributed to a person as if they said it.
- Note: label, heading and Markdown for evidence limits or useful context.
- Model: heading, 2–5 ordered items and an explanatory/evidence caption.
  This is not a chart of measured data; never invent scores or percentages.

Sources are a separate list of titles and URLs. Link the relevant claim in
the text too. Supported media stays under `public/images`; block Markdown
media paths are adjusted for the GitHub Pages deployment base.

## Categories and formats

UNDERSTAND (Förstå): light Editorial. ASSESS (Mäta): Graphite/Core, no blue.
DEVELOP (Utveckla): Performance cover and calm reading surface. 2046: Pitch,
Editorial typography and restrained Gold. Cover tone is the only cover
setting; a different photograph creates variation without a page builder.

Formats: editorial, research, practice and insight. Official colors remain
unchanged. `#FAFAF7` is a functional neutral reading surface, not a new Paper
brand token. The approved paper texture is used very faintly in notes only.

## Draft preview and publication

Default builds exclude every draft from article routes, listings, home rail,
related articles and translation matching. Setting `ASTRO_EDITORIAL_PREVIEW=1`
includes drafts in a separate build. Never use this flag for Pages production.
PR Actions builds both production and preview artifacts. The preview is named
`46k-editorial-preview`; it does not deploy or replace the live site. All its
pages have `noindex, nofollow`. That metadata is not access control: keep
confidential or personal data out of this public repository and its artifacts.

Three existing examples are expanded on this branch and visibly marked as
demonstrations. The new Develop article remains a draft. All four have English
counterparts and explicit image/claim disclosures. Demonstrations also have
noindex in production-mode builds. Publication still requires content review.

## Checks and limits

- `node scripts/check-editorial.mjs`: CMS block keys, eight content files,
  YAML load/save round trip, media metadata and source-derived draft expectations.
- `npm run build`: Astro schema validation and Markdown rendering.
- `python scripts/check-site.py --base /46k-website`: generated routes,
  links, images, unique h1, languages and deployment base.
- `python scripts/check-editorial.py`: real rendered block coverage,
  demonstration noindex and draft exclusion. Add `--preview` for preview output.
- `node scripts/check-publication.mjs` (CI/Linux): temporary CMS-shaped content
  saved as YAML, built first as a draft and then with draft:false. Verifies both
  languages, Markdown formatting/media, publication and project-base links.
  Temporary files are removed before the preview artifact is built.

Reading time for block articles is calculated automatically and shared by
the article, listing and homepage rail. The CMS reading-time field remains
the fallback for older body-only articles.

These tests do not claim to validate Pages CMS's authenticated editing UI.
Actual media upload, rich-text/block save/reorder, branch permissions and an
editor-triggered preview remain pending until tested in an authenticated
Pages CMS session. PR builds verify the file-to-build pipeline, not those UI
operations. There is no invented one-click CMS preview button.

Configuration follows official field documentation:
[blocks](https://pagescms.org/docs/configuration/fields/block/),
[rich text](https://pagescms.org/docs/configuration/fields/rich-text/),
[fields](https://pagescms.org/docs/configuration/content/fields/).

## Scientific safeguards

Keep established knowledge, emerging evidence and 46K interpretation distinct.
No fabricated studies, participant quotes, individual talent forecasts or
claims that these examples validate a 46K product. Source claims are bounded
and inline-linked. Pull quotes are extracts from the article, not interviews.
All generated football imagery is explicitly illustrative. Locked logo PNGs
are unchanged.
