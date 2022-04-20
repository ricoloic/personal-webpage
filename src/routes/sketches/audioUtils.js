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

const onKey = (p, setIsLooping, soundFile, useMic, mic) => {
  if (p.keyCode === 32 && soundFile) {
    if (soundFile.isPlaying()) {
      p.noLoop();
      setIsLooping(false);
      if (useMic) stopMic(mic);
      else pauseSoundFile(soundFile);
    } else {
      p.loop();
      setIsLooping(true);
      if (useMic) startMic(mic);
      else playSoundFile(soundFile);
    }
  }

  if (!soundFile?.isPlaying()) return;
  const currentTime = soundFile.currentTime();
  if (p.keyCode === p.LEFT_ARROW) {
    if (currentTime - 5 < 0) return;
    jumpSoundFile(soundFile, currentTime - 5);
  } else if (p.keyCode === p.RIGHT_ARROW) {
    if (currentTime + 5 > soundFile.duration()) return;
    jumpSoundFile(soundFile, currentTime + 5);
  }
};

const onClick = (p, soundFile, isRight) => {
  if (!soundFile?.isPlaying()) return;
  const currentTime = soundFile.currentTime();
  if (isRight) {
    if (currentTime + 5 > soundFile.duration()) return;
    jumpSoundFile(soundFile, currentTime + 5);
  } else {
    if (currentTime - 5 < 0) return;
    jumpSoundFile(soundFile, currentTime - 5);
  }
};

export {
  playSoundFile, pauseSoundFile, stopSoundFile, startMic, stopMic, jumpSoundFile, onKey, onClick,
};
