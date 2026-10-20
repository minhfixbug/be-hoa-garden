// To add your own photos, put them in dist/photos/ and fill in the paths below.
// Example: { src: './photos/us-at-the-beach.jpg', alt: 'Bé Hoa and me at the beach' }
const photos = [
  { src: '', alt: '' },
  { src: '', alt: '' },
  { src: '', alt: '' },
];

document.querySelectorAll('[data-photo-slot]').forEach((card, index) => {
  const photo = photos[index];
  if (!photo?.src) return;
  const picture = card.querySelector('.picture');
  const image = picture.querySelector('img');
  image.onload = () => {
    image.hidden = false;
    picture.classList.add('has-photo');
  };
  image.onerror = () => {
    image.hidden = true;
    picture.classList.remove('has-photo');
  };
  image.alt = photo.alt || `Kỷ niệm của Bé Hoa, ảnh ${index + 1}`;
  image.src = photo.src;
});

const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
const bloomButton = document.getElementById('bloom-button');
const garden = document.getElementById('garden');
const petalLayer = document.getElementById('petal-layer');
const nextChapter = document.getElementById('next-chapter');
const memories = document.getElementById('memories');
const flowerField = document.getElementById('flower-field');
const walkButterfly = document.getElementById('walk-butterfly');
const walkCount = document.getElementById('walk-count');
const gardenCouple = document.getElementById('garden-couple');
const { flowerHeadSvg, gardenSpecies } = window.BeHoaBotanical;

['peony', 'daisy', 'rose', 'tulip', 'sunflower'].forEach((species, index) => {
  document.querySelectorAll('.hero-art .flower')[index].innerHTML = flowerHeadSvg(species);
});

const flowerPlaces = [
  [3, 18], [9, 49], [2, 76], [16, 25], [20, 62], [27, 12],
  [30, 78], [34, 43], [8, 69], [14, 83], [24, 39], [35, 69],
  [64, 15], [72, 54], [79, 42], [86, 69], [94, 16], [97, 51],
  [69, 81], [82, 83], [89, 39], [74, 11], [99, 74], [66, 59],
  [45, 15], [55, 33], [41, 72], [58, 76], [48, 51], [53, 89],
  [11, 12], [32, 88], [76, 70], [91, 86], [6, 36], [97, 30],
];
const wildflowers = flowerPlaces.map(([x, y], index) => {
  const flower = document.createElement('span');
  const species = gardenSpecies[(index * 3 + Math.floor(index / 7)) % gardenSpecies.length];
  const size = 29 + (index * 11) % 30 + (species === 'sunflower' ? 4 : 0);
  flower.className = `wildflower species-${species}`;
  flower.style.setProperty('--x', `${x}%`);
  flower.style.setProperty('--y', `${y}%`);
  flower.style.setProperty('--size', `${size}px`);
  flower.style.setProperty('--plant-height', `${Math.round(size * (species === 'violet' ? 2.15 : 1.75))}px`);
  flower.style.setProperty('--delay', `${-(index % 7) * .37}s`);
  flower.style.setProperty('--bloom-delay', `${(index % 5) * .09}s`);
  flower.innerHTML = `<span class="wildflower-stem"><i class="wildflower-leaf left"></i><i class="wildflower-leaf right"></i></span><span class="wildflower-head">${flowerHeadSvg(species)}</span>`;
  flowerField.appendChild(flower);
  return flower;
});

function updateWalk() {
  const bounds = memories.getBoundingClientRect();
  const travel = Math.max(1, memories.offsetHeight - window.innerHeight);
  const progress = Math.max(0, Math.min(1, -bounds.top / travel));
  const entrance = Math.max(0, Math.min(1, (window.innerHeight - bounds.top) / (window.innerHeight * 1.35)));
  const openFlowers = Math.min(wildflowers.length, Math.floor(entrance * 12 + progress * (wildflowers.length - 12)));
  wildflowers.forEach((flower, index) => {
    if (index < openFlowers) flower.classList.add('awake');
  });
  memories.style.setProperty('--world-shift', `${progress * 38}px`);
  memories.style.setProperty('--hill-shift', `${progress * 18}px`);
  memories.style.setProperty('--butterfly-x', `${50 + Math.sin(progress * 9) * 11}%`);
  memories.style.setProperty('--butterfly-y', `${22 + progress * 58}%`);
  memories.style.setProperty('--couple-x', `${58 + progress * 20}%`);
  const cardClearance = Math.max(0, Math.min(1, (progress - .04) / .12, (1 - progress) / .17)) * 8;
  memories.style.setProperty('--couple-y', `${60 + progress * 28 + cardClearance}%`);
  memories.style.setProperty('--couple-scale', `${(.58 + progress * .5).toFixed(3)}`);
  memories.style.setProperty('--couple-opacity', `${Math.min(1, entrance * 3)}`);
  walkCount.textContent = `${String(Math.min(3, Math.floor(progress * 3) + 1)).padStart(2, '0')} / 03`;
}

