// Sales Lens core: CSV parsing, validation, filtering, summarizing and export.
// Pure functions only (no DOM), importable from Node.js and the browser.

export const COLUMNS = ['date', 'category', 'product', 'quantity', 'unit_price'];

const DATE_RE = /^(\d{4})-(\d{2})-(\d{2})$/;
const UINT_RE = /^\d+$/;

/**
 * Split CSV text into records (RFC 4180 style).
 * Handles BOM, CRLF/LF/CR, quoted fields with commas, newlines and "" escapes.
 * Each record: { fields, line, malformed } where line is the 1-based physical line
 * the record starts on.
 * Returns { records, error } — error is set when a quote is left unclosed.
 */
export function splitCSV(text) {
  const src = String(text ?? '').replace(/^﻿/, '');
  const records = [];
  let fields = [];
  let field = '';
  let inQuotes = false;
  let fieldStarted = false; // current field began with a quote
  let afterQuote = false; // closing quote seen, waiting for delimiter
  let malformed = false;
  let line = 1;
  let recordLine = 1;
  let quoteLine = 1;

  const endField = () => {
    fields.push(field);
    field = '';
    fieldStarted = false;
    afterQuote = false;
  };
  const endRecord = () => {
    endField();
    records.push({ fields, line: recordLine, malformed });
    fields = [];
    malformed = false;
  };

  for (let i = 0; i < src.length; i++) {
    const ch = src[i];
    if (inQuotes) {
      if (ch === '"') {
        if (src[i + 1] === '"') {
          field += '"';
          i++;
        } else {
          inQuotes = false;
          afterQuote = true;
        }
      } else {
        if (ch === '\n' || (ch === '\r' && src[i + 1] !== '\n')) line++;
        field += ch;
      }
      continue;
    }
    if (ch === ',') {
      endField();
    } else if (ch === '\r' || ch === '\n') {
      if (ch === '\r' && src[i + 1] === '\n') i++;
      endRecord();
      line++;
      recordLine = line;
    } else if (ch === '"' && field === '' && !fieldStarted && !afterQuote) {
      inQuotes = true;
      fieldStarted = true;
      quoteLine = line;
    } else {
      // Text after a closing quote, or a stray quote inside an unquoted field.
      if (afterQuote || ch === '"') malformed = true;
      field += ch;
    }
  }

  if (inQuotes) {
    return { records, error: `${quoteLine}行目で始まる引用符（"）が閉じられていません。` };
  }
  // Final record without trailing newline.
  if (field !== '' || fields.length > 0 || fieldStarted) endRecord();
  return { records, error: null };
}

function isRealDate(value) {
  const m = DATE_RE.exec(value);
  if (!m) return false;
  const y = Number(m[1]);
  const mo = Number(m[2]);
  const d = Number(m[3]);
  if (y < 1 || mo < 1 || mo > 12 || d < 1) return false;
  const leap = (y % 4 === 0 && y % 100 !== 0) || y % 400 === 0;
  const days = [31, leap ? 29 : 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31][mo - 1];
  return d <= days;
}

function quote(value) {
  return `「${value}」`;
}

function validateRow(get) {
  const reasons = [];
  const date = get('date').trim();
  const category = get('category').trim();
  const product = get('product').trim();
  const quantityText = get('quantity').trim();
  const priceText = get('unit_price').trim();

  if (date === '') reasons.push('日付が空です');
  else if (!DATE_RE.test(date)) reasons.push(`日付${quote(date)}はYYYY-MM-DD形式ではありません`);
  else if (!isRealDate(date)) reasons.push(`日付${quote(date)}は実在しない日付です`);

  if (category === '') reasons.push('カテゴリが空です');
  if (product === '') reasons.push('商品名が空です');

  let quantity = NaN;
  if (quantityText === '') reasons.push('数量が空です');
  else if (/^-\d+$/.test(quantityText) && Number(quantityText) !== 0) reasons.push(`数量${quote(quantityText)}が負の数です`);
  else if (!UINT_RE.test(quantityText)) reasons.push(`数量${quote(quantityText)}は整数ではありません`);
  else {
    quantity = Number(quantityText);
    if (!Number.isSafeInteger(quantity)) reasons.push(`数量${quote(quantityText)}が大きすぎます`);
    else if (quantity <= 0) reasons.push('数量は1以上である必要があります');
  }

  let unitPrice = NaN;
  if (priceText === '') reasons.push('単価が空です');
  else if (/^-\d+$/.test(priceText) && Number(priceText) !== 0) reasons.push(`単価${quote(priceText)}が負の数です`);
  else if (!UINT_RE.test(priceText)) reasons.push(`単価${quote(priceText)}は整数ではありません`);
  else {
    unitPrice = Number(priceText);
    if (!Number.isSafeInteger(unitPrice)) reasons.push(`単価${quote(priceText)}が大きすぎます`);
  }

  let amount = NaN;
  if (reasons.length === 0) {
    amount = quantity * unitPrice;
    if (!Number.isSafeInteger(amount)) reasons.push('数量×単価が安全に扱える整数の範囲を超えています');
  }

  if (reasons.length) return { reasons };
  return { row: { date, category, product, quantity, unitPrice, amount } };
}

