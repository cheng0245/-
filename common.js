// ===== 背景粒子网络 =====
const canvas=document.getElementById('bg-canvas');
const ctx=canvas.getContext('2d');
let particles=[];
function resizeCanvas(){
  canvas.width=window.innerWidth;
  canvas.height=window.innerHeight;
}
resizeCanvas();window.addEventListener('resize',resizeCanvas);

class Particle{
  constructor(){
    this.reset();
    this.y=Math.random()*canvas.height;
  }
  reset(){
    this.x=Math.random()*canvas.width;
    this.y=-10;
    this.size=Math.random()*2+0.5;
    this.speed=Math.random()*0.4+0.1;
    this.opacity=Math.random()*0.5+0.1;
    this.hue=Math.random()>0.5?220+Math.random()*40:280+Math.random()*30;
  }
  update(){
    this.y+=this.speed;
    if(this.y>canvas.height+10)this.reset();
  }
  draw(){
    ctx.beginPath();
    ctx.arc(this.x,this.y,this.size,0,Math.PI*2);
    ctx.fillStyle=hsla(,80%,65%,);
    ctx.fill();
  }
}
for(let i=0;i<100;i++){let p=new Particle();p.y=Math.random()*canvas.height;particles.push(p)}

function drawConnections(){
  for(let i=0;i<particles.length;i++){
    for(let j=i+1;j<particles.length;j++){
      let dx=particles[i].x-particles[j].x;
      let dy=particles[i].y-particles[j].y;
      let dist=Math.sqrt(dx*dx+dy*dy);
      if(dist<120){
        ctx.beginPath();
        ctx.moveTo(particles[i].x,particles[i].y);
        ctx.lineTo(particles[j].x,particles[j].y);
        ctx.strokeStyle=
gba(100,140,255,);
        ctx.lineWidth=0.5;
        ctx.stroke();
      }
    }
  }
}

function animateBg(){
  ctx.clearRect(0,0,canvas.width,canvas.height);
  particles.forEach(p=>{p.update();p.draw()});
  drawConnections();
  requestAnimationFrame(animateBg);
}
animateBg();
// ===== 实时时钟 =====
function updateTime(){
  const now=new Date();
  document.getElementById('liveTime').textContent=
    now.toLocaleString('zh-CN',{year:'numeric',month:'2-digit',day:'2-digit',
    hour:'2-digit',minute:'2-digit',second:'2-digit',hour12:false});
}
updateTime();setInterval(updateTime,1000);
// ===== 盈亏趋势图 =====
const profitData=[
  {label:'1月',value:620,positive:true},
  {label:'2月',value:580,positive:true},
  {label:'3月',value:710,positive:true},
  {label:'4月',value:540,positive:true},
  {label:'5月',value:390,positive:true},
  {label:'6月',value:480,positive:true},
  {label:'7月',value:670,positive:true},
  {label:'8月',value:720,positive:true},
  {label:'9月',value:560,positive:true},
  {label:'10月',value:850,positive:true},
  {label:'11月',value:920,positive:true},
  {label:'12月',value:1060,positive:true},
];
const maxVal=Math.max(...profitData.map(d=>d.value));
const profitChart=document.getElementById('profitChart');
const chartLabels=document.getElementById('chartLabels');
profitData.forEach(d=>{
  const bar=document.createElement('div');
  bar.className='chart-bar profit';
  bar.style.height=(d.value/maxVal*100)+'%';
  bar.title=d.label+': ¥'+d.value+'万';
  profitChart.appendChild(bar);
  const label=document.createElement('span');
  label.className='chart-label';
  label.textContent=d.label;
  chartLabels.appendChild(label);
});

// ===== 人员经济表格 =====
const deptData=[
  {rank:1,dept:'产品研发部',output:'¥128万',cost:'¥76万',roi:'1.68',top:true},
  {rank:2,dept:'市场运营部',output:'¥95万',cost:'¥62万',roi:'1.53',top:true},
  {rank:3,dept:'销售部',output:'¥82万',cost:'¥45万',roi:'1.82',top:true},
  {rank:4,dept:'客户成功部',output:'¥71万',cost:'¥48万',roi:'1.48',top:false},
  {rank:5,dept:'行政管理部',output:'¥53万',cost:'¥41万',roi:'1.29',top:false},
];
const deptTable=document.getElementById('deptTable');
deptData.forEach(d=>{
  const tr=document.createElement('tr');
  tr.innerHTML=
    <td><span class="rank-badge "></span></td>
    <td></td>
    <td></td>
    <td></td>
    <td class="val-profit"></td>;
  deptTable.appendChild(tr);
});
// ===== 效率走势图 =====
const effData=[
  {label:'1月',value:78},
  {label:'2月',value:75},
  {label:'3月',value:82},
  {label:'4月',value:80},
  {label:'5月',value:85},
  {label:'6月',value:88},
  {label:'7月',value:84},
  {label:'8月',value:90},
  {label:'9月',value:87},
  {label:'10月',value:92},
  {label:'11月',value:95},
  {label:'12月',value:97},
];
const effMax=100;
const effChart=document.getElementById('efficiencyChart');
const effLabels=document.getElementById('effLabels');
effData.forEach((d,i)=>{
  const bar=document.createElement('div');
  bar.className='chart-bar profit';
  const h=d.value/effMax*100;
  bar.style.height=h+'%';
  bar.style.background=i>=9
    ?'linear-gradient(180deg,var(--accent-cyan),rgba(0,229,255,0.2))'
    :i>=6
    ?'linear-gradient(180deg,var(--accent-blue),rgba(77,166,255,0.2))'
    :'linear-gradient(180deg,var(--accent-magenta),rgba(224,64,251,0.2))';
  bar.title=d.label+': 效率指数 '+d.value;
  effChart.appendChild(bar);
  const label=document.createElement('span');
  label.className='chart-label';
  label.textContent=d.label;
  effLabels.appendChild(label);
});

