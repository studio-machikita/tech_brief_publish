import * as THREE from 'three';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';
// CSS is loaded by the distribution HTML.

const sceneEl = document.querySelector('#scene');
const scene = new THREE.Scene();
scene.background = new THREE.Color(0x050812);
const camera = new THREE.PerspectiveCamera(45, 1, 0.1, 220);
camera.position.set(0, 13, 31);
const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: false, powerPreference: 'high-performance' });
renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 1.75));
renderer.outputColorSpace = THREE.SRGBColorSpace;
renderer.toneMapping = THREE.ACESFilmicToneMapping;
renderer.toneMappingExposure = 1.12;
sceneEl.appendChild(renderer.domElement);

const controls = new OrbitControls(camera, renderer.domElement);
controls.enableDamping = true; controls.dampingFactor = 0.055; controls.minDistance = 5; controls.maxDistance = 68; controls.target.set(0, 0, 0);
scene.add(new THREE.AmbientLight(0x8192c1, 0.15));

const sun = new THREE.Group(); scene.add(sun);
const sunMesh = new THREE.Mesh(new THREE.SphereGeometry(2.35, 48, 48), new THREE.MeshBasicMaterial({ color: 0xffc65c }));
sun.add(sunMesh);
const corona = new THREE.Mesh(new THREE.SphereGeometry(2.5, 36, 36), new THREE.MeshBasicMaterial({ color: 0xffa02e, transparent: true, opacity: 0.075, side: THREE.BackSide })); sun.add(corona);
const sunlight = new THREE.PointLight(0xffe0a1, 120, 105, 1.55); sunlight.position.set(0, 0, 0); scene.add(sunlight);
const sunGlow = new THREE.PointLight(0xff9530, 6, 15); sunGlow.position.set(0, 0, 0); scene.add(sunGlow);

const orbitRoot = new THREE.Group(); scene.add(orbitRoot);
const orbitRadius = 11.2;
const orbitLine = new THREE.LineLoop(new THREE.BufferGeometry().setFromPoints(Array.from({length: 240}, (_, i) => new THREE.Vector3(Math.cos(i / 240 * Math.PI * 2) * orbitRadius, 0, Math.sin(i / 240 * Math.PI * 2) * orbitRadius))), new THREE.LineBasicMaterial({ color: 0x5f719d, transparent: true, opacity: 0.35 })); orbitRoot.add(orbitLine);
const tiltGuide = new THREE.Mesh(new THREE.RingGeometry(10.75, 11.65, 100), new THREE.MeshBasicMaterial({ color: 0x8192bf, transparent: true, opacity: 0.035, side: THREE.DoubleSide })); tiltGuide.rotation.x = -Math.PI / 2; orbitRoot.add(tiltGuide);

const earthOrbit = new THREE.Group(); orbitRoot.add(earthOrbit);
const earthPivot = new THREE.Group(); earthOrbit.add(earthPivot);
const earthAxis = new THREE.Group(); earthAxis.rotation.z = THREE.MathUtils.degToRad(23.5); earthPivot.add(earthAxis);
const earthMat = new THREE.MeshStandardMaterial({ color: 0x4b95df, roughness: 0.82, metalness: 0.03, emissive: 0x071525, emissiveIntensity: 0.14 });
const earth = new THREE.Mesh(new THREE.SphereGeometry(0.82, 48, 48), earthMat); earthAxis.add(earth);
const cloudBand = new THREE.Mesh(new THREE.SphereGeometry(0.835, 32, 28), new THREE.MeshStandardMaterial({ color: 0x9ccced, roughness: 1, transparent: true, opacity: 0.15 })); earthAxis.add(cloudBand);
const axisLine = new THREE.Line(new THREE.BufferGeometry().setFromPoints([new THREE.Vector3(0,-1.48,0),new THREE.Vector3(0,1.48,0)]),new THREE.LineBasicMaterial({color:0xb8dcff,transparent:true,opacity:.62})); earthAxis.add(axisLine);
const moonOrbitTilt = new THREE.Group(); moonOrbitTilt.rotation.x = THREE.MathUtils.degToRad(18); earthPivot.add(moonOrbitTilt);
const moonOrbitRadius = 2.55;
const moonLine = new THREE.LineLoop(new THREE.BufferGeometry().setFromPoints(Array.from({length: 160}, (_, i) => new THREE.Vector3(Math.cos(i / 160 * Math.PI * 2) * moonOrbitRadius, 0, Math.sin(i / 160 * Math.PI * 2) * moonOrbitRadius))), new THREE.LineBasicMaterial({ color: 0xb0bad5, transparent: true, opacity: 0.32 })); moonOrbitTilt.add(moonLine);
const moonOrbitGuide = new THREE.Mesh(new THREE.RingGeometry(2.42, 2.68, 96), new THREE.MeshBasicMaterial({ color: 0xa9b8e0, transparent: true, opacity: 0.025, side: THREE.DoubleSide })); moonOrbitGuide.rotation.x = -Math.PI / 2; moonOrbitTilt.add(moonOrbitGuide);
const moonPivot = new THREE.Group(); moonOrbitTilt.add(moonPivot);
const moon = new THREE.Mesh(new THREE.SphereGeometry(0.28, 32, 32), new THREE.MeshStandardMaterial({ color: 0xc3c5c6, roughness: 0.97, metalness: 0, emissive: 0x111111, emissiveIntensity: 0.12 })); moon.position.x = moonOrbitRadius; moonPivot.add(moon);

