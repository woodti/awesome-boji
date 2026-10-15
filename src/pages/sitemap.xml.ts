import type { APIRoute } from 'astro';
import { indexablePages } from '../data/seo';
export const GET: APIRoute = ({ site }) =>
  new Response(
    `<?xml version="1.0" encoding="UTF-8"?><urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">${indexablePages.map((page) => `<url><loc>${new URL(page.path, site)}</loc><lastmod>${page.modified}</lastmod></url>`).join('')}</urlset>`,
    { headers: { 'Content-Type': 'application/xml; charset=utf-8' } },
  );
