# GitHub Actions 部署与域名

网站：`https://lianboji.com`。仓库：`woodti/awesome-boji`。仓库名、网站标题和域名分别承担源码标识、品牌和访问入口，不需要一致。

## 自动发布

`.github/workflows/deploy.yml` 在 push 到 `main` 或手动触发时运行：

1. `npm ci` 安装锁定依赖。
2. 格式检查、核心测试、Astro / TypeScript 检查。
3. 构建 `dist/`，检查站内链接、锚点、资源与 SEO 元数据。
4. 上传 GitHub Pages 构建产物。
5. 部署到 `github-pages` 环境。

仓库 Settings → Pages 的 Source 为 **GitHub Actions**，Custom domain 为 `lianboji.com`。工作流使用 GitHub 自动签发的短期令牌与 OIDC，只有部署 job 获取 `pages: write` 和 `id-token: write`。无需将个人 PAT 复制到仓库或 Actions secrets。

`ci.yml` 用于 Pull Request 校验。两个工作流都不包含自定义凭证。

## 当前 DNS 配置

Spaceship 名称服务器保留 `launch1.spaceship.net` 与 `launch2.spaceship.net`。在 Advanced DNS 添加以下记录，TTL 30 分钟：

| 类型  | 主机  | 值                 |
| ----- | ----- | ------------------ |
| A     | `@`   | `185.199.108.153`  |
| A     | `@`   | `185.199.109.153`  |
| A     | `@`   | `185.199.110.153`  |
| A     | `@`   | `185.199.111.153`  |
| CNAME | `www` | `woodti.github.io` |

这五条是网站解析，不是 URL 遮罩或注册商网页转发。`www` 的目标不包含 `/awesome-boji`，也不写 `https://`。Spaceship 对同一主机的多条 A 记录可能显示“冲突记录”提示，但这里的四条地址是 GitHub Pages 官方配置，不应删成一条。

不需要为网站调整邮件记录，也不要添加通配符解析。将来改托管平台时，再针对 `@` 和 `www` 更换对应记录。

## HTTPS 与地址归一

GitHub Pages 为自定义域名签发证书。证书就绪后开启 Enforce HTTPS，验证：

- `http://lianboji.com` → `https://lianboji.com/`。
- `https://www.lianboji.com` → `https://lianboji.com/`。
- 深层文章地址直接访问与刷新正常。

GitHub Pages 的证书签发和 DNS 生效可能不是同时完成。应该分别查看 DNS 查询、Pages 状态、工作流结果和 HTTPS 请求，不能用一次本地构建代替线上验收。

GitHub Pages 不读取 `public/_headers`；该文件仅为将来使用兼容静态托管平台时保留。当前网站不依赖自定义响应头才可运行。

## 根路径与 SEO

Astro 的 `site` 为 `https://lianboji.com`，链接使用根路径。不要为了仓库改名而添加 `/awesome-boji/` 的 `base`，那会破坏当前自定义域名下的资源路径。

Actions 发布自定义域名时，Pages 设置中的域名是权威配置，仓库不需要 `CNAME` 文件。

站点地图：`https://lianboji.com/sitemap.xml`。上线后可在搜索站长平台验证域名并提交；提供地图不等于已经被收录或有搜索流量。

## 官方资料

- [Astro 部署至 GitHub Pages](https://docs.astro.build/en/guides/deploy/github/)
- [GitHub Pages 自定义域名](https://docs.github.com/en/pages/configuring-a-custom-domain-for-your-github-pages-site/managing-a-custom-domain-for-your-github-pages-site)
