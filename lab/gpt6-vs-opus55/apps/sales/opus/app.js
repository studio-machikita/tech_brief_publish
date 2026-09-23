import { parseSalesCSV, filterSales, summarizeSales, sortByAmount, toSalesCSV } from './core.mjs';
import { SAMPLE_CSV, SAMPLE_FILE_NAME } from './sample-data.mjs';

window.__salesLensReady = true;

const $ = (id) => document.getElementById(id);
const el = {
  file: $('csv-file'),
  loadSample: $('load-sample'),
  source: $('source-name'),
  errors: $('errors'),
  from: $('filter-from'),
  to: $('filter-to'),
  category: $('filter-category'),
  query: $('filter-query'),
  reset: $('reset-filters'),
  filterNote: $('filter-note'),
  count: $('metric-count'),
  quantity: $('metric-quantity'),
  revenue: $('metric-revenue'),
  chart: $('category-chart'),
  tbody: $('sales-table').tBodies[0],
  amountHeader: $('amount-header'),
  sort: $('sort-amount'),
  exportBtn: $('export-csv'),
  empty: $('empty-state'),
};

const state = {
  rows: [],
  errors: [],
  sourceName: '',
  sort: 'none', // 'none' | 'asc' | 'desc'
};

const numberFmt = new Intl.NumberFormat('ja-JP');
const yen = (n) => `¥${numberFmt.format(n)}`;

function make(tag, props = {}, children = []) {
  const node = document.createElement(tag);
  Object.assign(node, props);
  for (const child of [].concat(children)) node.append(child);
  return node;
}

function loadText(text, sourceName) {
  const { rows, errors } = parseSalesCSV(text);
  state.rows = rows;
  state.errors = errors;
  state.sourceName = sourceName;
  state.sort = 'none';
  resetFilterInputs();
  rebuildCategoryOptions();
  renderErrors();
  render();
}

function loadSample() {
  el.file.value = '';
  loadText(SAMPLE_CSV, `${SAMPLE_FILE_NAME}（サンプル）`);
}

async function onFileChange() {
  const file = el.file.files && el.file.files[0];
  if (!file) return;
  try {
    const text = await file.text();
    loadText(text, file.name);
  } catch (err) {
    state.rows = [];
    state.errors = [{ type: 'input', message: `ファイルを読み込めませんでした（${err && err.message ? err.message : '不明なエラー'}）。` }];
    state.sourceName = file.name;
    resetFilterInputs();
    rebuildCategoryOptions();
    renderErrors();
    render();
  }
}

function resetFilterInputs() {
  el.from.value = '';
  el.to.value = '';
  el.category.value = '';
  el.query.value = '';
}

function rebuildCategoryOptions() {
  const categories = [...new Set(state.rows.map((r) => r.category))];
  el.category.replaceChildren(
    make('option', { value: '', textContent: 'すべて' }),
    ...categories.map((c) => make('option', { value: c, textContent: c })),
  );
  const dates = state.rows.map((r) => r.date).sort();
  for (const input of [el.from, el.to]) {
    input.min = dates[0] || '';
    input.max = dates[dates.length - 1] || '';
  }
}

function currentFilters() {
  return { from: el.from.value, to: el.to.value, category: el.category.value, query: el.query.value };
}

function renderErrors() {
  const inputErrors = state.errors.filter((e) => e.type === 'input');
  const rowErrors = state.errors.filter((e) => e.type !== 'input');
  const nodes = [];

  if (inputErrors.length) {
    nodes.push(make('div', { className: 'notice notice-error', role: 'alert' }, [
      make('p', {}, make('strong', { textContent: 'ファイル全体を読み込めませんでした' })),
      make('ul', {}, inputErrors.map((e) => make('li', { textContent: e.message }))),
    ]));
  } else {
    nodes.push(make('p', {
      className: 'notice notice-ok',
      textContent: `有効な行: ${numberFmt.format(state.rows.length)}件／除外した行: ${numberFmt.format(rowErrors.length)}件`,
    }));
  }

  if (rowErrors.length) {
    nodes.push(make('div', { className: 'notice notice-warn' }, [
      make('p', {}, make('strong', { textContent: `次の${rowErrors.length}行は不正なため集計から除外しました` })),
      make('ul', { className: 'error-list' }, rowErrors.map((e) => make('li', { textContent: e.message }))),
    ]));
  }
  el.errors.replaceChildren(...nodes);
}

