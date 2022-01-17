import React, { useEffect } from 'react';
import p5 from 'p5';
import '../../../js/p5/p5.sound';
import {
  Checkbox, FormControlLabel, Slider, Typography,
} from '@material-ui/core';
import Layout from '../../../Layout';
import kirraAudio from './audio/Kirra.mp3';

let fft;
let fftMic;
let mic;
let file;
let useMic = false;
let layerAmount = 3;
let divider = 5;
const bands = 4096;
const borderWeight = 5;
let spectrum = null;
const vSize = 160;

let ninetyDegrees = null;
let center = {};

// eslint-disable-next-line new-cap
const makeSketch = () => new p5((p) => {
  p.windowResized = () => {
    p.resizeCanvas(window.innerWidth, window.innerHeight);
    center.x = p.width / 2;
    center.y = p.height / 2;
  };

  p.preload = () => {
    file = p.loadSound(kirraAudio);
  };

  p.setup = () => {
    p.createCanvas(window.innerWidth, window.innerHeight).parent('parent');

    ninetyDegrees = p.PI / 2;
    center.x = p.width / 2;
    center.y = p.height / 2;

    p.colorMode(p.HSB);
    p.noFill();
    p.strokeWeight(borderWeight);
    p.noLoop();

    mic = new p5.AudioIn();
    fftMic = new p5.FFT(0.7, bands);
    fft = new p5.FFT(0.5, bands);
    fftMic.setInput(mic);
    fft.setInput(file);
    file.setVolume(0.5);
    // file.jump(40);
    file.pause();
  };

  const getPosAndRadius = (spectrumIndex, i, offset = 0) => {
    const currentFreq = spectrum[spectrumIndex];
    const r = 150 + p.map(currentFreq, 0, 255, -50, vSize) + offset;
    const a = p.radians(i);
    const x = r * p.cos(a);
    const y = r * p.sin(a);
    return { x, y };
  };

  p.draw = () => {
    p.translate(center.x, center.y);
    p.rotate(ninetyDegrees);
    p.background(255);

    if (useMic) {
      spectrum = fftMic.analyze();
    } else {
      spectrum = fft.analyze();
    }

    for (let k = 0; k < layerAmount; k++) {
      p.stroke(k * 15);
      p.beginShape();
      for (let angle = 359; angle >= 0; angle--) {
        const modAngle = angle % 180;
        const i = angle >= 180 ? modAngle : 179 - modAngle;

        const spectrumIndex = p.floor(i / divider);
        const { x, y } = getPosAndRadius(spectrumIndex, angle, k * borderWeight);
        p.vertex(x, y);
      }
      p.endShape(p.CLOSE);
    }
  };
});
const AudioSpectrum = function () {
  const [sketch, setSketch] = React.useState();
  const [isLooping, setIsLooping] = React.useState(false);
  const [layerAmountState, setLayerAmountState] = React.useState(layerAmount);
  const [useMicState, setUseMicState] = React.useState(useMic);
  const [dividerState, setDividerState] = React.useState(divider);

  useEffect(() => {
    const newSketch = makeSketch();

    setSketch(newSketch);

    return () => {
      file.pause();
      file.stop();

      newSketch.remove();
      center = {};
      file = null;
      mic = null;
      fft = null;
      fftMic = null;
      ninetyDegrees = null;
      layerAmount = 3;
      divider = 5;
      useMic = false;
    };
  }, []);

  const handleLooping = () => {
    if (isLooping) {
      sketch.noLoop();
      if (!useMic) {
        file.pause();
      } else {
        mic.stop();
      }
    } else {
      sketch.loop();
      if (!useMic) {
        file.play();
      } else {
        mic.start();
      }
    }
    setIsLooping(!isLooping);
  };

  const handleRefresh = () => {
    setIsLooping(false);

    file.pause();
    file.stop();
    mic.stop();

    sketch.remove();
    center = {};
    file = null;
    mic = null;
    fft = null;
    fftMic = null;
    ninetyDegrees = null;
    divider = 5;
    useMic = false;

    const newSketch = makeSketch();

    setSketch(newSketch);
  };

  const handleLayerAmountChange = (v) => {
    layerAmount = v;
    setLayerAmountState(v);
  };

  const handleUseMicChange = () => {
    if (!useMic) {
      sketch.loop();
      mic.start();
      file.stop();
    } else {
      sketch.loop();
      mic.stop();
      file.play();
    }
    setIsLooping(true);
    setUseMicState(!useMicState);
    useMic = !useMic;
  };

  const handleDividerChange = (v) => {
    setDividerState(v);
    divider = v;
  };

  return (
    <Layout
      handleRefresh={handleRefresh}
      isLooping={isLooping}
      handleLooping={handleLooping}
      controls={[
        {
          key: 'Use Microphone',
          control: (
            <FormControlLabel
              label="Use Microphone"
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
          key: 'Layer Amount',
          control: (
            <>
              <Typography>layer Amount</Typography>
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
              <Typography>Divider</Typography>
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
      <div id="parent" className="sketch-container" />
    </Layout>
  );
};

export default AudioSpectrum;
