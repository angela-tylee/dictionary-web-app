(function(){const n=document.createElement("link").relList;if(n&&n.supports&&n.supports("modulepreload"))return;for(const t of document.querySelectorAll('link[rel="modulepreload"]'))i(t);new MutationObserver(t=>{for(const o of t)if(o.type==="childList")for(const c of o.addedNodes)c.tagName==="LINK"&&c.rel==="modulepreload"&&i(c)}).observe(document,{childList:!0,subtree:!0});function s(t){const o={};return t.integrity&&(o.integrity=t.integrity),t.referrerPolicy&&(o.referrerPolicy=t.referrerPolicy),t.crossOrigin==="use-credentials"?o.credentials="include":t.crossOrigin==="anonymous"?o.credentials="omit":o.credentials="same-origin",o}function i(t){if(t.ep)return;t.ep=!0;const o=s(t);fetch(t.href,o)}})();let l={};a("welcome");async function a(e){const n=document.querySelector("#loader");try{l=await(await fetch(`https://api.dictionaryapi.dev/api/v2/entries/en/${e}`)).json(),console.log(l),L(),window.scrollTo(0,0),n.style.display="none"}catch(s){console.error(s),$(),n.style.display="none"}}const S=document.querySelector("#search-form"),x=document.querySelector("#search-btn");S.addEventListener("submit",e=>{e.preventDefault();const n=document.querySelector("#search-input").value;a(n)});x.addEventListener("click",()=>{const e=document.querySelector("#search-input").value;a(e)});function L(){var m,f;const e=document.querySelector("#main"),{word:n,phonetics:s,meanings:i,sourceUrls:t}=l[0],o=((m=s.find(r=>r.text))==null?void 0:m.text)||"",c=((f=s.find(r=>r.audio))==null?void 0:f.audio)||"";let u="";i.forEach(r=>{const{partOfSpeech:g,definitions:v,synonyms:b}=r;let y="";v.forEach(d=>{y+=`<li>${d.definition}</li>`});let h=[];b.forEach(d=>{h.push(`<span class="synonym">${d}</span>`)});let w=h.join(", ");u+=`
      <div class="definition-block">
        <h2 class="fs-4">${g}</h2><hr>
        <div class="meaning">
          <h3 class="text-body-secondary fs-5">Meaning</h3>
          <ul>${y}</ul>
        </div>
        <div class="d-flex">
          <h3 class="text-body-secondary fs-5 me-2">Synonyms</h3>
          <p class="text-primary">${w||""}</span>
        </div>
      </div>
    `}),e.innerHTML=`
    <div class="d-flex justify-content-between align-items-center">
      <div>
        <h1 class="display-3 fw-normal">${n}</h1>
        <span class="text-primary">${o}</span>
      </div>
      <button class="icon-play-container btn btn-none border-0" onclick="playAudio()">
        <img class="icon-play" src="./assets/images/icon-play.svg" alt="play audio">
        ${c?`<audio id="phonetic-audio" controls" src="${c}"></audio>`:""}
      </button>
    </div>
    ${u}
    <div>
      <hr>
      <span class="me-2">Source</span><a href="${t[0]}">${t[0]}</a>
    </div>
  `}function $(){main.innerHTML=`
    <div class="d-flex flex-column justify-content-center align-items-center pt-5">
      <h3><span class="display-1">😕</span></h3>
      <h2 class="mt-4">No Definitions Found</h2>
      <p class="mt-4 text-body-secondary text-center">Sorry pal, we couldn't find definitions for the word you were looking for. You can try the search again at later time or head to the web instead.</p>
    </div>
    `}document.querySelector("#main").addEventListener("click",e=>{e.target.classList.contains("synonym")&&a(e.target.textContent)});const q=document.querySelectorAll(".dropdown-item"),E=document.querySelector("#font-switcher-btn");q.forEach(e=>{e.addEventListener("click",()=>{let n=e.getAttribute("data-font"),s=e.textContent;E.textContent=s,document.body.style.fontFamily=n,console.log(n)})});const A=document.querySelector("#theme-switcher-input"),p=document.querySelector("#theme-icon");A.addEventListener("change",e=>{console.log(e.target.checked),e.target.checked?(document.documentElement.setAttribute("data-bs-theme","dark"),p.src="./assets/images/icon-moon-active.svg"):(document.documentElement.setAttribute("data-bs-theme","light"),p.src="./assets/images/icon-moon.svg")});