function render() {
  el.source.textContent = state.sourceName || 'なし';
  const filters = currentFilters();
  const filtered = filterSales(state.rows, filters);
  const summary = summarizeSales(filtered);

  el.count.textContent = `${numberFmt.format(summary.count)}件`;
  el.quantity.textContent = numberFmt.format(summary.quantity);
  el.revenue.textContent = yen(summary.revenue);

  el.filterNote.textContent = filters.from && filters.to && filters.from > filters.to
    ? '開始日が終了日より後になっています。期間を見直してください。'
    : '';

  renderChart(summary);
  renderTable(visibleRows(filtered));
}

function visibleRows(filtered) {
  return state.sort === 'none' ? filtered : sortByAmount(filtered, state.sort);
}

function renderChart(summary) {
  const entries = Object.entries(summary.byCategory).sort((a, b) => b[1] - a[1]);
  if (entries.length === 0) {
    el.chart.replaceChildren(make('p', { className: 'chart-empty', textContent: '表示できる売上がありません（合計 ¥0）。' }));
    return;
  }
  const max = Math.max(...entries.map(([, v]) => v));
  const list = make('ul', { className: 'bars' });
  list.setAttribute('aria-label', 'カテゴリ別売上（金額の大きい順）');
  for (const [name, value] of entries) {
    const pct = max > 0 ? (value / max) * 100 : 0;
    const share = summary.revenue > 0 ? Math.round((value / summary.revenue) * 1000) / 10 : 0;
    const fill = make('span', { className: 'bar-fill' });
    fill.style.width = `${pct}%`;
    const track = make('span', { className: 'bar-track' }, fill);
    track.setAttribute('aria-hidden', 'true');
    list.append(make('li', { className: 'bar-row' }, [
      make('span', { className: 'bar-label', textContent: name }),
      track,
      make('span', { className: 'bar-value', textContent: `${yen(value)}（${share}%）` }),
    ]));
  }
  el.chart.replaceChildren(list);
}

function renderTable(rows) {
  const frag = document.createDocumentFragment();
  for (const r of rows) {
    frag.append(make('tr', {}, [
      make('td', { textContent: r.date }),
      make('td', { textContent: r.category }),
      make('td', { className: 'product', textContent: r.product }),
      make('td', { className: 'num', textContent: numberFmt.format(r.quantity) }),
      make('td', { className: 'num', textContent: yen(r.unitPrice) }),
      make('td', { className: 'num amount', textContent: yen(r.amount) }),
    ]));
  }
  el.tbody.replaceChildren(frag);
  el.empty.hidden = rows.length > 0;

  const labels = { none: '売上金額で並べ替え', asc: '売上金額: 昇順 ↑', desc: '売上金額: 降順 ↓' };
  el.sort.textContent = labels[state.sort];
  el.sort.setAttribute('aria-pressed', String(state.sort !== 'none'));
  el.sort.title = state.sort === 'asc' ? 'クリックで降順に切り替え' : 'クリックで昇順に切り替え';
  el.amountHeader.setAttribute('aria-sort', state.sort === 'asc' ? 'ascending' : state.sort === 'desc' ? 'descending' : 'none');
}

function toggleSort() {
  state.sort = state.sort === 'asc' ? 'desc' : 'asc';
  render();
}

function exportCSV() {
  const rows = visibleRows(filterSales(state.rows, currentFilters()));
  // BOM helps spreadsheet apps detect UTF-8; parseSalesCSV strips it on re-import.
  const blob = new Blob(['﻿', toSalesCSV(rows)], { type: 'text/csv;charset=utf-8' });
  const url = URL.createObjectURL(blob);
  const today = new Date();
  const stamp = `${today.getFullYear()}${String(today.getMonth() + 1).padStart(2, '0')}${String(today.getDate()).padStart(2, '0')}`;
  const a = make('a', { href: url, download: `sales-lens-${stamp}.csv` });
  document.body.append(a);
  a.click();
  a.remove();
  setTimeout(() => URL.revokeObjectURL(url), 1000);
}

el.file.addEventListener('change', onFileChange);
el.loadSample.addEventListener('click', loadSample);
for (const input of [el.from, el.to, el.category, el.query]) {
  input.addEventListener('input', render);
  input.addEventListener('change', render);
}
el.reset.addEventListener('click', () => {
  resetFilterInputs();
  render();
});
el.sort.addEventListener('click', toggleSort);
el.exportBtn.addEventListener('click', exportCSV);

loadSample();
