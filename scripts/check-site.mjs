import { readFileSync, readdirSync, existsSync, statSync } from 'node:fs';
import { resolve, join, dirname } from 'node:path';
import assert from 'node:assert/strict';

const root = resolve('dist');
assert.ok(existsSync(root), 'Run npm run build first');
function walk(path) {
  return readdirSync(path).flatMap((name) => {
    const file = join(path, name);
    return statSync(file).isDirectory() ? walk(file) : [file];
  });
}
const htmlFiles = walk(root).filter((path) => path.endsWith('.html'));
const titles = new Set();
const errors = [];
for (const file of htmlFiles) {
  const html = readFileSync(file, 'utf8');
  const label = file.slice(root.length);
  const title = html.match(/<title>(.*?)<\/title>/s)?.[1];
  if (!title || titles.has(title)) errors.push(`${label}: missing or duplicate title`);
  titles.add(title);
  if ((html.match(/<h1(?:\s|>)/g) || []).length !== 1) errors.push(`${label}: expected one h1`);
  if (!/<html[^>]*lang="zh-CN"/.test(html)) errors.push(`${label}: missing language`);
  if (!/<meta[^>]*name="description"[^>]*content="[^"]+"/.test(html))
    errors.push(`${label}: missing description`);
  const pagePath =
    label === '/index.html'
      ? '/'
      : label === '/404.html'
        ? '/404/'
        : label.replace(/index\.html$/, '');
  const canonical = html.match(/<link[^>]*rel="canonical"[^>]*href="([^"]+)"/)?.[1];
  if (canonical !== `https://lianboji.com${pagePath}`)
    errors.push(`${label}: incorrect canonical ${canonical}`);
  const noindex = /name="robots"[^>]*content="[^"]*noindex/.test(html);
  if (noindex !== (label === '/404.html')) errors.push(`${label}: incorrect indexability`);
  const ids = [...html.matchAll(/\sid="([^"]+)"/g)].map((m) => m[1]);
  if (ids.length !== new Set(ids).size) errors.push(`${label}: duplicate ids`);
  for (const [, href] of html.matchAll(/(?:href|src)="([^"]+)"/g)) {
    if (/^(?:https?:|data:|mailto:|tel:|javascript:|\/\/)/.test(href)) continue;
    const [pathPart, fragment] = href.split('#');
    const path = decodeURIComponent(pathPart.split('?')[0]);
    let target = path
      ? path.startsWith('/')
        ? join(root, path)
        : resolve(dirname(file), path)
      : file;
    if (existsSync(target) && statSync(target).isDirectory()) target = join(target, 'index.html');
    if (!existsSync(target)) {
      errors.push(`${label}: broken resource ${href}`);
      continue;
    }
    if (fragment && target.endsWith('.html')) {
      const targetHtml = target === file ? html : readFileSync(target, 'utf8');
      if (!targetHtml.includes(`id="${decodeURIComponent(fragment)}"`))
        errors.push(`${label}: missing anchor ${href}`);
    }
  }
  for (const [, json] of html.matchAll(
    /<script[^>]*type="application\/ld\+json"[^>]*>(.*?)<\/script>/gs,
  )) {
    try {
      const data = JSON.parse(json);
      assert.ok(Array.isArray(data['@graph']), 'Expected linked schema graph');
      const types = data['@graph'].map((node) => node['@type']);
      assert.ok(
        types.includes('WebSite') && types.includes('WebPage') && types.includes('Organization'),
      );
      if (label !== '/index.html' && label !== '/404.html')
        assert.ok(types.includes('BreadcrumbList'));
      if (/^\/guides\/[^/]+\/index.html$/.test(label)) {
        const article = data['@graph'].find((node) => node['@type'] === 'Article');
        assert.ok(article && article.mainEntityOfPage === canonical);
        assert.ok(article.author.url === 'https://lianboji.com/about/');
        assert.ok(article.dateModified <= new Date().toISOString().slice(0, 10));
      }
    } catch {
      errors.push(`${label}: invalid structured data`);
    }
  }
}
const sitemap = readFileSync(join(root, 'sitemap.xml'), 'utf8');
assert.equal(
  (sitemap.match(/<loc>/g) || []).length,
  htmlFiles.length - 1,
  'Sitemap must include all pages except 404',
);
const locations = [...sitemap.matchAll(/<loc>(.*?)<\/loc>/g)].map((m) => m[1]);
assert.equal(new Set(locations).size, locations.length, 'Duplicate sitemap URL');
assert.equal((sitemap.match(/<lastmod>/g) || []).length, locations.length);
const urls = readFileSync(join(root, 'urls.txt'), 'utf8').trim().split('\n');
assert.deepEqual(urls, locations, 'Submission list must match sitemap');
for (const url of locations) {
  assert.ok(url.startsWith('https://lianboji.com/') && !url.includes('?') && !url.includes('#'));
  assert.ok(existsSync(join(root, new URL(url).pathname, 'index.html')));
}
assert.ok(!sitemap.includes('localhost') && !sitemap.includes('127.0.0.1'));
assert.ok(
  readFileSync(join(root, 'robots.txt'), 'utf8').includes('https://lianboji.com/sitemap.xml'),
);
assert.deepEqual(errors, [], errors.join('\n'));
console.log(
  `Verified ${htmlFiles.length} HTML pages: internal links, anchors, assets, titles, descriptions, schema, and sitemap.`,
);
