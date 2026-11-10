import { getCollection, type CollectionEntry } from 'astro:content';
import { translate, type Locale } from '../i18n';

const categoryNames = {
  UNDERSTAND: 'Football intelligence',
  ASSESS: 'Cognitive testing',
  DEVELOP: 'Training & development',
  '2046': '2046',
};

export function articleCategoryLabel(category: keyof typeof categoryNames, locale: Locale) {
  return translate(locale, categoryNames[category]);
}

export function articleByline(article: CollectionEntry<'articles'>, locale: Locale) {
  return article.data.authorship === 'research-summary'
    ? translate(locale, 'Research article / Adapted by 46K')
    : '46K';
}

export function articleMetadata(article: CollectionEntry<'articles'>, locale: Locale) {
  return `${articleCategoryLabel(article.data.category, locale)} / ${readingMinutes(article)} ${translate(locale, 'MIN READ')}`;
}

export function articleSlug(article: CollectionEntry<'articles'>) {
  return article.data.replaces ?? article.id.split('/').at(-1)!;
}

export function translationKey(article: CollectionEntry<'articles'>) {
  return article.data.translationKey ?? articleSlug(article);
}

export function readingMinutes(article: CollectionEntry<'articles'>) {
  if (!article.data.sections.length) return article.data.readingTime;
  const text = [article.body ?? '', ...article.data.sections.map(block =>
    block.kind === 'text' || block.kind === 'note' ? block.body : '')].join(' ');
  return Math.max(1, Math.ceil(text.trim().split(/\s+/).length / 200));
}

export async function getArticles(locale: Locale) {
  const preview = process.env.ASTRO_EDITORIAL_PREVIEW === '1';
  const candidates = await getCollection('articles', ({ data }) => (preview || !data.draft) && data.language === locale);
  const selected = new Map<string, CollectionEntry<'articles'>>();
  for (const article of candidates) {
    const slug = articleSlug(article);
    const existing = selected.get(slug);
    if (existing?.data.replaces && article.data.replaces) throw new Error(`Multiple replacements for ${locale}/${slug}`);
    if (!existing || article.data.replaces) selected.set(slug, article);
  }
  return [...selected.values()].sort((a, b) => b.data.date.valueOf() - a.data.date.valueOf());
}