const starGroup = new THREE.Group(); scene.add(starGroup);
let seed = 624817; const rand = () => { seed = (seed * 1664525 + 1013904223) >>> 0; return seed / 4294967296; };
const starPositions = [], starColors = [], starSizes = [];
for (let i = 0; i < 1250; i++) { const u = rand()*2-1, a = rand()*Math.PI*2, r = 52 + rand()*42, k = Math.sqrt(1-u*u); starPositions.push(r*k*Math.cos(a), r*u, r*k*Math.sin(a)); const warm = rand(); starColors.push(warm > .82 ? 1 : .66 + rand()*.28, warm > .82 ? .76 + rand()*.18 : .76 + rand()*.22, warm > .82 ? .5 + rand()*.15 : 1); starSizes.push(0.65 + rand()*1.8); }
const starGeo = new THREE.BufferGeometry(); starGeo.setAttribute('position',new THREE.Float32BufferAttribute(starPositions,3)); starGeo.setAttribute('color',new THREE.Float32BufferAttribute(starColors,3)); starGeo.setAttribute('size',new THREE.Float32BufferAttribute(starSizes,1));
const stars = new THREE.Points(starGeo,new THREE.PointsMaterial({size:.12, sizeAttenuation:true, vertexColors:true, transparent:true, opacity:.9, depthWrite:false})); starGroup.add(stars);
const dustGeo = new THREE.BufferGeometry(); const dustPositions=[]; for(let i=0;i<180;i++){let u=rand()*2-1,a=rand()*Math.PI*2,r=44+rand()*35,k=Math.sqrt(1-u*u);dustPositions.push(r*k*Math.cos(a),r*u,r*k*Math.sin(a));} dustGeo.setAttribute('position',new THREE.Float32BufferAttribute(dustPositions,3)); starGroup.add(new THREE.Points(dustGeo,new THREE.PointsMaterial({color:0x526793,size:.035,transparent:true,opacity:.46})));

