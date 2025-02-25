let data = {};

const loader = document.querySelector("#loader");

definition("welcome");

function showLoader() {
  main.innerHTML = `
  <div class="text-center pt-5" id="loader">
    <div class="spinner-border text-body-secondary border-5" style="width: 60px; height: 60px" role="status">
      <span class="visually-hidden">Loading...</span>
    </div>
  </div>`
}

async function definition(word) {
  // loader.style.display = "block"
  showLoader();
  console.log(loader.style.display);
  try {
    const res = await fetch(`https://api.dictionaryapi.dev/api/v2/entries/en/${word}`);
    data = await res.json();
    console.log(data);
    renderData();
    window.scrollTo(0, 0);
    loader.style.display = "none";
  } catch (error) {
    console.error(error);
    notFound();
    loader.style.display = "none"
  }
}

const searchForm = document.querySelector('#search-form');
const searchBtn = document.querySelector('#search-btn');

searchForm.addEventListener('submit', (e) => {
  e.preventDefault();
  const word = document.querySelector('#search-input').value;
  definition(word)
});

searchBtn.addEventListener('click', () => {
  const word = document.querySelector('#search-input').value;
  definition(word)
});

function renderData() {
  const main = document.querySelector('#main');

  const { word, phonetics, meanings, sourceUrls } = data[0];

  const phoneticText = phonetics.find(p => p.text)?.text || '';
  const phoneticAudio = phonetics.find(p => p.audio)?.audio || '';

  let meaningsHTML = '';
  meanings.forEach(meaning => {
    const { partOfSpeech, definitions, synonyms } = meaning;

    let definitionsHTML = '';
    definitions.forEach(definition => {
      definitionsHTML += `<li>${definition.definition}</li>`;
    });

    let synonymsHTML = '';
    if (synonyms.length !== 0) {
      let synonymsAry = [];
      synonyms.forEach(synonym => {
        synonymsAry.push(`<a class="synonym pointer">${synonym}</a>`);
      })
      synonymsHTML = `
        <div class="d-flex">
          <h3 class="text-body-secondary fs-5 me-2">Synonyms</h3>
          <div class="text-primary">${synonymsAry.join(', ')}</div>
        </div>`
    }

    meaningsHTML += `
      <div class="definition-block">
        <h2 class="fs-4">${partOfSpeech}</h2><hr>
        <div class="meaning">
          <h3 class="text-body-secondary fs-5">Meaning</h3>
          <ul>${definitionsHTML}</ul>
        </div>
        ${synonymsHTML}
      </div>
    `;
  });


  main.innerHTML = `
    <div class="d-flex justify-content-between align-items-center">
      <div>
        <h1 class="display-3 fw-normal">${word}</h1>
        <span class="text-primary">${phoneticText}</span>
      </div>
      <button class="icon-play-container btn btn-none border-0" id="playBtn">
        <img class="icon-play" src="./assets/images/icon-play.svg" alt="play audio">
        ${phoneticAudio ? `<audio id="phonetic-audio" controls" src="${phoneticAudio}"></audio>` : ''}
      </button>
    </div>
    ${meaningsHTML}
    <div>
      <hr>
      <span class="me-2">Source</span><a class="text-break" href="${sourceUrls[0]}">${sourceUrls[0]}</a>
    </div>
  `;
}

function notFound() {
  main.innerHTML = `
    <div class="d-flex flex-column justify-content-center align-items-center pt-5">
      <h3><span class="display-1">😕</span></h3>
      <h2 class="mt-4">No Definitions Found</h2>
      <p class="mt-4 text-body-secondary text-center">Sorry pal, we couldn't find definitions for the word you were looking for. You can try the search again at later time or head to the web instead.</p>
    </div>
    `
}

function playAudio() {
  console.log("played");
  const audio = document.querySelector("#phonetic-audio");
  audio.play();
}

document.querySelector('#main').addEventListener('click', (e) => {
  if (e.target.classList.contains('icon-play')) {
    playAudio();
  }
});

// click synonyms to call definition(word)
document.querySelector('#main').addEventListener('click', (e) => {
  if (e.target.classList.contains('synonym')) {
    definition(e.target.textContent);
  }
});

// switch font
const dropdownItems = document.querySelectorAll(".dropdown-item");
const fontSwitcherBtn = document.querySelector("#font-switcher-btn")

dropdownItems.forEach(item => {
  item.addEventListener("click", () => {
    let selectedFont = item.getAttribute("data-font");
    let selectedFontName = item.textContent;

    fontSwitcherBtn.textContent = selectedFontName;

    document.body.style.fontFamily = selectedFont;
    console.log(selectedFont);
  })
})

// switch theme
const themeSwitcherInput = document.querySelector('#theme-switcher-input');
const themeIcon = document.querySelector('#theme-icon');

themeSwitcherInput.addEventListener("change", (e) => {
  console.log(e.target.checked);
  if (e.target.checked) {
    document.documentElement.setAttribute('data-bs-theme', 'dark');
    themeIcon.src = './assets/images/icon-moon-active.svg';
  } else {
    document.documentElement.setAttribute('data-bs-theme', 'light');
    themeIcon.src = './assets/images/icon-moon.svg';
  }
})