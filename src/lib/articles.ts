import { getCollection, type CollectionEntry } from 'astro:content';
import type { Locale } from '../i18n';

export function articleSlug(article: CollectionEntry<'articles'>) {
  return article.id.split('/').at(-1)!;
}

export function translationKey(article: CollectionEntry<'articles'>) {
  return article.data.translationKey ?? articleSlug(article);
}

export async function getArticles(locale: Locale) {
  const preview = process.env.ASTRO_EDITORIAL_PREVIEW === '1';
  return (await getCollection('articles', ({ data }) => (preview || !data.draft) && data.language === locale))
    .sort((a, b) => b.data.date.valueOf() - a.data.date.valueOf());
}
