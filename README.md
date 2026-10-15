# Awesome Boji｜薄肌指南

薄肌养成指南：薄肌文章、训练计划、饮食策略等。重点面向程序员，写代码，也练身材。

访问地址：[lianboji.com](https://lianboji.com)。使用 GitHub Actions 自动部署到 GitHub Pages。

项目技能只安装在 `.agents/skills/taste-skill/`，不会要求全局安装。设计过程与检查记录见 [TASTE-REPORT](docs/TASTE-REPORT.md)。

## 从这里读起

- [下班只剩二十分钟，怎么练？](https://lianboji.com/guides/after-work-twenty-minutes/)
- [代码没跑完，也可以起身走走](https://lianboji.com/guides/desk-breaks/)
- [上线周加班，训练怎么保底？](https://lianboji.com/guides/release-week/)
- [外卖饮食](https://lianboji.com/guides/takeaway-lunch/)与[蛋白质基础](https://lianboji.com/guides/protein-basics/)
- [训练计划生成器](https://lianboji.com/plan/)、[12 个基础动作](https://lianboji.com/movements/)、[热量与蛋白质工具](https://lianboji.com/tools/)
- [薄肌理论与原始内容](https://lianboji.com/theory/)

## 原始资料

- [CDC 成人身体活动指南](https://www.cdc.gov/physical-activity-basics/guidelines/adults.html)
- [ACSM 身体活动指南](https://acsm.org/education-resources/trending-topics-resources/physical-activity-guidelines/)
- [WHO 身体活动资料](https://www.who.int/news-room/fact-sheets/detail/physical-activity)
- [OSHA 电脑工作站与工作间歇](https://www.osha.gov/etools/computer-workstations/work-process)
- [ISSN 蛋白质与运动立场声明](https://doi.org/10.1186/s12970-017-0177-8)

知识文章和模板是独立编辑内容，不代表来源机构认可。网站摄影的作者和许可见[图片署名](https://lianboji.com/credits/)。

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

- 首页：真实场景摄影、可直接选时长的课表入口、程序员文章与工具。
- 入门路径：从目标、第一周计划到动作与恢复。
- 指南：17 篇原创文章，分类筛选、关键词搜索、目录与参考来源。
- 理论观察：原始公开内容与本站解读；人工编辑，不是实时抓取热榜。
- 动作库：12 个动作，按动作部位与器械名称筛选，含动作要点与简单变式。
- 训练计划：每周 2 / 3 次，4 种器械条件，20 / 35 / 50 分钟，共 24 种组合；支持下载文字课表与打印。
- 工具：静息消耗与 TDEE 估算、蛋白质参考范围、可暂停的休息计时器。
- 全站搜索、移动导航、键盘与减少动态效果支持。
- 程序员：下班短练、上线周保底、外卖与训练日志内容，配离屏休息工具。
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

GitHub Actions 在 main 更新时校验并部署 GitHub Pages；工作流使用内置短期令牌，无需提交 PAT。不要提交 `.env`、账号配置、用户数据或 DNS 凭证到这个 public 仓库。

## 验证记录

参见 [首版验收](docs/ACCEPTANCE.md)。本地通过、GitHub CI 通过、线上发布和自定义域名可访问是不同状态，应分别验证。

## 搜索收录维护

见 [SEO 配置与提交记录](docs/SEO.md)。`npm run check:site` 检查构建产物，`npm run check:seo:live` 检查线上抓取条件。平台验证、提交回执和实际索引状态分别记录。