const motionBehavior = () => reducedMotion.matches ? 'auto' : 'smooth';

function scatterPetals(count) {
  if (reducedMotion.matches) return;
  for (let i = 0; i < count; i += 1) {
    const petal = document.createElement('span');
    petal.className = 'falling-petal';
    petal.style.setProperty('--left', `${Math.random() * 100}vw`);
    petal.style.setProperty('--drift', `${Math.random() * 180 - 90}px`);
    petal.style.setProperty('--turn', `${Math.random() * 360}deg`);
    petal.style.setProperty('--duration', `${4 + Math.random() * 3}s`);
    petal.style.animationDelay = `${Math.random() * 1.2}s`;
    petal.style.background = ['#f3a8ad', '#f7c6ab', '#e7c9df', '#f5d1c8'][i % 4];
    petal.addEventListener('animationend', () => petal.remove(), { once: true });
    petalLayer.appendChild(petal);
  }
}

function burstPetals(element, count) {
  if (reducedMotion.matches) return;
  const bounds = element.getBoundingClientRect();
  const x = bounds.left + bounds.width / 2;
  const y = bounds.top + bounds.height / 2;
  for (let i = 0; i < count; i += 1) {
    const angle = (Math.PI * 2 * i) / count + Math.random() * .3;
    const distance = 75 + Math.random() * 130;
    const dx = Math.cos(angle) * distance;
    const dy = Math.sin(angle) * distance;
    const petal = document.createElement('span');
    petal.className = 'burst-petal';
    petal.style.setProperty('--x', `${x}px`);
    petal.style.setProperty('--y', `${y}px`);
    petal.style.setProperty('--dx', `${dx}px`);
    petal.style.setProperty('--dy', `${dy}px`);
    petal.style.setProperty('--dx-end', `${dx * 1.25}px`);
    petal.style.setProperty('--dy-end', `${dy + 145}px`);
    petal.style.setProperty('--petal-color', ['#f2a5ae', '#f7c59f', '#e2cae7', '#ffe4b5'][i % 4]);
    petal.style.animationDelay = `${Math.random() * .18}s`;
    petal.addEventListener('animationend', () => petal.remove(), { once: true });
    petalLayer.appendChild(petal);
  }
}

const flowerTypes = [
  { id: 'rose', name: 'Hồng nhung' },
  { id: 'daisy', name: 'Cúc họa mi' },
  { id: 'violet', name: 'Oải hương' },
  { id: 'peony', name: 'Mẫu đơn' },
  { id: 'tulip', name: 'Tulip đào' },
  { id: 'sunflower', name: 'Hướng dương' },
];
const defaultFlowers = ['rose', 'daisy', 'violet'];
const keepsakeKey = 'be-hoa-garden-keepsakes-v1';
let savedKeepsakes = {};
try { savedKeepsakes = JSON.parse(window.localStorage.getItem(keepsakeKey) || '{}') || {}; } catch { /* Private browsing may disable storage. */ }
const chosenFlowers = Array.from({ length: 3 }, (_, index) => {
  const id = savedKeepsakes.flowers?.[index];
  return flowerTypes.some(flower => flower.id === id) ? id : null;
});
let savedWish = typeof savedKeepsakes.wish === 'string' ? savedKeepsakes.wish.slice(0, 80) : '';
const finale = document.getElementById('garden-finale');
const bouquetCaption = document.getElementById('bouquet-caption');
const bouquetBlooms = [...document.querySelectorAll('[data-bouquet-slot]')];

function saveKeepsakes() {
  try { window.localStorage.setItem(keepsakeKey, JSON.stringify({ flowers: chosenFlowers, wish: savedWish })); } catch { /* The experience still works without persistence. */ }
}

function updateBouquet() {
  bouquetBlooms.forEach((bloom, index) => {
    const flower = flowerTypes.find(item => item.id === (chosenFlowers[index] || defaultFlowers[index]));
    bloom.innerHTML = flowerHeadSvg(flower.id);
    bloom.dataset.type = flower.id;
  });
  const count = chosenFlowers.filter(Boolean).length;
  bouquetCaption.textContent = count === 0
    ? 'Bó hoa này đã chờ em từ đầu khu vườn. Em có thể đổi từng bông ở các kỷ niệm phía trên.'
    : count === 3
      ? 'Ba bông em chọn đã thành một bó hoa chỉ thuộc về Bé Hoa ♡'
      : `Anh đã giữ ${count} bông em chọn trong bó hoa này. Những bông còn lại anh cắm sẵn cho em ♡`;
}