const bodies = {
  sun: { label:'太陽', kicker:'STAR · G2V', diameter:'約 139 万 km', period:'約 25 日', color:'#ffc35a', description:'太陽系の中心にある恒星。自ら光と熱を放ち、その重力が惑星たちの軌道を保っています。地球から届く光が、昼と夜をつくります。', object:sunMesh, distance:8 },
  earth: { label:'地球', kicker:'PLANET · 3RD ORBIT', diameter:'約 12,742 km', period:'23 時間 56 分', color:'#579ce8', description:'液体の水と生命が存在する、私たちの惑星。地軸を約 23.5°傾けて自転しながら、約 365 日で太陽を一周します。', object:earth, distance:5.3 },
  moon: { label:'月', kicker:'SATELLITE · LUNA', diameter:'約 3,475 km', period:'約 27.3 日', color:'#c3c8d0', description:'地球の唯一の天然衛星。地球のまわりを公転しながら、潮の満ち引きや夜空の景色に影響を与えています。', object:moon, distance:3.7 }
};
let selected='earth', paused=false, showOrbits=true, simDays=0, dayRate=14;
const raycaster = new THREE.Raycaster(); raycaster.params.Points.threshold=.4; const pointer=new THREE.Vector2(); const pickables=[sunMesh,earth,moon];
function selectBody(key){selected=key; const b=bodies[key]; document.querySelector('#bodyIndex').textContent=`0${Object.keys(bodies).indexOf(key)+1} / CELESTIAL BODY`; document.querySelector('#bodyKicker').textContent=b.kicker; document.querySelector('#bodyName').textContent=b.label; document.querySelector('#bodyDescription').textContent=b.description; document.querySelector('#bodyDiameter').textContent=b.diameter; document.querySelector('#bodyPeriod').textContent=b.period; document.querySelector('#bodySwatch').style.background=b.color; document.querySelector('#infoCard').classList.remove('is-hidden'); document.querySelectorAll('.focus-button').forEach(x=>x.classList.toggle('active',x.dataset.focus===key)); }
function focusBody(key){ selectBody(key); const pos=new THREE.Vector3(); bodies[key].object.getWorldPosition(pos); const offset=new THREE.Vector3(0,1,bodies[key].distance); const target=pos.clone().add(offset); camera.position.copy(target.clone().add(new THREE.Vector3(0,bodies[key].distance*.36,bodies[key].distance*2.2))); controls.target.copy(target); controls.update(); }
selectBody('earth');
renderer.domElement.addEventListener('pointerdown', event=>{const rect=renderer.domElement.getBoundingClientRect();pointer.x=(event.clientX-rect.left)/rect.width*2-1;pointer.y=-(event.clientY-rect.top)/rect.height*2+1;raycaster.setFromCamera(pointer,camera);const hit=raycaster.intersectObjects(pickables,false)[0];if(hit){const key=Object.keys(bodies).find(k=>bodies[k].object===hit.object);if(key)selectBody(key);}});
document.querySelector('#closeCard').addEventListener('click',()=>document.querySelector('#infoCard').classList.add('is-hidden'));
document.querySelector('#focusSelected').addEventListener('click',()=>focusBody(selected));
document.querySelectorAll('[data-focus]').forEach(x=>x.addEventListener('click',()=>focusBody(x.dataset.focus)));
document.querySelector('#speedSlider').addEventListener('input',event=>{dayRate=Number(event.target.value);document.querySelector('#speedValue').innerHTML=`${dayRate.toFixed(1)}<span>×</span>`;});
function setPaused(value){paused=value;document.querySelector('#playButton').setAttribute('aria-label',paused?'再生':'一時停止');document.querySelector('.play-label').textContent=paused?'再生':'一時停止';document.querySelector('.pause-icon').classList.toggle('playing',paused);}
document.querySelector('#playButton').addEventListener('click',()=>setPaused(!paused));
document.querySelector('#orbitToggle').addEventListener('click',event=>{showOrbits=!showOrbits;event.currentTarget.classList.toggle('active',showOrbits);event.currentTarget.setAttribute('aria-pressed',String(showOrbits));orbitLine.visible=showOrbits;moonLine.visible=showOrbits;tiltGuide.visible=showOrbits;moonOrbitGuide.visible=showOrbits;});
function reset(){simDays=0;earthOrbit.rotation.y=0;earthAxis.rotation.z=THREE.MathUtils.degToRad(23.5);moonPivot.rotation.y=0;document.querySelector('#speedSlider').value='1';dayRate=14;document.querySelector('#speedValue').innerHTML='1.0<span>×</span>';setPaused(false);showOrbits=true;document.querySelector('#orbitToggle').classList.add('active');document.querySelector('#orbitToggle').setAttribute('aria-pressed','true');orbitLine.visible=moonLine.visible=tiltGuide.visible=moonOrbitGuide.visible=true;camera.position.set(0,13,31);controls.target.set(0,0,0);controls.update();selectBody('earth');}
document.querySelector('#resetButton').addEventListener('click',reset);document.querySelector('#resetTop').addEventListener('click',reset);
window.addEventListener('keydown',event=>{if(event.code==='Space'&& !['INPUT','BUTTON'].includes(document.activeElement.tagName)){event.preventDefault();setPaused(!paused);}if((event.key==='r'||event.key==='R')&&!['INPUT'].includes(document.activeElement.tagName))reset();});
const clock=new THREE.Clock(); let elapsed=0;
function animate(){requestAnimationFrame(animate);const delta=Math.min(clock.getDelta(),.05);if(!paused){const days=delta*dayRate;simDays+=days;earthOrbit.rotation.y+=days*.0215;earthAxis.rotation.y+=days*.28;moonPivot.rotation.y+=days*.23;sunMesh.rotation.y+=delta*.055;cloudBand.rotation.y+=delta*.12;}elapsed+=delta;stars.rotation.y=Math.sin(elapsed*.018)*.012;controls.update();document.querySelector('#simTime').innerHTML=`DAY <span>${String(Math.floor(simDays)+1).padStart(3,'0')}</span>`;document.querySelector('#rotationReadout').innerHTML=`${((earthAxis.rotation.y%(Math.PI*2))*180/Math.PI+360)%360|0}<span>°</span>`;renderer.render(scene,camera);}
function resize(){const w=sceneEl.clientWidth,h=sceneEl.clientHeight;if(!w||!h)return;camera.aspect=w/h;camera.updateProjectionMatrix();renderer.setPixelRatio(Math.min(window.devicePixelRatio||1,1.75));renderer.setSize(w,h,false);}
window.addEventListener('resize',resize);new ResizeObserver(resize).observe(sceneEl);resize();animate();
