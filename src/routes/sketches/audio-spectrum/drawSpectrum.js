const getPosAndRadius = (
  p,
  spectrum,
  spectrumIndex,
  i,
  offset,
  baseSize,
  [minSpectrumSize, maxSpectrumSize],
) => {
  const currentFreq = spectrum[spectrumIndex];
  const r = baseSize + p.map(
    currentFreq,
    0,
    255,
    minSpectrumSize,
    maxSpectrumSize,
  ) + offset;
  const a = p.radians(i);
  const x = r * p.cos(a);
  const y = r * p.sin(a);
  return { x, y };
};

const drawSpectrum = (p, {
  spectrum, layerAmount, divider, borderWeight, baseSize, spectrumSize,
}) => {
  for (let k = 0; k < layerAmount; k++) {
    p.stroke(k * 15);
    p.beginShape();
    for (let angle = 359; angle >= 0; angle--) {
      const modAngle = angle % 180;
      const i = angle >= 180 ? modAngle : 179 - modAngle;

      const spectrumIndex = p.floor(i / divider);
      const args = [p, spectrum, spectrumIndex, angle, k * borderWeight, baseSize, spectrumSize];
      const { x, y } = getPosAndRadius(...args);
      p.vertex(x, y);
    }
    p.endShape(p.CLOSE);
  }
};

export default drawSpectrum;
