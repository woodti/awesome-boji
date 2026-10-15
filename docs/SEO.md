# Awesome Boji 搜索收录与内容维护

更新：2026-10-15。主站唯一地址：https://lianboji.com/ 。

## 当前完成与证据边界

网站提供预渲染中文正文，不依赖 JavaScript 才能读文章。27 个可收录页面有独立标题、描述、HTTPS canonical、WebPage / WebSite / Organization 结构化数据；内页增加 BreadcrumbList，16 篇指南另有 Article、编辑来源与文章间链接。404 使用 noindex，站点地图排除错误页和参数变体。

- XML 地图：https://lianboji.com/sitemap.xml
- 逐行 URL 清单：https://lianboji.com/urls.txt
- 爬虫规则：https://lianboji.com/robots.txt
- 本地构建检查：`npm run check:site`
- 上线后检查：`npm run check:seo:live`

这些验证检查抓取条件，不证明真实爬虫访问、已经收录或某个词的排名。用 Googlebot / Baiduspider 名称请求成功，也不等于来自对应公司的真实爬虫访问。GitHub Pages 没有向本项目提供原始访问日志；真实抓取与索引状态要看两个站长平台。

## 本次平台操作记录

2026-10-15 已通过 Spaceship TXT 完成 Google **网域资源** `lianboji.com` 所有权验证。Search Console 地图提交显示“成功”，已发现 **27** 个网页。新资源概述仍显示正在处理数据；此时不能据此宣称已索引或有关键词排名。DNS 中该 Google 验证 TXT 需要保留。

Google 实际网址测试显示首页“网址可编入 Google 索引”，已执行请求，返回“已请求编入索引”，网址进入优先抓取队列。这仍不是已索引的证明。

百度账号资料、协议确认与安全验证由站长本人完成。本站已按“体育运动”领域添加，HTML 标签所有权验证返回成功。普通收录中 sitemap 今日上限、余额、存量文件上限均为 **0**；手动填入首批 20 个地址、完成安全验证后返回 **“您今日的链接提交量已达上限，请改天提交”**。因此本次没有成功提交回执，不记为“20 页已提交”，也没有继续尝试剩余 7 页或用 API 绕过共享配额。

后续在平台实际开放配额时按每批最多 20 页提交 `urls.txt`；若 sitemap 配额开放，则提交 `/sitemap.xml`。新站何时开放配额尚未获官方账号内确认，不能保证次日恢复。保留页面的公开百度验证 meta。未保存或启用百度推送 API token。

本轮构建、测试、类型、格式与站内检查通过，Actions 发布成功。线上检查覆盖 27 页 HTTP 200、canonical、结构化数据图、地图与 URL 清单一致、robots、HTTP/www 跳转和 404。首页 taste inspector 为 0 FAIL / 2 WARN，延续原有无视频与字体尺寸数量说明；文章 390 / 768 / 1440 宽度检查无横向溢出。

## Google Search Console：验证、提交、确认

1. 打开 https://search.google.com/search-console ，使用你自己的 Google 账号。
2. 添加 **网域资源 `lianboji.com`**（不加协议或路径），复制平台提供的 `google-site-verification=...` TXT 值。
3. 在 Spaceship 的 Advanced DNS 新增 TXT，主机 `@`、值为平台给出的完整字符串；保留现有 A / www CNAME。回 Search Console 点击验证。DNS 验证能覆盖 HTTP/HTTPS 与 www 版本，比较适合本站。
4. 若选择“网址前缀”，填写 `https://lianboji.com/`。可选 HTML 标记验证，把 meta 的 **content 值**填入 `src/data/seo.ts` 的 `verification.google`，推送发布后点击验证。验证标记需长期保留。HTML 文件验证也可把平台原文件原样放在 `public/` 发布；不要自己编造文件名或内容。
5. 在“站点地图”提交 `https://lianboji.com/sitemap.xml`，检查是否读取成功以及发现的 URL 数量。
6. 用“网址检查”先检查首页、`/start/`、`/guides/what-is-lean-muscle/`、`/plan/`；运行实际网址测试，必要时“请求编入索引”。其他文章通过地图发现，不需要反复提交同一个 URL。
7. 以后在“网页编制索引”查看排除原因；“效果”中看查询词、页面、展现、点击和平均位置。没有真实 Search Console 数据前，不标记“已收录”。

Google 说明发现和处理可能需要几天到几周，也不保证提交后一定索引。地图公开不等于已在你的 Search Console 账号内提交。本站普通文章不适用把 Indexing API 当批量收录通道的做法。

## 百度搜索资源平台：以当前账号提供的入口为准