// ===== 部门雷达图 =====
const radarCanvas=document.getElementById("radarCanvas");
const rctx=radarCanvas.getContext("2d");
const w=340,h=340,cx=170,cy=170,r=130;
const dims=["产出效率","成本控制","团队协作","创新能力","客户满意","执行力"];
const currentVals=[82,68,75,90,72,85];
const targetVals=[95,85,88,95,85,92];
const industryVals=[70,72,68,65,70,67];
const n=dims.length;

function drawRadarBg(){
  rctx.strokeStyle="rgba(100,140,255,0.12)";
  rctx.fillStyle="rgba(100,140,255,0.03)";
  for(let level=1;level<=5;level++){
    rctx.beginPath();
    for(let i=0;i<n;i++){
      const angle=Math.PI*2/n*i-Math.PI/2;
      const lr=r*level/5;
      const x=cx+lr*Math.cos(angle),y=cy+lr*Math.sin(angle);
      i===0?rctx.moveTo(x,y):rctx.lineTo(x,y);
    }
    rctx.closePath();
    rctx.stroke();
    if(level===5)rctx.fill();
  }
  rctx.strokeStyle="rgba(100,140,255,0.2)";
  for(let i=0;i<n;i++){
    rctx.beginPath();
    rctx.moveTo(cx,cy);
    const angle=Math.PI*2/n*i-Math.PI/2;
    rctx.lineTo(cx+r*Math.cos(angle),cy+r*Math.sin(angle));
    rctx.stroke();
  }
  // labels
  rctx.fillStyle="#8892b0";rctx.font="11px 'Rajdhani','Microsoft YaHei',sans-serif";rctx.textAlign="center";
  for(let i=0;i<n;i++){
    const angle=Math.PI*2/n*i-Math.PI/2;
    const lx=cx+(r+24)*Math.cos(angle),ly=cy+(r+24)*Math.sin(angle)+3;
    rctx.fillText(dims[i],lx,ly);
  }
}

function drawRadarData(vals,color,fillColor,glow){
  rctx.beginPath();
  for(let i=0;i<n;i++){
    const angle=Math.PI*2/n*i-Math.PI/2;
    const lr=r*vals[i]/100;
    const x=cx+lr*Math.cos(angle),y=cy+lr*Math.sin(angle);
    i===0?rctx.moveTo(x,y):rctx.lineTo(x,y);
  }
  rctx.closePath();
  if(glow){rctx.shadowColor=color;rctx.shadowBlur=12}
  rctx.fillStyle=fillColor;rctx.fill();
  rctx.strokeStyle=color;rctx.lineWidth=2;rctx.stroke();
  rctx.shadowBlur=0;
  // dots
  for(let i=0;i<n;i++){
    const angle=Math.PI*2/n*i-Math.PI/2;
    const lr=r*vals[i]/100;
    rctx.beginPath();
    rctx.arc(cx+lr*Math.cos(angle),cy+lr*Math.sin(angle),4,0,Math.PI*2);
    rctx.fillStyle=color;rctx.fill();
  }
}

drawRadarBg();
drawRadarData(industryVals,"#5a6480","rgba(90,100,128,0.1)",false);
drawRadarData(currentVals,"#00e5ff","rgba(0,229,255,0.12)",true);
drawRadarData(targetVals,"#e040fb","rgba(224,64,251,0.1)",true);

// ===== 页面切换 =====
document.querySelectorAll('.nav-item[data-page]').forEach(item=>{
  item.addEventListener('click',function(){
    document.querySelectorAll('.nav-item').forEach(n=>n.classList.remove('active'));
    this.classList.add('active');
    document.querySelectorAll('.page').forEach(p=>p.classList.remove('active'));
    const target=document.getElementById('page-'+this.dataset.page);
    if(target)target.classList.add('active');
  });
});

