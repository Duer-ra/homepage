/**
 * Duevox landing page (React)
 * npm i three@0.160 gsap
 *
 * One fixed WebGL scene: you travel down a runway of dates toward a glowing horizon.
 * Scroll drives the camera and the story. App moments (calendar, runway, forecast,
 * accounts, evidence, savings and more) appear as cards at random free spots and
 * refresh as you scroll. All styles are scoped under .dv and the fonts load from Google Fonts.
 *
 * Props: ctaHref (default "/signup")
 */
import { useEffect, useRef, useState } from "react";
import * as THREE from "three";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const PANELS = [
 {
  "right": false,
  "title": "Your money is in different places. Your commitments should not be.",
  "paras": [
   {
    "hint": false,
    "t": "Streaming, AI tools, cloud hosting, virtual dollar cards, bank accounts and free trials all bill on their own schedule. Some charges arrive monthly, some yearly, and some renew by themselves when a trial ends."
   },
   {
    "hint": false,
    "t": "Duevox puts them in one view, so you stop opening several banking apps and digging through old receipts."
   }
  ]
 },
 {
  "right": true,
  "title": "See every renewal before it lands.",
  "paras": [
   {
    "hint": false,
    "t": "Runway lists upcoming renewals in date order with the amount, currency and account, where we have them. Rather than showing what you paid last month, it shows what you are about to pay."
   },
   {
    "hint": false,
    "t": "Reminders and app moments drift past as you travel. Move your cursor to look around."
   }
  ]
 },
 {
  "right": false,
  "title": "Check each charge against your balance.",
  "paras": [
   {
    "hint": false,
    "t": "Duevox starts from your balance, subtracts upcoming payments and shows where you could fall short. The coins and runway lights that turn coral mark a projected shortfall."
   },
   {
    "hint": false,
    "t": "If a balance is missing or out of date, Duevox says so instead of showing a safe forecast. You get time to move money between your own accounts outside Duevox, or to drop a subscription."
   },
   {
    "hint": false,
    "t": "Balance last verified 2 days ago."
   }
  ]
 },
 {
  "right": true,
  "title": "Bring in money from anywhere.",
  "paras": [
   {
    "hint": false,
    "t": "Pay local services from a Nigerian bank account, subscribe abroad with a virtual dollar card, keep funds in several places. Duevox does not need every provider to support bank connections."
   },
   {
    "hint": false,
    "t": "Add accounts and subscriptions by hand, update balances when they change, or import a supported bank statement to find recurring charges. Where a bank connection is supported, Duevox syncs accounts and transactions through its data providers."
   }
  ]
 },
 {
  "right": false,
  "title": "Find forgotten charges and trials about to end.",
  "paras": [
   {
    "hint": false,
    "t": "Duevox reads repeating transaction patterns and offers them as possible subscriptions. You confirm or reject each one and can see why it was flagged."
   },
   {
    "hint": false,
    "t": "Duevox also avoids duplicate records when the same subscription shows up from different sources. Reminders arrive before a payment or a trial end, and uncertain matches wait for your review before anything changes."
   }
  ]
 },
 {
  "right": true,
  "title": "Decide what is worth keeping.",
  "paras": [
   {
    "hint": false,
    "t": "Review monthly and yearly commitments by category and currency, see how much you spend in foreign currency, and spot subscriptions that deserve a second look. Cancellation guidance points you to the merchant's site, an app store page or support."
   },
   {
    "hint": false,
    "t": "The mobile app covers Runway, balance risks and reminders. The web app gives you room for the payment calendar, statements and detected subscriptions. Both use the same records."
   }
  ]
 }
];

