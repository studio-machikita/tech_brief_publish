const EXPECTED = ['date', 'category', 'product', 'quantity', 'unit_price'];

function parseCSV(text) {
  const input = String(text).replace(/^\uFEFF/, '');
  const records = [];
  let row = [], field = '', quoted = false;
  for (let i = 0; i < input.length; i++) {
    const c = input[i];
    if (quoted) {
      if (c === '"' && input[i + 1] === '"') { field += '"'; i++; }
      else if (c === '"') quoted = false;
      else field += c;
    } else if (c === '"') {
      if (field.length) throw new Error('CSVの引用符の位置が正しくありません。');
      quoted = true;
    } else if (c === ',') { row.push(field); field = ''; }
    else if (c === '\n' || c === '\r') {
      row.push(field); field = '';
      if (row.some(v => v !== '')) records.push(row);
      row = [];
      if (c === '\r' && input[i + 1] === '\n') i++;
    } else field += c;
  }
  if (quoted) throw new Error('CSVの引用符が閉じられていません。');
  row.push(field);
  if (row.some(v => v !== '')) records.push(row);
  return records;
}

function validDate(value) {
  if (!/^\d{4}-\d{2}-\d{2}$/.test(value)) return false;
  const [y, m, d] = value.split('-').map(Number);
  const dt = new Date(Date.UTC(y, m - 1, d));
  return dt.getUTCFullYear() === y && dt.getUTCMonth() === m - 1 && dt.getUTCDate() === d;
}

export function parseSalesCSV(text) {
  let records;
  try { records = parseCSV(text); }
  catch (error) { return { rows: [], errors: [{ message: error.message }] }; }
  if (!records.length) return { rows: [], errors: [{ message: 'CSVにデータがありません。' }] };
  const headers = records[0].map(v => v.trim().toLowerCase());
  const missing = EXPECTED.filter(h => !headers.includes(h));
  if (missing.length) return { rows: [], errors: [{ message: `必須ヘッダーがありません: ${missing.join(', ')}` }] };
  const indexes = EXPECTED.map(h => headers.indexOf(h));
  const rows = [], errors = [];
  records.slice(1).forEach((record, index) => {
    const line = index + 2;
    if (record.length !== headers.length) { errors.push({ message: `${line}行目: 列数がヘッダーと一致しません。` }); return; }
    const [date, category, product, quantityText, priceText] = indexes.map(i => record[i].trim());
    const quantity = /^\d+$/.test(quantityText) ? Number(quantityText) : NaN;
    const unitPrice = /^\d+$/.test(priceText) ? Number(priceText) : NaN;
    const reasons = [];
    if (!validDate(date)) reasons.push('日付が実在するYYYY-MM-DDではありません');
    if (!category) reasons.push('カテゴリが空です');
    if (!product) reasons.push('商品名が空です');
    if (!Number.isSafeInteger(quantity) || quantity <= 0) reasons.push('数量は正の安全な整数ではありません');
    if (!Number.isSafeInteger(unitPrice) || unitPrice < 0) reasons.push('単価は0以上の安全な整数ではありません');
    const amount = quantity * unitPrice;
    if (Number.isSafeInteger(quantity) && Number.isSafeInteger(unitPrice) && !Number.isSafeInteger(amount)) reasons.push('数量×単価が安全な整数の範囲外です');
    if (reasons.length) { errors.push({ message: `${line}行目: ${reasons.join('、')}。` }); return; }
    rows.push({ date, category, product, quantity, unitPrice, amount });
  });
  return { rows, errors };
}

export function filterSales(rows, { from = '', to = '', category = '', query = '' } = {}) {
  const needle = query.toLocaleLowerCase();
  return rows.filter(r => (!from || r.date >= from) && (!to || r.date <= to) && (!category || r.category === category) && (!needle || r.product.toLocaleLowerCase().includes(needle)));
}

export function summarizeSales(rows) {
  const byCategory = {};
  let quantity = 0, revenue = 0;
  for (const row of rows) {
    quantity += row.quantity; revenue += row.amount;
    byCategory[row.category] = (byCategory[row.category] || 0) + row.amount;
  }
  return { count: rows.length, quantity, revenue, byCategory };
}

function escapeCSV(value) {
  const s = String(value);
  return /[",\r\n]/.test(s) ? `"${s.replace(/"/g, '""')}"` : s;
}
export function toSalesCSV(rows) {
  return [['date', 'category', 'product', 'quantity', 'unit_price'], ...rows.map(r => [r.date, r.category, r.product, r.quantity, r.unitPrice])].map(row => row.map(escapeCSV).join(',')).join('\r\n');
}
