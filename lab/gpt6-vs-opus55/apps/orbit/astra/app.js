import * as THREE from 'three';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';
const $=s=>document.querySelector(s), viewport=$('#viewport'), notice=$('#notice');
const data={
sun:{name:'太陽',en:'Sun',kicker:'THE STAR AT OUR CENTER',description:'太陽系の中心で輝く恒星。その光が地球と月の昼と夜をつくります。カメラを回し、光が届く側を観察してみましょう。',facts:[['分類','恒星'],['光の役割','点光源'],['モデル半径','2.3']],note:'太陽自身は発光し、地球と月は太陽の光を反射しています。'},
earth:{name:'地球',en:'Earth',kicker:'OUR BLUE PLANET',description:'太陽のまわりをめぐる、私たちの青い惑星。傾いた地軸を保ちながら自転し、海と陸に昼と夜が訪れます。',facts:[['地軸の傾き','23.4°'],['モデル公転周期','120 秒'],['モデル自転周期','12 秒'],['衛星','月']],note:'緑の線が地軸です。公転しても軸の向きを保ちながら、自転しています。'},
moon:{name:'月',en:'Moon',kicker:'OUR NEAREST NEIGHBOR',description:'地球のまわりをめぐる小さな衛星。クレーターに覆われた表面と、太陽に照らされる明るい半球を探してみましょう。',facts:[['軌道面の傾き','5.1°'],['モデル公転周期','18 秒'],['モデル半径','0.36']],note:'紫の面が月の軌道面。地球の公転面に対して5.1°傾いています。同じ側を地球に向けて公転します。'}};
const renderer=new THREE.WebGLRenderer({antialias:true,alpha:true,powerPreference:'high-performance'});
renderer.setPixelRatio(Math.min(devicePixelRatio,1.75));renderer.outputColorSpace=THREE.SRGBColorSpace;renderer.toneMapping=THREE.ACESFilmicToneMapping;renderer.toneMappingExposure=1.12;
viewport.prepend(renderer.domElement);renderer.domElement.setAttribute('aria-label','ドラッグで回転、スクロールやピンチでズーム、天体をタップして選択');
let contextLost=false;
renderer.domElement.addEventListener('webglcontextlost',e=>{e.preventDefault();contextLost=true;notice.hidden=false;notice.textContent='描画が中断されました。ページを再読み込みしてください。';});
const scene=new THREE.Scene(), camera=new THREE.PerspectiveCamera(43,1,.1,600);
const controls=new OrbitControls(camera,renderer.domElement);controls.enableDamping=true;controls.dampingFactor=.07;controls.enablePan=false;controls.minDistance=1.2;controls.maxDistance=90;
scene.add(new THREE.AmbientLight(0x7898bf,.13));scene.add(new THREE.PointLight(0xfff1d9,190,0,1.55));
function seeded(seed){return()=>{seed|=0;seed=seed+0x6D2B79F5|0;let t=Math.imul(seed^seed>>>15,1|seed);t=t+Math.imul(t^t>>>7,61|t)^t;return((t^t>>>14)>>>0)/4294967296;};}
const random=seeded(20260923), stars=[], starColors=[];
for(let i=0;i<2100;i++){const y=random()*2-1,a=random()*Math.PI*2,r=100+random()*120,s=Math.sqrt(1-y*y);stars.push(r*s*Math.cos(a),r*y,r*s*Math.sin(a));const c=new THREE.Color().setHSL(.55+random()*.12,.2,.5+random()*.45);starColors.push(c.r,c.g,c.b);}
const starGeometry=new THREE.BufferGeometry();starGeometry.setAttribute('position',new THREE.Float32BufferAttribute(stars,3));starGeometry.setAttribute('color',new THREE.Float32BufferAttribute(starColors,3));scene.add(new THREE.Points(starGeometry,new THREE.PointsMaterial({size:.18,vertexColors:true,transparent:true,opacity:.8})));
function sphere(radius,kind){
const g=new THREE.SphereGeometry(radius,128,80),p=g.attributes.position,colors=[],v=new THREE.Vector3(),c=new THREE.Color(),cr=seeded(891);
const craters=Array.from({length:32},()=>({n:new THREE.Vector3(cr()*2-1,cr()*2-1,cr()*2-1).normalize(),r:.045+cr()*.15}));
for(let i=0;i<p.count;i++){v.fromBufferAttribute(p,i).normalize();const{x,y,z}=v,n=Math.sin(x*11+z*7)*Math.cos(y*13-z*3)+.45*Math.sin(x*23+y*17)*Math.cos(z*19)+.2*Math.sin(z*47+y*41);
if(kind==='earth'){const land=Math.sin(x*4+z*2.3)+Math.sin(z*5-y*3)+.6*Math.cos(y*8+x*3)+n*.28;
if(Math.abs(y)>.91+n*.022)c.set('#d9e9ed');else if(land>.65)c.setHSL(.28+n*.025,.29,.24+n*.035);else c.setHSL(.565+n*.01,.67,.24+n*.023);
const cloud=Math.sin(x*21+y*15+Math.sin(z*8))*Math.cos(z*13-y*18);if(cloud>.69&&Math.abs(y)<.9)c.lerp(new THREE.Color('#dae8e9'),(cloud-.69)*1.3);
}else if(kind==='moon'){let depth=0,rim=0;for(const crater of craters){const d=v.distanceTo(crater.n)/crater.r;if(d<1)depth+=.018*(1-d*d);if(d>.8&&d<1.15)rim+=.009*Math.sin((d-.8)/.35*Math.PI);}p.setXYZ(i,x*radius*(1-depth+rim),y*radius*(1-depth+rim),z*radius*(1-depth+rim));c.setHSL(.1,.04,.42+n*.045-depth*3+rim*4);
}else c.setHSL(.07+n*.01,.87,.57+n*.055);colors.push(c.r,c.g,c.b);}
g.setAttribute('color',new THREE.Float32BufferAttribute(colors,3));g.computeVertexNormals();return new THREE.Mesh(g,kind==='sun'?new THREE.MeshBasicMaterial({vertexColors:true}):new THREE.MeshStandardMaterial({vertexColors:true,roughness:kind==='earth'?.78:1}));}
const sun=sphere(2.3,'sun');scene.add(sun);
const halo=new THREE.Mesh(new THREE.SphereGeometry(2.5,48,32),new THREE.ShaderMaterial({transparent:true,depthWrite:false,blending:THREE.AdditiveBlending,side:THREE.BackSide,vertexShader:'varying vec3 n;varying vec3 v;void main(){vec4 p=modelViewMatrix*vec4(position,1.0);n=normalize(normalMatrix*normal);v=normalize(-p.xyz);gl_Position=projectionMatrix*p;}',fragmentShader:'varying vec3 n;varying vec3 v;void main(){float f=pow(1.0-abs(dot(normalize(n),normalize(v))),3.0);gl_FragColor=vec4(1.0,0.45,0.12,f*0.5);}'}));scene.add(halo);
const earthSystem=new THREE.Group();scene.add(earthSystem);const earthTilt=new THREE.Group();earthTilt.rotation.z=THREE.MathUtils.degToRad(-23.4);earthSystem.add(earthTilt);const earth=sphere(.95,'earth');earthTilt.add(earth);
const axis=new THREE.Line(new THREE.BufferGeometry().setFromPoints([new THREE.Vector3(0,-1.6,0),new THREE.Vector3(0,1.6,0)]),new THREE.LineBasicMaterial({color:0xbce6cb}));earthTilt.add(axis);
const moonPlane=new THREE.Group();moonPlane.rotation.z=THREE.MathUtils.degToRad(5.1);earthSystem.add(moonPlane);const moon=sphere(.36,'moon');moonPlane.add(moon);
function orbit(r,color){return new THREE.LineLoop(new THREE.BufferGeometry().setFromPoints(Array.from({length:256},(_,i)=>{const a=i/256*Math.PI*2;return new THREE.Vector3(Math.cos(a)*r,0,Math.sin(a)*r);})),new THREE.LineBasicMaterial({color,transparent:true,opacity:.55}));}
function plane(r,color,opacity){const m=new THREE.Mesh(new THREE.CircleGeometry(r,128),new THREE.MeshBasicMaterial({color,transparent:true,opacity,side:THREE.DoubleSide,depthWrite:false}));m.rotation.x=-Math.PI/2;return m;}
const earthOrbit=orbit(9.5,0x668d9e),earthPlane=plane(9.5,0x5d849d,.025);scene.add(earthOrbit,earthPlane);
const moonOrbit=orbit(2.2,0xb6a1d5),moonDisk=plane(2.2,0x9f87ca,.08),reference=orbit(2.2,0x668d9e);moonPlane.add(moonOrbit,moonDisk);earthSystem.add(reference);reference.material.opacity=.23;
const bodies={sun,earth,moon},positions={sun:new THREE.Vector3(),earth:new THREE.Vector3(),moon:new THREE.Vector3()};Object.entries(bodies).forEach(([key,m])=>m.userData.body=key);
const selection=new THREE.Mesh(new THREE.RingGeometry(1.16,1.18,96),new THREE.MeshBasicMaterial({color:0xb9ebd6,transparent:true,opacity:.55,depthWrite:false,side:THREE.DoubleSide}));scene.add(selection);
let selected='earth',running=true,speed=1,simulation=0,following=null,transition=null;
function select(key){selected=key;const d=data[key];document.querySelectorAll('[data-select]').forEach(b=>b.setAttribute('aria-pressed',String(b.dataset.select===key)));$('#body-title').innerHTML=d.name+' <span>'+d.en+'</span>';$('#body-kicker').textContent=d.kicker;$('#body-description').textContent=d.description;$('#body-note').textContent=d.note;$('#body-facts').innerHTML=d.facts.map(([k,v])=>'<div><dt>'+k+'</dt><dd>'+v+'</dd></div>').join('');$('#focus').innerHTML=d.name+'に近づく <span>↗</span>';document.querySelectorAll('[data-body]').forEach(l=>l.classList.toggle('selected',l.dataset.body===key));}
function setRunning(value){running=value;$('#play').innerHTML=running?'Ⅱ <span>一時停止</span>':'▶ <span>再生</span>';$('#play').setAttribute('aria-label',running?'シミュレーションを停止':'シミュレーションを再生');}
function updateBodies(){const a=.2+simulation*Math.PI*2/120;earthSystem.position.set(Math.cos(a)*9.5,0,Math.sin(a)*9.5);earth.rotation.y=simulation*Math.PI*2/12;sun.rotation.y=simulation*.06;const m=1.05+simulation*Math.PI*2/18;moon.position.set(Math.cos(m)*2.2,0,Math.sin(m)*2.2);moon.rotation.y=-m;scene.updateMatrixWorld(true);for(const key in bodies)bodies[key].getWorldPosition(positions[key]);}
function setOrbits(v){[earthOrbit,earthPlane,moonOrbit,moonDisk,reference,axis].forEach(o=>o.visible=v);}
function reset(){simulation=0;speed=1;following=null;transition=null;$('#speed').value=1;$('#speed-value').textContent='1.0×';$('#orbits').checked=true;setOrbits(true);setRunning(true);select('earth');updateBodies();controls.reset();camera.position.set(18,17,27);controls.target.set(1,0,0);controls.update();}
document.querySelectorAll('[data-select]').forEach(b=>b.addEventListener('click',()=>select(b.dataset.select)));
$('#play').addEventListener('click',()=>setRunning(!running));$('#reset').addEventListener('click',reset);$('#speed').addEventListener('input',e=>{speed=Number(e.target.value);$('#speed-value').textContent=speed.toFixed(1)+'×';});$('#orbits').addEventListener('change',e=>setOrbits(e.target.checked));
$('#focus').addEventListener('click',()=>{following=selected;transition={time:0,from:camera.position.clone(),target:controls.target.clone(),offset:new THREE.Vector3(1,.65,1.5).normalize().multiplyScalar({sun:11,earth:5.7,moon:2.8}[selected])};});
controls.addEventListener('start',()=>{transition=null;});
window.addEventListener('keydown',e=>{if(e.target.closest('input,button,select,textarea,a')||e.ctrlKey||e.metaKey||e.altKey)return;if(e.code==='Space'){e.preventDefault();if(!e.repeat)setRunning(!running);}if(e.code==='KeyR'&&!e.repeat)reset();});
let down=null;const raycaster=new THREE.Raycaster();
renderer.domElement.addEventListener('pointerdown',e=>{down={x:e.clientX,y:e.clientY,id:e.pointerId};});
renderer.domElement.addEventListener('pointercancel',()=>down=null);
renderer.domElement.addEventListener('pointerup',e=>{if(!down||down.id!==e.pointerId||Math.hypot(e.clientX-down.x,e.clientY-down.y)>6){down=null;return;}down=null;const r=renderer.domElement.getBoundingClientRect();raycaster.setFromCamera(new THREE.Vector2((e.clientX-r.left)/r.width*2-1,-(e.clientY-r.top)/r.height*2+1),camera);const hit=raycaster.intersectObjects(Object.values(bodies));if(hit.length)select(hit[0].object.userData.body);});
function resize(){const{width,height}=viewport.getBoundingClientRect();camera.aspect=width/height;camera.updateProjectionMatrix();renderer.setPixelRatio(Math.min(devicePixelRatio,1.75));renderer.setSize(width,height);}
new ResizeObserver(resize).observe(viewport);window.addEventListener('resize',resize);resize();reset();controls.saveState();notice.hidden=true;
let last=performance.now(),lastDay='';const projected=new THREE.Vector3();document.addEventListener('visibilitychange',()=>last=performance.now());
function animate(now){requestAnimationFrame(animate);const dt=Math.min((now-last)/1000,.08);last=now;if(document.hidden||contextLost)return;const oldTarget=following?positions[following].clone():null;if(running)simulation+=dt*speed;updateBodies();
if(transition){transition.time+=dt;const t=Math.min(1,transition.time/.85),ease=t*t*(3-2*t);controls.target.lerpVectors(transition.target,positions[following],ease);camera.position.lerpVectors(transition.from,positions[following].clone().add(transition.offset),ease);if(t===1)transition=null;}else if(following){camera.position.add(positions[following].clone().sub(oldTarget));controls.target.copy(positions[following]);}
controls.update();selection.position.copy(positions[selected]);selection.quaternion.copy(camera.quaternion);selection.scale.setScalar({sun:2.25,earth:1,moon:.42}[selected]);
const rect=viewport.getBoundingClientRect();document.querySelectorAll('[data-body]').forEach(label=>{const key=label.dataset.body;projected.copy(positions[key]);projected.y+={sun:2.8,earth:1.5,moon:.65}[key];projected.project(camera);label.hidden=projected.z>1||projected.z< -1;label.style.transform='translate('+((projected.x*.5+.5)*rect.width)+'px,'+((-projected.y*.5+.5)*rect.height)+'px) translate(-50%,-100%)';});
const day='DAY '+(simulation/120*365.25).toFixed(1).padStart(5,'0');if(day!==lastDay){$('#elapsed').textContent=day;lastDay=day;}renderer.render(scene,camera);}
requestAnimationFrame(animate);

