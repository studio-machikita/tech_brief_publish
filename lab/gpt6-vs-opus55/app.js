(() => {
  'use strict';
  const data=window.LAB_DATA, ids=data.models.map(m=>m.id), params=new URLSearchParams(location.search);
  const valid=(value,values,fallback)=>values.includes(value)?value:fallback;
  const state={task:valid(params.get('task'),['orbit','sales'],'orbit'),view:valid(params.get('view'),['gallery','single','split'],'gallery'),left:valid(params.get('left'),ids,'astra'),right:valid(params.get('right'),ids,'opus'),device:valid(params.get('device'),['desktop','mobile'],matchMedia('(max-width:600px)').matches?'mobile':'desktop'),metric:valid(params.get('metric'),['total','api_usd'],'api_usd')};
  if(state.left===state.right)state.right=ids.find(id=>id!==state.left);
  const $=id=>document.getElementById(id), fmt=n=>Number(n).toLocaleString('ja-JP'), esc=s=>String(s).replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
  const model=id=>data.models.find(m=>m.id===id), row=id=>data.tasks[state.task].models[id];
  const time=ms=>{const n=Math.round(ms/1000);return `${Math.floor(n/60)}:${String(n%60).padStart(2,'0')}`;};
  const yen=n=>`¥${n.toLocaleString('ja-JP',{minimumFractionDigits:2,maximumFractionDigits:2})}`;
  const short=n=>n>=1e6?(n/1e6).toFixed(2)+'M':(n/1000).toFixed(1)+'K';
  let observers=[], pendingFrames=[], lastImageTrigger;
  function syncURL(){const url=new URL(location.href);for(const [key,value] of Object.entries(state))url.searchParams.set(key,value);history.replaceState(null,'',url);}
  function announce(text){$('announcement').textContent=text;}
  function clearFrames(){observers.forEach(o=>o.disconnect());observers=[];pendingFrames.forEach(clearTimeout);pendingFrames=[];$('live-panels').replaceChildren();}
  function renderGallery(){
    $('gallery').innerHTML=data.models.map((m,i)=>{const r=row(m.id);return `<article class="model-card" style="--model-color:${m.color}"><div class="card-top"><div class="card-model"><i class="dot" aria-hidden="true"></i>${esc(m.key)}</div><span class="card-number">0${i+1} / 04</span></div><button class="thumbnail-button" data-image="${m.id}" aria-label="${esc(m.label)}の${data.tasks[state.task].title}のスクリーンショットを拡大"><img src="${r.desktop}" alt="${esc(m.label)}が制作した${data.tasks[state.task].title}の画面" loading="lazy" decoding="async" width="1440" height="1000"><span class="image-hint" aria-hidden="true">拡大 ↗</span></button><div class="card-content"><span class="quality-badge ${r.attention?'attention':''}">${r.attention?'△':'✓'} ${esc(r.status)}</span><p class="card-description">${esc(r.blurb)}</p><div class="card-stats"><div><span>総トークン</span><strong title="${fmt(r.total)}トークン">${short(r.total)}<small>tokens</small></strong></div><div><span>所要時間</span><strong>${time(r.duration_ms)}<small>分:秒</small></strong></div></div><div class="card-actions"><button class="open-live" data-open="${m.id}">作品を操作する <span aria-hidden="true">→</span></button><a class="standalone" href="${r.url}" target="_blank" rel="noopener" aria-label="${esc(m.label)}の作品を別タブで開く">↗</a></div></div></article>`;}).join('');
  }
  function renderPanels(){
    clearFrames();const slots=state.view==='split'?['left','right']:['left'];$('live-panels').classList.toggle('split',slots.length===2);
    $('viewport-hint').textContent=state.device==='desktop'?'1440 × 1000':'390 × 844';
    for(const slot of slots){const id=state[slot],m=model(id),r=row(id),panel=document.createElement('article');panel.className='live-panel';panel.style.setProperty('--model-color',m.color);
      panel.innerHTML=`<div class="live-panel-top"><label class="model-picker"><i class="dot" aria-hidden="true"></i><span class="sr-only">${slot==='left'?'左側':'右側'}のモデル</span><select data-slot="${slot}">${data.models.map(o=>`<option value="${o.id}" ${o.id===id?'selected':''}>${esc(o.label)}</option>`).join('')}</select></label><div class="panel-links"><button data-reload="${slot}" aria-label="${esc(m.label)}の作品を最初から開く">↻ 最初から</button><a href="${r.url}" target="_blank" rel="noopener">別タブで開く ↗</a></div></div><div class="frame-well"><div class="frame-stage"><div class="frame-loading">作品を読み込んでいます…</div></div></div><p class="panel-note">${esc(r.note)}</p>`;
      $('live-panels').append(panel);const well=panel.querySelector('.frame-well'),stage=panel.querySelector('.frame-stage'),iframe=document.createElement('iframe');
      const w=state.device==='desktop'?1440:390,h=state.device==='desktop'?1000:844;
      iframe.title=`${m.label} — ${data.tasks[state.task].title}（${state.device==='desktop'?'デスクトップ':'スマートフォン'}）`;
      iframe.width=w;iframe.height=h;iframe.style.width=w+'px';iframe.style.height=h+'px';iframe.dataset.slot=slot;iframe.setAttribute('sandbox','allow-scripts allow-same-origin allow-downloads');iframe.referrerPolicy='no-referrer';iframe.addEventListener('load',()=>{const loader=stage.querySelector('.frame-loading');if(loader)loader.remove();});
      stage.append(iframe);
      const size=()=>{const styles=getComputedStyle(well),available=well.clientWidth-parseFloat(styles.paddingLeft)-parseFloat(styles.paddingRight);if(available<=0)return;const scale=Math.min(1,available/w);stage.style.width=w*scale+'px';stage.style.height=h*scale+'px';iframe.style.transform=`scale(${scale})`;};
      const observer=new ResizeObserver(size);observer.observe(well);observers.push(observer);size();
      // At most two live contexts. Delay the second a little to avoid a GPU startup spike.
      pendingFrames.push(setTimeout(()=>{iframe.src=r.url;},slot==='right'?200:0));
    }
  }
  function renderMeasures(){
    const title=data.tasks[state.task].title;$('measurement-task').textContent=title.toUpperCase();$('table-caption').textContent=`${title}の4モデル実測比較`;
    const metricNames={total:'総トークン',api_usd:'API料金換算'};$('chart-title').textContent=metricNames[state.metric];
    const chartRows=metric=>{const max=Math.max(...ids.map(id=>row(id)[metric]));return data.models.map(m=>{const r=row(m.id),value=metric==='total'?fmt(r.total):metric==='duration_ms'?time(r.duration_ms):`$${r.api_usd.toFixed(3)}`;return `<div class="chart-row" style="--model-color:${m.color}"><span class="chart-label">${esc(m.key)}</span><div class="chart-track" aria-hidden="true"><span class="chart-fill" style="width:${r[metric]/max*100}%"></span></div><span class="chart-value">${value}${metric==='duration_ms'?' <small>分:秒</small>':''}</span></div>`;}).join('');};
    $('metric-chart').innerHTML=chartRows(state.metric);
    $('time-chart').innerHTML=chartRows('duration_ms');
    $('chart-note').textContent=state.metric==='total'?'キャッシュ分を含む総入力＋出力。小さい値ほど高品質とは限りません。':'2026年9月23日確認の通常API単価。月額プランの実請求額ではありません。';
    $('measurement-rows').innerHTML=data.models.map(m=>{const r=row(m.id);return `<tr><td><span class="table-model"><i class="dot" style="--model-color:${m.color}" aria-hidden="true"></i>${esc(m.key)}</span></td><td><span class="quality-badge ${r.attention?'attention':''}">${esc(r.status)}</span></td><td class="numeric">${fmt(r.total)}</td><td class="numeric">${fmt(r.output)}</td><td class="numeric">${time(r.duration_ms)}</td><td class="numeric">${r.responses}</td><td class="numeric">$${r.api_usd.toFixed(3)}<span class="currency-sub">${yen(r.jpy)}</span></td></tr>`;}).join('');
    $('insight-title').textContent=state.task==='orbit'?'完成までの道のりも、作品の一部。':'速く完成しても、トークンは少なくない。';
    $('insight-text').textContent=state.task==='orbit'?'Opusは主要動作21項目を通過。Solより応答回数は少なくても、総トークンは多い結果でした。品質改善に加え、ブラウザー準備や権限対応の時間も含まれます。':'Opusは6分38秒で完成し、Astra・Solより短時間でした。一方、総トークンは4モデル中最多。確認した機能ではSolも正常で、API料金換算はより低くなりました。';
    document.querySelectorAll('[data-metric]').forEach(b=>b.setAttribute('aria-pressed',String(b.dataset.metric===state.metric)));
  }
  function renderView(){
    document.querySelectorAll('[data-view]').forEach(b=>b.setAttribute('aria-pressed',String(b.dataset.view===state.view)));
    document.querySelectorAll('[data-device]').forEach(b=>b.setAttribute('aria-pressed',String(b.dataset.device===state.device)));
    $('gallery').hidden=state.view!=='gallery';$('workbench').hidden=state.view==='gallery';
    if(state.view==='gallery')clearFrames();else renderPanels();syncURL();
  }
  function renderTask(){
    document.querySelectorAll('[data-prompt-task]').forEach(p=>{p.hidden=p.dataset.promptTask!==state.task;});
    $('earth-closeups').hidden=state.task!=='orbit';
    document.querySelectorAll('[data-task]').forEach(b=>{b.setAttribute('aria-selected',String(b.dataset.task===state.task));b.tabIndex=b.dataset.task===state.task?0:-1;});
    $('task-panel').setAttribute('aria-labelledby','tab-'+state.task);$('task-description').textContent=data.tasks[state.task].description;renderGallery();renderMeasures();renderView();
    document.title=`${data.tasks[state.task].title}｜GPT-6シリーズ × Claude Opus 5.5比較 — Tech News Radio Lab`;
  }
  document.addEventListener('click',event=>{
    const task=event.target.closest('[data-task]');if(task){state.task=task.dataset.task;renderTask();announce(`${data.tasks[state.task].title}の比較に切り替えました`);return;}
    const view=event.target.closest('[data-view]');if(view){state.view=view.dataset.view;renderView();announce(view.textContent+'に切り替えました');return;}
    const open=event.target.closest('[data-open]');if(open){state.left=open.dataset.open;if(state.right===state.left)state.right=ids.find(x=>x!==state.left);state.view='single';renderView();$('workbench').scrollIntoView({behavior:matchMedia('(prefers-reduced-motion:reduce)').matches?'instant':'smooth',block:'start'});document.querySelector('#live-panels select')?.focus({preventScroll:true});return;}
    const device=event.target.closest('[data-device]');if(device){state.device=device.dataset.device;renderView();announce('画面幅を切り替え、作品を初期状態で開きました');return;}
    const metric=event.target.closest('[data-metric]');if(metric){state.metric=metric.dataset.metric;renderMeasures();syncURL();return;}
    const reload=event.target.closest('[data-reload]');if(reload){const frame=document.querySelector(`iframe[data-slot="${reload.dataset.reload}"]`);if(frame)frame.src=row(state[reload.dataset.reload]).url;announce('作品を最初から開きました');return;}
    const earth=event.target.closest('[data-earth-image]');if(earth){const m=model(earth.dataset.earthImage);lastImageTrigger=earth;$('image-title').textContent=`${m.label} / 地球フォーカス`;$('expanded-image').src=`assets/screenshots/orbit-${m.id}-earth-closeup.png`;$('expanded-image').alt=`${m.label}で標準の地球フォーカスを操作した画面`;$('image-context').textContent=earth.closest('figure').querySelector('figcaption p').textContent;$('image-context').hidden=false;$('image-dialog').showModal();return;}
    const img=event.target.closest('[data-image]');if(img){$('image-context').hidden=true;const m=model(img.dataset.image),r=row(m.id);lastImageTrigger=img;$('image-title').textContent=`${m.label} / ${data.tasks[state.task].title}`;$('expanded-image').src=r.desktop;$('expanded-image').alt=`${m.label}の${data.tasks[state.task].title}、初回提出のスクリーンショット`;$('image-dialog').showModal();return;}
  });
  $('live-panels').addEventListener('change',event=>{const select=event.target.closest('[data-slot]');if(!select)return;const slot=select.dataset.slot,other=slot==='left'?'right':'left',old=state[slot];state[slot]=select.value;if(state[other]===state[slot])state[other]=old;renderView();const next=document.querySelector(`select[data-slot="${slot}"]`);next?.focus({preventScroll:true});announce('比較するモデルを変更しました');});
  document.querySelector('.task-tabs').addEventListener('keydown',event=>{if(!['ArrowLeft','ArrowRight','Home','End'].includes(event.key))return;event.preventDefault();state.task=event.key==='Home'?'orbit':event.key==='End'?'sales':state.task==='orbit'?'sales':'orbit';renderTask();$('tab-'+state.task).focus();});
  $('close-image').addEventListener('click',()=>$('image-dialog').close());$('image-dialog').addEventListener('click',event=>{if(event.target===$('image-dialog'))$('image-dialog').close();});$('image-dialog').addEventListener('close',()=>lastImageTrigger?.focus());
  window.addEventListener('pagehide',clearFrames);
  renderTask();
})();
