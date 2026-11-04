# Codex Background Audit

**A child can be configured for one provider and reported under another. A background usage change can still leave you guessing which feature produced it.**

Codex Background Audit reads selected local files and puts two kinds of evidence in one place:

- background token events, grouped by feature and model;
- a comparison between an agent role's TOML settings and provider/model fields reported in session metadata.

No account, API key, upload, or build step. Open the static page, choose files, and inspect what those files actually record.

**[Open the web app](https://lydiatools.github.io/codex-background-audit/)** · **[简体中文](#简体中文)**

## Why this exists

Codex users have asked to see each subagent's effective provider and model, and have reported cases where provider routing did not match the role configuration. See [#17312](https://github.com/openai/codex/issues/17312), [#39542](https://github.com/openai/codex/issues/39542), [#52644](https://github.com/openai/codex/issues/52644), and [#40858](https://github.com/openai/codex/issues/40858).

This project does not change Codex or repair routing. It helps compare selected local evidence: what a role file requests and what a session record says. It also keeps the earlier background-token view, because usage counts alone do not identify the feature that generated them.

## What it reads

- `.log`, `.txt`, `.json`, `.jsonl`, and `.ndjson` files containing `ephemeral_generation_token_usage` events or structured agent session metadata.
- Codex agent-role `.toml` files. It extracts only `name`, `model`, `model_provider`, `model_reasoning_effort`, and `service_tier`.

The route comparison matches a session's `agent_role` to a role file's `name`. It compares only fields present on both sides, and shows missing values as missing.

## What it shows

- Recorded token time, feature, model, input, output, cached input, reasoning, and total when present.
- Configured versus session-reported model, provider, reasoning effort, and service tier for each matching role.
- Source file and line numbers, without exposing file paths or names in the export.
- An English and Simplified Chinese interface, plus a fictional sample that demonstrates a provider mismatch.

## What it cannot establish

- Session metadata is not proof of which model served an API request. The tool cannot inspect a provider's serving logs.
- It does not calculate account quota, billing, or exact provider-side usage.
- A missing event does not prove no work happened. Log formats can change between versions.
- Matching configured and reported fields does not guarantee that a request was sent or billed as expected.

## Quick start

1. Open the [web app](https://lydiatools.github.io/codex-background-audit/).
2. Choose the local log or JSON file containing the session metadata, and the matching agent-role `.toml` file. Add background-usage logs if you want the token timeline too.
3. Compare the role file with the session-reported fields. Export the normalized JSON if you need a compact record.

To run from source, open `index.html` in a modern browser. There is no build step or dependency install. Click **Try a fictional sample** to explore the two views without using your own files. `examples/fictional-log.jsonl` and `examples/fictional-agent.toml` contain synthetic values only.

## Privacy

Files are read in the current browser tab. The page has no upload code, analytics, remote parser, or third-party JavaScript. Export includes normalized token and routing fields, plus file/line numbers; it excludes raw log lines, prompts, file paths, and file names. Review an export before sharing it.

## Project status

This is an early, local reader for selected log shapes. It is not a Codex diagnostic API and does not claim that every Codex version writes the same metadata. If your files use a different structure, open an issue with a redacted example containing only the relevant field names and values.

## Independence

Codex Background Audit is an independent community project. It is not affiliated with, endorsed by, or an official product of OpenAI. “Codex” identifies the local file formats this utility is designed to read.

## 简体中文

**子 Agent 的配置可能写着一个 Provider，会话记录里却显示另一个。后台 Token 用量变化时，你也可能不知道是哪项功能产生了调用。**

Codex Background Audit 会读取你选择的本地文件，把两类证据放在一起看：

- 按功能和模型整理的后台 Token 事件；
- Agent 角色 TOML 配置，与会话元数据所记录 Provider、模型之间的对照。

无需账号、API Key、上传或构建。打开静态页面，选择文件，查看它们实际记录的内容。

**[打开在线工具](https://lydiatools.github.io/codex-background-audit/)** · **[English](#codex-background-audit)**

### 为什么做这个工具

Codex 用户曾提出，希望看到每个子 Agent 实际使用的 Provider 和模型；也有用户报告会话路由与角色配置不一致，见 [#17312](https://github.com/openai/codex/issues/17312)、[#39542](https://github.com/openai/codex/issues/39542)、[#52644](https://github.com/openai/codex/issues/52644) 和 [#40858](https://github.com/openai/codex/issues/40858)。

本工具不会修改 Codex，也不会修复路由。它只帮助对照所选本地证据：角色文件配置了什么，会话记录了什么。原有的后台 Token 视图也保留，因为用量数字本身不能指出是哪项功能产生的调用。

### 它读取什么

- 含有 `ephemeral_generation_token_usage` 事件或结构化 Agent 会话元数据的 `.log`、`.txt`、`.json`、`.jsonl` 和 `.ndjson` 文件。
- Codex Agent 角色 `.toml` 文件，只提取 `name`、`model`、`model_provider`、`model_reasoning_effort` 和 `service_tier`。

路由对照会用会话中的 `agent_role` 匹配角色文件的 `name`。只比较两边都有记录的字段；缺少的值会明确显示。

### 它显示什么

- 日志实际记录的 Token 时间、功能、模型、输入、输出、缓存输入、推理及总数。
- 匹配角色的 TOML 配置与会话记录中的模型、Provider、推理强度和服务档位。
- 源文件与行号；导出中不包含文件路径和文件名。
- 英文与简体中文界面，以及一个展示 Provider 不一致的虚构示例。

### 它不能证明什么

- 会话元数据不能证明 API 请求最终由哪个模型处理；本工具无法读取服务商侧的处理日志。
- 不计算账号额度、账单或服务商侧精确用量。
- 找不到事件不代表没有发生工作。日志格式可能随版本变化。
- 配置值与会话记录相同，不代表请求一定成功发送或按预期计费。

### 快速开始

1. 打开[在线工具](https://lydiatools.github.io/codex-background-audit/)。
2. 选择包含会话元数据的本地日志或 JSON 文件，以及对应 Agent 角色 `.toml` 文件。想看 Token 时间线时，再加入后台用量日志。
3. 对照角色配置与会话记录，需要时导出整理后的 JSON。

从源码运行时，用现代浏览器打开 `index.html`，无需构建或安装依赖。点击“试用虚构示例”即可查看两个视图，不读取自己的文件。`examples/fictional-log.jsonl` 和 `examples/fictional-agent.toml` 只含合成数据。

### 隐私

文件只在当前浏览器标签页读取。页面没有上传代码、分析统计、远程解析服务或第三方 JavaScript。导出只含整理后的 Token 与路由字段，以及文件/行号；不含原始日志、提示词、文件路径或文件名。分享前请自行检查导出内容。

### 项目状态

这是一个早期的本地文件阅读器，只支持已识别的记录格式。它不是 Codex 诊断 API，也不声称每个 Codex 版本都会写出相同元数据。如果你的文件结构不同，可以提交脱敏示例，只保留相关字段名和值。

### 独立项目

Codex Background Audit 是独立社区项目，与 OpenAI 无隶属或背书关系，也不是 OpenAI 官方产品。此处使用“Codex”是为了说明工具读取的本地文件类型。

## License

MIT. See [LICENSE](LICENSE).
