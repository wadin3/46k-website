import type { APIRoute } from 'astro';

export const GET: APIRoute = ({ site }) => {
  const sitemap = new URL('sitemap.xml', site);
  const rules = process.env.ASTRO_EDITORIAL_PREVIEW === '1'
    ? 'User-agent: *\nDisallow: /\n'
    : `User-agent: *\nDisallow:\nSitemap: ${sitemap.href}\n`;

  return new Response(rules, { headers: { 'Content-Type': 'text/plain; charset=utf-8' } });
};
