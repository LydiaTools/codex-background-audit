# Codex Background Audit

**When a Codex usage allowance moves, your local logs may still leave one question open: which feature generated the work?**

Codex Background Audit reads `ephemeral_generation_token_usage` events from log files you choose and turns them into a time-ordered, feature-labelled view. It is a small local reader for recorded evidence, not another quota dashboard.

> It shows token values present in matched local records. It cannot establish how OpenAI counted those values toward an account limit or bill.

**[Open the web app](https://lydiatools.github.io/codex-background-audit/)** · **[简体中文](#简体中文)**

## Why this exists

People have reported that Codex background work and local usage ledgers do not always tell the same story. In [one open Codex issue](https://github.com/openai/codex/issues/41617), users ask for more transparent, feature-level accounting. [Another report](https://github.com/openai/codex/issues/48833) describes token events found in runtime logs while explicitly separating those observations from an account-quota calculation.

Those reports point to a narrow, useful job: make matching local events easier to inspect, while leaving the gap between a log and a provider’s quota ledger visible.

## What it does

- Reads local `.log`, `.txt`, `.jsonl`, and `.ndjson` files in your browser tab.
- Finds `ephemeral_generation_token_usage` records in JSON and `key=value` log lines, then shows their time, feature, model, input, output, cached input, reasoning, and recorded total when present.
- Groups matched records by feature and model, and exports only normalized fields.
- Includes English and Simplified Chinese UI.
- Works as a static page with no account, API key, telemetry, or third-party JavaScript.

## What it does not claim

- It does not calculate remaining plan quota, billing, or exact provider-side usage.
- A missing record does not prove that no background work happened.
- `totalTokens` is preferred when logged. Otherwise, input and output are added only when both are present. Cached input is a subset of input; reasoning is a subset of output, so neither is added again.
- Missing feature/model labels are shown as “Unspecified” or “model not recorded”; the tool does not infer them from prompts.

For a related tool that switches Codex ambient mode on or off, see [codex-ambient-killer](https://github.com/mrraylau321/codex-ambient-killer). Its README describes an ambient-mode control and audit, while this project focuses on displaying token values in matching log events.

## Quick start

1. Open the [web app](https://lydiatools.github.io/codex-background-audit/).
2. Choose local Codex log files or drop them onto the page.
3. Review the matched events and export the normalized JSON if needed.

To run from source, open `index.html` in a modern browser. No build step or dependency install is required. Click **Try a fictional sample** to see the interface without using your own logs. The mixed-format example in `examples/fictional-log.log` demonstrates both supported line shapes. All sample data is synthetic and does not represent Codex activity.

## Privacy

The app has no upload code, analytics, remote parser, or external script dependency. It reads selected files in the current browser tab and creates exports locally. It does not store file contents in local storage or include raw log lines, file names, paths, or prompts in the export.

## Project status

This is an early, narrowly scoped utility. JSON and `key=value` examples follow shapes described in [public Codex user reports](https://github.com/openai/codex/issues/48833); event formats can vary between versions. If your logs use another shape, open an issue with a redacted example containing only the relevant field names and values.

## Independence

Codex Background Audit is an independent community project. It is not affiliated with, endorsed by, or an official product of OpenAI. “Codex” is used to identify the log format this utility is designed to read.

## 简体中文

**Codex 用量额度变化时，本地日志可能仍没有回答一个问题：究竟是哪个功能产生了这些调用？**

Codex Background Audit 会读取你选择的日志文件，查找 `ephemeral_generation_token_usage` 事件，并按时间、功能和模型展示日志里实际记录的 Token 数值。它是本地日志阅读器，不是配额仪表盘。

> 页面展示的是匹配日志中的 Token 数值，不能证明 OpenAI 如何将这些数值计入账号额度或账单。

### 它能做什么

- 在浏览器标签页内读取本地 `.log`、`.txt`、`.jsonl` 和 `.ndjson` 文件。
- 在 JSON 记录和 `key=value` 文本行中查找目标事件，并展示日志里存在的时间、功能、模型、输入、输出、缓存输入、推理和总数。
- 按功能和模型汇总匹配记录，只导出整理后的字段。
- 支持简体中文和英文界面。
- 静态运行，无需账号、API Key、遥测或第三方 JavaScript。

### 它不推断什么

- 不计算套餐剩余额度、账单或服务商侧的精确用量。
- 找不到记录不代表后台没有发生工作。
- 日志有 `totalTokens` 时优先使用；否则只有输入和输出都存在时才相加。缓存输入已包含在输入中，推理 Token 已包含在输出中，不会重复相加。
- 日志缺少功能或模型字段时明确显示“未注明”，不会从提示词推断。

相关工具 [codex-ambient-killer](https://github.com/mrraylau321/codex-ambient-killer) 用于切换 Codex ambient mode；本项目着重呈现匹配日志事件中的 Token 数值。

### 快速开始

1. 打开[在线页面](https://lydiatools.github.io/codex-background-audit/)。
2. 选择本地 Codex 日志，或拖入页面。
3. 查看匹配事件，需要时导出整理后的 JSON。

也可以直接用现代浏览器打开 `index.html`，无需构建或安装依赖。点击“试用虚构示例”可以先体验界面；`examples/fictional-log.log` 同时展示两种行格式。示例为合成数据，不代表 Codex 活动。

### 隐私与项目状态

页面没有上传代码、分析统计、远程解析服务或外部脚本依赖。所选文件只在当前标签页内处理；导出不含原始日志行、文件名、路径或提示词。

这是一个范围有限的早期工具。JSON 和 `key=value` 示例参考了[公开的 Codex 用户报告](https://github.com/openai/codex/issues/48833)，实际事件格式可能随版本变化。如果你的日志格式不同，可以提交脱敏后的相关字段示例。

### 项目关系

Codex Background Audit 是独立社区项目，与 OpenAI 无隶属或背书关系，也不是 OpenAI 官方产品。此处使用“Codex”仅用于说明工具读取的日志类型。

## License

MIT. See [LICENSE](LICENSE).
