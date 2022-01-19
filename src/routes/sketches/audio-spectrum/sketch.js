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

const stopMic = (mic) => {
  if (!mic) return false;
  mic.stop();
  return true;
};

const startMic = (mic) => {
  if (!mic) return false;
  mic.start();
  return true;
};

const stopSoundFile = (soundFile) => {
  if (!soundFile) return false;
  soundFile.stop();
  return !soundFile.isPlaying();
};

const playSoundFile = (soundFile) => {
  if (!soundFile) return false;
  if (soundFile.isPlaying()) return true;
  soundFile.play();
  return soundFile.isPlaying();
};

const pauseSoundFile = (soundFile) => {
  if (!soundFile) return false;
  if (soundFile.isPaused()) return true;
  soundFile.pause();
  return soundFile.isPaused();
};

const jumpSoundFile = (soundFile, time) => {
  if (!soundFile) return false;
  setTimeout(() => {
    Object.assign(soundFile, { _playing: true });
    soundFile.playMode('restart');
  }, 100);
  soundFile.stop();
  soundFile.playMode('sustain');
  soundFile.jump(time);
  return soundFile.isPlaying();
};

// const loopSoundFile = (soundFile) => {
//   if (!soundFile) return false;
//   if (soundFile.isLooping()) return true;
//   soundFile.setLoop(true);
//   return soundFile.isLooping();
// };

export {
  drawSpectrum, playSoundFile, pauseSoundFile, stopSoundFile, startMic, stopMic, jumpSoundFile,
};
