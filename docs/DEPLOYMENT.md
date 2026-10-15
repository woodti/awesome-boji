# 部署与域名绑定

这是静态站，构建产物在 `dist/`，不需要服务端、数据库和 API 密钥。

## 推荐部署流程

1. 在 Cloudflare Pages 创建项目，通过平台授权连接 `woodti/lianboji`。
2. 选择生产分支 `main`，构建命令填 `npm run build`，输出目录填 `dist`。
3. 选择 Node.js 22.12+（可设置 `NODE_VERSION=22`）。
4. 部署完成后，先访问平台提供的地址检查首页、文章、计划、工具和 404。
5. 在项目的自定义域名设置中添加 `lianboji.com`，按平台给出的验证和 DNS 指示操作。
6. 再添加 `www.lianboji.com`，在托管平台将 www 重定向至 `https://lianboji.com`，统一规范域名。

Cloudflare Pages 的根域名通常需要将域名所在 DNS zone 接入 Cloudflare。不要猜测 DNS 目标或直接删除现有记录；以项目创建后显示的配置为准，保留邮箱等已有记录。域名注册商和网站托管商可以不同，不需要转移域名所有权。

官方参考：

- [Astro · Cloudflare 部署](https://docs.astro.build/en/guides/deploy/cloudflare/)
- [Cloudflare Pages · 自定义域名](https://developers.cloudflare.com/pages/configuration/custom-domains/)
- [Cloudflare Pages · 响应头文件](https://developers.cloudflare.com/pages/configuration/headers/)

## 其他平台

Vercel、Netlify、EdgeOne Pages 等支持导入 GitHub 仓库的静态托管也可用。构建命令与产物目录相同，选择兼容的 Node.js 版本。`public/_headers` 是 Cloudflare Pages / Netlify 风格的配置，其他平台需使用对应响应头配置。

不建议把本项目直接按 GitHub 仓库子路径发布：当前链接与规范地址按 `lianboji.com` 根域名设计。如使用 GitHub Pages，先配置自定义域名并确认 HTTPS 与深层路径。

## 上线验收

- 根域名 HTTPS 可用，www 与其他别名有明确跳转。
- `/guides/what-is-lean-muscle/` 可直接访问、刷新。
- `/plan/` 能生成不同条件的课表，下载和打印结果一致。
- `/tools/` 输入已知样例，结果与测试吻合；计时器可暂停与重置。
- `/robots.txt` 和 `/sitemap.xml` 返回正确内容。
- 分享图 `/images/og.png` 可访问，字体无第三方请求。
- 不存在路由返回自定义 404，HTTP 状态为 404。
- 静态资源和页面的响应头按托管平台实际返回验证。

## 搜索收录

在域名可用后，再到对应搜索站长平台验证所有权并提交 `https://lianboji.com/sitemap.xml`。有 sitemap 和 SEO 元数据不代表已被收录或获得排名。不要在 public 仓库提交站长平台私钥；公开的验证文件按平台要求处理。
