const seasonalBackgrounds = [
  { month: 2, day: 4, image: 'lishun.webp' },     // 立春
  { month: 2, day: 19, image: 'usui.webp' },    // 雨水
  { month: 3, day: 5, image: 'keichitsu.webp' },    // 啓蟄
  { month: 3, day: 20, image: 'shunbun.webp' },   // 春分
  { month: 4, day: 4, image: 'seimei.webp' },   // 清明
  { month: 4, day: 20, image: 'kokuu.webp' },      // 穀雨
  { month: 5, day: 5, image: 'lixtuka.webp' },      // 立夏
  { month: 5, day: 21, image: 'shouman.webp' },   // 小満
  { month: 6, day: 5, image: 'boushu.webp' },  // 芒種
  { month: 6, day: 21, image: 'geshi.webp' },    // 夏至
  { month: 7, day: 7, image: 'shousyo.webp' },    // 小暑
  { month: 7, day: 22, image: 'taisho.webp' },     // 大暑
  { month: 8, day: 7, image: 'lishuu.webp' },      // 立秋
  { month: 8, day: 23, image: 'shosho.webp' },    // 処暑
  { month: 9, day: 7, image: 'hakuro.webp' },      // 白露
  { month: 9, day: 22, image: 'shuubun.webp' },    // 秋分
  { month: 10, day: 8, image: 'kanro.webp' },     // 寒露
  { month: 10, day: 23, image: 'soukou.webp' }, // 霜降
  { month: 11, day: 7, image: 'lixtushuu.webp' },    // 立冬
  { month: 11, day: 22, image: 'shousetsu.webp' },  // 小雪
  { month: 12, day: 7, image: 'taishetsu.webp' },     // 大雪
  { month: 12, day: 21, image: 'touji.webp' },  // 冬至
  { month: 1, day: 5, image: 'shoukan.webp' },    // 小寒
  { month: 1, day: 20, image: 'daikan.webp' }      // 大寒
];

function switchLang(lang) {
  document.querySelectorAll('.en, .jp').forEach(el => el.style.display = 'none');
  document.querySelectorAll('.' + lang).forEach(el => el.style.display = 'block');
  document.querySelectorAll('.lang-switch button').forEach(btn => {
    btn.classList.remove('active');
    btn.style.textDecoration = 'none';
  });
  const activeButton = document.querySelector(`.lang-switch button[onclick*="${lang}"]`);
  if (activeButton) {
    activeButton.classList.add('active');
    activeButton.style.textDecoration = 'underline';
  } else {
    console.warn(`Language switch button for '${lang}' not found`);
  }
}

function setSeasonalBackground() {
  const today = new Date();
  const currentMonth = today.getMonth() + 1; // JavaScriptの月は0から始まるので1を加える
  const currentDay = today.getDate();
  
  let currentSeason = seasonalBackgrounds[seasonalBackgrounds.length - 1]; // デフォルトは最後の季節（大寒）

  for (let i = 0; i < seasonalBackgrounds.length; i++) {
    const season = seasonalBackgrounds[i];
    if (
      (currentMonth > season.month) || 
      (currentMonth === season.month && currentDay >= season.day)
    ) {
      currentSeason = season;
    } else {
      break;
    }
  }

  document.body.style.backgroundImage = `url('./images/${currentSeason.image}')`;
}

function initializePortfolio() {
  const portfolioGrid = document.getElementById('portfolioGrid');
  
  portfolioGrid.addEventListener('click', (event) => {
    const portfolioItem = event.target.closest('.portfolio-item');
    if (portfolioItem) {
      const title = portfolioItem.querySelector('h2').textContent;
      const image = portfolioItem.querySelector('img').src;
      const description = portfolioItem.querySelector('p.hidden').textContent;
      const detailDescription = portfolioItem.querySelector('div.hidden').innerHTML;

      openModal(title, image, description, detailDescription);
    }
  });
}

function openModal(title, image, description, detailDescription, list) {
  const modal = document.getElementById('modal');
  const modalTitle = document.getElementById('modalTitle');
  const modalImage = document.getElementById('modalImage');
  const modalDescription = document.getElementById('modalDescription');
  const modalDetailDescription = document.getElementById('modalDetailDescription');

  modalTitle.textContent = title;
  modalImage.src = image;
  modalImage.alt = title;
  modalDescription.textContent = description;
  modalDetailDescription.innerHTML = detailDescription;
  modal.style.display = 'block';
}

function closeModal() {
  const modal = document.getElementById('modal');
  modal.style.display = 'none';
}

function checkSpearlyLoaded() {
  if (document.querySelector('.portfolio-item')) {
    initializePortfolio();
  } else {
    setTimeout(checkSpearlyLoaded, 100);
  }
}

document.addEventListener('DOMContentLoaded', function() {
  setSeasonalBackground();
  switchLang('en');
  checkSpearlyLoaded();

  const closeBtn = document.getElementsByClassName('close')[0];
  closeBtn.onclick = closeModal;

  window.onclick = function(event) {
    if (event.target == document.getElementById('modal')) {
      closeModal();
    }
  }

  document.addEventListener('keydown', function(event) {
    if (event.key === 'Escape' && document.getElementById('modal').style.display === 'block') {
      closeModal();
    }
  });
});