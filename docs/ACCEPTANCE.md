# 首版验收记录

日期：2026 年 10 月 15 日。项目：Awesome Boji｜薄肌指南。

## 本地验证

- `npm test`：5 项测试通过，涵盖能量公式、输入边界、蛋白质范围、24 种计划组合与计时格式。
- `npm run check`：Astro / TypeScript 无错误或警告。
- `npm run build`：生成 28 个 HTML 页面。
- `npm run check:site`：所有页面的内链、锚点、资源、独立标题、描述、JSON-LD、站点地图通过。
- taste-skill 源码 lint：0 FAIL / 0 WARN；浏览器 inspector 在 1440 / 768 / 390 三种宽度为 0 FAIL，保留两个已说明的 WARN。

## 真实浏览器操作

- 全站搜索“蛋白质”，能定位文章与工具。
- 指南分类筛选、关键词搜索和空结果状态正常。
- 70 kg / 175 cm / 30 岁 / 男性参数 / 1.2 活动系数：REE 1649，TDEE 1979 kcal。
- 70 kg 蛋白质参考量：98–140 g / 天。
- 组间计时：开始、暂停与重置正常。
- 三天哑铃二十分钟计划：3 个训练日、每次 3 个动作，下载文本与页面一致。
- 首页选 50 分钟，跳转后自动生成 2 天徒手 / 每次 4 动作 / 每动作 3 组的对应版本。
- 手机移动导航、主要页面无横向溢出；动作库深链接可展开对应说明。
- 程序员页包含可开始、暂停与重置的离屏休息工具。

## DNS 与部署

- Spaceship 5 条 DNS 记录已保存：根域名 4 条 GitHub Pages A，www CNAME 指向 woodti.github.io。
- DNS 查询能获得这四条 A 与正确 CNAME；GitHub Pages health 判定根域名与 www 均 `is_valid=true`。
- 仓库已改名 `woodti/awesome-boji`，Pages `build_type=workflow`，自定义域名仍为 lianboji.com。
- 正式发布结果、HTTPS 与地址跳转需要在 Actions 部署后独立检查。以实际工作流与 HTTP 请求结果为准。

## 范围

这是有完整阅读与工具功能的静态首版，不含账户、云端训练记录、自动抓取热榜或真实用户训练实录。未进行真实训练效果验证，搜索收录与排名也不由本地测试保证。
