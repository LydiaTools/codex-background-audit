(() => {
  const marker = "ephemeral_generation_token_usage";
  const translations = {
    en: {
      skip: "Skip to content", source: "Source", eyebrow: "A LOCAL LOG READER",
      headline: "Make the background visible.",
      lede: "When a usage allowance moves, your local records may still leave one question open: which feature generated the work? Read the events your logs actually contain.",
      boundaryLabel: "THE LINE WE DRAW", boundaryTitle: "Evidence, not attribution.",
      boundaryText: "This reads logged token events. It cannot tell you how a provider counted them against an account limit.",
      step: "01 / OPEN A LOG", importTitle: "Bring your own evidence.",
      localNote: "Files stay in this tab. Nothing is uploaded.", dropTitle: "Drop log files here",
      dropSub: "or choose .log, .txt, .jsonl, and .ndjson files", chooseFiles: "Choose files",
      trySample: "Try a fictional sample", matchNote: "Looks for ephemeral_generation_token_usage records.",
      step02: "02 / READ WHAT WAS RECORDED", resultsTitle: "The event trail.", export: "Export normalized JSON",
      clear: "Clear data", sampleBanner: "Fictional sample data. No Codex activity is represented.",
      emptyTitle: "No matching records found.",
      emptyText: "That means these files contain no recognizable event in this format. It does not establish that no background work occurred.",
      timelineKicker: "OBSERVED EVENTS", timelineTitle: "By time", breakdownKicker: "GROUPED FROM MATCHED RECORDS",
      breakdownTitle: "By feature", breakdownFoot: "Only values present in a matched log record are shown. Missing labels stay “Unspecified.”",
      resultsFootnote: "Totals add the matched event values shown here. Cached input is part of input; reasoning is part of output. This is not an account quota or billing report.",
      footerLine: "Small tool, narrow claim: read local evidence and leave the interpretation visible.",
      companion: "Companion: codex-ambient-killer", records: "records", logFiles: "log files", features: "features",
      observedTokens: "LOG-OBSERVED TOKENS", summedValues: "sum of matched event values", withCounts: "records with a readable total",
      noTotal: "no total recorded", tokens: "tokens", unspecified: "Unspecified", modelUnknown: "model not recorded",
      input: "in", output: "out", cached: "cached in", reasoning: "reasoning", filesLoaded: n => `${n} file${n === 1 ? "" : "s"} read locally.`,
      matched: (n, bad) => `${n} matching record${n === 1 ? "" : "s"} found.${bad ? ` ${bad} line${bad === 1 ? "" : "s"} containing the marker could not be parsed.` : ""}`,
      noMatchStatus: "No matching event was found in the selected files.", fileTooBig: "Could not read this file. Try a smaller or split log file.",
      readError: "A file could not be read. No data was uploaded.", nothingExport: "Load a file before exporting.",
      summaryTitle: "Sum of recorded totals", fileLabel: "file", lineLabel: "line", dateMissing: "time not recorded",
      countNone: "No token totals were readable.", countSome: n => `${n} of ${n === 1 ? "1 record" : "records"} with a readable total`,
      malformed: n => `${n} marked line${n === 1 ? "" : "s"} could not be parsed.`,
    },
    zh: {
      skip: "跳到正文", source: "源码", eyebrow: "本地日志阅读器",
      headline: "让后台记录看得见。",
      lede: "用量额度发生变化时，本地记录里仍可能缺一个答案：究竟是哪个功能产生了这些调用？这里读取日志中实际存在的事件。",
      boundaryLabel: "我们只做到这里", boundaryTitle: "读取记录，不推断归因。",
      boundaryText: "工具读取日志记下的 token 事件，无法判断服务商如何将它们计入账号额度。",
      step: "01 / 打开日志", importTitle: "选择你自己的日志。",
      localNote: "文件只在此标签页处理，不会上传。", dropTitle: "把日志文件拖到这里",
      dropSub: "也可以选择 .log、.txt、.jsonl 或 .ndjson 文件", chooseFiles: "选择文件",
      trySample: "试用虚构示例", matchNote: "查找 ephemeral_generation_token_usage 记录。",
      step02: "02 / 查看实际记录", resultsTitle: "事件时间线。", export: "导出整理后的 JSON",
      clear: "清除数据", sampleBanner: "这是虚构示例，不代表任何 Codex 活动。",
      emptyTitle: "没有找到匹配记录。",
      emptyText: "所选文件里没有识别到这种格式的事件。这不能证明后台没有发生工作。",
      timelineKicker: "观察到的事件", timelineTitle: "按时间", breakdownKicker: "按匹配记录汇总",
      breakdownTitle: "按功能", breakdownFoot: "只显示匹配记录里实际存在的字段。缺少标签时显示“未注明”。",
      resultsFootnote: "合计仅累加下方匹配事件记录的数值。缓存输入属于输入，推理 token 属于输出。本结果不是账号额度或账单报告。",
      footerLine: "小工具，窄结论：读取本地证据，并把解释边界摆在明处。",
      companion: "相关工具：codex-ambient-killer", records: "条记录", logFiles: "个日志文件", features: "种功能",
      observedTokens: "日志记录的 Token", summedValues: "匹配事件数值合计", withCounts: "条记录含可读总数",
      noTotal: "未记录总数", tokens: "tokens", unspecified: "未注明", modelUnknown: "日志未记录模型",
      input: "输入", output: "输出", cached: "缓存输入", reasoning: "推理", filesLoaded: n => `已在本地读取 ${n} 个文件。`,
      matched: (n, bad) => `找到 ${n} 条匹配记录。${bad ? `另有 ${bad} 行含标记但无法解析。` : ""}`,
      noMatchStatus: "所选文件中没有匹配事件。", fileTooBig: "无法读取此文件，请尝试选择更小或拆分后的日志。",
      readError: "有文件无法读取，且没有数据被上传。", nothingExport: "请先加载日志再导出。",
      summaryTitle: "已记录总数合计", fileLabel: "文件", lineLabel: "行", dateMissing: "日志未记录时间",
      countNone: "没有可读取的 Token 总数。", countSome: n => `${n} 条记录含可读总数`,
      malformed: n => `${n} 行带标记的内容无法解析。`,
    }
  };

  const sampleLines = [
    JSON.stringify({ timestamp: "2026-10-20T09:14:00Z", type: marker, feature: "ambient_suggestions", model: "example-model-a", input_tokens: 1820, cached_input_tokens: 1100, output_tokens: 240, reasoning_tokens: 80, total_tokens: 2060 }),
    JSON.stringify({ timestamp: "2026-10-20T09:16:30Z", type: marker, feature: "background_summary", model: "example-model-a", input_tokens: 740, output_tokens: 315, reasoning_tokens: 95 }),
    JSON.stringify({ timestamp: "2026-10-20T09:18:12Z", type: marker, model: "example-model-b", input_tokens: 510, output_tokens: 126, total_tokens: 636 }),
    "2026-10-20T09:20:00Z ephemeral_generation_token_usage feature=ambient_suggestions model=example-model-c inputTokens=1000 cachedInputTokens=300 outputTokens=120 reasoningOutputTokens=40 totalTokens=1120"
  ];

  let lang = "en";
  let records = [];
  let malformedLines = 0;
  let isSample = false;
  const $ = selector => document.querySelector(selector);
  const fileInput = $("#file-input");
  const dropZone = $("#drop-zone");
  const status = $("#status");
  const results = $("#results");

  function t(key, ...args) {
    const value = translations[lang][key];
    return typeof value === "function" ? value(...args) : value;
  }

  function setLanguage(next) {
    lang = next;
    document.documentElement.lang = lang === "zh" ? "zh-CN" : "en";
    document.documentElement.dataset.lang = lang;
    document.querySelectorAll("[data-i18n]").forEach(element => {
      const key = element.dataset.i18n;
      if (translations[lang][key]) element.textContent = t(key);
    });
    document.querySelectorAll("[data-language]").forEach(button => {
      button.setAttribute("aria-pressed", String(button.dataset.language === lang));
    });
    $("#clear-data").setAttribute("aria-label", t("clear"));
    $("#clear-data").title = t("clear");
    if (status.dataset.key) showStatus(t(status.dataset.key, ...(status.dataset.args ? JSON.parse(status.dataset.args) : [])), status.classList.contains("error"));
    renderResults();
  }

  function showStatus(message, error = false, key = "", args = []) {
    status.hidden = !message;
    status.textContent = message;
    status.classList.toggle("error", error);
    status.dataset.key = key;
    status.dataset.args = JSON.stringify(args);
  }

  function walkFor(source, allowedKeys, accept) {
    const wanted = new Set(allowedKeys.map(normalizeKey));
    const stack = [source];
    while (stack.length) {
      const current = stack.pop();
      if (!current || typeof current !== "object") continue;
      const entries = Array.isArray(current) ? current.map((value, index) => [String(index), value]) : Object.entries(current);
      for (const [key, value] of entries) {
        if (wanted.has(normalizeKey(key)) && accept(value)) return value;
      }
      for (let i = entries.length - 1; i >= 0; i--) stack.push(entries[i][1]);
    }
    return undefined;
  }

  function normalizeKey(key) { return String(key).toLowerCase().replace(/[^a-z0-9]/g, ""); }
  function findNumber(source, aliases) {
    const value = walkFor(source, aliases, candidate => (typeof candidate === "number" && Number.isFinite(candidate) && candidate >= 0) || (typeof candidate === "string" && /^\d+(?:\.\d+)?$/.test(candidate.trim())));
    return value === undefined ? null : Number(value);
  }
  function findString(source, aliases) {
    const value = walkFor(source, aliases, candidate => typeof candidate === "string" && candidate.trim().length > 0 && candidate.trim().length <= 80);
    if (value === undefined) return "";
    return value.trim().replace(/[\u0000-\u001f\u007f]/g, " ").replace(/\s+/g, " ");
  }
  function findDate(source) {
    const value = walkFor(source, ["timestamp", "created_at", "createdAt", "event_time", "eventTime", "time", "ts"], candidate =>
      (typeof candidate === "string" && candidate.length <= 50 && !Number.isNaN(Date.parse(candidate))) ||
      (typeof candidate === "number" && Number.isFinite(candidate) && candidate > 0));
    if (value === undefined) return null;
    const n = typeof value === "number" ? (value < 1e12 ? value * 1000 : value) : NaN;
    const date = typeof value === "number" ? new Date(n) : new Date(value);
    return Number.isNaN(date.getTime()) ? null : date.toISOString();
  }

  function eventMatches(root) {
    const found = [];
    const stack = [root];
    while (stack.length) {
      const node = stack.pop();
      if (!node || typeof node !== "object") continue;
      if (Array.isArray(node)) {
        for (let i = node.length - 1; i >= 0; i--) stack.push(node[i]);
        continue;
      }
      if (Object.prototype.hasOwnProperty.call(node, marker)) {
        found.push({ context: node, data: node[marker] });
      } else {
        const type = node.type ?? node.event_type ?? node.eventType ?? node.kind;
        if (typeof type === "string" && type.toLowerCase() === marker) {
          found.push({ context: node, data: node });
          continue;
        }
      }
      const entries = Object.entries(node);
      for (let i = entries.length - 1; i >= 0; i--) {
        if (entries[i][0] !== marker) stack.push(entries[i][1]);
      }
    }
    return found;
  }

  function parseJsonLine(line) {
    const trimmed = line.trim();
    if (!trimmed) return { value: null, malformed: false };
    try { return { value: JSON.parse(trimmed), malformed: false }; } catch {}
    if (!trimmed.includes(marker)) return { value: null, malformed: false };
    const start = trimmed.indexOf("{");
    const end = trimmed.lastIndexOf("}");
    if (start >= 0 && end > start) {
      try { return { value: JSON.parse(trimmed.slice(start, end + 1)), malformed: false }; } catch {}
    }
    const textEvent = parseKeyValueEvent(trimmed);
    return textEvent ? { value: textEvent, malformed: false } : { value: null, malformed: true };
  }

  function parseKeyValueEvent(line) {
    if (!line.includes(marker)) return null;
    const fieldMap = new Map([
      ["timestamp", "timestamp"], ["time", "timestamp"], ["ts", "timestamp"],
      ["feature", "feature"], ["featurename", "feature"], ["featureid", "feature"],
      ["model", "model"], ["modelname", "model"], ["modelid", "model"],
      ["inputtokens", "input_tokens"], ["inputtokencount", "input_tokens"], ["prompttokens", "prompt_tokens"],
      ["cachedinputtokens", "cached_input_tokens"], ["cachereadinputtokens", "cache_read_input_tokens"],
      ["outputtokens", "output_tokens"], ["outputtokencount", "output_tokens"], ["completiontokens", "completion_tokens"],
      ["reasoningtokens", "reasoning_tokens"], ["reasoningoutputtokens", "reasoning_tokens"],
      ["totaltokens", "total_tokens"], ["totaltokencount", "total_tokens"]
    ]);
    const event = { type: marker };
    const leadingTime = line.match(/^\s*(\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}(?:\.\d+)?Z)\b/);
    if (leadingTime) event.timestamp = leadingTime[1];
    const pairs = /(?:^|\s)([A-Za-z_][A-Za-z0-9_.-]*)=("[^"]*"|'[^']*'|[^\s]+)/g;
    let match;
    let recognized = 0;
    while ((match = pairs.exec(line)) !== null) {
      const target = fieldMap.get(normalizeKey(match[1]));
      if (!target) continue;
      let value = match[2];
      if ((value.startsWith('"') && value.endsWith('"')) || (value.startsWith("'") && value.endsWith("'"))) value = value.slice(1, -1);
      event[target] = value;
      recognized++;
    }
    return recognized ? event : null;
  }

  function normalizeEvent(match, fileNumber, lineNumber, occurrence) {
    const context = match.context;
    const data = match.data;
    const combined = { context, data };
    const input = findNumber(data, ["input_tokens", "inputTokens", "input_token_count", "inputTokenCount", "prompt_tokens", "promptTokens"]);
    const output = findNumber(data, ["output_tokens", "outputTokens", "output_token_count", "outputTokenCount", "completion_tokens", "completionTokens"]);
    const explicitTotal = findNumber(data, ["total_tokens", "totalTokens", "total_token_count", "totalTokenCount"]);
    const total = explicitTotal !== null ? explicitTotal : input !== null && output !== null ? input + output : null;
    const feature = findString(combined, ["feature", "feature_name", "featureName", "feature_id", "featureId", "surface"]);
    const model = findString(combined, ["model", "model_name", "modelName", "model_id", "modelId"]);
    return {
      id: `${fileNumber}-${lineNumber}-${occurrence}`,
      fileNumber,
      lineNumber,
      time: findDate(combined),
      feature: feature || "",
      model: model || "",
      input,
      output,
      cachedInput: findNumber(data, ["cached_input_tokens", "cachedInputTokens", "cache_read_input_tokens", "cacheReadInputTokens"]),
      reasoning: findNumber(data, ["reasoning_tokens", "reasoningTokens", "reasoningOutputTokens"]),
      total
    };
  }

  async function* fileLines(file) {
    if (file.stream && typeof TextDecoderStream !== "undefined") {
      const reader = file.stream().pipeThrough(new TextDecoderStream()).getReader();
      let buffer = "";
      let lineNumber = 0;
      try {
        while (true) {
          const { value, done } = await reader.read();
          if (done) break;
          buffer += value;
          let newline;
          while ((newline = buffer.indexOf("\n")) !== -1) {
            let line = buffer.slice(0, newline);
            if (line.endsWith("\r")) line = line.slice(0, -1);
            buffer = buffer.slice(newline + 1);
            yield { line, number: ++lineNumber };
          }
        }
        if (buffer.length) yield { line: buffer, number: lineNumber + 1 };
      } finally { reader.releaseLock(); }
    } else {
      const lines = (await file.text()).split(/\r?\n/);
      for (let index = 0; index < lines.length; index++) yield { line: lines[index], number: index + 1 };
    }
  }

  async function readFiles(files) {
    records = [];
    malformedLines = 0;
    isSample = false;
    if (!files.length) return;
    showStatus(t("filesLoaded", files.length));
    results.hidden = false;
    for (let fileIndex = 0; fileIndex < files.length; fileIndex++) {
      const fileNumber = fileIndex + 1;
      try {
        let occurrence = 0;
        for await (const { line, number } of fileLines(files[fileIndex])) {
          const parsed = parseJsonLine(line);
          if (parsed.malformed) { malformedLines++; continue; }
          if (parsed.value === null) continue;
          for (const match of eventMatches(parsed.value)) {
            occurrence++;
            records.push(normalizeEvent(match, fileNumber, number, occurrence));
          }
        }
      } catch {
        showStatus(t("readError"), true, "readError");
      }
    }
    records.sort((a, b) => (a.time || "9999").localeCompare(b.time || "9999") || a.fileNumber - b.fileNumber || a.lineNumber - b.lineNumber);
    const message = records.length ? t("matched", records.length, malformedLines) : t("noMatchStatus");
    showStatus(message, false, records.length ? "matched" : "noMatchStatus", records.length ? [records.length, malformedLines] : []);
    renderResults();
  }

  function formatNumber(value) {
    return new Intl.NumberFormat(lang === "zh" ? "zh-CN" : "en-US", { maximumFractionDigits: 2 }).format(value);
  }
  function formatDate(iso) {
    if (!iso) return t("dateMissing");
    return new Intl.DateTimeFormat(lang === "zh" ? "zh-CN" : "en-GB", { dateStyle: "medium", timeStyle: "short" }).format(new Date(iso));
  }
  function escapeHtml(value) {
    return String(value).replace(/[&<>"']/g, char => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" })[char]);
  }

  function renderResults() {
    if (results.hidden) return;
    $("#sample-banner").hidden = !isSample;
    const hasRecords = records.length > 0;
    $("#analysis-grid").hidden = !hasRecords;
    $("#empty-result").hidden = hasRecords;
    const totals = records.filter(record => record.total !== null);
    const tokenSum = totals.reduce((sum, record) => sum + record.total, 0);
    const featureCount = new Set(records.map(record => record.feature || t("unspecified"))).size;
    const metricItems = [
      [t("records"), formatNumber(records.length), ""],
      [t("observedTokens"), formatNumber(tokenSum), `${totals.length} ${t("withCounts")}`],
      [t("logFiles"), formatNumber(new Set(records.map(record => record.fileNumber)).size), ""],
      [t("features"), formatNumber(featureCount), ""]
    ];
    $("#summary-strip").innerHTML = metricItems.map(([label, value, sub]) => `<div class="metric"><span class="metric-label">${escapeHtml(label)}</span><strong class="metric-value">${value}<small>${escapeHtml(sub || (label === t("observedTokens") ? t("summedValues") : ""))}</small></strong></div>`).join("");
    $("#record-count").textContent = `${records.length} ${t("records")}`;
    renderTimeline();
    renderBreakdown();
  }

  function renderTimeline() {
    const timeline = $("#timeline");
    timeline.innerHTML = records.map(record => {
      const details = [];
      details.push(record.model ? escapeHtml(record.model) : escapeHtml(t("modelUnknown")));
      details.push(`${escapeHtml(t("fileLabel"))} ${record.fileNumber} · ${escapeHtml(t("lineLabel"))} ${record.lineNumber}`);
      const tokenBits = [];
      if (record.input !== null) tokenBits.push(`${escapeHtml(t("input"))} ${formatNumber(record.input)}`);
      if (record.output !== null) tokenBits.push(`${escapeHtml(t("output"))} ${formatNumber(record.output)}`);
      if (record.cachedInput !== null) tokenBits.push(`${escapeHtml(t("cached"))} ${formatNumber(record.cachedInput)}`);
      if (record.reasoning !== null) tokenBits.push(`${escapeHtml(t("reasoning"))} ${formatNumber(record.reasoning)}`);
      const total = record.total === null ? t("noTotal") : `${formatNumber(record.total)} ${t("tokens")}`;
      return `<li class="event-row"><time class="event-time">${escapeHtml(formatDate(record.time))}</time><span class="event-node" aria-hidden="true"></span><div class="event-main"><strong class="event-feature">${escapeHtml(record.feature || t("unspecified"))}</strong><div class="event-meta">${details.map(item => `<span>${item}</span>`).join("")}</div></div><div class="event-tokens">${escapeHtml(total)}<span>${tokenBits.join(" · ")}</span></div></li>`;
    }).join("");
  }

  function renderBreakdown() {
    const groups = new Map();
    for (const record of records) {
      const feature = record.feature || t("unspecified");
      const model = record.model || t("modelUnknown");
      const key = `${feature}\u0000${model}`;
      const group = groups.get(key) || { feature, model, count: 0, total: 0, counted: 0 };
      group.count++;
      if (record.total !== null) { group.total += record.total; group.counted++; }
      groups.set(key, group);
    }
    const items = [...groups.values()].sort((a, b) => b.total - a.total || b.count - a.count);
    const max = Math.max(1, ...items.map(item => item.total));
    $("#breakdown").innerHTML = items.map(item => `<div class="breakdown-item"><div class="breakdown-top"><strong class="breakdown-name">${escapeHtml(item.feature)}</strong><span class="breakdown-total">${item.counted ? formatNumber(item.total) : "—"}</span></div><div class="breakdown-meta">${escapeHtml(item.model)} · ${formatNumber(item.count)} ${escapeHtml(t("records"))}</div><div class="breakdown-bar" aria-hidden="true"><i style="width:${item.counted ? Math.max(3, item.total / max * 100) : 3}%"></i></div></div>`).join("");
  }

  function loadSample() {
    records = [];
    sampleLines.forEach((line, index) => {
      const parsed = parseJsonLine(line);
      for (const match of eventMatches(parsed.value)) records.push(normalizeEvent(match, 1, index + 1, index + 1));
    });
    records.sort((a, b) => (a.time || "").localeCompare(b.time || ""));
    malformedLines = 0;
    isSample = true;
    results.hidden = false;
    showStatus(t("matched", records.length, 0), false, "matched", [records.length, 0]);
    renderResults();
  }

  function exportNormalized() {
    if (!records.length) { showStatus(t("nothingExport"), true, "nothingExport"); return; }
    const payload = {
      format: "codex-background-audit.normalized.v1",
      scope: "local-log-observed-only; not account quota or billing attribution",
      fictional_sample: isSample,
      records: records.map(({ fileNumber, lineNumber, time, feature, model, input, output, cachedInput, reasoning, total }) => ({ fileNumber, lineNumber, time, feature, model: model || null, inputTokens: input, outputTokens: output, cachedInputTokens: cachedInput, reasoningTokens: reasoning, recordedTotalTokens: total }))
    };
    const blob = new Blob([JSON.stringify(payload, null, 2)], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const anchor = document.createElement("a");
    anchor.href = url;
    anchor.download = "codex-background-audit.json";
    anchor.click();
    setTimeout(() => URL.revokeObjectURL(url), 1000);
  }

  document.querySelectorAll("[data-language]").forEach(button => button.addEventListener("click", () => setLanguage(button.dataset.language)));
  $("#choose-files").addEventListener("click", event => { event.stopPropagation(); fileInput.click(); });
  dropZone.addEventListener("click", event => { if (event.target.id !== "choose-files") fileInput.click(); });
  dropZone.addEventListener("keydown", event => { if (event.key === "Enter" || event.key === " ") { event.preventDefault(); fileInput.click(); } });
  fileInput.addEventListener("change", () => readFiles([...fileInput.files]));
  $("#load-sample").addEventListener("click", loadSample);
  $("#export-json").addEventListener("click", exportNormalized);
  $("#clear-data").addEventListener("click", () => {
    records = []; malformedLines = 0; isSample = false; results.hidden = true; fileInput.value = ""; showStatus("");
  });
  for (const eventName of ["dragenter", "dragover"]) dropZone.addEventListener(eventName, event => { event.preventDefault(); dropZone.classList.add("dragover"); });
  for (const eventName of ["dragleave", "drop"]) dropZone.addEventListener(eventName, event => { event.preventDefault(); dropZone.classList.remove("dragover"); });
  dropZone.addEventListener("drop", event => readFiles([...event.dataTransfer.files]));
  setLanguage("en");
})();
