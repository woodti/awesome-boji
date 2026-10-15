import type { APIRoute } from 'astro';
import { indexablePages } from '../data/seo';
export const GET: APIRoute = ({ site }) =>
  new Response(indexablePages.map((page) => new URL(page.path, site).href).join('\n') + '\n', {
    headers: { 'Content-Type': 'text/plain; charset=utf-8' },
  });
