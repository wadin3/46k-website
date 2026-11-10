import type { APIRoute } from 'astro';
import { localePath, locales, type Locale } from '../i18n';
import { articleSlug, getArticles } from '../lib/articles';

const coreRoutes = ['', 'explore/', 'assessment/', 'mission/', 'connect/'];

export const GET: APIRoute = async ({ site }) => {
  const urls: string[] = [];

  if (process.env.ASTRO_EDITORIAL_PREVIEW !== '1') {
    for (const locale of Object.keys(locales) as Locale[]) {
      const articles = await getArticles(locale);
      const articleRoutes = articles
        .filter(({ data }) => !data.draft && !data.demonstration)
        .map(article => 'explore/' + articleSlug(article) + '/');

      for (const route of [...coreRoutes, ...articleRoutes]) {
        urls.push(new URL(localePath(route, locale), site).href.replaceAll('&', '&amp;'));
      }
    }
  }

  const entries = urls.map(url => `  <url><loc>${url}</loc></url>`).join('\n');
  const xml = `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${entries}\n</urlset>\n`;
  return new Response(xml, { headers: { 'Content-Type': 'application/xml; charset=utf-8' } });
};
