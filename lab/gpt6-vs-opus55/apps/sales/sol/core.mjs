const HEADERS = ['date', 'category', 'product', 'quantity', 'unit_price'];

function readRecords(text) {
  const records = [];
  const errors = [];
  const source = String(text ?? '').replace(/^\uFEFF/, '');
  let fields = [];
  let field = '';
  let quoted = false;
  let afterQuote = false;
  let line = 1;
  let recordLine = 1;
  let broken = false;

  function finishRecord() {
    fields.push(field);
    if (broken) {
      errors.push({ message: `${recordLine}行目: CSVの引用符の形式が正しくありません。` });
    } else if (fields.some(value => value.trim() !== '')) {
      records.push({ fields, line: recordLine });
    }
    fields = [];
    field = '';
    afterQuote = false;
    broken = false;
    recordLine = line + 1;
  }

  for (let i = 0; i < source.length; i++) {
    const char = source[i];
    const newline = char === '\n' || char === '\r';
    if (quoted) {
      if (char === '"') {
        if (source[i + 1] === '"') { field += '"'; i++; }
        else { quoted = false; afterQuote = true; }
      } else if (newline) {
        if (char === '\r' && source[i + 1] === '\n') i++;
        field += '\n';
        line++;
      } else field += char;
      continue;
    }
    if (newline) {
      if (char === '\r' && source[i + 1] === '\n') i++;
      finishRecord();
      line++;
    } else if (char === ',') {
      fields.push(field);
      field = '';
      afterQuote = false;
    } else if (char === '"') {
      if (field === '' && !afterQuote) quoted = true;
      else broken = true;
    } else {
      if (afterQuote) broken = true;
      field += char;
    }
  }
  if (quoted) errors.push({ message: `${recordLine}行目: 引用符が閉じられていません。` });
  else if (field !== '' || fields.length || afterQuote || broken) finishRecord();
  return { records, errors };
}

function validDate(value) {
  if (!/^\d{4}-\d{2}-\d{2}$/.test(value)) return false;
  const [year, month, day] = value.split('-').map(Number);
  const date = new Date(0);
  date.setUTCFullYear(year, month - 1, day);
  return date.getUTCFullYear() === year && date.getUTCMonth() === month - 1 && date.getUTCDate() === day;
}

function integer(value, positive) {
  if (!/^\d+$/.test(value)) return null;
  const number = Number(value);
  return Number.isSafeInteger(number) && (!positive || number > 0) ? number : null;
}

export function parseSalesCSV(text) {
  const { records, errors } = readRecords(text);
  if (!records.length) {
    errors.push({ message: 'CSVにヘッダーとデータがありません。' });
    return { rows: [], errors };
  }
  const headers = records[0].fields.map((value, index) => index === 0 ? value.replace(/^\uFEFF/, '').trim() : value.trim());
  const missing = HEADERS.filter(header => !headers.includes(header));
  if (missing.length || new Set(headers).size !== headers.length) {
    errors.push({ message: `ヘッダーが正しくありません。必要な列: ${HEADERS.join(', ')}${missing.length ? `。不足: ${missing.join(', ')}` : '。列名の重複があります'}` });
    return { rows: [], errors };
  }
  const indexes = HEADERS.map(header => headers.indexOf(header));
  const rows = [];
  for (const record of records.slice(1)) {
    const values = indexes.map(index => record.fields[index] ?? '');
    const [date, category, product, quantityText, priceText] = values;
    const reasons = [];
    if (record.fields.length !== headers.length) reasons.push(`列数が${headers.length}列ではありません`);
    if (!validDate(date)) reasons.push('日付が実在するYYYY-MM-DDではありません');
    if (!category.trim()) reasons.push('カテゴリが空です');
    if (!product.trim()) reasons.push('商品名が空です');
    const quantity = integer(quantityText, true);
    const unitPrice = integer(priceText, false);
    if (quantity === null) reasons.push('数量は正の安全な整数にしてください');
    if (unitPrice === null) reasons.push('単価は0以上の安全な整数にしてください');
    const amount = quantity !== null && unitPrice !== null ? quantity * unitPrice : 0;
    if (quantity !== null && unitPrice !== null && !Number.isSafeInteger(amount)) reasons.push('売上金額が安全な整数の範囲を超えています');
    if (reasons.length) errors.push({ message: `${record.line}行目: ${reasons.join('、')}。` });
    else rows.push({ date, category, product, quantity, unitPrice, amount });
  }
  return { rows, errors };
}

export function filterSales(rows, { from = '', to = '', category = '', query = '' } = {}) {
  const needle = query.toLocaleLowerCase();
  return rows.filter(row =>
    (!from || row.date >= from) &&
    (!to || row.date <= to) &&
    (!category || row.category === category) &&
    (!needle || row.product.toLocaleLowerCase().includes(needle))
  );
}

export function summarizeSales(rows) {
  const totals = new Map();
  let quantity = 0;
  let revenue = 0;
  for (const row of rows) {
    quantity += row.quantity;
    revenue += row.amount;
    totals.set(row.category, (totals.get(row.category) ?? 0) + row.amount);
  }
  return { count: rows.length, quantity, revenue, byCategory: Object.fromEntries(totals) };
}

function escapeCSV(value) {
  const text = String(value);
  return /[",\r\n]/.test(text) ? `"${text.replaceAll('"', '""')}"` : text;
}

export function toSalesCSV(rows) {
  return [HEADERS.join(','), ...rows.map(row =>
    [row.date, row.category, row.product, row.quantity, row.unitPrice].map(escapeCSV).join(',')
  )].join('\r\n') + '\r\n';
}
