import { getCollection, type CollectionEntry } from 'astro:content';
import type { Locale } from '../i18n';

export function articleSlug(article: CollectionEntry<'articles'>) {
  return article.id.split('/').at(-1)!;
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
  return (await getCollection('articles', ({ data }) => (preview || !data.draft) && data.language === locale))
    .sort((a, b) => b.data.date.valueOf() - a.data.date.valueOf());
}