/**
 * Parse sales CSV text.
 * Returns { rows, errors }. errors: [{ type: 'input'|'row', line?, message, reasons? }].
 * An 'input' error means the whole input was rejected (rows is empty).
 */
export function parseSalesCSV(text) {
  const rows = [];
  const errors = [];
  const inputError = (message) => ({ rows: [], errors: [{ type: 'input', message }] });

  if (typeof text !== 'string') return inputError('CSVテキストを読み込めませんでした。');
  const { records, error } = splitCSV(text);
  if (error) return inputError(`CSVの構文エラー: ${error}`);

  const isBlank = (r) => r.fields.length === 1 && r.fields[0].trim() === '';
  const content = records.filter((r) => !isBlank(r));
  if (content.length === 0) return inputError('CSVが空です。ヘッダー行（date,category,product,quantity,unit_price）が必要です。');

  const header = content[0];
  const names = header.fields.map((f) => f.trim().toLowerCase());
  const missing = COLUMNS.filter((c) => !names.includes(c));
  if (missing.length) {
    return inputError(`ヘッダーに必要な列がありません: ${missing.join(', ')}（必要な列: ${COLUMNS.join(', ')}）`);
  }
  const dup = COLUMNS.filter((c) => names.indexOf(c) !== names.lastIndexOf(c));
  if (dup.length) return inputError(`ヘッダーの列名が重複しています: ${dup.join(', ')}`);
  const index = Object.fromEntries(COLUMNS.map((c) => [c, names.indexOf(c)]));

  for (const rec of content.slice(1)) {
    const prefix = `${rec.line}行目: `;
    if (rec.malformed) {
      const message = '引用符の使い方が正しくありません';
      errors.push({ type: 'row', line: rec.line, reasons: [message], message: prefix + message });
      continue;
    }
    if (rec.fields.length !== names.length) {
      const message = `列数が${rec.fields.length}です（ヘッダーは${names.length}列）`;
      errors.push({ type: 'row', line: rec.line, reasons: [message], message: prefix + message });
      continue;
    }
    const result = validateRow((col) => rec.fields[index[col]]);
    if (result.row) rows.push(result.row);
    else errors.push({ type: 'row', line: rec.line, reasons: result.reasons, message: prefix + result.reasons.join('／') });
  }

  return { rows, errors };
}

/**
 * Filter rows by period (inclusive), category (exact) and product substring
 * (case-insensitive). Empty or missing criteria impose no constraint.
 */
export function filterSales(rows, { from = '', to = '', category = '', query = '' } = {}) {
  const q = String(query ?? '').trim().toLowerCase();
  return rows.filter((r) => {
    if (from && r.date < from) return false;
    if (to && r.date > to) return false;
    if (category && r.category !== category) return false;
    if (q && !r.product.toLowerCase().includes(q)) return false;
    return true;
  });
}

/** Summarize rows: count, quantity total, revenue total and revenue per category. */
export function summarizeSales(rows) {
  let quantity = 0;
  let revenue = 0;
  const byCategory = {};
  for (const r of rows) {
    quantity += r.quantity;
    revenue += r.amount;
    if (Object.prototype.hasOwnProperty.call(byCategory, r.category)) {
      byCategory[r.category] += r.amount;
    } else {
      // defineProperty keeps names such as "__proto__" as ordinary keys.
      Object.defineProperty(byCategory, r.category, { value: r.amount, writable: true, enumerable: true, configurable: true });
    }
  }
  return { count: rows.length, quantity, revenue, byCategory };
}

/** Sort rows by amount ('asc' | 'desc'); ties keep their original order. */
export function sortByAmount(rows, direction = 'desc') {
  const sign = direction === 'asc' ? 1 : -1;
  return rows
    .map((row, i) => ({ row, i }))
    .sort((a, b) => (a.row.amount - b.row.amount) * sign || a.i - b.i)
    .map((x) => x.row);
}

function escapeField(value) {
  const s = String(value);
  return /[",\r\n]/.test(s) ? `"${s.replace(/"/g, '""')}"` : s;
}

/** Serialize rows to CSV (header + 5 columns, CRLF line endings). */
export function toSalesCSV(rows) {
  const lines = [COLUMNS.join(',')];
  for (const r of rows) {
    lines.push([r.date, r.category, r.product, r.quantity, r.unitPrice].map(escapeField).join(','));
  }
  return lines.join('\r\n') + '\r\n';
}
