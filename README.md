# 练薄肌 · LIANBOJI

一个面向中文用户的薄肌入门网站。用有来源的知识、一般训练模板和轻量工具，把“想开始”变成能做的下一步。

生产域名：`https://lianboji.com`。该地址写入 canonical、站点地图与分享元数据；域名绑定和线上发布需在托管平台完成，仓库代码不代表已经上线。

## 本地开发

需要 Node.js 22.12+，推荐 Node.js 22 LTS。

```sh
npm ci
npm run dev
```

默认地址为 `http://127.0.0.1:4321/`。当前 Astro CLI 将开发服务器作为本地后台进程运行，可用 `npx astro dev status` 查看、`npx astro dev stop` 停止。

```sh
npm test               # 公式边界与 24 种训练计划组合
npm run check          # Astro / TypeScript
npm run format:check   # 格式检查
npm run build          # 构建静态文件到 dist/
npm run check:site     # 检查构建后的内链、锚点、资源与 SEO 元数据
npm run preview        # 预览生产构建
```

## 首版功能

- 首页：原创运动插画、入门引导、推荐指南、工具入口与 FAQ。
- 入门路径：从目标、第一周计划到动作与恢复。
- 指南：8 篇原创文章，分类筛选、关键词搜索、目录与参考来源。
- 理论观察：原始公开内容与本站解读；人工编辑，不是实时抓取热榜。
- 动作库：12 个动作，按动作部位与器械名称筛选，含动作要点与简单变式。
- 训练计划：每周 2 / 3 次，4 种器械条件，20 / 35 / 50 分钟，共 24 种组合；支持下载文字课表与打印。
- 工具：静息消耗与 TDEE 估算、蛋白质参考范围、可暂停的休息计时器。
- 全站搜索、移动导航、键盘与减少动态效果支持。
- SEO：静态 HTML、独立标题和描述、canonical、Article JSON-LD、PNG 分享图、robots 与 sitemap。

## 技术与目录

使用 Astro 7、TypeScript、原生浏览器脚本和 CSS，无前端框架运行时、数据库、登录系统、追踪脚本或环境密钥。字体通过 Fontsource 本地打包。

```text
src/
  components/       图标与指南卡片
  data/             文章内容、参考来源、动作资料
  layouts/          全站结构、导航、搜索和 SEO
  lib/fitness.mjs   公式、计划生成和计时格式
  pages/            静态路由与 sitemap / robots
  styles/           响应式样式
public/
  images/           原创 SVG 及分享 PNG
  _headers          兼容 Cloudflare Pages 的安全响应头
tests/              核心逻辑测试
scripts/            构建产物验收
docs/               产品设计、内容维护与部署说明
```

## 内容维护

在 `src/data/guides.ts` 添加文章对象，填写唯一 slug、分类、摘要、正文与参考来源。页面、列表、搜索和 sitemap 自动读取该数据。文章更新时间目前由 `src/pages/guides/[slug].astro` 配置；后续独立更新文章时应改为逐篇维护日期。

动作库维护 `src/data/movements.ts`，计划动作 ID 配置在 `src/lib/fitness.mjs`。增加动作或调整课表后，运行核心测试，并手动检查生成与下载结果一致。

计算器结果是一般估算，不是摄入处方。训练计划为编辑整理的入门模板，不做个体医疗判断。相关来源与范围在网站内公开，详见 `/about/`。

## 部署

完整步骤见 [部署说明](docs/DEPLOYMENT.md)。静态托管通用配置：

| 设置     | 值                                         |
| -------- | ------------------------------------------ |
| 构建命令 | `npm run build`                            |
| 输出目录 | `dist`                                     |
| Node.js  | 22.12+                                     |
| 环境变量 | 无需业务密钥；平台可设置 `NODE_VERSION=22` |

GitHub Actions 只执行校验，不包含发布凭证或自动部署。不要提交 `.env`、账号配置、用户数据或 DNS 凭证到这个 public 仓库。

## 验证记录

参见 [首版验收](docs/ACCEPTANCE.md)。本地通过、GitHub CI 通过、线上发布和自定义域名可访问是不同状态，应分别验证。
