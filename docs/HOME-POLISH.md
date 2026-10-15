# 首页整体协调调整 · 2026-10-15

沿用项目级 taste-skill 的 sentence-as-layout，seed 816485911，红白黑及两套本地字体。属于现有方向的整页校正，不重抽视觉方向，不加素材占位或虚构证明。首屏保留“写代码，也练薄肌”和可选时长的真实课表入口。

## 页面论点与文案

读者：久坐、加班、三餐靠外卖的程序员。首屏相信的事：不用等项目闲下来，今晚就有一份小课表可用。

- 首屏：一句邀请 + 可用分钟 → 真实课表，行动明确。
- 换场景：电脑与训练的公开实拍 → 工作之外留一段活动时间，照片不冒充个人实录。
- 下班安排：练一组、吃一餐、留出恢复 → 具体文章入口，不重复喊口号。
- 阅读：二十分钟、离屏、上线周、外卖、记录、概念 → 根据问题挑文章。
- 理论：原始内容与编辑解读 → 方便核对出处。
- 工具：课表、饮食估算、短休息、动作 → 拿来即用。
- FAQ：回答真实疑问 → 来源与隐私边界清楚。

## 基线复评

ROUND 1
Seen in one second: 衬线大标题与小块哑铃图。
Idea (one sentence): 程序员今晚可用的时间变成真实课表入口。
Live thing: 时间选择与课表跳转。
Layout words by section: hero=sentence / scene=diagonal photos / workday=sticky story / reading=offset list / theory=dark note / tools=index / faq=questions / footer=compact invitation。
Scores: design 6.3 · usability 7.5 · creativity 7.0 · content 7.8 → overall 6.9。
Caps applied: 旧照片高度造成的稀薄与拉长区域使 design 不超过 6.5；这是本轮复查纠正此前评价，而非独立用户测试。
Top three problems:

1. desktop-page-01 与 mobile-page-01：HTML height 与响应式宽度/裁切冲突，键盘和哑铃拉成长图。给照片明确的响应式高度与裁切比例。
2. desktop-page-02 与 tablet-page-01：大标题和细小正文差距过大，正文跨列对齐、段间距不一致。收敛首页字级、限制阅读宽度，复用间距单位。
3. mobile-page-01/02：重复的入场句、长段图文和工具卡片造成滚动过长。缩短文案、统一图片尺度与章节节奏，工具恢复为紧凑的实际入口。

图片继续使用 lift（Nenad Stojkovic，CC BY 2.0）、keyboard（Colin，CC BY-SA 4.0）、meal（Ocdp，CC0）、walk（Igor123121，CC BY 4.0）。来源链接与许可完整保留在 src/data/credits.ts 和 /credits/。照片为公开场景参考，均非站长实录。本轮不增加视频，沿用既有相关素材不足的说明。

## 最终复评

ROUND 2
Seen in one second: 稍轻的双行标题与清晰的今晚课表入口。
Idea (one sentence): 把程序员可用的一小段下班时间，接到能打开的课表与具体生活问题。
Live thing: 20 / 35 / 50 分钟选择继续生成真实对应模板，未替换为展示按钮。
Layout words by section: hero=sentence / scene=paired photos / workday=sticky notes / reading=photo and list / theory=dark note / tools=compact index / faq=two-column questions / footer=compact invitation。
Scores: design 7.6 · usability 8.2 · creativity 7.0 · content 8.0 → overall 7.7。
Caps applied: 采用已有编辑式布局方法，创意不超过 7；这是维护者自评，不是独立评分或用户研究。
Top three problems:

1. 图片仍是不同作者的公开摄影，不能代替站长实际训练过程。以一致的裁切、合理的尺寸和透明署名协调，不用滤镜伪装同一拍摄。
2. 桌面文章清单的左侧照片与右侧长列表仍有长度差。保留原有粘性阅读位置；手机版把图片恢复为完整横幅后接列表，避免图片悬在窄列中。
3. 缺少相关且获许可的真实短视频。本轮不为通过视频检查加无关素材；明确保留这一个 WARN。

最终浏览器 inspector：1440 / 768 / 390 三种宽度 **0 FAIL / 1 WARN**（无视频），源码 lint **0 FAIL / 0 WARN**。第一轮修改时平板相邻章节的链接过近被标为 eyebrow，已通过增大真实章节距离修正；没有修改检测器或隐藏内容。所有首页照片从固定 HTML 高度恢复响应式尺寸，既有宽高属性继续提供固有比例。首页新增样式独立在 src/styles/home.css，正文、工具等内页不随之改变字级。

首页导航、正文、页脚共同限制在 1200px 阅读网格内；移动端保留 20px 边距。桌面主标题从 118px 收敛为 96px，字重从 650 降至 550；正文 18px，手机为 16px；文章标题统一为黑体，说明与署名保持 14px。全页依旧两套本地字体，未加载外部字体或增加图片请求。
