import React, { useEffect } from 'react';
import p5 from 'p5';
import '../../../js/p5/p5.sound';
import Layout from '../../../Layout';
import kirraAudio from './audio/Kirra.mp3';

let fft;
let file;
const divider = 5;
const bands = 4096;
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

  p.setup = () => {
    p.createCanvas(window.innerWidth, window.innerHeight).parent('parent');

    ninetyDegrees = p.PI / 2;
    center.x = p.width / 2;
    center.y = p.height / 2;

    p.noFill();
    p.stroke(0);
    p.strokeWeight(3);

    fft = new p5.FFT(0.5, bands);
    file = p.loadSound(kirraAudio, (sound) => {
      fft.setInput(sound);
      file.setVolume(0.5);
      file.play();
      p.loop();
    });
  };

  const getPosAndRadius = (spectrumIndex, i) => {
    const currentFreq = spectrum[spectrumIndex];
    const r = 150 + p.map(currentFreq, 0, 255, -50, vSize);
    const a = p.radians(i);
    const x = r * p.cos(a);
    const y = r * p.sin(a);
    return { x, y, r };
  };

  p.draw = () => {
    p.translate(center.x, center.y);
    p.rotate(ninetyDegrees);
    p.background(255);

    spectrum = fft.analyze();

    let smallestR = 5000;

    p.beginShape();
    for (let angle = 359; angle >= 0; angle--) {
      const modAngle = angle % 180;
      const i = angle >= 180 ? modAngle : 179 - modAngle;

      const spectrumIndex = p.floor(i / divider);
      const { x, y, r } = getPosAndRadius(spectrumIndex, angle);
      p.vertex(x, y);

      if (r < smallestR) {
        smallestR = r;
      }
    }
    p.endShape(p.CLOSE);
  };

  p.keyPressed = () => {
    if (p.keyCode === 32) {
      if (file.isPlaying()) {
        file.pause();
      } else {
        file.play();
      }
    } else if (p.keyCode === 78) {
      p.noLoop(); file.pause();
    } else if (p.keyCode === 76) {
      p.loop(); file.play();
    }
  };
});

const AudioSpectrum = function () {
  const [sketch, setSketch] = React.useState();

  useEffect(() => {
    const newSketch = makeSketch();

    setSketch(newSketch);

    return () => {
      sketch.remove();
      center = {};
      ninetyDegrees = null;
    };
  }, []);

  return (
    <Layout>
      <div id="parent" className="sketch-container" />
    </Layout>
  );
};

export default AudioSpectrum;