// ===== 盈亏页图表 =====
(function(){
  const incomeData=[680,720,850,790,920,880,960,1020,890,1050,1100,1180];
  const costData=[520,550,580,560,600,590,620,640,610,650,660,680];
  const incomeChart=document.getElementById('incomeChart');
  const incomeLabels=document.getElementById('incomeLabels');
  if(incomeChart&&incomeLabels){
    const max=Math.max(...incomeData);
    const months=['1月','2月','3月','4月','5月','6月','7月','8月','9月','10月','11月','12月'];
    incomeData.forEach((v,i)=>{
      const bar=document.createElement('div');
      bar.className='chart-bar profit';
      bar.style.height=(v/max*100)+'%';
      bar.title=months[i]+': 收入 ¥'+v+'万';
      incomeChart.appendChild(bar);
      const label=document.createElement('span');
      label.className='chart-label';
      label.textContent=months[i];
      incomeLabels.appendChild(label);
    });
  }
})();

// ===== 趋势洞察页图表 =====
(function(){
  const t1=document.getElementById('trendChart1'),tl1=document.getElementById('trendLabels1');
  const t2=document.getElementById('trendChart2'),tl2=document.getElementById('trendLabels2');
  const t3=document.getElementById('trendChart3'),tl3=document.getElementById('trendLabels3');
  const months=['1月','2月','3月','4月','5月','6月','7月','8月','9月','10月','11月','12月'];
  if(t1&&tl1){
    const d1=[580,620,710,680,780,820,860,910,840,960,1020,1150];
    const mx=Math.max(...d1);
    d1.forEach((v,i)=>{
      const bar=document.createElement('div');bar.className='chart-bar profit';
      bar.style.height=(v/mx*100)+'%';bar.title=months[i]+': ¥'+v+'万';t1.appendChild(bar);
      const lb=document.createElement('span');lb.className='chart-label';lb.textContent=months[i];tl1.appendChild(lb);
    });
  }
  if(t2&&tl2){
    const d2=[72,75,78,76,82,85,84,88,86,91,93,96];
    const mx=100;
    d2.forEach((v,i)=>{
      const bar=document.createElement('div');bar.className='chart-bar profit';
      bar.style.background='linear-gradient(180deg,var(--accent-magenta),rgba(224,64,251,0.2))';
      bar.style.height=(v/mx*100)+'%';bar.title=months[i]+': 效率指数 '+v;t2.appendChild(bar);
      const lb=document.createElement('span');lb.className='chart-label';lb.textContent=months[i];tl2.appendChild(lb);
    });
  }
  if(t3&&tl3){
    const d3=[18,19,20,21,22,23,24,25,25,27,28,30];
    const mx=35;
    d3.forEach((v,i)=>{
      const bar=document.createElement('div');bar.className='chart-bar profit';
      bar.style.background='linear-gradient(180deg,var(--accent-gold),rgba(255,183,77,0.2))';
      bar.style.height=(v/mx*100)+'%';bar.title=months[i]+': 市占率 '+v+'%';t3.appendChild(bar);
      const lb=document.createElement('span');lb.className='chart-label';lb.textContent=months[i];tl3.appendChild(lb);
    });
  }
})();

// ===== 执行落地 =====
function toggleExecForm(e,formId){
  e.stopPropagation();
  const form=document.getElementById(formId);
  form.classList.toggle('show');
}
function submitTask(e,title,formId){
  e.stopPropagation();
  const form=document.getElementById(formId);
  const inputs=form.querySelectorAll('input,select');
  const person=inputs[0].value||'未指定';
  const date=inputs[1].value||'未指定';
  const priority=inputs[2].value||'中';
  // Add to track list
  const list=document.getElementById('execTaskList');
  const empty=list.querySelector('.exec-empty');
  if(empty)empty.remove();
  const statuses=['pending','progress','done'];
  const now=new Date().toLocaleDateString('zh-CN');
  const item=document.createElement('div');
  item.className='exec-task-item';
  item.innerHTML='<div class="exec-task-title">'+title+'</div><div class="exec-task-meta"><span>👤 '+person+'</span><span>📅 '+date+'</span><span>创建: '+now+'</span><span class="exec-task-status pending">待执行</span></div>';
  list.prepend(item);
  // Show confirm
  const confirm=document.getElementById('confirm'+formId.replace('execForm',''));
  confirm.classList.add('show');
  setTimeout(()=>confirm.classList.remove('show'),3000);
  // Open track panel
  document.getElementById('execTrackPanel').classList.add('open');
}
// Track panel toggle button in nav
(function(){
  const trackBtn=document.createElement('div');
  trackBtn.className='nav-item';
  trackBtn.style.cssText='margin-top:auto;border-top:1px solid var(--border-glow);padding-top:16px';
  trackBtn.innerHTML='<span class="nav-icon">📋</span> 执行追踪 <span class="nav-badge" id="taskCount" style="display:none">0</span>';
  trackBtn.onclick=function(){document.getElementById('execTrackPanel').classList.toggle('open')};
  document.querySelector('.sidebar').appendChild(trackBtn);
})();
