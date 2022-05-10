const convert255toHex = (color) => (Math.round(color) + 0x10000).toString(16).substr(-2).toUpperCase();

const hexToRgba = (hex) => {
  const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
  return result ? {
    r: parseInt(result[1], 16),
    g: parseInt(result[2], 16),
    b: parseInt(result[3], 16),
    a: parseInt(result[4], 16),
  } : null;
};

const hslToRgb = function (h, s, v) {
  if (h < 0) h = 0;
  if (s < 0) s = 0;
  if (v < 0) v = 0;
  if (h >= 360) h = 359;
  if (s > 100) s = 100;
  if (v > 100) v = 100;
  s /= 100.0;
  v /= 100.0;
  const C = v * s;
  const hh = h / 60.0;
  const X = C * (1.0 - Math.abs((hh % 2) - 1.0));
  let r = 0;
  let g = 0;
  let b = 0;
  if (hh >= 0 && hh < 1) {
    r = C;
    g = X;
  } else if (hh >= 1 && hh < 2) {
    r = X;
    g = C;
  } else if (hh >= 2 && hh < 3) {
    g = C;
    b = X;
  } else if (hh >= 3 && hh < 4) {
    g = X;
    b = C;
  } else if (hh >= 4 && hh < 5) {
    r = X;
    b = C;
  } else {
    r = C;
    b = X;
  }
  const m = v - C;
  r += m;
  g += m;
  b += m;
  r *= 255.0;
  g *= 255.0;
  b *= 255.0;
  r = Math.round(r);
  g = Math.round(g);
  b = Math.round(b);

  return { r, g, b };
};

export { convert255toHex, hexToRgba, hslToRgb };
