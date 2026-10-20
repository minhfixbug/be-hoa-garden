// Small hand-drawn SVG flowers, shared by the first bouquet, garden and keepsake bouquet.
(() => {
  const ring = (count, shape, colors, offset = 0) => Array.from({ length: count }, (_, index) =>
    `<path d="${shape}" fill="${colors[index % colors.length]}" stroke="#fff9ed80" stroke-width=".8" transform="rotate(${offset + index * 360 / count} 50 50)"/>`
  ).join('');
  const dots = (count, radius, fill) => Array.from({ length: count }, (_, index) => {
    const angle = index * Math.PI * 2 / count;
    return `<circle cx="${(50 + Math.cos(angle) * radius).toFixed(1)}" cy="${(50 + Math.sin(angle) * radius).toFixed(1)}" r="1.6" fill="${fill}"/>`;
  }).join('');
  const hydrangeaBlossoms = [
    [49, 15], [34, 21], [65, 22], [23, 35], [43, 34], [59, 37], [77, 38],
    [17, 52], [33, 51], [50, 53], [68, 54], [83, 54], [25, 68], [42, 70],
    [59, 72], [75, 69], [36, 84], [54, 85], [67, 82],
  ];
  const hydrangeaColors = ['#b8dbe9', '#c9bde5', '#a9d0e6', '#d8c7eb', '#c5dfe8'];

  const art = {
    rose: () => `
      <path d="M47 12 C32 5 18 15 16 31 C6 42 12 58 20 65 C18 79 29 89 43 88 C54 98 70 91 77 81 C91 77 96 61 87 49 C91 31 79 17 64 16 C59 10 53 10 47 12Z" fill="#c8657d" stroke="#a9526b" stroke-width="1.5"/>
      <path d="M47 13 C32 7 18 20 18 38 C28 35 37 39 43 44 C43 31 49 23 59 20 C56 15 52 13 47 13Z" fill="#f6b3bd" stroke="#cc7189" stroke-width="1.6"/>
      <path d="M55 17 C72 9 85 24 82 41 C76 39 68 40 61 46 C58 33 51 27 44 23 C48 19 51 18 55 17Z" fill="#ed98aa" stroke="#c66480" stroke-width="1.6"/>
      <path d="M18 39 C8 50 18 67 31 74 C35 63 42 56 50 52 C40 44 28 39 18 39Z" fill="#e78ba0" stroke="#bb5975" stroke-width="1.6"/>
      <path d="M82 40 C96 51 85 70 73 75 C68 64 61 57 52 53 C64 45 73 40 82 40Z" fill="#f3a8b4" stroke="#c66480" stroke-width="1.6"/>
      <path d="M31 73 C29 87 46 94 53 86 C66 93 78 83 74 72 C67 73 57 68 51 59 C46 67 39 72 31 73Z" fill="#dc7892" stroke="#ad506c" stroke-width="1.6"/>
      <path d="M31 47 C28 36 40 28 50 32 C59 26 71 33 69 44 C78 53 70 67 60 68 C52 76 38 70 35 62 C25 60 25 51 31 47Z" fill="#d66e88" stroke="#aa4d69" stroke-width="1.3"/>
      <path d="M31 47 C32 37 41 33 49 34 C43 42 43 47 50 51 C43 56 35 54 31 47Z" fill="#f4a8b5"/>
      <path d="M50 34 C59 28 70 37 67 46 C63 50 58 51 52 49 C57 44 56 39 50 34Z" fill="#e98da2"/>
      <path d="M37 57 C43 53 49 53 52 49 C54 59 58 64 64 66 C53 73 41 67 37 57Z" fill="#ef9bad"/>
      <path d="M52 49 C58 50 63 49 67 45 C75 53 67 64 61 65 C58 57 55 53 52 49Z" fill="#bc5874"/>
      <path d="M43 49 C43 40 55 38 61 44 C66 50 61 57 54 57 C47 58 44 53 48 48 C52 44 57 46 56 50" fill="none" stroke="#9f405e" stroke-width="3.4" stroke-linecap="round"/>
      <path d="M25 31 Q31 27 37 31 M66 25 Q72 26 76 32 M26 62 Q31 66 37 65 M67 77 Q61 81 56 78" fill="none" stroke="#ffe2df" stroke-width="2" stroke-linecap="round" opacity=".76"/>`,
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
    hydrangea: () => `
      <path d="M50 8 C77 6 94 29 91 54 C90 78 71 94 49 92 C21 96 7 75 10 51 C10 27 24 11 50 8Z" fill="#a6cbbf" opacity=".72"/>
      ${hydrangeaBlossoms.map(([x, y], index) => {
        const color = hydrangeaColors[index % hydrangeaColors.length];
        const turn = index % 3 * 14 - 14;
        return `<g transform="translate(${x} ${y}) rotate(${turn})" fill="${color}" stroke="#fffaf5" stroke-width=".7">
          <ellipse cy="-5.5" rx="5.5" ry="7"/><ellipse cx="5.5" rx="7" ry="5.5"/>
          <ellipse cy="5.5" rx="5.5" ry="7"/><ellipse cx="-5.5" rx="7" ry="5.5"/>
          <circle r="2.5" fill="#f6dfa4" stroke="none"/>
        </g>`;
      }).join('')}`,
  };

  function flowerHeadSvg(id) {
    const draw = art[id] || art.daisy;
    return `<svg class="botanical-svg botanical-${id}" viewBox="0 0 100 100" aria-hidden="true" focusable="false" xmlns="http://www.w3.org/2000/svg">${draw()}</svg>`;
  }

  window.BeHoaBotanical = { flowerHeadSvg, gardenSpecies: ['rose', 'daisy', 'violet', 'peony', 'tulip', 'sunflower', 'cosmos', 'hydrangea'] };
})();
