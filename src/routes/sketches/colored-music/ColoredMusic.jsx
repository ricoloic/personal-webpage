import React, { useEffect } from 'react';
import p5 from 'p5';
import '../../../js/p5/p5.sound';
import {
  Button,
  Checkbox, FormControlLabel, ListItemText,
} from '@material-ui/core';
import Layout from '../../../components/layout';
import kirraAudio from './audio/Kirra.mp3';
import 'p5/lib/addons/p5.dom';
import {
  onClick, onKey, pauseSoundFile, playSoundFile, startMic, stopMic, stopSoundFile,
} from '../audioUtils';
import { COLOR_PALETTES } from '../constants';
import Disclaimer from './Disclaimer';

let fft;
let fftMic;
let mic;
let defaultSoundFile;
let useMic = false;
const bands = 1024;
let fileInfoP = null;
let center = {};

const resetVariables = () => {
  center = {};
  defaultSoundFile = null;
  mic = null;
  fft = null;
  fftMic = null;
  useMic = false;
};

const displayFileInfo = (fileData) => {
  fileInfoP.html(`
    <p>
      <strong style="user-select: none;">File: </strong> ${fileData.file.name}
    </p>
  `);
};

const dropFiles = (p, setIsLooping, setUseMic, tempFile) => {
  p.loadSound(tempFile, (sound) => {
    useMic = false;
    setUseMic(false);
    stopMic(mic);
    stopSoundFile(defaultSoundFile);
    defaultSoundFile = sound;
    fft.setInput(defaultSoundFile);
    defaultSoundFile.setVolume(0.5);
    p.loop();
    setIsLooping(true);
    playSoundFile(defaultSoundFile);
    displayFileInfo(sound);
  });
};

const isMouseOnRightSide = (p) => p.mouseX > p.width / 2;

// eslint-disable-next-line new-cap
const makeSketch = (setIsLooping, setUseMic) => new p5((p) => {
  const NUM_RINGS = 6;
  const RING_GROWTH_RATE = 30;
  const NUM_DOTS = 560;
  const beatState = 0;
  let dimension;
  const c = COLOR_PALETTES.deep.reverse().map(({ color }) => color);
  const times = [0, 0, 0, 0, 0, 0, 0];

  p.windowResized = () => {
    p.resizeCanvas(window.innerWidth, window.innerHeight);
    center.x = p.width / 2;
    center.y = p.height / 2;
  };

  p.preload = () => {
    defaultSoundFile = p.loadSound(kirraAudio);
  };

  p.setup = () => {
    fileInfoP = p.select('#file-info');
    p.createCanvas(window.innerWidth, window.innerHeight).parent('parent');

    dimension = p.min(p.windowWidth / 1.5, p.windowHeight / 1.5);
    const cnv = p.select('canvas');
    cnv.drop(p, setIsLooping, setUseMic, dropFiles);

    center.x = p.width / 2;
    center.y = p.height / 2;

    p.colorMode(p.HSB);
    p.strokeWeight(1);
    p.noLoop();

    mic = new p5.AudioIn();
    fftMic = new p5.FFT(0.7, bands);
    fft = new p5.FFT(0.7, bands);
    fftMic.setInput(mic);
    fft.setInput(defaultSoundFile);
    defaultSoundFile.setVolume(0.5);
    defaultSoundFile.pause();
    displayFileInfo({ file: { name: 'Kirra - CharlestheFirst' } });
  };

  p.draw = () => {
    p.background(255);
    p.translate(p.width / 2, p.height / 2);
    const currFft = useMic ? fftMic : fft;
    if (useMic) fftMic.analyze(); else fft.analyze();

    const sizes = currFft.linAverages(NUM_DOTS / 2); // Number of Dots
    for (let i = 0; i < sizes.length; i++) {
      sizes[i] = p.map(sizes[i], 0, 255, 5.0, 23.0); // scales the FFT values to a good size range
    }

    // Calculate the "volume" at each frequency range to control the speed of rotation for each ring
    const beatLevels = [];
    beatLevels.push(p.map(currFft.getEnergy(16, 60), 0, 255, 0, 1.0));
    beatLevels.push(p.map(currFft.getEnergy(60, 250), 0, 255, 0, 1.0));
    beatLevels.push(p.map(currFft.getEnergy(250, 500), 0, 255, 0, 1.0));
    beatLevels.push(p.map(currFft.getEnergy(500, 2000), 0, 255, 0, 1.0));
    beatLevels.push(p.map(currFft.getEnergy(2000, 4000), 0, 255, 0, 1.0));
    beatLevels.push(p.map(currFft.getEnergy(4000, 6000), 0, 255, 0, 1.0));
    beatLevels.push(p.map(currFft.getEnergy(6000, 20000), 0, 255, 0, 1.0));

    for (let i = 0; i < NUM_RINGS; i++) {
      times[i] += (p.constrain(0.012 * beatLevels[i], 0.0009, 0.012) * (-2 * beatState + 1));
    }

    // Main loop to draw the dots among each frequency ring.
    let curDot = 0;
    for (let i = 1; i < NUM_RINGS + 1; i++) {
      p.fill(c[i - 1]); // Update the color for the current ring

      const ringDotCount = i * RING_GROWTH_RATE;
      const r = ringDotCount * 1.6 * (dimension / 600); // Scale the radius by canvas dimensions

      // Iterate through half of the dots, adding 2 each iteration so that the end result is symmetric
      for (let angleIter = 0; angleIter < ringDotCount / 2; angleIter++) {
        const angle1 = times[i - 1] * (-2 * (i % 2) + 1) + angleIter * (p.TWO_PI / ringDotCount);
        const angle2 = times[i - 1] * (-2 * (i % 2) + 1) - angleIter * (p.TWO_PI / ringDotCount);
        sizes[curDot] **= (i / NUM_RINGS + 0.9); // Scale the sizes exponentially so that the edges are larger

        let x = r * p.sin(angle1);
        let y = r * p.cos(angle1);
        p.circle(x, y, sizes[curDot]);

        x = r * p.sin(angle2);
        y = r * p.cos(angle2);
        p.circle(x, y, sizes[curDot]);

        // Handle the final dot edge case so that curDot is properly handled and there isn't a missing dot
        if (angleIter + 1 === ringDotCount / 2) {
          const angle = times[i - 1] * (-2 * (i % 2) + 1) + (angleIter + 1) * (p.TWO_PI / ringDotCount);
          x = r * p.sin(angle);
          y = r * p.cos(angle);
          p.circle(x, y, sizes[curDot]);
        }

        curDot++;
      }
    }
  };

  // space to stop/play
  // right/left arrow to move through time in sound
  p.keyPressed = () => {
    onKey(p, setIsLooping, defaultSoundFile, useMic, mic);
  };

  // if mouse is on right side of screen, jump the default sound file to 5 second in time
  // if mouse is on left side of screen, rewind the default sound file by 5 second in time
  p.doubleClicked = () => {
    onClick(p, defaultSoundFile, isMouseOnRightSide(p));
  };
});