document.querySelectorAll('.memories .card').forEach((card, index) => {
  const picker = document.createElement('div');
  picker.className = 'flower-picker';
  const heading = document.createElement('p');
  heading.className = 'flower-picker-title';
  heading.textContent = 'Em muốn giữ bông nào?';
  const choices = document.createElement('div');
  choices.className = 'flower-choices';
  choices.setAttribute('role', 'group');
  choices.setAttribute('aria-label', `Chọn hoa cho kỷ niệm ${index + 1}`);
  const status = document.createElement('p');
  status.className = 'flower-choice-status';
  status.setAttribute('aria-live', 'polite');
  flowerTypes.forEach(flower => {
    const button = document.createElement('button');
    button.type = 'button';
    button.className = 'flower-choice';
    button.setAttribute('aria-label', `Chọn ${flower.name} cho kỷ niệm ${index + 1}`);
    button.dataset.flower = flower.id;
    button.innerHTML = `<span class="choice-flower" aria-hidden="true">${flowerHeadSvg(flower.id)}</span><span class="choice-label"></span>`;
    button.querySelector('.choice-label').textContent = flower.name;
    button.addEventListener('click', () => {
      chosenFlowers[index] = flower.id;
      saveKeepsakes();
      renderChoice();
      updateBouquet();
      burstPetals(button, 9);
    });
    choices.appendChild(button);
  });
  function renderChoice() {
    choices.querySelectorAll('button').forEach(button => {
      const selected = button.dataset.flower === chosenFlowers[index];
      button.classList.toggle('selected', selected);
      button.setAttribute('aria-pressed', String(selected));
    });
    const selectedFlower = flowerTypes.find(flower => flower.id === chosenFlowers[index]);
    status.textContent = selectedFlower ? `Đã giữ ${selectedFlower.name.toLowerCase()} cho bó hoa của em ♡` : 'Chọn nếu em thích, không cần chọn đủ nhé.';
  }
  picker.append(heading, choices, status);
  card.querySelector('.card-body').appendChild(picker);
  renderChoice();
});
updateBouquet();

const wishForm = document.getElementById('wish-form');
const wishInput = document.getElementById('wish-input');
const wishStar = document.getElementById('wish-star');
const wishResult = document.getElementById('wish-result');
function showWish() {
  wishInput.value = savedWish;
  wishStar.hidden = !savedWish;
  wishResult.textContent = savedWish ? `Ngôi sao của em đang giữ điều ước: “${savedWish}”` : '';
}
showWish();
wishForm.addEventListener('submit', event => {
  event.preventDefault();
  const wish = wishInput.value.trim().replace(/\s+/g, ' ').slice(0, 80);
  if (!wish) { wishInput.focus(); return; }
  savedWish = wish;
  saveKeepsakes();
  showWish();
  wishStar.classList.remove('lit');
  requestAnimationFrame(() => wishStar.classList.add('lit'));
  burstPetals(wishStar, 15);
});

if ('IntersectionObserver' in window && !reducedMotion.matches) {
  finale.classList.add('will-reveal');
  const finaleObserver = new IntersectionObserver((entries, observer) => {
    if (!entries[0]?.isIntersecting) return;
    finale.classList.add('revealed');
    window.setTimeout(() => burstPetals(document.getElementById('keepsake-bouquet'), 20), 1200);
    observer.disconnect();
  }, { threshold: .18 });
  finaleObserver.observe(finale);
}

const petNote = document.getElementById('pet-note');
const petNoteText = document.getElementById('pet-note-text');
let lastPet = null;
[
  ['pet-corgi', 'Gâu! Anh nhờ tớ giữ lại nụ cười của Bé Hoa đấy ♡'],
  ['pet-black', 'Bí mật nhỏ: có Bé Hoa ở đây, khu vườn mới thật sự nở hoa ✿'],
].forEach(([id, message]) => {
  const pet = document.getElementById(id);
  pet.addEventListener('click', () => {
    lastPet = pet;
    petNoteText.textContent = message;
    petNote.hidden = false;
    pet.classList.remove('greeted');
    void pet.offsetWidth;
    pet.classList.add('greeted');
    window.setTimeout(() => pet.classList.remove('greeted'), 1200);
    burstPetals(pet, 8);
  });
});
document.getElementById('pet-note-close').addEventListener('click', () => {
  petNote.hidden = true;
  lastPet?.focus();
});
window.addEventListener('scroll', () => {
  if (petNote.hidden) return;
  const bounds = memories.getBoundingClientRect();
  if (bounds.bottom < 0 || bounds.top > window.innerHeight) petNote.hidden = true;
}, { passive: true });

