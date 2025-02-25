(function(){const n=document.createElement("link").relList;if(n&&n.supports&&n.supports("modulepreload"))return;for(const t of document.querySelectorAll('link[rel="modulepreload"]'))r(t);new MutationObserver(t=>{for(const o of t)if(o.type==="childList")for(const i of o.addedNodes)i.tagName==="LINK"&&i.rel==="modulepreload"&&r(i)}).observe(document,{childList:!0,subtree:!0});function s(t){const o={};return t.integrity&&(o.integrity=t.integrity),t.referrerPolicy&&(o.referrerPolicy=t.referrerPolicy),t.crossOrigin==="use-credentials"?o.credentials="include":t.crossOrigin==="anonymous"?o.credentials="omit":o.credentials="same-origin",o}function r(t){if(t.ep)return;t.ep=!0;const o=s(t);fetch(t.href,o)}})();let u={};const l=document.querySelector("#loader");d("welcome");function L(){main.innerHTML=`
  <div class="text-center pt-5" id="loader">
    <div class="spinner-border text-body-secondary border-5" style="width: 60px; height: 60px" role="status">
      <span class="visually-hidden">Loading...</span>
    </div>
  </div>`}async function d(e){L(),console.log(l.style.display);try{u=await(await fetch(`https://api.dictionaryapi.dev/api/v2/entries/en/${e}`)).json(),console.log(u),$(),window.scrollTo(0,0),l.style.display="none"}catch(n){console.error(n),E(),l.style.display="none"}}const S=document.querySelector("#search-form"),q=document.querySelector("#search-btn");S.addEventListener("submit",e=>{e.preventDefault();const n=document.querySelector("#search-input").value;d(n)});q.addEventListener("click",()=>{const e=document.querySelector("#search-input").value;d(e)});function $(){var y,f;const e=document.querySelector("#main"),{word:n,phonetics:s,meanings:r,sourceUrls:t}=u[0],o=((y=s.find(c=>c.text))==null?void 0:y.text)||"",i=((f=s.find(c=>c.audio))==null?void 0:f.audio)||"";let m="";r.forEach(c=>{const{partOfSpeech:b,definitions:w,synonyms:h}=c;let p="";w.forEach(a=>{p+=`<li>${a.definition}</li>`});let g="";if(h.length!==0){let a=[];h.forEach(x=>{a.push(`<a class="synonym pointer">${x}</a>`)}),g=`
        <div class="d-flex">
          <h3 class="text-body-secondary fs-5 me-2">Synonyms</h3>
          <div class="text-primary">${a.join(", ")}</div>
        </div>`}m+=`
      <div class="definition-block">
        <h2 class="fs-4">${b}</h2><hr>
        <div class="meaning">
          <h3 class="text-body-secondary fs-5">Meaning</h3>
          <ul>${p}</ul>
        </div>
        ${g}
      </div>
    `}),e.innerHTML=`
    <div class="d-flex justify-content-between align-items-center">
      <div>
        <h1 class="display-3 fw-normal">${n}</h1>
        <span class="text-primary">${o}</span>
      </div>
      <button class="icon-play-container btn btn-none border-0" id="playBtn">
        <img class="icon-play" src="./assets/images/icon-play.svg" alt="play audio">
        ${i?`<audio id="phonetic-audio" controls" src="${i}"></audio>`:""}
      </button>
    </div>
    ${m}
    <div>
      <hr>
      <span class="me-2">Source</span><a class="text-break" href="${t[0]}">${t[0]}</a>
    </div>
  `}function E(){main.innerHTML=`
    <div class="d-flex flex-column justify-content-center align-items-center pt-5">
      <h3><span class="display-1">😕</span></h3>
      <h2 class="mt-4">No Definitions Found</h2>
      <p class="mt-4 text-body-secondary text-center">Sorry pal, we couldn't find definitions for the word you were looking for. You can try the search again at later time or head to the web instead.</p>
    </div>
    `}function A(){console.log("played"),document.querySelector("#phonetic-audio").play()}document.querySelector("#main").addEventListener("click",e=>{e.target.classList.contains("icon-play")&&A()});document.querySelector("#main").addEventListener("click",e=>{e.target.classList.contains("synonym")&&d(e.target.textContent)});const M=document.querySelectorAll(".dropdown-item"),T=document.querySelector("#font-switcher-btn");M.forEach(e=>{e.addEventListener("click",()=>{let n=e.getAttribute("data-font"),s=e.textContent;T.textContent=s,document.body.style.fontFamily=n,console.log(n)})});const F=document.querySelector("#theme-switcher-input"),v=document.querySelector("#theme-icon");F.addEventListener("change",e=>{console.log(e.target.checked),e.target.checked?(document.documentElement.setAttribute("data-bs-theme","dark"),v.src="./assets/images/icon-moon-active.svg"):(document.documentElement.setAttribute("data-bs-theme","light"),v.src="./assets/images/icon-moon.svg")});