export default function DuevoxLanding({ ctaHref = "/signup" }) {
  const rootRef = useRef(null);
  const [waitlistSubmitted, setWaitlistSubmitted] = useState(false);

  useEffect(() => {
    var root=rootRef.current,raf=0,offs=[],renderer,pm,tl,live=[];
    function on(t,f){window.addEventListener(t,f);offs.push(function(){window.removeEventListener(t,f);});}
    function cleanup(){
      offs.forEach(function(f){f();});cancelAnimationFrame(raf);
      if(tl){if(tl.scrollTrigger)tl.scrollTrigger.kill();tl.kill();}
      gsap.killTweensOf(S);
      (live||[]).forEach(function(c){gsap.killTweensOf(c.ci);c.el.remove();});
      if(renderer){renderer.dispose();if(renderer.domElement.parentNode)renderer.domElement.parentNode.removeChild(renderer.domElement);}
      if(pm)pm.dispose();
    }


    /* The scene: a hanging mobile. Beams are the balance, coins are renewals,
       the sphere is your balance. A strong light casts the whole thing onto the wall. */
    var reduce=matchMedia("(prefers-reduced-motion: reduce)").matches, paused=reduce;
    var pb=root.querySelector("#pause");pb.setAttribute("aria-pressed",String(reduce));
    pb.onclick=function(){paused=!paused;pb.setAttribute("aria-pressed",String(paused));};

    var SUBS=[["Streaming","₦4,400","Oct 14",2],["Cloud hosting","$24.00","Oct 16",4],["AI assistant","$20.00","Oct 19",7],["Music","₦2,900","Oct 22",10],["Design tool","$15.00","Oct 27",15],["Domain","$12.00","Nov 02",21],["Storage","$2.99","Nov 05",24],["Gym","₦15,000","Nov 08",27],["Productivity suite","$9.99","Nov 12",31],["News","₦1,800","Nov 15",34]];
    var KEYS=[{z:0,risk:0,dawn:0},{z:30,risk:0,dawn:0},{z:66,risk:0,dawn:0},{z:96,risk:1,dawn:0},{z:140,risk:0,dawn:0},{z:168,risk:0,dawn:0},{z:192,risk:0,dawn:0},{z:206,risk:0,dawn:1}];
    var S=Object.assign({},KEYS[0],{intro:0});
    gsap.registerPlugin(ScrollTrigger);
    tl=gsap.timeline({scrollTrigger:{trigger:root,start:"top top",end:"bottom bottom",scrub:reduce?true:1}});
    KEYS.slice(1).forEach(function(k){tl.to(S,Object.assign({},k,{duration:1,ease:"power2.inOut"}));});

    var h1=root.querySelector("#h1"),txt=h1.getAttribute("aria-label");h1.textContent="";
    txt.split(" ").forEach(function(w,wi,a){var s=document.createElement("span");s.className="w";s.setAttribute("aria-hidden","true");
     w.split("").forEach(function(c){var l=document.createElement("span");l.className="l";l.textContent=c;s.appendChild(l);});
     if(wi<a.length-1)s.appendChild(document.createTextNode("\u00A0"));h1.appendChild(s);});
    var letters=[].slice.call(h1.querySelectorAll(".l")),mags=[].slice.call(root.querySelectorAll("[data-magnetic]"));
    if(reduce)S.intro=1;else{gsap.to(S,{intro:1,duration:2.6,ease:"expo.out",delay:.1});
     gsap.from(letters,{yPercent:70,opacity:0,duration:1,ease:"power3.out",stagger:.02,delay:.3});}
    on("pointermove",function(e){if(paused)return;
     letters.forEach(function(el){var r=el.getBoundingClientRect(),d=Math.hypot(e.clientX-r.left-r.width/2,e.clientY-r.top-r.height/2),k=1-Math.min(1,d/220);
      el.style.fontVariationSettings="'wght' "+Math.round(380+k*420)+",'wdth' "+Math.round(100-k*22);});
     mags.forEach(function(el){var r=el.getBoundingClientRect(),dx=e.clientX-r.left-r.width/2,dy=e.clientY-r.top-r.height/2;
      if(Math.hypot(dx,dy)<110)gsap.to(el,{x:dx*.3,y:dy*.3,duration:.3});else gsap.to(el,{x:0,y:0,duration:.8,ease:"elastic.out(1,.4)",overwrite:"auto"});});});

    var host=root.querySelector("#gl");
    if(THREE.ColorManagement)THREE.ColorManagement.enabled=false; /* keep the look identical to the prototype */
    try{renderer=new THREE.WebGLRenderer({antialias:true});}catch{ return cleanup();}
    if("outputColorSpace" in renderer)renderer.outputColorSpace=THREE.LinearSRGBColorSpace;
    renderer.useLegacyLights=true; /* three r155 to r164; ignored elsewhere */
    var small=innerWidth<700,pr=Math.min(devicePixelRatio,small?1.5:1.75);
    renderer.setPixelRatio(pr);renderer.shadowMap.enabled=true;renderer.shadowMap.type=THREE.PCFSoftShadowMap;
    host.appendChild(renderer.domElement);
    var cFog=new THREE.Color(0x0B403A),cDawn=new THREE.Color(0x1B7A6C),cRisk=new THREE.Color(0x4A2218),fogNow=new THREE.Color();
    var scene=new THREE.Scene();scene.fog=new THREE.FogExp2(0x0B403A,.012);
    var cam=new THREE.PerspectiveCamera(55,1,.1,600);

    var env=new THREE.Scene();env.add(new THREE.Mesh(new THREE.BoxGeometry(24,24,24),new THREE.MeshBasicMaterial({color:0x3a6b60,side:THREE.BackSide})));
    [[0,10,0,10,.2,10,5],[-10,0,0,.2,9,9,3],[10,2,4,.2,6,6,3]].forEach(function(b){var m=new THREE.Mesh(new THREE.BoxGeometry(b[3],b[4],b[5]),new THREE.MeshBasicMaterial({color:new THREE.Color(b[6],b[6],b[6])}));m.position.set(b[0],b[1],b[2]);env.add(m);});
    pm=new THREE.PMREMGenerator(renderer);scene.environment=pm.fromScene(env,.04).texture;

    /* A soft world: a glowing horizon to travel toward, a lane of light, coins floating in it. */
    var GAP=22,FLOOR=-2.6,LEN=250,RISK_K=4,NC=SUBS.length;
    function tex(w,h,draw){var c=document.createElement("canvas");c.width=w;c.height=h;draw(c.getContext("2d"),w,h);return new THREE.CanvasTexture(c);}
    var soft=tex(128,128,function(g,w,h){var r=g.createRadialGradient(64,64,0,64,64,64);r.addColorStop(0,"rgba(255,255,255,1)");r.addColorStop(.3,"rgba(255,255,255,.28)");r.addColorStop(1,"rgba(255,255,255,0)");g.fillStyle=r;g.fillRect(0,0,w,h);});
    var lane=tex(64,256,function(g,w,h){var a=g.createLinearGradient(0,0,w,0);a.addColorStop(0,"rgba(255,255,255,0)");a.addColorStop(.5,"rgba(255,255,255,.6)");a.addColorStop(1,"rgba(255,255,255,0)");g.fillStyle=a;g.fillRect(0,0,w,h);
     g.globalCompositeOperation="destination-in";var b=g.createLinearGradient(0,0,0,h);b.addColorStop(0,"rgba(0,0,0,.12)");b.addColorStop(.35,"rgba(0,0,0,.12)");b.addColorStop(.5,"rgba(0,0,0,1)");b.addColorStop(.65,"rgba(0,0,0,.12)");b.addColorStop(1,"rgba(0,0,0,.12)");g.fillStyle=b;g.fillRect(0,0,w,h);});
    lane.wrapS=lane.wrapT=THREE.RepeatWrapping;lane.repeat.set(1,(LEN+60)/36);
    var cLag=new THREE.Color(0x4FD1B9),cWarn=new THREE.Color(0xFF7A5C),cGold=new THREE.Color(0xF3E7C4),cTeal=new THREE.Color(0x9BE8D8),tmp=new THREE.Color();

    var skyU={uTop:{value:new THREE.Color(0x04100E)},uHor:{value:new THREE.Color(0x0B403A)}};
    var sky=new THREE.Mesh(new THREE.SphereGeometry(150,32,16),new THREE.ShaderMaterial({uniforms:skyU,side:THREE.BackSide,depthWrite:false,fog:false,
     vertexShader:"varying vec3 vP;void main(){vP=position;gl_Position=projectionMatrix*modelViewMatrix*vec4(position,1.);}",
     fragmentShader:"uniform vec3 uTop,uHor;varying vec3 vP;void main(){float h=normalize(vP).y;vec3 c=mix(uHor,uTop,smoothstep(0.,.55,h));c+=uHor*exp(-abs(h)*7.)*.5;gl_FragColor=vec4(c,1.);}"}));
    sky.renderOrder=-1;scene.add(sky);
    var dest=new THREE.Sprite(new THREE.SpriteMaterial({map:soft,color:0x7FE5D3,blending:THREE.AdditiveBlending,depthWrite:false,transparent:true,opacity:.85,fog:false}));
    dest.position.set(0,1,-LEN-40);dest.scale.set(130,130,1);scene.add(dest);

    var floor=new THREE.Mesh(new THREE.PlaneGeometry(240,LEN+200),new THREE.MeshStandardMaterial({color:0x06201C,roughness:.35,metalness:.7}));
    floor.rotation.x=-Math.PI/2;floor.position.set(0,FLOOR,-LEN/2);floor.receiveShadow=true;scene.add(floor);
    var beam=new THREE.Mesh(new THREE.PlaneGeometry(3,LEN+60),new THREE.MeshBasicMaterial({map:lane,color:0x4FD1B9,transparent:true,opacity:.5,blending:THREE.AdditiveBlending,depthWrite:false}));
    beam.rotation.x=-Math.PI/2;beam.position.set(0,FLOOR+.02,-LEN/2+20);scene.add(beam);
    scene.add(new THREE.HemisphereLight(0x9fe0d0,0x0a1e1a,.5));
    var sun=new THREE.DirectionalLight(0xdff7f0,1.2);sun.castShadow=true;sun.shadow.mapSize.set(small?1024:2048,small?1024:2048);sun.shadow.bias=-.0005;
    var sc=sun.shadow.camera;sc.left=-30;sc.right=30;sc.top=45;sc.bottom=-45;sc.near=1;sc.far=90;scene.add(sun,sun.target);

    /* a dot of light for every day, fading into the horizon */
    var ML=Math.floor((LEN+30)/3),pp=new Float32Array(ML*6),pc=new Float32Array(ML*6);
    for(var i=0;i<ML*2;i++){pp[i*3]=i%2?5:-5;pp[i*3+1]=FLOOR+.12;pp[i*3+2]=8-3*(i>>1);}
    var pg=new THREE.BufferGeometry();pg.setAttribute("position",new THREE.BufferAttribute(pp,3));pg.setAttribute("color",new THREE.BufferAttribute(pc,3));
    var dots=new THREE.Points(pg,new THREE.PointsMaterial({size:.9,map:soft,vertexColors:true,transparent:true,blending:THREE.AdditiveBlending,depthWrite:false}));dots.frustumCulled=false;scene.add(dots);

    /* pearl coins, one per renewal; a soft pool of light marks each day on the floor */
    var coins=SUBS.map(function(d,k){var z=-GAP*(k+1),dollar=d[1][0]==="$",col=dollar?0xF3E7C4:0x9BE8D8,g=new THREE.Group(),
     m=new THREE.Mesh(new THREE.CylinderGeometry(1.3,1.3,.18,64),new THREE.MeshPhysicalMaterial({color:col,metalness:.65,roughness:.18,clearcoat:1,clearcoatRoughness:.1,emissive:col,emissiveIntensity:.22}));
     m.rotation.x=Math.PI/2;m.castShadow=true;g.add(m);g.position.set(0,.5,z);scene.add(g);
     var mk=new THREE.Mesh(new THREE.PlaneGeometry(7,7),new THREE.MeshBasicMaterial({map:soft,color:0x4FD1B9,transparent:true,opacity:.55,blending:THREE.AdditiveBlending,depthWrite:false}));
     mk.rotation.x=-Math.PI/2;mk.position.set(0,FLOOR+.03,z);scene.add(mk);
     var gl=new THREE.Sprite(new THREE.SpriteMaterial({map:soft,color:col,blending:THREE.AdditiveBlending,depthWrite:false,transparent:true,opacity:.38,fog:false}));gl.scale.set(9,9,1);gl.position.set(0,.5,z-.6);scene.add(gl);
     return{g:g,m:m,mk:mk,k:k,z:z,glow:gl,base:dollar?cGold:cTeal};});

    /* app moments: cards drift in at random places, above the page, away from the text */
    var notes=root.querySelector("#notes");
    function ico(r){return '<span class="ico">'+(r?"!":"D")+'</span>';}
    function hd(r,tm){return '<header>'+ico(r)+'<em>Duevox</em><time>'+(tm||"now")+'</time></header>';}
    function N(t,b,r,c){return{h:hd(r)+"<b>"+t+"</b><p>"+b+"</p>",c:c||(r?"risk":"")};}
    function sub(){return SUBS[Math.floor(Math.random()*NC)];}
    function cur(d){return d[1][0]==="₦"?"your account":"your dollar card";}
    function row(a,b,n){return"<div><span>"+a+"</span><span"+(n?" class='neg'":"")+">"+b+"</span></div>";}
    function pill(t,w){return"<span class='pill"+(w?" warn":"")+"'>"+t+"</span>";}
    function bar(l,p){return"<div class='rows' style='margin:.35rem 0 0'>"+row(l,p+"%")+"</div><div class='bar'><i style='width:"+p+"%'></i></div>";}
    var TPL=[
     {g:"renew",f:function(){var d=sub();return N(d[0]+" renews in "+d[3]+" days",d[1]+" leaves "+cur(d)+" on "+d[2]+".");}},
     {g:"calendar",f:function(){var h="",i;["M","T","W","T","F","S","S"].forEach(function(x){h+="<span class='h'>"+x+"</span>";});for(i=0;i<3;i++)h+="<span></span>";
      for(i=1;i<=31;i++){var c=i===11?"n":[14,16,19,22].indexOf(i)>=0?"d":i===27?"r":"";h+="<span"+(c?" class='"+c+"'":"")+">"+i+"</span>";}
      return{h:hd(0,"Oct 2026")+"<b>Calendar</b><div class='cal'>"+h+"</div><p>Five renewals this month. The coral day may not be covered.</p>",c:"wide"};}},
     {g:"runway",f:function(){return{h:hd(0)+"<b>Runway</b><p>Available now: ₦85,000</p><div class='rows'>"+row("Streaming, Oct 14","₦80,600")+row("Gym, Oct 20","₦65,600")+row("Music, Oct 22","₦60,000")+row("Domain, Nov 02","−₦8,000",1)+"</div><p>₦25,000 in charges, then one payment takes you below zero.</p>",c:"wide"};}},
     {g:"forecast",f:function(){return{h:hd(0,"verified 2 days ago")+"<b>Forecast</b><svg viewBox='0 0 160 60' width='100%' height='70' aria-hidden='true'><line x1='0' y1='40' x2='160' y2='40' stroke='#071713' stroke-opacity='.4' stroke-dasharray='3 3'/><polyline points='0,8 30,12 60,18 90,26 116,40' fill='none' stroke='#1d9c8a' stroke-width='3' stroke-linecap='round' stroke-linejoin='round'/><polyline points='116,40 138,48 160,54' fill='none' stroke='#E5482A' stroke-width='3' stroke-linecap='round'/><circle cx='116' cy='40' r='4' fill='#E5482A'/><text x='3' y='36' fill='#071713' font-size='8'>₦0</text><text x='96' y='55' fill='#071713' font-size='8'>Nov 02</text></svg><p>Your balance drops below zero on Nov 02 if nothing changes.</p>",c:"dk wide"};}},
     {g:"risk",f:function(){var d=SUBS[RISK_K+Math.floor(Math.random()*(NC-RISK_K))];return N(d[0]+" may not be covered","Your balance looks short on "+d[2]+". Move money or cancel.",1);}},
     {g:"alert",f:function(){return{h:hd(1)+"<b>Cloud hosting renews tomorrow</b><p>The last recorded balance on its payment account may not cover it.</p><div class='rows'>"+row("Balance verified","2 days ago")+row("Other charges that week","₦15,000")+"</div>",c:"risk"};}},
     {g:"fresh",f:function(){return{h:hd(0)+"<b>Balance freshness</b><div class='rows'>"+row("Nigerian bank",pill("2 days ago"))+row("Dollar card",pill("Not verified",1))+"</div><p>Duevox shows this date and never presents an unverified balance as safe.</p>",c:"dk wide"};}},
     {g:"accounts",f:function(){return{h:hd(0)+"<b>Accounts</b><div class='rows'>"+row("Nigerian bank "+pill("synced"),"₦85,000")+row("Dollar card "+pill("manual"),"$42.00")+row("Cloud account "+pill("manual, 9d",1),"$18.50")+"</div><p>Dollars add about ₦90,750 at an estimated rate.</p>",c:"wide"};}},
     {g:"currency",f:function(){return{h:hd(0)+"<b>Naira and dollars</b>"+bar("Naira, NGN",39)+bar("Dollars, USD",61)+"<p>Dollar spend is shown in naira at an estimated rate.</p>",c:"dk"};}},
     {g:"statement",f:function(){return N("Statement imported","12 recurring charges found. Review them when you are ready.",0,"dk");}},
     {g:"detect",f:function(){return{h:hd(0,"2m ago")+"<b>Possible subscription: Cloud hosting</b><p>Why Duevox thinks so:</p><div class='rows'>"+row("Jul 16","$24.00")+row("Aug 16","$24.00")+row("Sep 16","$24.00")+"</div><p>Three monthly charges from the same merchant.</p><div class='acts'><span>Confirm</span><span>Reject</span></div>",c:"dk wide"};}},
     {g:"price",f:function(){return N("Price increase flagged","Storage went from $2.99 to $3.99 a month.",0,"dk");}},
     {g:"overlap",f:function(){return N("Worth a second look","Two design tools renew this month. Storage was last reviewed 11 months ago.",0,"dk");}},
     {g:"insights",f:function(){return{h:hd(0)+"<b>Insights</b>"+bar("Streaming and media",32)+bar("AI tools",28)+bar("Cloud",22)+bar("Fitness",10),c:""};}},
     {g:"month",f:function(){return{h:hd(0)+"<b>Monthly commitments</b><div class='big'>₦24,100</div><p>plus $83.97 in dollars</p>",c:""};}},
     {g:"cancel",f:function(){return{h:hd(0)+"<b>How to cancel Music</b><div class='rows'>"+row("The merchant's website","")+row("The app store subscription page","")+row("Contacting support","")+"</div><p>Pick the one where you were billed.</p>",c:"wide"};}},
     {g:"savings",f:function(){return{h:hd(0)+"<b>Savings</b><div class='rows'>"+row("Expected","$30.00 a month")+row("Realized so far","$15.00")+"</div><p>Realized savings count only after charges actually stop.</p>",c:"dk"};}},
     {g:"reminder",f:function(){var d=sub();return N("Reminder set","We will remind you 3 days before "+d[0]+" renews.",0,"dk");}}
    ];
    var STAGE={renew:["renew","calendar","runway"],money:["accounts","currency","statement"],runway:["runway","calendar","forecast","renew"],balance:["risk","forecast","fresh","alert"],sources:["accounts","statement","currency"],discover:["detect","price","overlap","statement"],decide:["cancel","savings","insights","month","overlap"],end:["alert","fresh","reminder","savings"]};
    function stage(){var z=S.z;return z<15?"renew":z<50?"money":z<85?"runway":z<120?"balance":z<155?"sources":z<180?"discover":z<200?"decide":"end";}
    var AVOID=[".panel","h1",".sub",".hero .btn",".hero .stores","nav","#pause"],acc=0,nextIn=1.2,want=small?3:6;
    function hit(a,b){return a.l<b.r&&a.r>b.l&&a.t<b.b&&a.b>b.t;}
    function blocked(pad,noCards){var r=[];AVOID.forEach(function(q){root.querySelectorAll(q).forEach(function(e){var b=e.getBoundingClientRect();if(b.bottom>0&&b.top<innerHeight&&b.width)r.push({l:b.left-pad,t:b.top-pad,r:b.right+pad,b:b.bottom+pad});});});
     if(!noCards)live.forEach(function(c){r.push({l:c.x-16,t:c.y-16,r:c.x+c.w+16,b:c.y+c.h+16});});return r;}
    function retire(c,q){if(c.out)return;c.out=1;gsap.to(c.ci,{opacity:0,scale:reduce?1:.9,y:reduce?0:-24,duration:q?.25:.7,onComplete:function(){c.el.remove();var i=live.indexOf(c);if(i>=0)live.splice(i,1);}});}
    function spawn(fromScroll){
     var cap=want,act=live.filter(function(c){return!c.out;});
     if(act.length>=cap){if(!fromScroll)return;retire(act[0]);}
     var tags=STAGE[stage()],pool=TPL.filter(function(t){return Math.random()<.8?tags.indexOf(t.g)>=0:true;});
     var o=pool[Math.floor(Math.random()*pool.length)].f(),el=document.createElement("div");
     el.className="card"+(o.c?" "+o.c.replace("dk","").trim():"");el.innerHTML='<div class="ci">'+o.h+'</div>';notes.appendChild(el);
     var w=el.offsetWidth,h=el.offsetHeight,R=blocked(36),W=innerWidth,H=innerHeight,p=null;
     for(var n=0;n<80&&!p;n++){var x=16+Math.random()*(W-w-32),y=76+Math.random()*(H-h-150),b={l:x,t:y,r:x+w,b:y+h},ok=true;
      for(var i=0;i<R.length;i++)if(hit(b,R[i])){ok=false;break;}if(ok)p={x:x,y:y};}
     if(!p){el.remove();return;}
     var c={el:el,ci:el.firstChild,x:p.x,y:p.y,w:w,h:h,dz:.5+Math.random(),age:0,life:7+Math.random()*4,rot:(Math.random()-.5)*6,vy:(Math.random()-.5)*7};
     live.push(c);
     if(reduce)gsap.fromTo(c.ci,{opacity:0},{opacity:1,duration:.5});else gsap.fromTo(c.ci,{opacity:0,scale:.55,y:40},{opacity:1,scale:1,y:0,duration:.9,ease:"back.out(1.7)"});
    }
    function size(){var w=host.clientWidth||innerWidth,h=host.clientHeight||innerHeight;renderer.setSize(w,h,false);cam.aspect=w/h;cam.updateProjectionMatrix();}
    size();on("resize",size);
    var ptr={x:0,y:0,tx:0,ty:0};
    on("pointermove",function(e){ptr.tx=e.clientX/innerWidth*2-1;ptr.ty=e.clientY/innerHeight*2-1;});

    var t=0,last=performance.now(),lastRisk=-1,prevZ=0,sAcc=0,sNeed=4;
    function tick(now){raf=raf=requestAnimationFrame(tick);
     var dt=Math.min(.05,(now-last)/1000);last=now;if(!paused)t+=dt;var mo=paused?0:1;
     ptr.x+=(ptr.tx-ptr.x)*.05;ptr.y+=(ptr.ty-ptr.y)*.05;
     var cz=-S.z+(1-S.intro)*30,cx=ptr.x*.5,cy=.7+Math.sin(t*.6)*.05*mo;
     cam.position.set(cx,cy,cz);cam.lookAt(cx+ptr.x*5,cy-ptr.y*2.5-.2,cz-20);cam.updateMatrixWorld(true);
     sun.position.set(cx+12,16,cz+4);sun.target.position.set(cx,FLOOR,cz-24);
     coins.forEach(function(c,j){var r=c.k>=RISK_K?S.risk:0;c.g.position.y=.5+Math.sin(t*1.1+j)*.12*mo;c.g.rotation.y=Math.sin(t*.7+j)*.55*mo;
      c.m.material.color.copy(c.base).lerp(cWarn,r*.8);c.m.material.emissive.copy(c.m.material.color);
      c.mk.material.color.copy(cLag).lerp(cWarn,r);c.glow.material.color.copy(c.m.material.color);c.glow.position.y=c.g.position.y;});
     if(Math.abs(S.risk-lastRisk)>.005){lastRisk=S.risk;for(var i=0;i<ML*2;i++){tmp.copy(cLag).multiplyScalar(.55);if(8-3*(i>>1)<-GAP*RISK_K+10)tmp.lerp(cWarn,S.risk);pc[i*3]=tmp.r;pc[i*3+1]=tmp.g;pc[i*3+2]=tmp.b;}pg.attributes.color.needsUpdate=true;}
     lane.offset.y-=dt*.12*mo;
     fogNow.copy(cFog).lerp(cDawn,S.dawn).lerp(cRisk,S.risk*.7);scene.fog.color.copy(fogNow);skyU.uHor.value.copy(fogNow);
     beam.material.color.copy(cLag).lerp(cWarn,S.risk*.7);
     dest.material.color.copy(cLag).lerp(cWarn,S.risk*.8);dest.scale.setScalar(130*(1+S.dawn*.4));
     sky.position.copy(cam.position);
     renderer.render(scene,cam);
     var allow=reduce||!paused,dzs=Math.abs(S.z-prevZ);prevZ=S.z;
     if(allow){sAcc+=dzs;acc+=dt;
      if(sAcc>sNeed){sAcc=0;acc=0;sNeed=1.5+Math.random()*3;want=small?3:5+Math.floor(Math.random()*3);spawn(1);if(Math.random()<.6)spawn(0);}   /* scrolling brings new cards */
      else if(acc>nextIn){acc=0;spawn(0);nextIn=live.filter(function(c){return!c.out;}).length<want?.4:1.4+Math.random()*1.6;}} /* standing still still gets one now and then */
     var WL=blocked(12,1);
 for(var q=live.length-1;q>=0;q--){var c=live[q];if(!c.out){var bx={l:c.x-6,t:c.y-6,r:c.x+c.w+6,b:c.y+c.h+6};for(var wi=0;wi<WL.length;wi++)if(hit(bx,WL[wi])){retire(c,1);break;}}if(allow)c.age+=dt*(c.age>1.5?1+Math.min(3,dzs*80):1);if(c.age>c.life)retire(c);
      var m=reduce?0:1,px=-ptr.x*10*c.dz*m,py=-ptr.y*8*c.dz*m,dy=0;
      c.el.style.transform="translate3d("+(c.x+px)+"px,"+(c.y+dy+py)+"px,0) rotateY("+(ptr.x*5*c.dz*m)+"deg) rotateX("+(-ptr.y*4*c.dz*m)+"deg) rotateZ("+(c.rot*.5*m)+"deg)";}
    }
    raf=requestAnimationFrame(tick);
    return cleanup;
  }, []);

  return (
    <div ref={rootRef} className="dv">
      <style>{CSS}</style>
      <div id="gl" aria-hidden="true" />
      <div id="notes" aria-hidden="true" />
      <nav>
        <span className="mark">Duevox</span>
        <a className="btn sm" href={ctaHref} data-magnetic>Get started</a>
      </nav>
      <button id="pause" aria-pressed="false"><span className="on">Pause motion</span><span className="off">Resume motion</span></button>
      <svg width="0" height="0" style={{ position: "absolute" }} aria-hidden="true">
        <defs>
          <symbol id="i-app" viewBox="0 0 24 24"><rect x="1" y="1" width="22" height="22" rx="6" fill="currentColor" opacity=".12" /><path d="M7 18 12 6l5 12M9 14h6" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" /></symbol>
          <symbol id="i-play" viewBox="0 0 24 24"><path d="M5 3 20 12 5 21z" fill="currentColor" /></symbol>
        </defs>
      </svg>
      <main>
        <section className="sec hero">
          <h1 id="h1" aria-label="Know what's coming before your money goes.">Know what's coming before your money goes.</h1>
          <p className="sub">Your subscriptions. Your balances. No more payment surprises.</p>
          <a className="btn" href={ctaHref} data-magnetic>Get started with Duevox</a>
          <Stores />
        </section>
        {PANELS.map((p) => (
          <section key={p.title} className={"sec row" + (p.right ? " right" : "")}>
            <div className="panel">
              <h2>{p.title}</h2>
              {p.paras.map((q) => <p key={q.t} className={q.hint ? "hint" : undefined}>{q.t}</p>)}
            </div>
          </section>
        ))}
        <section className="sec audience-section" id="who-its-for">
          <div className="audience-wrap">
            <div className="audience-intro">
              <span className="eyebrow">Built for real Nigerian money lives</span>
              <h2>One clear view for people paying across borders and accounts.</h2>
              <p>Duevox starts with the people most likely to feel the cost of scattered recurring payments: Nigerians balancing local income, international tools and more than one way to pay.</p>
            </div>
            <div className="audience-grid">
              <article className="audience-card">
                <span className="audience-icon">₦</span>
                <h3>Professionals and remote workers</h3>
                <p>Track the local bills and international software that keep work moving, even when payments come from different accounts or cards.</p>
              </article>
              <article className="audience-card">
                <span className="audience-icon">✦</span>
                <h3>Freelancers and creators</h3>
                <p>See tools, platforms, storage and subscriptions before they renew, so irregular income does not meet a surprise charge.</p>
              </article>
              <article className="audience-card">
                <span className="audience-icon">↗</span>
                <h3>Small teams and businesses</h3>
                <p>Keep recurring services visible as the team grows, without relying on old receipts or one person remembering every renewal.</p>
              </article>
            </div>
            <div className="nigeria-note">
              <div>
                <span className="eyebrow">Why this matters in Nigeria</span>
                <h3>Subscriptions do not arrive in one currency or from one place.</h3>
              </div>
              <p>Local services may bill a Nigerian bank account while work tools, streaming platforms and virtual dollar cards charge in USD. Exchange-rate movement, limited dollar access, changing balances and several banking apps make the amount and date of a renewal harder to predict. Duevox brings those commitments together and shows what is known, what is estimated and what still needs attention.</p>
            </div>
          </div>
        </section>
        <section className="sec waitlist-section" id="waitlist">
          <div className="waitlist-layout">
            <div className="panel waitlist-copy">
              <span className="eyebrow">Private beta</span>
              <h2>Be first to know what your money is about to do.</h2>
              <p>Join the Duevox waitlist for early access, product updates and a chance to shape the tools that make recurring money less surprising.</p>
              <p className="hint">No payment details. No marketing noise. Leave the list whenever you want.</p>
              {waitlistSubmitted ? (
                <div className="success-message" role="status">
                  <strong>You’re on the list.</strong>
                  <span>We’ll be in touch when your invite is ready.</span>
                </div>
              ) : (
                <form className="waitlist-form" onSubmit={(event) => {
                  event.preventDefault();
                  setWaitlistSubmitted(true);
                }}>
                  <label htmlFor="waitlist-email">Email address</label>
                  <div className="form-row">
                    <input id="waitlist-email" name="email" type="email" required placeholder="you@example.com" autoComplete="email" />
                    <button className="btn" type="submit">Join the waitlist</button>
                  </div>
                  <small>By joining, you agree to hear from Duevox about the beta.</small>
                </form>
              )}
            </div>
            <div className="model">
              <div className="model-heading">
                <span className="eyebrow">How Duevox grows</span>
                <h2>A useful free start. A clear upgrade.</h2>
              </div>
              <div className="tier-grid">
                <article className="tier">
                  <span className="tier-label">Free</span>
                  <h3>Know what’s next</h3>
                  <p>For people getting a handle on recurring spending.</p>
                  <ul>
                    <li>Unlimited manual subscriptions and accounts</li>
                    <li>Upcoming renewal timeline</li>
                    <li>Basic balance-risk view</li>
                  </ul>
                </article>
                <article className="tier featured">
                  <span className="tier-label">Pro · planned</span>
                  <h3>Stay ahead automatically</h3>
                  <p>The paid boundary is automation, depth and peace of mind.</p>
                  <ul>
                    <li>Connected-account sync beyond the free plan</li>
                    <li>Statement import and recurring-charge detection</li>
                    <li>Advanced forecasts, reminders and insights</li>
                  </ul>
                </article>
              </div>
              <p className="partnership-note"><strong>Provider partnerships:</strong> banks and data providers may pay for qualified, consent-based referrals or infrastructure partnerships. Your timeline never becomes a paid placement.</p>
            </div>
          </div>
        </section>
        <section className="sec end">
          <div className="panel center">
            <h2>Duevox shows your money. It never moves it.</h2>
            <p>It does not hold funds or start payments. You choose what to track, what to connect and what to confirm. Balances and forecasts carry timestamps, and you can disconnect an integration whenever you want.</p>
            <a className="btn" href={ctaHref} data-magnetic>Get started with Duevox</a>
            <Stores />
            <p className="hint">Know what's coming. Stay ahead of your money.</p>
          </div>
        </section>
      </main>
    </div>
  );
}

