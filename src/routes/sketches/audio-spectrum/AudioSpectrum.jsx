import React, { useEffect } from 'react';
import p5 from 'p5';
import '../../../js/p5/p5.sound';
import {
  Button,
  Checkbox, FormControlLabel, ListItemText, Slider,
} from '@material-ui/core';
import Index from '../../../components/layout';
import kirraAudio from './audio/Kirra.mp3';
import 'p5/lib/addons/p5.dom';

import {
  drawSpectrum, jumpSoundFile, pauseSoundFile, playSoundFile, startMic, stopMic, stopSoundFile,
} from './sketch';

let fft;
let fftMic;
let mic;
let defaultSoundFile;
let useMic = false;
let layerAmount = 3;
let divider = 2;
const bands = 1024;
const borderWeight = 5;
let spectrum = null;
let minSpectrumSize = -50;
let maxSpectrumSize = 160;
let baseSize = 150;
let fileInfoP = null;
let ninetyDegrees = null;
let center = {};

const resetVariables = () => {
  center = {};
  defaultSoundFile = null;
  mic = null;
  fft = null;
  fftMic = null;
  ninetyDegrees = null;
  useMic = false;
  baseSize = 150;
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
  // const cnv = null;
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

    const cnv = p.select('canvas');
    cnv.drop(p, setIsLooping, setUseMic, dropFiles);

    ninetyDegrees = p.PI / 2;
    center.x = p.width / 2;
    center.y = p.height / 2;

    p.colorMode(p.HSB);
    p.noFill();
    p.strokeWeight(borderWeight);
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

    p.translate(center.x, center.y);
    p.rotate(ninetyDegrees);

    if (useMic) {
      spectrum = fftMic.analyze();
    } else {
      spectrum = fft.analyze();
    }

    drawSpectrum(p, {
      spectrum,
      layerAmount,
      divider,
      borderWeight,
      baseSize,
      spectrumSize: [minSpectrumSize, maxSpectrumSize],
    });
  };

  // if mouse is on right side of screen, jump the default sound file to 5 second in time
  // if mouse is on left side of screen, rewind the default sound file by 5 second in time
  p.doubleClicked = () => {
    if (!defaultSoundFile?.isPlaying()) return;
    const currentTime = defaultSoundFile.currentTime();
    if (isMouseOnRightSide(p)) {
      if (currentTime + 5 > defaultSoundFile.duration()) return;
      jumpSoundFile(defaultSoundFile, currentTime + 5);
    } else {
      if (currentTime - 5 < 0) return;
      jumpSoundFile(defaultSoundFile, currentTime - 5);
    }
  };
});

const AudioSpectrum = function () {
  const [sketch, setSketch] = React.useState();
  const [isLooping, setIsLooping] = React.useState(false);
  const [layerAmountState, setLayerAmountState] = React.useState(layerAmount);
  const [useMicState, setUseMicState] = React.useState(useMic);
  const [dividerState, setDividerState] = React.useState(divider);
  const [baseSizeState, setBaseSizeState] = React.useState(baseSize);
  const [spectrumSize, setSpectrumSize] = React.useState([minSpectrumSize, maxSpectrumSize]);

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

  const handleLayerAmountChange = (v) => {
    layerAmount = v;
    setLayerAmountState(v);
  };

  const handleDividerChange = (v) => {
    setDividerState(v);
    divider = v;
  };

  const handleBaseSizeChange = (v) => {
    setBaseSizeState(v);
    baseSize = v;
  };

  const handleSpectrumSizeChange = ([min, max]) => {
    setSpectrumSize([min, max]);
    minSpectrumSize = min;
    maxSpectrumSize = max;
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
    <Index
      handleRefresh={handleRefresh}
      isLooping={isLooping}
      handleLooping={handleLooping}
      sketchDescription={`
        This is an audio visualizer that uses the p5.js sound library.
        It uses the mic or the default sound file to analyze the audio.
        The audio is analyzed and the spectrum is drawn.
        You can change the options/controls for drawing the spectrum by clicking the settings Icon.
        You can also upload a sound file to play instead of the default sound file.
        You can fast forward or rewind the sound file by double clicking on right or left side of the screen.
      `}
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
        {
          key: 'Base Size',
          control: (
            <>
              <ListItemText>Base Size</ListItemText>
              <Slider
                value={baseSizeState}
                onChange={(e, v) => handleBaseSizeChange(v)}
                min={50}
                max={300}
                step={10}
                defaultValue={150}
                valueLabelDisplay="auto"
              />
            </>
          ),
        },
        {
          key: 'Spectrum Size',
          control: (
            <>
              <ListItemText>Spectrum Size</ListItemText>
              <Slider
                value={spectrumSize}
                onChange={(e, v) => handleSpectrumSizeChange(v)}
                min={-200}
                max={320}
                step={5}
                defaultValue={160}
                valueLabelDisplay="auto"
              />
            </>
          ),
        },
        {
          key: 'Layer Amount',
          control: (
            <>
              <ListItemText>Layer Amount</ListItemText>
              <Slider
                value={layerAmountState}
                onChange={(e, v) => handleLayerAmountChange(v)}
                min={1}
                max={10}
                step={1}
                defaultValue={3}
                valueLabelDisplay="auto"
              />
            </>
          ),
        },
        {
          key: 'Divider',
          control: (
            <>
              <ListItemText>Divider</ListItemText>
              <Slider
                value={dividerState}
                onChange={(e, v) => handleDividerChange(v)}
                min={1}
                max={5}
                step={1}
                defaultValue={5}
                valueLabelDisplay="auto"
              />
            </>
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
    </Index>
  );
};

export default AudioSpectrum;
