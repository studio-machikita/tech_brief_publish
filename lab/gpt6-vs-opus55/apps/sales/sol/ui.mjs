import { parseSalesCSV, filterSales, summarizeSales, toSalesCSV } from './core.mjs';
import { SAMPLE_CSV } from './sample-data.mjs';

const $ = id => document.getElementById(id);
const elements = {
  file: $('csv-file'), sample: $('load-sample'), source: $('source-name'), errors: $('errors'),
  from: $('filter-from'), to: $('filter-to'), category: $('filter-category'), query: $('filter-query'),
  reset: $('reset-filters'), count: $('metric-count'), quantity: $('metric-quantity'), revenue: $('metric-revenue'),
  chart: $('category-chart'), body: $('sales-body'), empty: $('empty-state'), sort: $('sort-amount'),
  export: $('export-csv'), note: $('filter-note')
};
const number = new Intl.NumberFormat('ja-JP');
const yen = value => `¥${number.format(value)}`;
let allRows = [];
let errors = [];
let shownRows = [];
let descending = true;

function displayErrors() {
  elements.errors.replaceChildren();
  if (!errors.length) return;
  const heading = document.createElement('p');
  heading.className = 'errors-heading';
  heading.textContent = `${errors.length}件の読み込みエラー・除外行`;
  const list = document.createElement('ul');
  for (const error of errors) {
    const item = document.createElement('li');
    item.textContent = error.message;
    list.append(item);
  }
  elements.errors.append(heading, list);
}

function refreshCategories() {
  const selected = elements.category.value;
  elements.category.replaceChildren(new Option('すべて', ''));
  for (const name of [...new Set(allRows.map(row => row.category))].sort((a, b) => a.localeCompare(b, 'ja'))) {
    elements.category.add(new Option(name, name));
  }
  if ([...elements.category.options].some(option => option.value === selected)) elements.category.value = selected;
}

function addCell(row, value, className = '') {
  const cell = document.createElement('td');
  cell.textContent = value;
  if (className) cell.className = className;
  row.append(cell);
}

function renderTable(rows) {
  elements.body.replaceChildren();
  elements.empty.hidden = rows.length !== 0;
  const fragment = document.createDocumentFragment();
  for (const item of rows) {
    const row = document.createElement('tr');
    addCell(row, item.date);
    const category = document.createElement('td');
    const pill = document.createElement('span');
    pill.className = 'category-pill';
    pill.textContent = item.category;
    category.append(pill);
    row.append(category);
    addCell(row, item.product, 'product-cell');
    addCell(row, number.format(item.quantity), 'numeric');
    addCell(row, yen(item.unitPrice), 'numeric');
    addCell(row, yen(item.amount), 'numeric');
    fragment.append(row);
  }
  elements.body.append(fragment);
}

function renderChart(byCategory) {
  elements.chart.replaceChildren();
  const entries = Object.entries(byCategory).sort((a, b) => b[1] - a[1] || a[0].localeCompare(b[0], 'ja'));
  if (!entries.length) {
    const note = document.createElement('p');
    note.className = 'chart-empty';
    note.textContent = '表示できるカテゴリ別売上はありません。';
    elements.chart.append(note);
    return;
  }
  const max = entries[0][1];
  for (const [category, amount] of entries) {
    const row = document.createElement('div');
    row.className = 'chart-row';
    const label = document.createElement('span');
    label.className = 'chart-label';
    label.textContent = category;
    const track = document.createElement('div');
    track.className = 'bar-track';
    const fill = document.createElement('div');
    fill.className = 'bar-fill';
    fill.style.width = `${max ? amount / max * 100 : 0}%`;
    track.append(fill);
    const value = document.createElement('span');
    value.className = 'chart-value';
    value.textContent = yen(amount);
    row.append(label, track, value);
    elements.chart.append(row);
  }
}

function render() {
  const from = elements.from.value;
  const to = elements.to.value;
  const invalidPeriod = Boolean(from && to && from > to);
  elements.note.textContent = invalidPeriod ? '開始日は終了日以前にしてください。' : '';
  const filtered = invalidPeriod ? [] : filterSales(allRows, {
    from, to, category: elements.category.value, query: elements.query.value
  });
  shownRows = [...filtered].sort((a, b) => descending ? b.amount - a.amount : a.amount - b.amount);
  const summary = summarizeSales(filtered);
  elements.count.textContent = `${number.format(summary.count)}件`;
  elements.quantity.textContent = `${number.format(summary.quantity)}個`;
  elements.revenue.textContent = yen(summary.revenue);
  elements.sort.textContent = `売上金額 ${descending ? '↓' : '↑'}`;
  renderChart(summary.byCategory);
  renderTable(shownRows);
}

function loadCSV(text, name) {
  ({ rows: allRows, errors } = parseSalesCSV(text));
  elements.source.textContent = name;
  refreshCategories();
  displayErrors();
  render();
}

elements.file.addEventListener('change', async () => {
  const file = elements.file.files?.[0];
  if (!file) return;
  try { loadCSV(await file.text(), file.name); }
  catch { allRows = []; errors = [{ message: 'ファイルを読み込めませんでした。' }]; displayErrors(); render(); }
});
elements.sample.addEventListener('click', () => {
  elements.file.value = '';
  loadCSV(SAMPLE_CSV, '共通サンプルを表示中');
});
for (const input of [elements.from, elements.to, elements.category, elements.query]) {
  input.addEventListener('input', render);
  input.addEventListener('change', render);
}
elements.reset.addEventListener('click', () => {
  elements.from.value = '';
  elements.to.value = '';
  elements.category.value = '';
  elements.query.value = '';
  render();
});
elements.sort.addEventListener('click', () => { descending = !descending; render(); });
elements.export.addEventListener('click', () => {
  const blob = new Blob(['\uFEFF', toSalesCSV(shownRows)], { type: 'text/csv;charset=utf-8' });
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = url;
  link.download = 'sales-lens-export.csv';
  document.body.append(link);
  link.click();
  link.remove();
  setTimeout(() => URL.revokeObjectURL(url), 1000);
});
loadCSV(SAMPLE_CSV, '共通サンプルを表示中');
