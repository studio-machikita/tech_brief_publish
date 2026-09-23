// Generated from core.mjs by work/build.mjs.
(() => {
const HEADERS = ['date', 'category', 'product', 'quantity', 'unit_price'];

// Strict CSV tokenizer. Physical line numbers survive quoted newlines.
function tokenize(text) {
  const records = [];
  let fields = [], value = '', state = 'start', line = 1, start = 1;
  const field = () => { fields.push(value); value = ''; state = 'start'; };
  const record = () => { field(); records.push({fields, line: start}); fields = []; };
  for (let i = 0; i < text.length; i++) {
    const c = text[i];
    if (state === 'quoted') {
      if (c === '"') {
        if (text[i + 1] === '"') { value += '"'; i++; }
        else state = 'closed';
      } else {
        value += c;
        if (c === '\n' || (c === '\r' && text[i + 1] !== '\n')) line++;
      }
      continue;
    }
    if (c === ',') { field(); continue; }
    if (c === '\r' || c === '\n') {
      record();
      if (c === '\r' && text[i + 1] === '\n') i++;
      line++; start = line; continue;
    }
    if (state === 'closed') throw new Error(`${line}行目: 閉じ引用符の後に不正な文字があります。`);
    if (c === '"') {
      if (state !== 'start') throw new Error(`${line}行目: 引用符の位置が不正です。`);
      state = 'quoted';
    } else { value += c; state = 'plain'; }
  }
  if (state === 'quoted') throw new Error(`${start}行目: 引用符が閉じられていません。`);
  if (fields.length || value !== '' || state !== 'start') record();
  return records;
}

function isValidDate(value) {
  if (!/^\d{4}-\d{2}-\d{2}$/.test(value)) return false;
  const [y,m,d] = value.split('-').map(Number);
  const leap = y % 4 === 0 && (y % 100 !== 0 || y % 400 === 0);
  return y >= 1 && m >= 1 && m <= 12 && d >= 1 && d <= [31,leap?29:28,31,30,31,30,31,31,30,31,30,31][m-1];
}

function parseSalesCSV(text) {
  const errors = [], rows = [];
  let records;
  try {
    if (typeof text !== 'string') throw new Error('CSVは文字列で指定してください。');
    records = tokenize(text.replace(/^\uFEFF/, ''));
  } catch (e) { return {rows, errors:[{message:e.message, fatal:true}]}; }
  while (records.length && records[0].fields.length === 1 && records[0].fields[0] === '') records.shift();
  if (!records.length) return {rows,errors:[{message:'CSVが空です。ヘッダーが必要です。',fatal:true}]};
  const header = records.shift().fields;
  const missing = HEADERS.filter(h => !header.includes(h));
  if (missing.length || new Set(header).size !== header.length) {
    return {rows,errors:[{message:missing.length ? `必須ヘッダーが不足しています: ${missing.join(', ')}` : 'ヘッダーに重複があります。',fatal:true}]};
  }
  const indexes = HEADERS.map(h => header.indexOf(h));
  for (const rec of records) {
    if (rec.fields.length === 1 && rec.fields[0] === '') continue;
    const reasons = [];
    if (rec.fields.length !== header.length) reasons.push('列数がヘッダーと一致しません');
    const [date,category,product,q,p] = indexes.map(i => rec.fields[i] ?? '');
    const quantity = Number(q), unitPrice = Number(p);
    if (!isValidDate(date)) reasons.push('日付は実在するYYYY-MM-DDで指定してください');
    if (!category.trim()) reasons.push('カテゴリが空です');
    if (!product.trim()) reasons.push('商品名が空です');
    const qOK = /^\d+$/.test(q) && Number.isSafeInteger(quantity) && quantity > 0;
    const pOK = /^\d+$/.test(p) && Number.isSafeInteger(unitPrice) && unitPrice >= 0;
    if (!qOK) reasons.push('数量は正の安全な整数で指定してください');
    if (!pOK) reasons.push('単価は0以上の安全な整数で指定してください');
    const amount = quantity * unitPrice;
    if (qOK && pOK && !Number.isSafeInteger(amount)) reasons.push('数量×単価が安全な整数の上限を超えています');
    if (reasons.length) errors.push({line:rec.line,message:`${rec.line}行目: ${reasons.join('／')}`});
    else rows.push({date,category,product,quantity,unitPrice,amount});
  }
  return {rows,errors};
}

function filterSales(rows, {from='',to='',category='',query=''} = {}) {
  const needle = query.toLowerCase();
  return rows.filter(r => (!from || r.date >= from) && (!to || r.date <= to) && (!category || r.category === category) && (!needle || r.product.toLowerCase().includes(needle)));
}

// Accumulate as BigInt so totals remain exact even across many valid rows.
// Ordinary totals remain numbers; oversized totals are returned as BigInt.
function summarizeSales(rows) {
  let quantity = 0n, revenue = 0n;
  const byCategory = Object.create(null);
  const compact = n => n <= BigInt(Number.MAX_SAFE_INTEGER) ? Number(n) : n;
  for (const r of rows) {
    quantity += BigInt(r.quantity); revenue += BigInt(r.amount);
    byCategory[r.category] = (byCategory[r.category] ?? 0n) + BigInt(r.amount);
  }
  for (const key of Object.keys(byCategory)) byCategory[key] = compact(byCategory[key]);
  return {count:rows.length,quantity:compact(quantity),revenue:compact(revenue),byCategory};
}

function toSalesCSV(rows) {
  const escape = value => /[",\r\n]/.test(String(value)) ? `"${String(value).replaceAll('"','""')}"` : String(value);
  return [HEADERS.join(','), ...rows.map(r => [r.date,r.category,r.product,r.quantity,r.unitPrice].map(escape).join(','))].join('\r\n') + '\r\n';
}

window.SalesCore = {isValidDate,parseSalesCSV,filterSales,summarizeSales,toSalesCSV};
})();
