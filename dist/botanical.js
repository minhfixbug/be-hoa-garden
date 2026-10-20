// The same painted flower assets appear in the hero, garden, picker and keepsake bouquet.
(() => {
  const flowerImages = Object.freeze({
    rose: './rose-blush.png',
    daisy: './flower-daisy.webp',
    violet: './flower-violet.webp',
    peony: './flower-peony.webp',
    tulip: './flower-tulip.webp',
    sunflower: './flower-sunflower.webp',
    cosmos: './flower-cosmos.webp',
    hydrangea: './flower-hydrangea.webp',
  });

  // Keep the existing renderer name so all four parts of the garden share one source.
  function flowerHeadSvg(id) {
    const species = Object.hasOwn(flowerImages, id) ? id : 'daisy';
    return `<img class="botanical-svg botanical-${species}" src="${flowerImages[species]}" alt="" aria-hidden="true" draggable="false" decoding="async">`;
  }

  window.BeHoaBotanical = {
    flowerHeadSvg,
    gardenSpecies: ['rose', 'daisy', 'violet', 'peony', 'tulip', 'sunflower', 'cosmos', 'hydrangea'],
  };
})();
