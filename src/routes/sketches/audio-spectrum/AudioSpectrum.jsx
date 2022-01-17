import React, { useEffect } from 'react';
import p5 from 'p5';
import '../../../js/p5/p5.sound';
import { Slider, Typography } from '@material-ui/core';
import Layout from '../../../Layout';
import kirraAudio from './audio/Kirra.mp3';

let fft;
let file;
let layerAmount = 3;
const divider = 5;
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

    fft = new p5.FFT(0.5, bands);
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

    spectrum = fft.analyze();

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

  p.keyPressed = () => {
    if (!file.isLoaded()) return;
    if (p.keyCode === 32) {
      if (file.isPlaying()) {
        p.noLoop();
        file.pause();
      } else {
        p.loop();
        file.play();
      }
    }
  };
});
const AudioSpectrum = function () {
  const [sketch, setSketch] = React.useState();
  const [isLooping, setIsLooping] = React.useState(false);
  const [layerAmountState, setLayerAmountState] = React.useState(layerAmount);

  useEffect(() => {
    const newSketch = makeSketch();

    setSketch(newSketch);

    return () => {
      file.pause();
      file.stop();

      newSketch.remove();
      center = {};
      file = null;
      ninetyDegrees = null;
      layerAmount = 3;
    };
  }, []);

  const handleLooping = () => {
    if (isLooping) {
      sketch.noLoop();
      file.pause();
    } else {
      sketch.loop();
      file.play();
    }
    setIsLooping(!isLooping);
  };

  const handleRefresh = () => {
    setIsLooping(false);

    file.pause();
    file.stop();

    sketch.remove();
    center = {};
    file = null;
    ninetyDegrees = null;

    const newSketch = makeSketch();

    setSketch(newSketch);
  };

  const handleLayerAmountChange = (v) => {
    layerAmount = v;
    setLayerAmountState(v);
  };

  return (
    <Layout
      handleRefresh={handleRefresh}
      isLooping={isLooping}
      handleLooping={handleLooping}
      controls={[
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
      ]}
    >
      <div id="parent" className="sketch-container" />
    </Layout>
  );
};

export default AudioSpectrum;
