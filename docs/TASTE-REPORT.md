# 练薄肌：设计依据与验收

## 本次定位

读者是长期面对电脑、想把训练放回生活的程序员。项目名“练薄肌”是一个行动邀请；不出售身材焦虑，不冒充某人的官方站。

项目自己的素材：程序员的下班时间；二十分钟的可执行模板；构建与排查之间的空档；外卖午餐；两次训练之间的恢复；用普通文字记训练；不做训练排行榜；体重输入不上传；公开源码；已有免费课表、计算工具与动作说明。

## 页面论点

- 写代码的人也可以从小份训练开始。证据：首屏直接选择可用分钟并进入真实课表。
- 工作之外需要换一种活动。证据：键盘、哑铃、普通一餐和步道的真实摄影，均注明来源，不当作站长或用户照片。
- 程序员问题值得单独处理。证据：下班二十分钟、上线周保底、工位离屏、外卖和训练日志的完整文章。
- 话题热度不能代替训练依据。证据：薄肌理论原内容、编辑解读与机构资料分别链接。
- 工具应该拿来就用。证据：无需注册的课表、计算器、休息计时和离屏小休息。

## 抽取方向

上游 `design-taste-frontend`，commit `f624f37a8c650b9cc550253104925efe4c8de246`。

选择方向 `sentence-as-layout`，seed `816485911`。原型：一句话与内嵌实物影像组成首屏，后续章节用不同的版式给论点提供证据。

概念句：在这个页面里，程序员“从键盘切换到一组训练”的日常，成为一句被哑铃实拍打断的标题和可选分钟的真实课表入口。

颜色：采用抽取的信号红、白、黑。Erode 不覆盖中文，保留其衬线展示角色，用本地 Noto Serif SC 承担中文标题，正文 Noto Sans SC；不添加第三字体。

旧版初检：11 FAIL / 7 WARN，主要是装饰性英文小标签、编号、描边卡片、过小正文、图片不足。已据此重做，不以隐藏检测元素的方式处理。

## 文案底稿

标题：写代码，也练薄肌。

说明：给久坐、加班、吃外卖的程序员，一份下班后真能用上的训练与生活指南。

动作：选好今晚的时间，拿一份课表。

后续栏目：关电脑，换个场景；下班之后，怎么开始；先解决你遇到的问题；薄肌热起来了，也把依据看清楚；工具放在手边；常见问题。

## 实拍来源与最终检查

完成后在本节记录实际采用的图片、许可、三种视口检查与截图复评。详见网站 `/credits/` 的图片署名。

## 采用的摄影

均从 Wikimedia Commons 下载并随站部署，原图记录在项目构建时的素材记录中；公开署名维护于 `src/data/credits.ts` 与 `/credits/`。只缩小、转码与按版面裁切，不冒充本人实录。

| 本地文件        | 原作                                                         | 作者            | 许可         |
| --------------- | ------------------------------------------------------------ | --------------- | ------------ |
| `lift.webp`     | Close-up Hand holding dumbbell in gym                        | Nenad Stojkovic | CC BY 2.0    |
| `keyboard.webp` | Backlit keyboard                                             | Colin           | CC BY-SA 4.0 |
| `meal.webp`     | Oyakodon 003                                                 | Ocdp            | CC0          |
| `walk.webp`     | Niepołomickie Błonia Park, walking path, Niepołomice, Poland | Igor123121      | CC BY 4.0    |

视频搜索没有采用：结果中的遛狗片段与“程序员下班训练”关联弱，另一结果是囚犯影像，不适合作为生活场景。保留真实静态摄影与克制的照片移动，不用不相干素材填充。

一次 section redraw：将 how-it-works 的全屏逐字摄影改为斜向摄影。原因是现有图片是公开场景参考，不是本站真实拍摄的连续训练步骤，不适合包装成四段全屏教学过程。保留句子与实物同场、粘性阅读和独立证据区的总方向。中文衬线替代 Erode 的原因见上，不另增加字体。

## 截图复评

以下为作者自评，用于明确改进方向，不是外部设计奖项或用户研究结果。

ROUND 1
Seen in one second: 写代码与薄肌的双行大标题。
Idea (one sentence): 用程序员从工位切换到训练的日常组织页面。
Live thing: 首屏选分钟，直接拿到对应课表。
Layout words by section: hero=sentence / scene=diagonal pictures / workday=sticky story / reading=offset list / theory=dark field / tools=index / faq=indented questions / footer=large name。
Scores: design 6.5 · usability 8.0 · creativity 7.0 · content 8.0 → overall 7.2。
Caps applied: 当轮 inspector 有 FAIL，自评上限 6.0。
Top three problems:

1. desktop-page-02：阅读区的图片在底部，列表中段左边空白过大。改为随阅读粘性出现，保证信息与图片同屏。
2. desktop-page-02：工具索引在大面积白底中显得稀薄。改成有明确底色的完整工具区，放大工具标题。
3. mobile-page-01：前一段链接离下一标题过近，像小标签。扩大章节间距，减少无用分类前缀。

ROUND 2
Seen in one second: 一句明确的“写代码，也练薄肌”，右侧一份真实可操作的小课表入口。
Idea (one sentence): 把工作日的时间限制变成课表选择，而不是用程序员装饰模拟终端。
Live thing: 时间选择会更新说明，提交后课表的动作数与组数真实变化。
Layout words by section: hero=sentence / scene=diagonal pictures / workday=sticky story / reading=offset list / theory=dark field / tools=filled index / faq=indented questions / footer=large name。
Scores: design 7.5 · usability 8.0 · creativity 7.3 · content 8.2 → overall 7.7。
Caps applied: 无 FAIL 上限；创意仍是已知编辑排版方法的场景化实现，不评价为原创视觉体系。
Top three problems:

1. 缺少站长自己的摄影和训练实录。首版保持透明署名，不用参考图伪装；后续可用真实素材替换。
2. 平板和手机存在较多字号层级。部分来自表单与导航实际用途，保留可读性优先，不为压缩数字而缩小正文。
3. 没有相关性足够的短视频。保留静态摄影，不增加牵强的循环视频。

检查记录：源码 lint 为 0 FAIL / 0 WARN；1440、768、390 三种视口 inspector 为 0 FAIL / 2 WARN（无视频、字号层级较多）。没有通过 data-ui 包裹整页、隐藏内容或修改上游检测脚本规避检查。时长、次数、组数是训练模板示例；摄影与训练描述不是用户效果证明。
