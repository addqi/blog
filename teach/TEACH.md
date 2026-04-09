# addqi 博客新手使用指南

> 基于 Hexo 7.3.0 + NexT 7.8.0 (Gemini) 的游戏开发博客。
> 线上地址：https://addqi.github.io

---

## 一、环境准备

### 1.1 必装软件

| 软件 | 最低版本 | 安装方式 |
|------|---------|---------|
| Node.js | 14+ | https://nodejs.org 或 `brew install node` |
| Git | 2.x | https://git-scm.com 或 `brew install git` |
| Hexo CLI | 4.x | `npm install -g hexo-cli` |

### 1.2 验证环境

```bash
node -v      # 确认 Node 已安装
git --version
hexo version # 确认 Hexo CLI 可用
```

### 1.3 初始化项目

```bash
git clone <你的仓库地址>
cd blog
npm install
```

---

## 二、项目结构

```
blog/
├── _config.yml              # 站点主配置（URL、标题、部署等）
├── package.json             # 依赖与脚本
├── scaffolds/               # 文章/页面模板
│   ├── post.md              #   hexo new 时使用的模板
│   ├── page.md              #   hexo new page 时使用的模板
│   └── draft.md             #   hexo new draft 时使用的模板
├── source/                  # 所有源内容
│   ├── _posts/              #   博客文章（Markdown）
│   │   ├── hello-world.md
│   │   ├── cocos学习/       #   子目录组织系列文章
│   │   ├── 小地图的实现.md
│   │   └── ...
│   ├── about/index.md       #   关于页面
│   ├── categories/index.md  #   分类页面
│   ├── tags/index.md        #   标签页面
│   ├── resources/index.md   #   资源页面
│   ├── CNAME                #   自定义域名（ljq67134.cn）
│   └── .nojekyll            #   禁用 GitHub 的 Jekyll 处理
├── themes/
│   └── next/                # NexT 主题
│       └── _config.yml      #   主题配置（外观、功能、第三方服务）
└── public/                  # 生成的静态文件（勿手动编辑）
```

**核心原则：你日常只需要关注两个地方：**
1. `source/_posts/` — 写文章
2. `_config.yml` / `themes/next/_config.yml` — 改配置

---

## 三、日常写作

### 3.1 创建新文章

```bash
hexo new "文章标题"
```

这会在 `source/_posts/` 下生成 `文章标题.md` 和同名资源目录 `文章标题/`（因为开启了 `post_asset_folder: true`）。

生成的文件包含 front-matter 头部：

```markdown
---
title: 文章标题
date: 2026-04-09 10:00:00
tags:
---

在这里写正文...
```

### 3.2 Front-matter 常用字段

```yaml
---
title: 小地图的实现          # 标题（必填）
date: 2025-11-12 18:54:22   # 发布日期
tags:                        # 标签（可多个）
  - Unity
  - 游戏开发
categories:                  # 分类（可嵌套）
  - 教程
---
```

### 3.3 在文章中插入图片

由于开启了 `post_asset_folder`，每篇文章有自己的资源目录。把图片丢进去，然后用 Hexo 标签引用：

```markdown
{% asset_img 效果.png 这是图片描述 %}
```

目录结构示例：

```
source/_posts/
├── 小地图的实现.md
└── 小地图的实现/
    ├── 效果.png
    ├── 纹理.png
    └── 摄像机设计.png
```

### 3.4 创建草稿

```bash
hexo new draft "草稿标题"
```

草稿存储在 `source/_drafts/`，不会发布。写完后发布：

```bash
hexo publish "草稿标题"
```

---

## 四、本地预览

```bash
hexo server
# 或
npm run server
```

浏览器打开 http://localhost:4000 即可预览。支持热更新——修改文章后刷新页面即可看到变化。

加 `--draft` 参数可以预览草稿：

```bash
hexo server --draft
```

---

## 五、构建与部署

### 5.1 可用脚本

| 命令 | 作用 |
|------|------|
| `npm run clean` | 清除缓存和已生成文件 |
| `npm run build` | 生成静态文件到 `public/` |
| `npm run server` | 启动本地预览服务器 |
| `npm run deploy` | 部署到 GitHub Pages |
| `npm run deploy:all` | **一键完成**：清除 → 生成 → 部署 |

### 5.2 完整部署流程

```bash
# 方式一：一键部署（推荐）
npm run deploy:all

# 方式二：分步执行
hexo clean       # 清除缓存
hexo generate    # 生成静态文件（简写 hexo g）
hexo deploy      # 推送到 GitHub Pages（简写 hexo d）
```