const ColoredMusic = function () {
  const [sketch, setSketch] = React.useState();
  const [isLooping, setIsLooping] = React.useState(false);
  const [useMicState, setUseMicState] = React.useState(useMic);

  const handleLooping = () => {
    if (isLooping) {
      sketch.noLoop();
      if (useMic) stopMic(mic);
      else pauseSoundFile(defaultSoundFile);
    } else {
      sketch.loop();
      if (useMic) startMic(mic);
      else playSoundFile(defaultSoundFile);
    }

    setIsLooping(!isLooping);
  };

  const handleRefresh = () => {
    setIsLooping(false);

    stopSoundFile(defaultSoundFile);
    stopMic(mic);

    sketch.remove();
    resetVariables();

    const newSketch = makeSketch(setIsLooping, setUseMicState);

    setSketch(newSketch);
  };

  const handleUseMicChange = () => {
    if (!useMic) {
      startMic(mic);
      stopSoundFile(defaultSoundFile);
    } else {
      stopMic(mic);
      playSoundFile(defaultSoundFile);
    }

    sketch.loop();
    setIsLooping(true);
    setUseMicState(!useMicState);
    useMic = !useMic;
  };

  const handleUpload = (e) => {
    const tempFile = e.target.files[0];
    if (tempFile?.name) {
      dropFiles(sketch, setIsLooping, setUseMicState, tempFile);
    }
  };

  useEffect(() => {
    const newSketch = makeSketch(setIsLooping, setUseMicState);

    setSketch(newSketch);

    return () => {
      stopSoundFile(defaultSoundFile);
      stopMic(mic);

      newSketch.remove();
      resetVariables();
    };
  }, []);

  return (
    <Layout
      handleRefresh={handleRefresh}
      isLooping={isLooping}
      handleLooping={handleLooping}
      sketchDescription={<Disclaimer />}
      controls={[
        {
          key: 'Upload File',
          control: (
            <Button
              variant="contained"
              component="label"
              fullWidth
              color="primary"
            >
              Upload File
              <input
                type="file"
                hidden
                onChange={handleUpload}
                accept="audio/*"
              />
            </Button>
          ),
        },
        {
          key: 'Use Microphone',
          control: (
            <FormControlLabel
              label={<ListItemText>Use Microphone</ListItemText>}
              control={(
                <Checkbox
                  checked={useMicState}
                  onChange={handleUseMicChange}
                />
              )}
            />
          ),
        },
      ]}
    >
      <style jsx="true">
        {`
          #file-info {
            position: absolute;
            bottom: 0;
            min-width: 100vw;
            max-width: 100vw;
            margin: 0;
            z-index: 2;
            background: rgba(0, 0, 0, 0.3);
            color: white;
            display: flex;
            flex-wrap: wrap;
            gap: 0.5rem;
            justify-content: space-evenly;
            align-items: center;
            font-size: 1em;
            transition: 0.3s
          }
          #file-info p {
            overflow: hidden;
            position: relative;
            display: inline-block;
            margin: 0.5rem 0.2rem;
            text-align: center;
            text-decoration: none;
            text-overflow: ellipsis;
            white-space: nowrap;
          }
          #file-info:hover {
            background: rgba(0, 0, 0, 0.5);
          }
        `}
      </style>
      <div id="parent" className="sketch-container" />
      <p id="file-info" />
    </Layout>
  );
};

export default ColoredMusic;
