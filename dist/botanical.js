// Small hand-drawn SVG flowers, shared by the first bouquet, garden and keepsake bouquet.
(() => {
  const ring = (count, shape, colors, offset = 0) => Array.from({ length: count }, (_, index) =>
    `<path d="${shape}" fill="${colors[index % colors.length]}" stroke="#fff9ed80" stroke-width=".8" transform="rotate(${offset + index * 360 / count} 50 50)"/>`
  ).join('');
  const dots = (count, radius, fill) => Array.from({ length: count }, (_, index) => {
    const angle = index * Math.PI * 2 / count;
    return `<circle cx="${(50 + Math.cos(angle) * radius).toFixed(1)}" cy="${(50 + Math.sin(angle) * radius).toFixed(1)}" r="1.6" fill="${fill}"/>`;
  }).join('');

  const art = {
    rose: () => `
      ${ring(8, 'M50 9 C63 10 70 23 66 34 C62 47 52 51 45 45 C34 35 37 18 50 9Z', ['#ed9aab', '#df7f96', '#f2afba'])}
      ${ring(6, 'M50 28 C61 25 67 36 63 45 C58 55 49 57 43 51 C36 44 40 32 50 28Z', ['#dc708b', '#ed9ba9'], 17)}
      <circle cx="50" cy="50" r="12" fill="#d9718a"/><path d="M39 52 C39 42 55 37 61 45 C66 53 57 62 48 58 C42 56 43 48 49 46 C54 44 57 48 55 52" fill="none" stroke="#a94b6a" stroke-width="3.2" stroke-linecap="round"/>
      <path d="M35 28 Q41 24 45 28 M63 28 Q57 24 54 28" fill="none" stroke="#ffe1df" stroke-width="2" stroke-linecap="round" opacity=".75"/>`,
    daisy: () => `
      ${ring(12, 'M50 5 C58 9 60 24 57 40 Q50 47 43 40 C40 24 42 9 50 5Z', ['#fffdf0', '#fff5da', '#f7efd7'])}
      <circle cx="50" cy="50" r="17" fill="#f0b951" stroke="#e7a74d" stroke-width="2"/>
      <circle cx="50" cy="50" r="12" fill="#f9d176"/>${dots(9, 8, '#e9a94e')}<circle cx="50" cy="50" r="2" fill="#e9a94e"/>`,
    violet: () => `
      <path d="M50 96 C47 69 51 35 50 8" fill="none" stroke="#5c8d70" stroke-width="4" stroke-linecap="round"/>
      ${Array.from({ length: 10 }, (_, index) => {
        const y = 76 - index * 6.4;
        const spread = 14 - index * .8;
        return `<ellipse cx="${50 - spread}" cy="${y}" rx="9" ry="5.6" transform="rotate(-28 ${50 - spread} ${y})" fill="${index % 2 ? '#a78bc9' : '#c0a3dc'}" stroke="#886ba9" stroke-width=".7"/><ellipse cx="${50 + spread}" cy="${y - 2}" rx="9" ry="5.6" transform="rotate(28 ${50 + spread} ${y - 2})" fill="${index % 2 ? '#d4bdea' : '#ad8ed0'}" stroke="#886ba9" stroke-width=".7"/>`;
      }).join('')}
      <ellipse cx="50" cy="10" rx="8" ry="11" fill="#b599d7"/><path d="M47 86 Q28 78 24 88 M53 78 Q71 69 76 80" fill="none" stroke="#76a47a" stroke-width="3" stroke-linecap="round"/>`,
    peony: () => `
      ${ring(9, 'M50 6 C64 7 71 20 70 34 Q64 48 50 48 Q37 45 31 33 C30 18 37 9 50 6Z', ['#f2a3bd', '#ffd1d7', '#e88fab'])}
      ${ring(7, 'M50 27 C62 26 66 38 61 48 Q51 59 42 52 C36 45 41 32 50 27Z', ['#e889ad', '#f6b4c5'], 12)}
      <circle cx="50" cy="50" r="10" fill="#ffe0b4"/>${dots(7, 6, '#d78d55')}
      <path d="M32 25 Q40 20 44 25 M59 25 Q66 20 70 27" fill="none" stroke="#fff0ea" stroke-width="2" opacity=".8"/>`,
    tulip: () => `
      <path d="M17 31 Q28 34 35 45 L37 13 Q46 21 51 31 Q58 20 65 13 L68 45 Q77 34 84 30 Q83 74 52 87 Q21 76 17 31Z" fill="#ef8c85" stroke="#cb6975" stroke-width="2"/>
      <path d="M35 45 Q39 23 50 30 Q60 23 67 45 Q64 72 51 85 Q39 72 35 45Z" fill="#f9b0a2"/>
      <path d="M18 31 Q28 40 34 62 Q39 73 48 82 Q26 73 18 31Z" fill="#de7881" opacity=".8"/>
      <path d="M83 30 Q72 42 67 64 Q61 75 55 82 Q76 71 83 30Z" fill="#e78386" opacity=".8"/>
      <path d="M49 33 Q45 45 46 58" fill="none" stroke="#ffddd0" stroke-width="3" stroke-linecap="round" opacity=".65"/>`,
    sunflower: () => `
      ${ring(16, 'M50 3 Q60 18 57 37 Q50 43 43 37 Q40 18 50 3Z', ['#ffd36a', '#f5b84c', '#ffe08a'])}
      <circle cx="50" cy="50" r="21" fill="#805943" stroke="#6d4b3c" stroke-width="2"/>
      <circle cx="50" cy="50" r="16" fill="#956344"/>${dots(12, 12, '#e1aa62')}${dots(8, 6, '#f1be77')}<circle cx="50" cy="50" r="2" fill="#e9b777"/>`,
    cosmos: () => `
      ${ring(8, 'M50 8 Q60 13 67 24 L63 38 Q56 47 50 46 Q44 47 37 38 L33 24 Q40 13 50 8Z', ['#f4b8b7', '#e994a6', '#f7c8bd'], 22)}
      <circle cx="50" cy="50" r="15" fill="#f5c767" stroke="#e5a958" stroke-width="2"/>${dots(10, 9, '#e69b4f')}
      <path d="M35 24 L39 28 M64 25 L61 29" stroke="#ffe5d8" stroke-width="2" opacity=".7"/>`,
  };

  function flowerHeadSvg(id) {
    const draw = art[id] || art.daisy;
    return `<svg class="botanical-svg botanical-${id}" viewBox="0 0 100 100" aria-hidden="true" focusable="false" xmlns="http://www.w3.org/2000/svg">${draw()}</svg>`;
  }

  window.BeHoaBotanical = { flowerHeadSvg, gardenSpecies: ['rose', 'daisy', 'violet', 'peony', 'tulip', 'sunflower', 'cosmos'] };
})();
