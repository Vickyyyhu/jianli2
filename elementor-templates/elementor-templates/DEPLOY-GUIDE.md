# WordPress 导入部署指南 —— 胡馨月作品集（`xiao.cn`）

> **状态前提**：WordPress 已安装，插件 **Elementor**、**XPRO（Header/Footer Builder）**、**WPForms** 已启用。  
> **模板文件位置**：`f:\大三\jianli\elementor-templates\` 下共 **7 个 .json**。

---

## 一、导入全部 Elementor 模板（5 个页面 + Header + Footer）

Elementor 模板导入统一在 `wp-admin → Elementor → Templates → Saved Templates` 页面完成。

### 1.1 逐个导入

对每个 .json 文件都执行一遍：

1. 进入 `wp-admin → Elementor → Templates → Saved Templates`
2. 页面顶部点击按钮 **"Import Templates"**
3. 弹出文件选择器，选中对应的 .json（如 `home.json`）
4. 点击 **"Import Now"**
5. 导入完成后列表中出现该模板，记录它的 **Template ID**（把鼠标放上去看 URL，`post=123` 里的 `123` 就是 ID）

### 1.2 需要导入的文件清单

| 文件 | 模板名 | 类型 |
|------|--------|------|
| `home.json` | 首页 - 胡馨月 | Page |
| `about.json` | 关于与简历 - 胡馨月 | Page |
| `portfolio.json` | 作品集 - 胡馨月 | Page |
| `blog.json` | 博客 - 胡馨月 | Page |
| `contact.json` | 联系我 - 胡馨月 | Page |
| `header.json` | Header - 胡馨月 作品集 | Header（供 XPRO 参考/导入） |
| `footer.json` | Footer - 胡馨月 作品集 | Footer（供 XPRO 参考/导入） |

### 1.3 模板名可能自动加前缀（如 "Elementor Library"），导入后核对即可。

---

## 二、创建 5 个 WordPress 页面并应用模板

### 2.1 创建页面

在 `wp-admin → 页面 → 新建页面`，依次创建以下 **5 个页面**：

| 页面标题 | Slug（固定链接） | 备注 |
|----------|-----------------|------|
| 首页 | `home` | *或者用 `页面属性 → 模板 → Elementor Canvas`，然后在设置里把它设为静态首页* |
| 关于与简历 | `about` | |
| 作品集 | `portfolio` | |
| 博客 | `blog` | |
| 联系我 | `contact` | |

### 2.2 应用 Elementor 模板

对每个新创建的页面：

1. 点击 **"使用 Elementor 编辑"**
2. 进入 Elementor 编辑器后，点击左下角 **⚙️ 设置图标（或 Cmd+I / Ctrl+I）**
3. **Page Settings → Template** 选择 **Elementor Canvas**（让模板完整接管页面，无主题干扰）
4. 编辑区域顶部工具栏，点击 **文件夹图标（Add Template）**
5. 在 **Saved Templates** 标签下找到已导入的同名模板（如 "首页 - 胡馨月"）
6. 点击 **Insert**
7. 保存

> 页面设置 → Hide Title 已在模板 `page_settings` 里预设为 yes，不会显示 WP 默认标题。

---

## 三、XPRO Header & Footer 构建（关键步骤）

### 3.1 前提

**XPRO 插件已安装并启用**。进入 `wp-admin → XPRO` 或 `外观 → XPRO Header Builder / Footer Builder`。

### 3.2 创建 Header 模板

1. `XPRO → Header → Add New`（或 + New Header）
2. Header Name：**Main Header**
3. Display Rule（显示规则）：**Entire Website**（全站显示）
4. Edit With：Elementor（推荐，这样能复用我们导入的 header.json 模板）
5. 进入编辑器，**Add Template → Saved Templates → 选中 "Header - 胡馨月 作品集" → Insert**
6. 检查 **Sticky Header** 开关是否开启（我们的模板已设置 sticky=yes，在 Elementor 左侧设置面板确认）
7. 保存

### 3.3 创建 Footer 模板

1. `XPRO → Footer → Add New`
2. Footer Name：**Main Footer**
3. Display Rule：**Entire Website**
4. Edit With：Elementor
5. 编辑器中加载 "Footer - 胡馨月 作品集" 模板
6. 保存

### 3.4 如果 XPRO 提供独立的 Header/Footer 元素（非 Elementor 模式）

以下是**逐元素还原指南**，按此在 XPRO 内置构建器中搭建：

**Header（顶部栏）**：
- 容器（Full Width，内边距 16px 上下 / 24px 左右，背景 #FFFFFF，底部 1px #EFEFEF 分隔线，开启 Sticky）
  - 内部容器（Constrained 1200px，横向排列，gap 40px）
    - 元素：Heading，文字 `<strong>胡馨月</strong> <span style="color:#999">· Designer</span>`，字号 20px，font-weight 600，链接 `/`
    - 元素：Menu（XPRO 菜单元素），菜单项 5 个（首页 / 关于与简历 / 作品集 / 博客 / 联系我），字号 15px，gap 32px
    - 元素：Spacer（flex:1 占剩余）
    - 元素：Button "下载简历"，背景 #002FA7，文字 #FFFFFF，padding 10px 24px，圆角 4px，链接 `/wp-content/uploads/resume-huxinyue.pdf`

**Footer（底部栏）**：
- 容器（Full Width，内边距 100px 顶部 / 32px 底部 / 24px 左右，背景 #0A0A0A）
  - 两段结构：top section（含品牌信息+链接列，下方 1px #222222 分隔）+ bottom section（版权+SEO tag）
  - 详见 footer.json 中的元素序列

### 3.5 保存到 XPRO 模板库

在 XPRO Header/Footer 编辑器中，右上角 **Save Template → Save as XPRO Template Library**，命名为 `Main Header (胡馨月)` 和 `Main Footer (胡馨月)`，方便后续修改。

---

## 四、WPForms 联系表单创建

### 4.1 新建表单

1. `wp-admin → WPForms → Add New`
2. Form Name：**求职联系表单**
3. 选择模板：**Simple Contact Form**（或空白）

### 4.2 添加字段（按此顺序）

参考 `wpforms-contact-config.json`：

| 字段类型 | Label | 必填 | Placeholder |
|---------|-------|------|-------------|
| Name（Single Line） | 姓名 | ✅ | 请输入你的姓名 |
| Email | 邮箱 | ✅ | your@email.com |
| Phone | 电话 | ❌ | 你的联系电话 |
| Dropdown / Select | 求职意向 | ✅ | 下拉选项：全职岗位邀请 / 实习岗位邀请 / 外包合作 / 单纯聊聊设计 |
| Paragraph Text | 留言 | ✅ | 简单介绍一下…… |

### 4.3 表单设置

**Settings → General**：
- Submit Button Text：`发送留言`
- Form Style：Modern（或保留默认）

**Settings → Notifications**：
- Send To Email Address：`1697687508@qq.com`
- Email Subject：`【新留言】来自 xiao.cn 联系表单`

**Settings → Confirmations**：
- Type：Message
- Message：`谢谢你的留言！我会在 24 小时内回复你。`

### 4.4 获取表单 ID

保存表单后，WPForms 显示 **Form ID**（一般是 1）。回到 `联系我` 页面的 Elementor 编辑器，找到 **WPForms** 小工具（我们模板里预留的），在 **Form ID** 下拉中选择刚才创建的表单。保存。

---

## 五、创建导航菜单

1. `wp-admin → 外观 → 菜单`
2. 点 **"创建新菜单"**，Menu Name：**Primary**
3. Menu Settings → Display location（显示位置）：
   - 勾选 **Header Menu** 或 **Main Menu**（取决于 XPRO/主题注册的菜单位置，通常是 "Primary Menu"）
4. 添加页面到菜单：
   - 页面 → 左侧勾选 5 个页面 → **添加到菜单**
5. 菜单结构（按顺序）：
   ```
   首页 (http://xiao.cn/)
   关于与简历 (/about)
   作品集 (/portfolio)
   博客 (/blog)
   联系我 (/contact)
   ```
6. **保存菜单**

> 如果主题/XPRO 用的是 Elementor 的 "Menu" Widget 而非 WP 原生菜单，直接在 Elementor Header 模板里把 Menu Widget 的数据源指向这个新建的 "Primary" 菜单即可。

---

## 六、设置首页 + 阅读设置

### 6.1 静态首页

1. `wp-admin → 设置 → 阅读`
2. **你的主页显示 → 静态页面**
3. Homepage：选择刚才创建的 **首页** 页面
4. Posts page：留空（我们有独立博客页 `/blog`），或者把 **博客** 页指定为文章页（可选）
5. 保存更改

### 6.2 固定链接（重要）

1. `wp-admin → 设置 → 固定链接`
2. 选择 **文章名（Post name）**（/%postname%/）
3. 保存

---

## 七、全局样式与字体

### 7.1 主色 / 全局颜色

1. `wp-admin → Elementor → Settings → Site Settings → Global Colors`（或新版 Elementor 的 Site Identity / Global Styles）
2. 设置 4 个全局颜色变量：
   - Primary：`#002FA7`（克莱因蓝）
   - Text：`#0A0A0A`（深黑）
   - Secondary：`#666666`
   - Background：`#FFFFFF`
   - Light Gray：`#FAFAFA` / `#E5E5E5`

### 7.2 全局字体（⚠️ 国内必看）

**Google Fonts（fonts.googleapis.com）在中国大陆被墙，必须使用国内 CDN 或系统字体。**

**方案 A — 系统字体（推荐，最快零依赖）**：
1. `Elementor → Site Settings → Global Fonts`
2. Headings / Body Font Family 统一设置为：
   ```
   -apple-system, BlinkMacSystemFont, "PingFang SC", "Hiragino Sans GB", "Microsoft YaHei", "Helvetica Neue", Helvetica, Arial, sans-serif
   ```
3. 这样 Mac（苹方）、Win（微软雅黑）、iOS、Android 都会自动渲染各自的最佳系统字体，视觉接近 Inter 的现代感，加载零延迟。

**方案 B — 使用国内 CDN 加载 Inter（如果你坚持用 Inter）**：
在 `外观 → 主题编辑器 → functions.php` 或用插件 `Header Footer Code Manager`（免费）添加：
```php
// functions.php 中：
function huxinyue_load_inter_font() {
    wp_enqueue_style('inter-cn', 'https://cdn.bootcdn.net/ajax/libs/lxgw-wenkai-webfont/1.6.0/lxgw-wenkai.css', array(), '1.0');
}
add_action('wp_enqueue_scripts', 'huxinyue_load_inter_font');
```
或者用国内可用的 Inter CDN 地址（bootcdn / cdnjs / 字节跳动静态资源库）。

**模板里的 `font_family: Inter`**：如果没加载 Inter，Elementor 会 fallback 到主题默认字体，所以一定要在步骤 1 把 Global Fonts 设好。

### 7.3 字体加载速度优化
如果用系统字体方案（方案 A），跳过。如果用 CDN，在 Header 里加一行预连接：
```html
<link rel="preconnect" href="https://cdn.bootcdn.net">
```

---

## 八、SEO 基础优化

### 8.1 Yoast SEO / Rank Math（如果已安装）

对每个页面：

| 页面 | SEO Title | Meta Description | Focus Keyword |
|------|-----------|------------------|---------------|
| 首页 | 胡馨月 · 视觉传达设计师作品集 | 应届视觉传达设计师胡馨月的个人作品集网站，展示品牌视觉、UI/UX、平面海报与三维动效作品。 | 视觉传达设计师,胡馨月作品集 |
| 关于 | 关于胡馨月 · 视觉传达设计师简历 | 胡馨月教育背景、技能栈、荣誉奖项与求职意向，下载完整 PDF 简历。 | 视觉传达设计师简历 |
| 作品集 | 胡馨月作品集 · 品牌/UI/平面/动态 | 胡馨月的精选项目作品，覆盖品牌视觉、UI/UX、平面海报与三维动效。 | 胡馨月作品集,UI设计 |
| 博客 | 设计随笔 · 胡馨月 | 分享设计思考、软件技巧、作品复盘与行业观察。 | 设计博客 |
| 联系我 | 联系胡馨月 · 求职与合作 | 发送面试邀请或合作咨询，24 小时内回复。 | 联系设计师 |

### 8.2 H1 标签

每个页面模板已包含一个 `<h1>`（首页：大标语；关于：胡馨月；作品集：精选作品集；博客：设计随笔；联系：聊聊，或者直接给个 offer）—— 符合语义化要求。

### 8.3 图片 alt 文本

Elementor 模板里 image widget 的 alt 请在 Elementor 编辑器里，点击图片 widget → Content → Image → Alt Text 填入描述文字（如 "茶叙品牌视觉设计 - 胡馨月作品"）。

---

## 九、上传简历 PDF 与替换占位图

### 9.1 简历 PDF

1. 在本地把你的简历 PDF 重命名为 `resume-huxinyue.pdf`
2. WordPress 后台 → **媒体 → 添加新项** → 上传
3. 记下它的 URL（一般是 `/wp-content/uploads/2025/10/resume-huxinyue.pdf`）
4. 如果不是这个路径，**全局搜索替换**模板中的 `/wp-content/uploads/resume-huxinyue.pdf`（Header CTA、首页 CTA、Footer 等）

### 9.2 项目图片替换

⚠️ **via.placeholder.com 在中国大陆极不稳定（Cloudflare CDN 被墙），模板导入后看到的全是破图，属于正常现象。** **请在部署时立即替换所有占位图**：

在 Elementor 编辑器里逐个点 image widget → **Content → Image → Choose Image** → 上传你的真实作品图。需要替换的 image widget：
- **首页**：Bento Grid 的 5 张
- **作品集页**：6 张项目封面
- **博客页**：精选文章大图 + 6 张封面

> 如果想本地预览时也能看到占位图效果，可以用 Elementor 的 **Custom CSS** 给空 image widget 加一个彩色背景（在 widget Advanced → Custom CSS 里写），或者直接在 Image → Placeholder 里用 Elementor 内置占位。

---

## 十、移动端响应式最终检查

Elementor 编辑器顶部有 **桌面 / 平板 / 手机** 三个视图切换按钮。依次切到手机视图，检查：

1. **Header**：菜单是否折叠为汉堡菜单（XPRO 或 Elementor 的 Nav Menu Widget 有内置 mobile toggle）
2. **所有 Container 横向排列**：手机端自动转为纵向（默认 flex-wrap 或手动设置 flex-direction: column）
3. **Grid 布局**：手机端自动降为 1 列（在 Container Settings → Responsive → Mobile Grid Columns: 1）
4. **Hero 标题字号**：桌面 56-72px，手机端通过 Typography 的 **Size Units（EM / REM）** 或 **Mobile Typography Override** 降到 32-40px
5. **按钮内边距**：手机端按钮可能需要更紧凑的 padding

保存后用 Chrome DevTools Device Mode 或实际手机访问 `http://xiao.cn` 验证。

---

## 十一、快速验证清单（完成后核对）

- [ ] 5 个页面都能访问（/、/about、/portfolio、/blog、/contact）
- [ ] Header 吸顶 + 移动端汉堡菜单
- [ ] Footer 三列布局 + 深色背景
- [ ] 联系表单能正常发送到 1697687508@qq.com
- [ ] 全局主色 #002FA7 正确显示
- [ ] 首页 Hero CTA 两个按钮都能点击
- [ ] 所有页面手机端布局正常
- [ ] Browser Tab 显示正确的 SEO Title
- [ ] 简历 PDF 下载链接有效
- [ ] 项目图片已替换为真实作品

---

## 十二、模板文件位置索引

| 路径 | 说明 |
|------|------|
| `f:\大三\jianli\elementor-templates\home.json` | 首页模板 |
| `f:\大三\jianli\elementor-templates\about.json` | 关于与简历页模板 |
| `f:\大三\jianli\elementor-templates\portfolio.json` | 作品集页模板 |
| `f:\大三\jianli\elementor-templates\blog.json` | 博客页模板 |
| `f:\大三\jianli\elementor-templates\contact.json` | 联系页模板（含 WPForms Widget） |
| `f:\大三\jianli\elementor-templates\header.json` | Header 模板（供 XPRO 导入） |
| `f:\大三\jianli\elementor-templates\footer.json` | Footer 模板（供 XPRO 导入） |
| `f:\大三\jianli\elementor-templates\wpforms-contact-config.json` | WPForms 表单字段配置（参考用） |