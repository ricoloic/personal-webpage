import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import App from './App';
import './globals.css';
import BlackHole from './routes/sketches/black-hole/BlackHole';
import FlowField from './routes/sketches/flow-field/FlowField';
import IntersectingBubbles from './routes/sketches/intersecting-bubbles/IntersectingBubbles';
import MouseFollow from './routes/sketches/mouse-follow/MouseFollow';
import ChaosGame from './routes/sketches/chaos-game/ChaosGame';

ReactDOM.render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<App />} />
        <Route path="/sketches/mouse-follow" element={<MouseFollow />} />
        <Route path="/sketches/chaos-game" element={<ChaosGame />} />
        <Route path="/sketches/intersecting-bubbles" element={<IntersectingBubbles />} />
        <Route path="/sketches/black-hole" element={<BlackHole />} />
        <Route path="/sketches/flow-field" element={<FlowField />} />
      </Routes>
    </BrowserRouter>
  </React.StrictMode>,
  // eslint-disable-next-line no-undef
  document.getElementById('root'),
);
