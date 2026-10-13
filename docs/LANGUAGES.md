# Website languages

Swedish is the default language at the site root. English uses `/en/`.
The language menu shows names, never flags, and links to the same page in
the other language. Article translations are matched through `translationKey`.
If a published translation is unavailable, the menu links to that language's
article index. Category queries and section fragments survive a language switch.

## Content

Each article has `language: sv` or `language: en`. Use the same
`translationKey` for translations, even if their filenames differ.
Current Swedish translations live under `src/content/articles/sv/`.
Only published articles for the requested language are listed or routed.
The CMS defaults new articles to Swedish; existing English articles are
explicitly tagged English. Approved logo PNGs remain unchanged.

## Adding a language

1. Register its code, native name and short label in `src/i18n/index.ts`.
2. Add a translation dictionary keyed by the original English copy.
3. Add thin route wrappers under `src/pages/<code>/`, reusing the components
   in `src/components/pages/`.
4. Translate article content with language and translation group metadata.
5. Add the language code to the Pages CMS choices and verify both root and
   project-path builds, mobile layout and cross-language navigation.

The shared templates, language menu, content schema and alternate links use
the central language registry. No separate navigation design is needed for
additional languages.
