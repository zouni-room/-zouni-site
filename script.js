document.documentElement.classList.add("js-enabled");
(() => {
 const root=document.documentElement, saved=localStorage.getItem("agate-theme");
 if(saved==="dark"||saved==="light") root.dataset.theme=saved;
 const themeBtn=document.getElementById("themeToggle");
 function syncTheme(){if(themeBtn){const d=root.dataset.theme==="dark";themeBtn.textContent=d?"☀":"☾";themeBtn.setAttribute("aria-label",d?"ライトモードに切り替え":"ダークモードに切り替え");}}
 if(themeBtn){themeBtn.addEventListener("click",()=>{root.dataset.theme=root.dataset.theme==="dark"?"light":"dark";localStorage.setItem("agate-theme",root.dataset.theme);syncTheme();});syncTheme();}
 const mb=document.getElementById("menuToggle"), nav=document.getElementById("siteNav");
 if(mb&&nav)mb.addEventListener("click",()=>{let o=nav.classList.toggle("open");mb.setAttribute("aria-expanded",String(o));});
 const search=document.getElementById("characterSearch"), status=document.getElementById("searchStatus"), clear=document.getElementById("clearSearch"), works=[...document.querySelectorAll(".work")];
 // Common alternate readings / spellings. Search is normalized to the canonical display name.
 const searchAliases = {
   "まおまお":"猫猫", "マオマオ":"猫猫", "mao mao":"猫猫", "maomao":"猫猫",
   "じんし":"壬氏", "ジンシ":"壬氏",
   "りむる":"リムル", "リムル":"リムル"
 };
 function normalizeSearch(s){
   return String(s||"").normalize("NFKC").toLocaleLowerCase().replace(/[　\s・･\-‐‑‒–—―]/g,"").trim();
 }
 function filter(){
  if(!search)return;
  const raw=search.value.trim();
  const q=normalizeSearch(raw);
  const canonical=normalizeSearch(searchAliases[raw] || searchAliases[raw.toLocaleLowerCase()] || raw);
  let count=0, matchedWorkTitle=false, matchedCharacter=false;
  works.forEach(w=>{
    const title=(w.querySelector("summary")?.textContent||"");
    const details=[...w.querySelectorAll("p")].map(p=>p.textContent).join(" ");
    const titleNorm=normalizeSearch(title);
    const detailsNorm=normalizeSearch(details);
    const titleHit=!!q && (titleNorm.includes(q) || titleNorm.includes(canonical));
    const characterHit=!!q && (detailsNorm.includes(q) || detailsNorm.includes(canonical));
    const ok=!q || titleHit || characterHit;
    w.hidden=!ok;
    if(ok && q) count++;
    if(ok && q){ if(titleHit) matchedWorkTitle=true; if(characterHit) matchedCharacter=true; }
    // If a character search matches, expand the matching work so the character is visible.
    if(characterHit && w.tagName.toLowerCase()==="details") w.open=true;
  });
  if(status){
    if(!q) status.textContent="作品名・キャラクター名で絞り込めます。";
    else if(matchedWorkTitle && !matchedCharacter) status.textContent=`${count}件の作品が見つかりました。該当作品を開いて表示しています。`;
    else if(matchedCharacter && !matchedWorkTitle) status.textContent=`${count}件のキャラクターが見つかりました。該当作品を開いて表示しています。`;
    else if(matchedWorkTitle && matchedCharacter) status.textContent=`${count}件の作品・キャラクターが見つかりました。該当項目を開いて表示しています。`;
    else status.textContent="該当する作品・キャラクターは見つかりませんでした。";
  }
  if(clear)clear.hidden=!q;
 }
 if(search)search.addEventListener("input",filter);
 if(clear)clear.addEventListener("click",()=>{search.value="";filter();search.focus();});
 const top=document.getElementById("floatingTop");if(top){const f=()=>top.classList.toggle("visible",scrollY>350);addEventListener("scroll",f,{passive:true});f();}
 const els=[...document.querySelectorAll(".reveal")];if("IntersectionObserver"in window){const ob=new IntersectionObserver(es=>es.forEach(e=>{if(e.isIntersecting){e.target.classList.add("is-visible");ob.unobserve(e.target);}}),{threshold:.08});els.forEach(e=>ob.observe(e));}else els.forEach(e=>e.classList.add("is-visible"));
})();