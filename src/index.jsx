import React from 'react';
import ReactDOM from 'react-dom';
import {
  BrowserRouter, Route, Routes,
} from 'react-router-dom';
import './globals.css';
import BlackHole from './routes/sketches/black-hole/BlackHole';
import FlowField from './routes/sketches/flow-field/FlowField';
import IntersectingBubbles from './routes/sketches/intersecting-bubbles/IntersectingBubbles';
import MouseFollow from './routes/sketches/mouse-follow/MouseFollow';
import ChaosGame from './routes/sketches/chaos-game/ChaosGame';
import Flocking from './routes/sketches/flocking/Flocking';
import CircularMotion from './routes/sketches/circular-motion/CircularMotion';
import MouseConfetti from './routes/sketches/mouse-confetti/MouseConfetti';
import MaurerRose from './routes/sketches/maurer-rose/MaurerRose';
import AudioSpectrum from './routes/sketches/audio-spectrum/AudioSpectrum';
import Fireworks from './routes/sketches/fireworks/Fireworks';
import RayCasting from './routes/sketches/ray-casting/RayCasting';
import MarchingSquare from './routes/sketches/marching-square/MarchingSquare';
import Sorting from './routes/sketches/sorting/Sorting';
import PrimeSpiral from './routes/sketches/prime-spiral/PrimeSpiral';
import TimesTables from './routes/sketches/times-tables/TimesTables';
import Main from './routes/main';
import Clock from './routes/sketches/clock/Clock';
import ColoredMusic from './routes/sketches/colored-music/ColoredMusic';
import ColorPalettes from './routes/color-palettes';

ReactDOM.render(
  <BrowserRouter>
    <Routes>
      <Route path="/*" element={<Main />} />
      <Route path="/color-palettes" element={<ColorPalettes />} />
      <Route path="/sketches/mouse-follow" element={<MouseFollow />} />
      <Route path="/sketches/chaos-game" element={<ChaosGame />} />
      <Route path="/sketches/intersecting-bubbles" element={<IntersectingBubbles />} />
      <Route path="/sketches/black-hole" element={<BlackHole />} />
      <Route path="/sketches/flow-field" element={<FlowField />} />
      <Route path="/sketches/flocking" element={<Flocking />} />
      <Route path="/sketches/circular-motion" element={<CircularMotion />} />
      <Route path="/sketches/mouse-confetti" element={<MouseConfetti />} />
      <Route path="/sketches/maurer-rose" element={<MaurerRose />} />
      <Route path="/sketches/fireworks" element={<Fireworks />} />
      <Route path="/sketches/audio-spectrum" element={<AudioSpectrum />} />
      <Route path="/sketches/ray-casting" element={<RayCasting />} />
      <Route path="/sketches/marching-square" element={<MarchingSquare />} />
      <Route path="/sketches/sorting" element={<Sorting />} />
      <Route path="/sketches/clock" element={<Clock />} />
      <Route path="/sketches/prime-spiral" element={<PrimeSpiral />} />
      <Route path="/sketches/colored-music" element={<ColoredMusic />} />
      <Route path="/sketches/times-table" element={<TimesTables />} />
    </Routes>
  </BrowserRouter>,
  document.getElementById('root'),
);