let bloomStarted = false;
bloomButton.addEventListener('click', () => {
  if (bloomStarted) {
    memories.scrollIntoView({ behavior: motionBehavior() });
    return;
  }
  bloomStarted = true;
  garden.scrollIntoView({ behavior: motionBehavior(), block: 'center' });
  const travelTime = reducedMotion.matches ? 0 : window.innerWidth <= 900 ? 500 : 170;
  window.setTimeout(() => {
    document.body.classList.add('garden-awake');
    garden.classList.add('bloomed');
    bloomButton.setAttribute('aria-expanded', 'true');
    bloomButton.innerHTML = 'Khu vườn đã nở <span aria-hidden="true">♥</span>';
    window.setTimeout(() => burstPetals(garden.querySelector('.bouquet'), 34), reducedMotion.matches ? 0 : 1350);
    window.setTimeout(() => scatterPetals(19), reducedMotion.matches ? 0 : 1550);
    window.setTimeout(() => {
      nextChapter.hidden = false;
      requestAnimationFrame(() => nextChapter.classList.add('ready'));
    }, reducedMotion.matches ? 0 : 2300);
  }, travelTime);
});

nextChapter.addEventListener('click', () => memories.scrollIntoView({ behavior: motionBehavior() }));

if ('IntersectionObserver' in window && !reducedMotion.matches) {
  document.body.classList.add('motion-ready');
  const revealObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
      if (!entry.isIntersecting) return;
      entry.target.classList.add('in-view');
      observer.unobserve(entry.target);
    });
  }, { threshold: .15, rootMargin: '0px 0px -5% 0px' });
  document.querySelectorAll('.section-intro, .chapter-bridge, .letter-section').forEach(element => revealObserver.observe(element));
  const cardObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
      if (!entry.isIntersecting) return;
      entry.target.classList.add('in-view');
      observer.unobserve(entry.target);
    });
  }, { threshold: .4, rootMargin: '0px 0px -4% 0px' });
  document.querySelectorAll('.memories .card').forEach(card => cardObserver.observe(card));
} else {
  document.querySelector('.chapter-bridge').classList.add('in-view');
}

let progressPending = false;
function updateProgress() {
  const maxScroll = Math.max(1, document.documentElement.scrollHeight - window.innerHeight);
  document.documentElement.style.setProperty('--progress', Math.min(1, window.scrollY / maxScroll));
  updateWalk();
  progressPending = false;
}
let coupleStepTimer;
window.addEventListener('scroll', () => {
  if (!reducedMotion.matches) {
    gardenCouple.classList.add('walking');
    window.clearTimeout(coupleStepTimer);
    coupleStepTimer = window.setTimeout(() => gardenCouple.classList.remove('walking'), 200);
  }
  if (progressPending) return;
  progressPending = true;
  requestAnimationFrame(updateProgress);
}, { passive: true });
updateProgress();
window.addEventListener('resize', updateProgress, { passive: true });

if (!reducedMotion.matches && window.matchMedia('(pointer: fine)').matches) {
  garden.addEventListener('pointermove', event => {
    const bounds = garden.getBoundingClientRect();
    garden.style.setProperty('--px', `${((event.clientX - bounds.left) / bounds.width - .5) * 18}px`);
    garden.style.setProperty('--py', `${((event.clientY - bounds.top) / bounds.height - .5) * 14}px`);
  });
  garden.addEventListener('pointerleave', () => {
    garden.style.setProperty('--px', '0px');
    garden.style.setProperty('--py', '0px');
  });
}

const letterButton = document.getElementById('letter-button');
const envelope = document.getElementById('envelope');
const paper = document.getElementById('letter-paper');
letterButton.addEventListener('click', () => {
  const open = envelope.classList.toggle('open');
  document.querySelector('.letter-section').classList.toggle('letter-awake', open);
  letterButton.setAttribute('aria-expanded', String(open));
  paper.setAttribute('aria-hidden', String(!open));
  letterButton.innerHTML = open ? 'Gấp lá thư lại <span aria-hidden="true">↗</span>' : 'Mở lá thư này <span aria-hidden="true">↗</span>';
  if (open) {
    burstPetals(envelope, 24);
    scatterPetals(12);
  }
});
