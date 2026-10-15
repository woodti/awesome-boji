import { guides } from './guides';

export const siteName = 'Awesome Boji';
export const siteUrl = 'https://lianboji.com';
export const publishedAt = '2026-10-15';
// Update only when the page content changes substantially; never use the build time.
export const pageUpdatedAt: Record<string, string> = {
  '/': '2026-10-15',
  '/guides/': '2026-10-15',
  '/start/': '2026-10-15',
  '/about/': '2026-10-15',
};
export const pageNames: Record<string, string> = {
  '/': '薄肌指南',
  '/start/': '薄肌怎么练',
  '/developers/': '程序员健身',
  '/guides/': '薄肌文章',
  '/plan/': '薄肌训练计划',
  '/tools/': '热量与蛋白质计算工具',
  '/movements/': '训练动作库',
  '/theory/': '薄肌理论',
  '/about/': '关于本站',
  '/privacy/': '隐私说明',
  '/credits/': '图片署名',
};
export const indexablePages = [
  ...Object.entries(pageNames).map(([path, name]) => ({
    path,
    name,
    modified: pageUpdatedAt[path] || publishedAt,
  })),
  ...guides.map((guide) => ({
    path: `/guides/${guide.slug}/`,
    name: guide.title,
    modified: guide.updatedAt || guide.publishedAt || publishedAt,
  })),
];

// Verification codes are public page metadata, not account passwords or API tokens.
// Paste the exact HTML meta content supplied by the platform, then deploy.
export const verification = { google: '', baidu: 'codeva-oo8TFDhivg' };
