const COLOR_PALETTES = {
  happy: [
    'rgb(249, 65, 68)',
    'rgb(243, 114, 44)',
    'rgb(248, 150, 30)',
    'rgb(249, 132, 74)',
    'rgb(249, 199, 79)',
    'rgb(144, 190, 109)',
    'rgb(67, 170, 139)',
    'rgb(77, 144, 142)',
    'rgb(87, 117, 144)',
    'rgb(39, 125, 161)',
  ],
  neon: [
    'rgb(255, 191, 0)',
    'rgb(13, 152, 186)',
    'rgb(255, 0, 255)',
    'rgb(255, 105, 180)',
    'rgb(214, 40, 40)',
  ],
  pastel: [
    'rgb(213,187,177)',
    'rgb(156,196,178)',
    'rgb(201,140,167)',
    'rgb(231,109,131)',
  ],
  vibrant: [
    'rgb(255,90,11)',
    'rgb(251,86,7)',
    'rgb(255,0,110)',
    'rgb(131,56,236)',
    'rgb(58,134,255)',
  ],
};

const hexToRgb = (hex) => {
  const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
  return result ? {
    r: parseInt(result[1], 16),
    g: parseInt(result[2], 16),
    b: parseInt(result[3], 16),
  } : null;
};

export { COLOR_PALETTES, hexToRgb };
export default COLOR_PALETTES;
