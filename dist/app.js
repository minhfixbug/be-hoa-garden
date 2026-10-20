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

bloomButton.addEventListener('click', () => {
  if (!garden.classList.contains('bloomed')) {
    garden.classList.add('bloomed');
    bloomButton.setAttribute('aria-expanded', 'true');
    bloomButton.innerHTML = 'Hoa nở rồi, Bé Hoa ơi <span aria-hidden="true">♥</span>';
  }
  scatterPetals(23);
  window.setTimeout(() => document.getElementById('memories').scrollIntoView({ behavior: reducedMotion.matches ? 'instant' : 'smooth' }), 1250);
});

const letterButton = document.getElementById('letter-button');
const envelope = document.getElementById('envelope');
const paper = document.getElementById('letter-paper');
letterButton.addEventListener('click', () => {
  const open = envelope.classList.toggle('open');
  letterButton.setAttribute('aria-expanded', String(open));
  paper.setAttribute('aria-hidden', String(!open));
  letterButton.innerHTML = open ? 'Gấp lá thư lại <span aria-hidden="true">↗</span>' : 'Mở lá thư này <span aria-hidden="true">↗</span>';
  if (open) scatterPetals(15);
});
