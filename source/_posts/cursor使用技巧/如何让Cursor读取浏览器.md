---
title: 如何让 AI 读取浏览器（从零到一）
date: 2026-04-23 16:00:00
tags:
  - Cursor
  - MCP
  - browser-tools
  - AI 编程
  - 工作流
categories:
  - Cursor 使用技巧
---

> 给完全没用过 MCP 的新人看。
>
> **读完你能做到**：在 Chrome 里打开 Cocos 预览页，对 AI 说「看看报错」，AI 自己读 console，而不是你复制粘贴。
>
> 全程大约 10 分钟。

<!-- more -->

---

## 目录

1. [什么是 MCP？](#1-什么是-mcp)
2. [为什么要装这个？](#2-为什么要装这个)
3. [这套东西由几部分组成？](#3-这套东西由几部分组成)
4. [动手装（分 6 步）](#4-动手装分-6-步)
5. [怎么用它](#5-怎么用它)
6. [能做什么（能力清单）](#6-能做什么能力清单)
7. [常见坑](#7-常见坑)
8. [安全提醒](#8-安全提醒)
9. [本项目特别说明](#9-本项目特别说明)

---

## 1. 什么是 MCP？

**一句话：MCP（Model Context Protocol）是给 AI 装"插件"的标准接口。**

打个比方：

- 电脑有 **USB 接口**，你能插鼠标、U 盘、打印机。
- Cursor 里的 AI 有 **MCP 接口**，你能插各种「能力」：读数据库、操作 Git、控制浏览器……

AI 本身只会**说话**。装了 MCP，它就能**动手**——前提是你先给它装好工具。

本文档要装的工具叫 **`browser-tools-mcp`**。它让 AI 能读浏览器里的 console、network、截图。

---

## 2. 为什么要装这个？

**没装之前**：

> 你：这个报错你看一下
> 你：（打开 Chrome → F12 → 复制 Console → 粘贴到对话框）
> 你：（再去 Network → 截图或复制失败请求）

**装了之后**：

> 你：看看当前页 console 和 network 的报错
> AI：（自己去读）好的，我看到一个 404，URL 是 ……

**省掉的是你的手**。

---

## 3. 这套东西由几部分组成？

```
┌─────────────┐   ①                ┌─────────────┐
│   Cursor    │  ──调工具──►       │   MCP 包     │   ← 第 1 个
│   里的 AI   │                    │ (在 Cursor  │
└─────────────┘                    │   里跑)     │
                                   └──────┬──────┘
                                          │ ② HTTP
                                          ▼
                                   ┌─────────────┐
                                   │   Server    │   ← 第 2 个
                                   │ (你终端里   │
                                   │  常驻进程)  │
                                   └──────┬──────┘
                                          │ ③ WebSocket
                                          ▼
                                   ┌─────────────┐
                                   │ Chrome 扩展 │   ← 第 3 个
                                   │ (浏览器里   │
                                   │  DevTools) │
                                   └──────┬──────┘
                                          │
                                          ▼
                                   你要调试的网页
                                   (如 localhost:7456)
```

**三个都要装。少一个都用不了。**

- **MCP 包**：告诉 Cursor「我这里有工具可以用」
- **Server**：中间协调员，本地常驻
- **Chrome 扩展**：真正进到浏览器里抓数据的那个

---

## 4. 动手装（分 6 步）

### 4.1 下载 Chrome 扩展源码

打开 [AgentDeskAI/browser-tools-mcp](https://github.com/AgentDeskAI/browser-tools-mcp)，点 **Code → Download ZIP**，下载后解压。

解压后长这样：

```
browser-tools-mcp-main/
├── browser-tools-mcp/      ← MCP 包源码（不用管，我们用 npm 上的）
├── browser-tools-server/   ← Server 源码（不用管，我们用 npm 上的）
├── chrome-extension/       ← ⭐ 就用这个
├── docs/
├── LICENSE
└── README.md
```

**记住：你只要用 `chrome-extension/` 这一个子目录。**

### 4.2 安装 Chrome 扩展

1. Chrome 地址栏打开 `chrome://extensions/`
2. 右上角开启 **「开发者模式」**
3. 点 **「加载已解压的扩展程序」**
4. **选 `chrome-extension/` 这个目录本身**（Finder 里让它高亮，按「选择」）

✅ **成功标志**：扩展列表里出现 **BrowserTools MCP** 条目，无红色错误。

❌ **常见错误**：报「清单文件缺失」= 选错目录了（多半选成了仓库根 `browser-tools-mcp-main/`）。重来，选 `chrome-extension/`。

### 4.3 启动 Server

打开一个终端，跑：

```bash
npx @agentdeskai/browser-tools-server@1.2.0
```

首次运行会提示 `Ok to proceed?`，按 **y** 回车。

> **`npx` 是啥**：Node.js 自带的临时运行器。它会自动去 npm 上拉这个包并跑起来。用它不用先 `npm install`。

✅ **成功标志**：终端里出现

```
=== Browser Tools Server Started ===
Aggregator listening on http://0.0.0.0:3025
```

`3025` 是默认端口。**这个终端窗口不能关，关了链路就断。** 建议单独开一个 tab 常驻。

> **为什么不用 `@latest`**：三个部件版本最好一致，避免协议对不上。扩展是什么版本（见 `chrome-extension/manifest.json` 里的 `version`），Server 就用什么版本。

### 4.4 配置 Cursor MCP

Cursor 的 MCP 配置文件在：

```
~/.cursor/mcp.json
```

（`~` 是你的用户目录，macOS 下就是 `/Users/你的用户名/`。文件不存在就新建。）

内容写成：

```json
{
  "mcpServers": {
    "browser-tools": {
      "command": "npx",
      "args": ["@agentdeskai/browser-tools-mcp@1.2.0"]
    }
  }
}
```

> 如果里面已经有别的 MCP，只加 `"browser-tools"` 这一项就行，JSON 逗号别写错。

保存后 **重启 Cursor**（或在 Settings → MCP 面板里重新加载）。

✅ **成功标志**：Cursor 设置 → MCP 面板里能看到 `browser-tools`，底下列出若干工具（约 14 个）。

### 4.5 在 DevTools 里激活面板（最容易漏）

⚠️ **重点**：前面三步都做完还**不够**。Chrome 扩展要**你打开 DevTools 并点开它那个面板**时才会去连 Server。

操作：

1. Chrome 打开要调试的网页（如 `http://localhost:7456/`，Cocos Web 预览的默认地址）
2. 按 **F12**（或右键 → 检查）打开开发者工具
3. DevTools 顶部标签栏（Console / Network / Elements 那一排）找到 **「BrowserToolsMCP」**，**点一下**让它成为当前面板
4. 面板里应显示：

   ```
   Connected successfully to browser-tools-server v1.2.0 at localhost:3025
   ```

❌ **看不到这行**：

- 面板没点开 → 点
- Server 没起 → 回 4.3
- 扩展没刷新 → `chrome://extensions/` 对该扩展点刷新图标，再刷新网页

### 4.6 终极验证

在 Cursor 对话框（**Agent 模式下**，下节讲）输入：

> 看看当前页面的 console 日志

AI 应该调 `getConsoleLogs` 工具并返回一个 JSON 数组。同时你的 Server 终端里**不应该再出现** `No active WebSocket connection`。

能看到日志 = 全通了。

---

## 5. 怎么用它

### 5.1 必须在 Agent 模式

Cursor 有两种模式：

| 模式 | 说明 |
|------|------|
| **Ask** | AI 只能说话，**不能调工具** |
| **Agent** | AI 可以调工具 |

让 AI 读浏览器，**必须切到 Agent 模式**。切换按钮在对话框附近。

### 5.2 用 `@` 把本文档丢进上下文

在对话框输入 **`@`**，搜 `teach/ai-browser-tools`，选中本目录或 `README.md`。

AI 之后的排查就会按这份文档的规范来。

### 5.3 典型话术

- 「看当前页面 console 的报错」
- 「把 network 里失败的请求列出来」
- 「截当前页的图给我看」
- 「跑一下性能审计」（Lighthouse）
- 「我在 Elements 里选中了这个节点，给我它的信息」

### 5.4 MCP 不能替你刷新

这套工具**没有「帮你刷新页面」的能力**。刷新用 **Cmd+R / F5**，然后让 AI 再拉一次日志或截图。

---

## 6. 能做什么（能力清单）

装通后 AI 可以调用的工具（约 14 个）：

| 工具 | 用途 |
|------|------|
| `getConsoleLogs` | 当前页所有 console 输出 |
| `getConsoleErrors` | 只要 error 级别 |
| `getNetworkLogs` | 所有网络请求 |
| `getNetworkErrors` | 只要失败的请求（4xx/5xx） |
| `takeScreenshot` | 截当前标签 |
| `getSelectedElement` | 你在 Elements 里选中的 DOM |
| `runPerformanceAudit` | 性能审计（Lighthouse） |
| `runAccessibilityAudit` | 无障碍审计 |
| `runSEOAudit` | SEO 审计 |
| `runBestPracticesAudit` | 最佳实践审计 |
| `runDebuggerMode` | 综合调试模式（组合多个工具） |
| `runAuditMode` | 一次性跑所有审计 |
| `wipeLogs` | 清缓冲，方便复现 |

---

## 7. 常见坑

| 现象 | 原因 | 处理 |
|------|------|------|
| 加载扩展报「清单文件缺失」 | 选错目录 | 选 `chrome-extension/` 子目录 |
| 截图报 `Chrome extension not connected` | DevTools 面板没开 | F12 打开，点 BrowserToolsMCP 面板 |
| Server 日志持续 `Active WebSocket: false` | 同上 | 打开面板；或到 `chrome://extensions/` 刷新扩展再开面板 |
| `getConsoleLogs` 返回 `[]` | 真的没输出；或连接未建立 | 先确认 `Connected`，在页面操作后再拉 |
| Cursor 里看不到 `browser-tools` MCP | `mcp.json` 没生效 | 检查 JSON 语法，重启 Cursor |
| 工具调用报「Ask 模式不允许」 | 没切 Agent | 切 Agent 模式重试 |
| `npx` 装不上包 | 网络问题 | 检查网络，或换国内 npm 源 |
| 面板写 v1.2.0、终端装了 1.2.1 | 小版本不一致 | 能用就不管；若连不上，把 Server 也锁 `@1.2.0` |

---

## 8. 安全提醒

- Server 默认监听 **`0.0.0.0:3025`**，**同局域网内其他机器**可能能访问。仅在可信网络（自家 Wi-Fi、公司内网）使用，**公共 Wi-Fi 请关掉**。
- 扩展有 `debugger`、`<all_urls>` 等权限，**能读任何网页**的 DOM、网络、console。不调试时建议**停用扩展**，或至少**不要在处理机密/网银/登录态的页面**上打开 DevTools 面板。
- 贴日志给别人看时注意：**URL 参数里常带 token、cookie、gclid**，别直接公开。

---

## 9. 本项目特别说明

**能用到的场景**：

- ✅ Cocos Creator 的 **Web 预览**（如 `http://localhost:7456/`）是真 Chrome，扩展能用
- ✅ 调整 UI 渲染、追 `ReadJsonAsset` 失败、看 network 404

**用不了的场景**：

- ❌ Cocos Creator **编辑器内嵌预览**（Electron 不是 Chrome，装不上扩展）
- ❌ 打包后的原生 App / 小游戏容器

**常见误判**：

- 日志里 **`[AtomEngine] 进入后台 / 恢复前台`** 成对出现，是 visibility 事件——切标签、DevTools 抢焦点都会触发，**不是 bug**。
- **远程 `ReadJsonAsset` 404** 这类错误，根因在 CDN / 资源发布或路径配置，不是 Browser Tools 的问题。本工具只负责**让你更快看到**这种错误。

---

## 一句话总结

**三件套装齐 → DevTools 里看到 `Connected` → Cursor 切 Agent 模式 → `@teach/ai-browser-tools` 引用本文档 → 对 AI 说话就行。**