function Stores() {
  return (
    <div className="stores">
      <span className="store" role="img" aria-label="Coming soon to the App Store"><svg><use href="#i-app" /></svg><span><small>Coming soon to the</small><b>App Store</b></span></span>
      <span className="store" role="img" aria-label="Coming soon to Google Play"><svg><use href="#i-play" /></svg><span><small>Coming soon to</small><b>Google Play</b></span></span>
    </div>
  );
}

const CSS = `@import url("https://fonts.googleapis.com/css2?family=Bricolage+Grotesque:opsz,wdth,wght@12..96,75..100,200..800&family=Newsreader:opsz,wght@6..72,400;6..72,500&display=swap");
.dv{--ink:#05110F;--pearl:#EDF4EF;--lagoon:#7FE5D3;--coral:#FF6B4A;--muted:rgba(237,244,239,.82);
 --panel:rgba(5,17,15,.62);--r-s:999px;--r-m:16px;--r-l:24px;
 --display:"Bricolage Grotesque",system-ui,sans-serif;--body:"Newsreader",Georgia,serif;
 --t-h2:clamp(1.8rem,3.4vw,2.8rem);--t-h1:clamp(3rem,10vw,8.5rem)}
.dv *{box-sizing:border-box}
.dv{position:relative;isolation:isolate;min-height:100dvh;margin:0;background:var(--ink);color:var(--pearl);font:400 1.1875rem/1.6 var(--body);overflow-x:clip}
.dv #gl{position:fixed;inset:0;width:100vw;height:100dvh;min-height:100vh;z-index:0;background:radial-gradient(circle at 50% 20%,#0e5d50 0%,#0b403a 35%,var(--ink) 78%)}
.dv #gl canvas{display:block;width:100%;height:100%}
.dv::after{content:"";position:fixed;inset:0;z-index:1;pointer-events:none;background:radial-gradient(120% 90% at 50% 50%,transparent 55%,rgba(5,17,15,.7))}
.dv #readout{position:fixed;left:0;top:0;z-index:5;pointer-events:none;opacity:0;transition:opacity .15s;background:var(--pearl);color:var(--ink);font:600 .875rem/1 var(--display);padding:.55rem .8rem;border-radius:var(--r-s);white-space:nowrap}
.dv nav{position:fixed;inset:0 0 auto 0;z-index:4;display:flex;justify-content:space-between;align-items:center;padding:calc(1rem + env(safe-area-inset-top,0px)) clamp(1rem,4vw,2.5rem) 1rem}
.dv .mark{font:700 1.4rem/1 var(--display);letter-spacing:-.02em}
.dv .btn{display:inline-block;background:var(--pearl);color:var(--ink);font:600 1rem/1 var(--display);text-decoration:none;padding:1.05rem 1.7rem;border-radius:var(--r-s);will-change:transform}
.dv .btn.sm{padding:.7rem 1.1rem;font-size:.9rem}
.dv a:focus-visible,.dv button:focus-visible{outline:3px solid var(--coral);outline-offset:3px}
.dv #pause{position:fixed;right:clamp(1rem,4vw,2.5rem);bottom:calc(1rem + env(safe-area-inset-bottom,0px));z-index:4;background:var(--panel);color:var(--pearl);border:1px solid var(--muted);border-radius:var(--r-s);padding:.55rem .9rem;font:500 .85rem/1 var(--display);cursor:pointer}
.dv #pause .off,.dv #pause[aria-pressed="true"] .on{display:none}
.dv #pause[aria-pressed="true"] .off{display:inline}
.dv main{position:relative;z-index:2}
.dv .sec{min-height:64svh;display:flex;padding:2.5rem clamp(1rem,5vw,4rem)}
.dv .hero{min-height:100svh;flex-direction:column;justify-content:flex-end;gap:1.3rem;align-items:flex-start;padding-bottom:9svh}
.dv h1{font:400 var(--t-h1)/.92 var(--display);letter-spacing:-.035em;margin:0;max-width:11ch;text-wrap:balance}
.dv .w{display:inline-block;white-space:nowrap}
.dv .l{display:inline-block;font-variation-settings:'wght' 380,'wdth' 100}
.dv .sub{margin:0;max-width:30rem;font-size:1.3rem;color:var(--muted)}
.dv .row{align-items:center}
.dv .right{justify-content:flex-end}
.dv .panel{max-width:33rem;padding:clamp(1.4rem,3vw,2.1rem);border-radius:var(--r-l);background:var(--panel);border:1px solid rgba(127,229,211,.28);-webkit-backdrop-filter:blur(12px);backdrop-filter:blur(12px)}
.dv h2{font:600 var(--t-h2)/1.05 var(--display);letter-spacing:-.025em;margin:0 0 1rem;text-wrap:balance}
.dv .panel p{margin:0 0 .9rem;color:var(--muted)}
.dv .panel p:last-child{margin-bottom:0}
.dv .panel .hint{color:var(--lagoon);font:500 .95rem/1.4 var(--display)}
.dv .audience-section{min-height:auto;align-items:center;justify-content:center;padding-top:5rem;padding-bottom:5rem}
.dv .audience-wrap{width:min(100%,76rem)}
.dv .audience-intro{max-width:42rem;margin-bottom:2rem}
.dv .eyebrow{display:block;margin-bottom:.7rem;color:var(--lagoon);font:600 .78rem/1.2 var(--display);letter-spacing:.1em;text-transform:uppercase}
.dv .audience-intro h2{max-width:34rem;margin-bottom:1rem}
.dv .audience-intro p{max-width:39rem;margin:0;color:var(--muted)}
.dv .audience-grid{display:grid;grid-template-columns:repeat(3,minmax(0,1fr));gap:1rem}
.dv .audience-card{min-height:14rem;padding:1.4rem;border:1px solid rgba(127,229,211,.24);border-radius:var(--r-m);background:rgba(237,244,239,.08);backdrop-filter:blur(10px)}
.dv .audience-icon{display:grid;place-items:center;width:2.7rem;height:2.7rem;margin-bottom:1.25rem;border-radius:12px;background:var(--lagoon);color:var(--ink);font:700 1.25rem/1 var(--display)}
.dv .audience-card h3{margin:0 0 .6rem;font:600 1.2rem/1.1 var(--display)}
.dv .audience-card p{margin:0;color:var(--muted);font-size:1rem;line-height:1.45}
.dv .nigeria-note{display:grid;grid-template-columns:minmax(0,.85fr) minmax(0,1.15fr);gap:2rem;margin-top:1rem;padding:1.5rem;border-radius:var(--r-m);background:rgba(127,229,211,.12);border:1px solid rgba(127,229,211,.3)}
.dv .nigeria-note h3{margin:0;font:600 1.45rem/1.1 var(--display)}
.dv .nigeria-note p{margin:0;color:var(--muted);font-size:1.05rem}
.dv .stores{display:flex;flex-wrap:wrap;gap:.7rem}
.dv .store{display:inline-flex;align-items:center;gap:.65rem;padding:.6rem 1rem .6rem .8rem;border-radius:var(--r-m);border:2px solid var(--pearl);color:var(--pearl);font-family:var(--display);line-height:1.1}
.dv .store svg{width:1.6rem;height:1.6rem;flex:none}
.dv .store small{display:block;font-size:.72rem;font-weight:500}
.dv .store b{font-size:1.05rem;font-weight:700}
.dv .center .stores{justify-content:center}
.dv .end{align-items:center;justify-content:center;min-height:80svh}
.dv .center{text-align:center;display:flex;flex-direction:column;align-items:center;gap:.4rem}
.dv .center .btn{margin:1rem 0 .8rem}
.dv .waitlist-section{min-height:auto;padding-top:8rem;padding-bottom:8rem}
.dv .waitlist-layout{display:grid;grid-template-columns:minmax(0,1fr) minmax(0,1.1fr);gap:clamp(2rem,6vw,6rem);align-items:start;width:min(100%,75rem);margin:auto}
.dv .waitlist-copy{max-width:none}
.dv .eyebrow{display:block;color:var(--lagoon);font:600 .78rem/1 var(--display);letter-spacing:.12em;text-transform:uppercase;margin-bottom:.9rem}
.dv .waitlist-copy h2,.dv .model-heading h2{margin-bottom:.9rem}
.dv .waitlist-form{margin-top:1.8rem}
.dv .waitlist-form label{display:block;font:600 .85rem/1 var(--display);margin-bottom:.5rem}
.dv .form-row{display:flex;gap:.55rem}
.dv .waitlist-form input{min-width:0;flex:1;background:rgba(237,244,239,.1);border:1px solid rgba(237,244,239,.45);border-radius:var(--r-s);color:var(--pearl);font:400 1rem/1 var(--body);padding:1.05rem 1rem}
.dv .waitlist-form input::placeholder{color:rgba(237,244,239,.6)}
.dv .waitlist-form input:focus{outline:3px solid var(--coral);outline-offset:2px;border-color:transparent}
.dv .waitlist-form .btn,.dv .waitlist-form button{border:0;cursor:pointer;white-space:nowrap}
.dv .waitlist-form small{display:block;color:var(--muted);font-size:.75rem;margin-top:.65rem}
.dv .success-message{display:flex;flex-direction:column;gap:.25rem;margin-top:1.8rem;padding:1rem 1.1rem;border-left:4px solid var(--lagoon);background:rgba(127,229,211,.1);font-family:var(--display)}
.dv .success-message strong{font-size:1.1rem}
.dv .success-message span{color:var(--muted);font-size:.9rem}
.dv .model{padding-top:1rem}
.dv .model-heading{margin-bottom:1.4rem}
.dv .tier-grid{display:grid;grid-template-columns:repeat(2,minmax(0,1fr));gap:.8rem}
.dv .tier{padding:1.3rem;border:1px solid rgba(237,244,239,.25);border-radius:var(--r-m);background:rgba(9,28,24,.55)}
.dv .tier.featured{border-color:var(--lagoon);background:rgba(29,156,138,.15)}
.dv .tier-label{color:var(--lagoon);font:600 .75rem/1 var(--display);letter-spacing:.08em;text-transform:uppercase}
.dv .tier h3{font:600 1.2rem/1.1 var(--display);margin:.7rem 0 .55rem}
.dv .tier p{color:var(--muted);font-size:.9rem;line-height:1.4;margin:0 0 1rem}
.dv .tier ul{list-style:none;padding:0;margin:0;display:grid;gap:.55rem}
.dv .tier li{font:400 .84rem/1.35 var(--display);padding-left:1.15rem;position:relative}
.dv .tier li::before{content:"+";position:absolute;left:0;color:var(--lagoon);font-weight:700}
.dv .partnership-note{color:var(--muted);font-size:.83rem;line-height:1.45;margin:1rem 0 0}
.dv .partnership-note strong{color:var(--pearl)}
@media (max-width:700px){.dv .row,.dv .right{align-items:flex-end;justify-content:stretch}
.dv .panel{max-width:none;width:100%}
.dv .audience-section{padding-top:4rem;padding-bottom:4rem}
.dv .audience-grid{grid-template-columns:1fr}
.dv .audience-card{min-height:auto}
.dv .nigeria-note{grid-template-columns:1fr;gap:1rem}
.dv .waitlist-section{padding-top:5rem;padding-bottom:5rem}
.dv .waitlist-layout{grid-template-columns:1fr}
.dv .model{padding-top:0}
.dv .tier-grid{grid-template-columns:1fr}
.dv .form-row{flex-direction:column}
.dv .form-row .btn{width:100%}
.dv .sec{min-height:56svh;padding-top:2rem;padding-bottom:1.5rem}}
@media (prefers-reduced-motion:reduce){.dv *{transition:none!important;scroll-behavior:auto}}
.dv #notes{position:fixed;inset:0;z-index:3;pointer-events:none;perspective:900px}
.dv .card{position:absolute;left:0;top:0;width:15.5rem;will-change:transform}
.dv .ci{padding:.8rem .95rem;border-radius:20px;background:#fff;color:var(--ink);box-shadow:0 18px 40px rgba(0,0,0,.5),0 0 0 1px rgba(255,255,255,.25)}
.dv .card.dk .ci{background:rgba(9,28,24,.9);color:var(--pearl);border:1px solid rgba(127,229,211,.4);-webkit-backdrop-filter:blur(10px);backdrop-filter:blur(10px)}
.dv .card header{display:flex;align-items:center;gap:.5rem;margin-bottom:.45rem;font:600 .72rem/1 var(--display);opacity:.8}
.dv .card em{font-style:normal;flex:1}
.dv .ico{flex:none;width:1.5rem;height:1.5rem;border-radius:.45rem;background:var(--ink);color:var(--lagoon);display:grid;place-items:center;font:700 .85rem/1 var(--display)}
.dv .card.dk .ico{background:var(--lagoon);color:var(--ink)}
.dv .card b{display:block;font:700 .98rem/1.2 var(--display)}
.dv .card p{margin:.25rem 0 0;font:400 .9rem/1.35 var(--body);opacity:.88}
.dv .card.risk .ci{border-left:5px solid var(--coral)}
.dv .card.risk .ico{background:var(--coral);color:var(--ink)}
.dv .rows{display:grid;gap:.35rem;margin-top:.45rem}
.dv .rows div{display:flex;justify-content:space-between;gap:.6rem;font:500 .82rem/1.2 var(--display)}
.dv .bar{height:.5rem;border-radius:9px;background:rgba(127,229,211,.28);overflow:hidden;margin:.2rem 0 .45rem}
.dv .bar i{display:block;height:100%;background:#1d9c8a}
.dv .acts{display:flex;gap:.5rem;margin-top:.6rem}
.dv .acts span{flex:1;text-align:center;padding:.45rem;border-radius:99px;font:600 .8rem/1 var(--display);background:var(--lagoon);color:var(--ink)}
.dv .acts span+span{background:transparent;color:inherit;border:1px solid currentColor}
.dv .big{font:700 1.7rem/1.1 var(--display);margin:.2rem 0}
.dv .card.wide{width:18rem}
.dv .cal{display:grid;grid-template-columns:repeat(7,1fr);gap:.2rem;margin-top:.5rem;font:500 .7rem/1 var(--display);text-align:center}
.dv .cal span{position:relative;padding:.35rem 0 .45rem;border-radius:.4rem}
.dv .cal .h{opacity:.55;font-size:.62rem;padding-bottom:.2rem}
.dv .cal .d::after,.dv .cal .r::after{content:"";position:absolute;left:50%;bottom:.1rem;width:.28rem;height:.28rem;margin-left:-.14rem;border-radius:9px;background:#1d9c8a}
.dv .card.dk .cal .d::after{background:var(--lagoon)}
.dv .cal .r::after{background:var(--coral)!important}
.dv .cal .n{background:var(--ink);color:var(--pearl)}
.dv .card.dk .cal .n{background:var(--lagoon);color:var(--ink)}
.dv .pill{font:600 .66rem/1 var(--display);padding:.25rem .5rem;border-radius:99px;background:rgba(29,156,138,.22);white-space:nowrap}
.dv .card.dk .pill{background:rgba(127,229,211,.25)}
.dv .pill.warn{background:rgba(255,107,74,.3)!important}
.dv .neg{color:#C2381B}
.dv .card.dk .neg{color:var(--coral)}
.dv .rows div{align-items:center}
@media (max-width:700px){.dv .card,.dv .card.wide{width:14.5rem}}


`;
