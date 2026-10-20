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

const flowerPlaces = [
  [3, 18], [9, 49], [2, 76], [16, 25], [20, 62], [27, 12],
  [30, 78], [34, 43], [8, 69], [14, 83], [24, 39], [35, 69],
  [64, 15], [72, 54], [78, 28], [86, 69], [94, 16], [97, 51],
  [69, 81], [82, 83], [89, 39], [74, 11], [99, 74], [66, 59],
  [45, 15], [55, 33], [41, 72], [58, 76], [48, 51], [53, 89],
  [11, 12], [32, 88], [76, 70], [91, 86], [6, 36], [97, 30],
];
const flowerColors = ['#f3a2ac', '#ffe3a5', '#d7b9de', '#f7b98d', '#fff4dc'];
const wildflowers = flowerPlaces.map(([x, y], index) => {
  const flower = document.createElement('span');
  const size = 27 + (index * 11) % 31;
  flower.className = 'wildflower';
  flower.style.setProperty('--x', `${x}%`);
  flower.style.setProperty('--y', `${y}%`);
  flower.style.setProperty('--size', `${size}px`);
  flower.style.setProperty('--stem-height', `${Math.round(size * 1.3)}px`);
  flower.style.setProperty('--petal', flowerColors[index % flowerColors.length]);
  flower.style.setProperty('--delay', `${-(index % 7) * .37}s`);
  flower.innerHTML = '<span class="wildflower-leaf"></span><span class="wildflower-leaf right"></span><span class="wildflower-head"><i></i><i></i><i></i><i></i><i></i><i></i><b></b></span>';
  flowerField.appendChild(flower);
  return flower;
});

function updateWalk() {
  const bounds = memories.getBoundingClientRect();
  const travel = Math.max(1, memories.offsetHeight - window.innerHeight);
  const progress = Math.max(0, Math.min(1, -bounds.top / travel));
  const openFlowers = Math.floor(10 + progress * (wildflowers.length - 10));
  wildflowers.forEach((flower, index) => {
    if (index < openFlowers) flower.classList.add('awake');
  });
  memories.style.setProperty('--world-shift', `${progress * 38}px`);
  memories.style.setProperty('--hill-shift', `${progress * 18}px`);
  memories.style.setProperty('--butterfly-x', `${50 + Math.sin(progress * 9) * 11}%`);
  memories.style.setProperty('--butterfly-y', `${22 + progress * 58}%`);
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
window.addEventListener('scroll', () => {
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
