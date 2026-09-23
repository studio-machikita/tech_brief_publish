(() => {
  'use strict';
  const {parseSalesCSV,filterSales,summarizeSales,toSalesCSV,isValidDate} = window.SalesCore;
  const $ = id => document.getElementById(id);
  const number = value => value.toLocaleString('ja-JP');
  const yen = value => `¥${number(value)}`;
  let rows = [], visible = [], descending = true, loadVersion = 0;
  const controls = ['filter-from','filter-to','filter-category','filter-query'];
  function node(tag, text, className) {
    const el = document.createElement(tag);
    if (text !== undefined) el.textContent = text;
    if (className) el.className = className;
    return el;
  }
  function displayErrors(errors) {
    const box = $('errors'); box.replaceChildren(); box.hidden = errors.length === 0;
    if (!errors.length) return;
    box.append(node('strong',errors.some(e => e.fatal) ? 'CSVを読み込めませんでした' : `${errors.length}行を集計から除外しました`));
    const list = node('ul');
    for (const error of errors) list.append(node('li',error.message));
    box.append(list);
  }
  function reset() { controls.forEach(id => $(id).value = ''); }
  function load(text, name) {
    const parsed = parseSalesCSV(text); rows = parsed.rows;
    reset(); descending = true;
    $('source-name').textContent = `${name} · 有効 ${number(rows.length)}件`;
    const dates = rows.map(r => r.date).sort();
    $('data-range').textContent = dates.length ? `${dates[0]} 〜 ${dates.at(-1)}` : '有効なデータがありません';
    const select = $('filter-category'); select.replaceChildren(new Option('すべてのカテゴリ',''));
    [...new Set(rows.map(r => r.category))].sort((a,b) => a.localeCompare(b,'ja')).forEach(c => select.add(new Option(c,c)));
    displayErrors(parsed.errors); render();
  }
  function render() {
    const [from,to,category,query] = controls.map(id => $(id).value);
    const invalid = (from && !isValidDate(from)) || (to && !isValidDate(to)) || (from && to && from > to);
    $('filter-error').hidden = !invalid;
    $('filter-error').textContent = invalid ? '期間を確認してください。開始日は終了日以前の実在する日付で指定してください。' : '';
    visible = invalid ? [] : filterSales(rows,{from,to,category,query});
    visible.sort((a,b) => descending ? b.amount-a.amount : a.amount-b.amount);
    const totals = summarizeSales(visible);
    $('metric-count').textContent = number(totals.count);
    $('metric-quantity').textContent = number(totals.quantity);
    $('metric-revenue').textContent = number(totals.revenue);
    const chart = $('category-chart'); chart.replaceChildren();
    const groups = Object.entries(totals.byCategory).sort((a,b) => a[1] === b[1] ? a[0].localeCompare(b[0],'ja') : a[1] > b[1] ? -1 : 1);
    const max = groups.length ? BigInt(groups[0][1]) : 0n;
    groups.forEach(([category,amount]) => {
      const row = node('div',undefined,'chart-row');
      const track = node('div',undefined,'chart-track'); track.setAttribute('aria-hidden','true');
      const bar = node('div',undefined,'chart-bar');
      bar.style.width = `${max ? Number(BigInt(amount)*10000n/max)/100 : 0}%`;
      track.append(bar); row.append(node('span',category,'chart-label'),track,node('span',yen(amount),'chart-value')); chart.append(row);
    });
    if (!groups.length) chart.append(node('p','該当するカテゴリがありません。','muted'));
    const tbody = $('sales-table').tBodies[0]; tbody.replaceChildren();
    const fragment = document.createDocumentFragment();
    visible.forEach(r => {
      const tr = node('tr'); tr.append(node('td',r.date));
      const cat = node('td'); cat.append(node('span',r.category,'category-pill')); tr.append(cat);
      tr.append(node('td',r.product),node('td',number(r.quantity),'number'),node('td',yen(r.unitPrice),'number'),node('td',yen(r.amount),'number')); fragment.append(tr);
    });
    tbody.append(fragment);
    $('empty-state').hidden = visible.length > 0;
    $('sort-amount').textContent = `売上金額 ${descending ? '↓' : '↑'}`;
    $('sort-amount').setAttribute('aria-label',`売上金額の${descending ? '降順。昇順に切り替え' : '昇順。降順に切り替え'}`);
    $('amount-header').setAttribute('aria-sort',descending ? 'descending':'ascending');
  }
  controls.forEach(id => { $(id).addEventListener('input',render); $(id).addEventListener('change',render); });
  $('reset-filters').addEventListener('click',() => {reset();render();});
  $('sort-amount').addEventListener('click',() => {descending = !descending;render();});
  $('load-sample').addEventListener('click',() => {loadVersion++;$('csv-file').value='';load(window.SALES_SAMPLE,'sales-sample.csv');});
  $('csv-file').addEventListener('change',async event => {
    const file = event.target.files[0]; if (!file) return;
    const version = ++loadVersion;
    try {const text = await file.text(); if (version === loadVersion) load(text,file.name);}
    catch {if (version === loadVersion) {load('',file.name);displayErrors([{fatal:true,message:'ファイルを読み込めませんでした。ファイルを選び直してください。'}]);}}
    finally {if(version === loadVersion) event.target.value='';}
  });
  $('export-csv').addEventListener('click',() => {
    const blob = new Blob(['\uFEFF',toSalesCSV(visible)],{type:'text/csv;charset=utf-8'});
    const url = URL.createObjectURL(blob), a = node('a');
    a.href=url;a.download='sales-lens-export.csv';document.body.append(a);a.click();a.remove();setTimeout(() => URL.revokeObjectURL(url),1000);
  });
  load(window.SALES_SAMPLE,'sales-sample.csv');
})();