1. 打开 https://ziyuan.baidu.com/site/index ，登录你的百度账号并“添加网站”，主站填 `https://lianboji.com/`。不要为迎合 www 建议改变当前唯一主站地址。
2. 根据该账号页面提供的方法验证：HTML 标签的 content 值填入 `src/data/seo.ts` 的 `verification.baidu`；或将下载的验证文件原样放入 `public/`，发布后点击验证。若使用 DNS，严格照平台提供的记录类型、主机与值填写，不覆盖网站 A 记录。
3. 验证后打开“资源提交 → 普通收录”：https://ziyuan.baidu.com/linksubmit/index 。如果提供手动提交，把 `urls.txt` 中的真实页面地址按配额粘贴；优先首页、入门、薄肌概念、课表和程序员页。如果账号有 sitemap 入口，提交 `/sitemap.xml`；不是所有账号都一定有相同入口或配额。
4. 若提供 API 推送入口，使用该站点页面实际给出的地址和 token。token 只放本地环境变量或 GitHub Actions secret；不要写入网页、代码、文档、公开 Issue 或日志。获取入口和权限前，不宣称已启用自动推送。
5. 在“抓取诊断 / 抓取异常 / Robots”确认百度实际能访问；在“索引量 / 流量与关键词”确认后续结果。普通收录工具帮助发现 URL，不承诺索引。

如果国内访问 GitHub Pages 出现持续超时，要先用百度抓取诊断与国内真实网络确认，必要时再迁移到访问更稳定的静态托管。当前没有这些证据，不推断已经解决国内所有地区的可用性。

## 搜索主题与承接页面

以下是内容定位，**没有付费关键词工具或站长数据支持搜索量估算**。避免为同义词批量造出内容相同的页面。

| 搜索意图              | 主页面                               | 应回答的问题                       |
| --------------------- | ------------------------------------ | ---------------------------------- |
| 薄肌 / 薄肌指南       | `/`                                  | 站点提供什么，如何开始             |
| 薄肌是什么            | `/guides/what-is-lean-muscle/`       | 概念、审美描述、不能用照片定义健康 |
| 薄肌怎么练 / 新手入门 | `/start/`                            | 先读什么、第一周怎样行动           |
| 薄肌训练计划          | `/plan/`                             | 按时间与器械给出可下载的模板       |
| 薄肌新手第一周训练    | `/guides/beginner-first-week/`       | 安排与执行原则，链接课表           |
| 居家薄肌 / 徒手薄肌   | `/guides/home-or-gym/`               | 居家与器械条件的选择               |
| 薄肌饮食 / 蛋白质     | `/guides/protein-basics/`            | 总量、三餐与计算依据               |
| 程序员健身 / 下班健身 | `/developers/`                       | 久坐、加班、外卖、短练             |
| 下班二十分钟训练      | `/guides/after-work-twenty-minutes/` | 忙碌工作日能执行的安排             |
| 薄肌理论              | `/theory/`                           | 原始出处入口、观点与训练知识的边界 |

## 接下来一个月怎么做

- 第一周：完成两平台验证与地图提交，记录“读取成功 / 发现 URL / 索引状态”，不把提交回执当索引结果。
- 第二周：围绕居家和第一周课表补充可复用的真实例子：器械条件、动作替代、次数记录、调整理由。若增加个人实录，用本人真实记录并明确日期，不虚构结果或专业审核。
- 第三周：补饮食的真实选餐例子与替代选项，保留原始资料；为热点理论补原始公开出处和更新背景，而非批量改写别人的文章。
- 第四周：对比两平台的实际展现、点击、查询词与目标页面。已有展现但少点击，检查标题是否回答问题；未索引，先看平台原因与内容价值；有点击但没有继续阅读，再改善文章到课表和相关内容的路径。

能在自己的 GitHub 简介、仓库 README 或已有个人网站中放一个真实项目链接。向外部社区发布时讲清解决的问题，避免买链接、刷访问和批量灌水。本次没有代你发布任何外部社区消息。

## 维护约定

- 新文章自动进入地图、URL 清单、搜索和指南目录。Article 的 `publishedAt` / `updatedAt` 与页面可见日期一致。
- 在 Guide 中填写真实发布日期；只在实质修改时更新 `updatedAt`。静态主页面在 `pageUpdatedAt` 更新，不用每次构建时间刷新全部 lastmod。
- 保持域名、路径稳定；带参数的计划页面 canonical 到 `/plan/`，不为 24 种组合制造重复索引页。
- 不通过堆 meta keywords、隐藏文字、伪造评价、FAQ 富结果保证或过期 sitemap ping 接口做“优化”。
- 不把专业机构的参考资料署名成专家审核。新内容中的健康数字继续保留真实来源与适用背景。

## 官方参考

- [Google 技术收录条件](https://developers.google.com/search/docs/essentials/technical)
- [Google Search Console 入门](https://developers.google.com/search/docs/monitor-debug/search-console-start)
- [Google 请求重新抓取](https://developers.google.com/search/docs/crawling-indexing/ask-google-to-recrawl)
- [Google 站点地图提交](https://developers.google.com/search/docs/crawling-indexing/sitemaps/build-sitemap)
- [Google Article 数据](https://developers.google.com/search/docs/appearance/structured-data/article)
- [百度站点管理](https://ziyuan.baidu.com/site/index)
- [百度普通收录说明](https://ziyuan.baidu.com/linksubmit/index)