### 5.3 部署前提

部署使用 `hexo-deployer-git`，推送到 `git@github.com:addqi/addqi.github.io.git` 的 `master` 分支。确保：

1. 本机已配置 SSH Key 并添加到 GitHub
2. 对目标仓库有写入权限

验证 SSH 连接：

```bash
ssh -T git@github.com
```

---

## 六、配置速查

### 6.1 站点配置（`_config.yml`）

| 配置项 | 当前值 | 说明 |
|--------|--------|------|
| `title` | addqi的游戏开发之旅 | 站点标题 |
| `author` | addqi | 作者名 |
| `url` | https://addqi.github.io | 站点地址 |
| `language` | zh-CN | 中文 |
| `timezone` | Asia/Shanghai | 时区 |
| `theme` | next | 使用 NexT 主题 |
| `per_page` | 10 | 每页文章数 |
| `post_asset_folder` | true | 每篇文章配同名资源目录 |

### 6.2 主题配置（`themes/next/_config.yml`）

| 配置项 | 当前值 | 说明 |
|--------|--------|------|
| `scheme` | Gemini | 主题样式方案 |
| `menu` | home/archives/categories/tags/about/resources | 导航菜单 |
| `sidebar.position` | left | 侧栏在左侧 |
| `toc.enable` | true | 文章目录导航 |
| `motion.enable` | true | 页面动画 |
| `pace.enable` | true | 顶部加载进度条 |
| `canvas_nest.enable` | true | 背景粒子连线动画 |
| `creative_commons.license` | by-nc-sa | CC 许可证 |

---

## 七、新增页面

如果需要新增独立页面（如「友链」「项目」等）：

```bash
hexo new page "页面名"
```

然后在 `themes/next/_config.yml` 的 `menu` 中添加入口：

```yaml
menu:
  home: / || home
  # ...已有菜单...
  页面名: /页面名/ || icon名
```

Font Awesome 图标列表：https://fontawesome.com/icons

---

## 八、常见操作

### 8.1 给文章添加分类

在 front-matter 中加入 `categories`：

```yaml
---
title: 我的文章
categories:
  - Cocos Creator
  - Shader
---
```

### 8.2 添加文章摘要

在文章正文中插入 `<!-- more -->` 标记，标记之前的内容作为首页摘要：

```markdown
这段会显示在首页作为摘要。

<!-- more -->

这段只有点进文章才能看到。
```

### 8.3 启用代码复制按钮

编辑 `themes/next/_config.yml`：

```yaml
codeblock:
  copy_button:
    enable: true
    show_result: true
    style: mac
```

### 8.4 启用本地搜索

1. 安装插件：

```bash
npm install hexo-generator-searchdb --save
```

2. 在站点 `_config.yml` 末尾添加：

```yaml
search:
  path: search.xml
  field: post
  content: true
  format: html
```

3. 在 `themes/next/_config.yml` 中启用：

```yaml
local_search:
  enable: true
```

---

## 九、故障排查

| 问题 | 解决方案 |
|------|---------|
| 页面空白或样式错乱 | `hexo clean && hexo g` 重新生成 |
| 部署后没更新 | 清除浏览器缓存，或等待 GitHub Pages CDN 刷新（约 1-5 分钟） |
| 中文文件名 404 | 检查 `permalink` 配置，或改用英文文件名 |
| 图片不显示 | 确认使用 `{% asset_img %}` 标签且图片在同名目录中 |
| `hexo deploy` 失败 | 检查 SSH Key 配置：`ssh -T git@github.com` |
| 端口 4000 被占用 | `hexo server -p 5000` 换端口 |

---

## 十、常用命令速查表

```bash
hexo new "标题"           # 新建文章
hexo new page "页面名"    # 新建页面
hexo new draft "标题"     # 新建草稿
hexo publish "标题"       # 发布草稿
hexo server               # 本地预览 (localhost:4000)
hexo server --draft       # 预览含草稿
hexo generate             # 生成静态文件 (简写 hexo g)
hexo deploy               # 部署 (简写 hexo d)
hexo clean                # 清除缓存
npm run deploy:all        # 一键清除+生成+部署
```

---

## 十一、进阶参考

- Hexo 官方文档：https://hexo.io/zh-cn/docs/
- NexT 主题文档：https://theme-next.org/docs/
- Markdown 语法：https://www.markdownguide.org/
- Font Awesome 图标：https://fontawesome.com/icons
