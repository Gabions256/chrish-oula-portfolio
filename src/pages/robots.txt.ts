import type { APIRoute } from 'astro';

export const GET: APIRoute = ({ site }) => {
  const sitemapUrl = site ? new URL('sitemap-index.xml', site).toString() : undefined;
  const lines = ['User-agent: *', 'Allow: /'];

  if (sitemapUrl) lines.push(`Sitemap: ${sitemapUrl}`);

  return new Response(`${lines.join('\n')}\n`, {
    headers: { 'Content-Type': 'text/plain; charset=utf-8' },
  });
};
