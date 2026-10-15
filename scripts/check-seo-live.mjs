import assert from 'node:assert/strict';
const origin = 'https://lianboji.com';
const get = async (url, agent) => {
  const r = await fetch(url, {
    signal: AbortSignal.timeout(20000),
    headers: agent ? { 'User-Agent': agent } : {},
  });
  return { status: r.status, url: r.url, text: await r.text() };
};
const sitemap = await get(`${origin}/sitemap.xml`);
assert.equal(sitemap.status, 200);
const urls = [...sitemap.text.matchAll(/<loc>(.*?)<\/loc>/g)].map((m) => m[1]);
assert.ok(urls.length > 0);
assert.equal((sitemap.text.match(/<lastmod>/g) || []).length, urls.length);
const submission = await get(`${origin}/urls.txt`);
assert.equal(submission.status, 200);
assert.deepEqual(submission.text.trim().split('\n'), urls);
const robots = await get(`${origin}/robots.txt`);
assert.equal(robots.status, 200);
assert.ok(robots.text.includes(`Sitemap: ${origin}/sitemap.xml`));
assert.ok(!/Disallow:\s*\/\s*$/m.test(robots.text));
for (let i = 0; i < urls.length; i += 4) {
  await Promise.all(
    urls.slice(i, i + 4).map(async (url) => {
      assert.equal(new URL(url).origin, origin);
      const result = await get(url);
      assert.equal(result.status, 200, url);
      assert.equal(result.url, url, `Unexpected redirect: ${url}`);
      assert.ok(result.text.includes(`rel="canonical" href="${url}"`), `Canonical: ${url}`);
      assert.ok(!/name="robots"[^>]*content="[^"]*noindex/.test(result.text), url);
      const json = result.text.match(
        /<script[^>]*type="application\/ld\+json"[^>]*>(.*?)<\/script>/s,
      )?.[1];
      assert.ok(json, url);
      const graph = JSON.parse(json)['@graph'];
      assert.ok(
        graph?.some((item) => item['@type'] === 'WebPage' && item.url === url),
        `WebPage schema: ${url}`,
      );
      if (url !== `${origin}/`)
        assert.ok(
          graph.some((item) => item['@type'] === 'BreadcrumbList'),
          url,
        );
    }),
  );
}
for (const url of ['http://lianboji.com/', 'https://www.lianboji.com/']) {
  const result = await get(url);
  assert.equal(result.status, 200);
  assert.equal(result.url, `${origin}/`);
}
assert.equal((await get(`${origin}/seo-missing-page-check/`)).status, 404);
for (const agent of ['Googlebot', 'Baiduspider']) {
  assert.equal((await get(`${origin}/`, agent)).status, 200);
}
console.log(
  `Live SEO checks passed: ${urls.length} pages, canonical URLs, robots, redirects, 404, Googlebot/Baiduspider user-agent requests. This does not prove real crawler visits or indexing.`,
);
