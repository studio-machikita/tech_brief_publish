import { parseSalesCSV, filterSales, summarizeSales, toSalesCSV } from './core.mjs';

const $ = id => document.getElementById(id);
const fileInput = $('csv-file'), sampleButton = $('load-sample');
let allRows = [], displayedRows = [], sortDescending = true;
const yen = value => `¥${new Intl.NumberFormat('ja-JP').format(value)}`;

function showErrors(messages) {
  const box = $('errors');
  box.replaceChildren();
  if (!messages.length) { box.hidden = true; return; }
  box.hidden = false;
  const lead = document.createElement('div');
  lead.textContent = '読み込み時の確認事項'; box.append(lead);
  const list = document.createElement('ul');
  for (const message of messages) { const li = document.createElement('li'); li.textContent = message; list.append(li); }
  box.append(list);
}

function fillCategories() {
  const select = $('filter-category'), current = select.value;
  select.replaceChildren(new Option('全件', ''));
  [...new Set(allRows.map(row => row.category))].sort((a, b) => a.localeCompare(b, 'ja')).forEach(name => select.add(new Option(name, name)));
  if ([...select.options].some(option => option.value === current)) select.value = current;
}

function render() {
  displayedRows = filterSales(allRows, {
    from: $('filter-from').value, to: $('filter-to').value,
    category: $('filter-category').value, query: $('filter-query').value.trim()
  });
  displayedRows.sort((a, b) => sortDescending ? b.amount - a.amount : a.amount - b.amount);
  const summary = summarizeSales(displayedRows);
  $('metric-count').textContent = new Intl.NumberFormat('ja-JP').format(summary.count);
  $('metric-quantity').textContent = new Intl.NumberFormat('ja-JP').format(summary.quantity);
  $('metric-revenue').textContent = yen(summary.revenue);
  $('table-count').textContent = `${summary.count}件`;
  $('sort-label').textContent = sortDescending ? '降順' : '昇順';
  $('empty-state').hidden = summary.count !== 0;

  const tbody = $('sales-body'); tbody.replaceChildren();
  for (const row of displayedRows) {
    const tr = document.createElement('tr');
    const cells = [row.date, row.category, row.product, new Intl.NumberFormat('ja-JP').format(row.quantity), yen(row.unitPrice), yen(row.amount)];
    cells.forEach((value, i) => {
      const td = document.createElement('td'); td.textContent = value;
      if (i >= 3) td.classList.add('numeric');
      if (i === 1) { const tag = document.createElement('span'); tag.className = 'category-tag'; tag.textContent = value; td.replaceChildren(tag); }
      if (i === 2) td.classList.add('product-cell');
      tr.append(td);
    });
    tbody.append(tr);
  }
  renderChart(summary.byCategory);
}

function renderChart(byCategory) {
  const root = $('category-chart'); root.replaceChildren();
  const items = Object.entries(byCategory).sort((a, b) => b[1] - a[1]);
  if (!items.length) {
    const message = document.createElement('div'); message.className = 'chart-empty'; message.textContent = '表示できるカテゴリ別売上はありません。'; root.append(message); return;
  }
  const max = Math.max(...items.map(([, value]) => value));
  for (const [category, value] of items) {
    const line = document.createElement('div'); line.className = 'chart-row';
    const label = document.createElement('span'); label.className = 'chart-label'; label.textContent = category;
    const track = document.createElement('span'); track.className = 'chart-track'; track.setAttribute('aria-hidden', 'true');
    const bar = document.createElement('span'); bar.className = 'chart-bar'; bar.style.width = `${max ? value / max * 100 : 0}%`; track.append(bar);
    const amount = document.createElement('span'); amount.className = 'chart-value'; amount.textContent = yen(value);
    line.append(label, track, amount); root.append(line);
  }
}

function loadCSV(text, name) {
  const parsed = parseSalesCSV(text);
  allRows = parsed.rows;
  $('source-name').textContent = name;
  showErrors(parsed.errors.map(error => error.message));
  fillCategories(); render();
}

async function loadSample() {
  try {
    const response = await fetch('./sales-sample.csv');
    if (!response.ok) throw new Error('サンプルCSVを読み込めませんでした。');
    loadCSV(await response.text(), 'サンプルデータ');
  } catch (error) { showErrors([`${error.message} index.htmlをローカルサーバーから開いてください。`]); }
}

fileInput.addEventListener('change', async () => {
  const file = fileInput.files?.[0]; if (!file) return;
  loadCSV(await file.text(), file.name);
});
sampleButton.addEventListener('click', loadSample);
for (const id of ['filter-from', 'filter-to', 'filter-category', 'filter-query']) $(id).addEventListener('input', render);
$('filter-category').addEventListener('change', render);
$('reset-filters').addEventListener('click', () => {
  $('filter-from').value = ''; $('filter-to').value = ''; $('filter-category').value = ''; $('filter-query').value = ''; render();
});
$('sort-amount').addEventListener('click', () => { sortDescending = !sortDescending; render(); });
$('export-csv').addEventListener('click', () => {
  const blob = new Blob(['\uFEFF', toSalesCSV(displayedRows)], { type: 'text/csv;charset=utf-8' });
  const url = URL.createObjectURL(blob), link = document.createElement('a');
  link.href = url; link.download = 'sales-export.csv'; link.click(); URL.revokeObjectURL(url);
});
loadSample();
