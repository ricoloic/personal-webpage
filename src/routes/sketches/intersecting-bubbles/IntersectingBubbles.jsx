import React, { useEffect } from 'react';
import P5 from 'p5';
import { Bubble } from './bubble';
import Layout from '../../../Layout';

let bubbleAmount = 120;
let bubbles = [];

const makeSketch = () => new P5((p) => {
  p.windowResized = () => {
    p.resizeCanvas(p.windowWidth, p.windowHeight);
  };

  p.setup = () => {
    p.createCanvas(window.innerWidth, window.innerHeight).parent('parent');
    for (let i = 0; i < bubbleAmount; i++) {
      const r = p.random(20, 60);
      const x = p.random((r + r / 2), p.width - (r + r / 2));
      const y = p.random((r + r / 2), p.height - (r + r / 2));
      const b = new Bubble(p, x, y, r, 2);
      bubbles.push(b);
    }

    p.mouseDragged = () => {
      for (let i = bubbles.length - 1; i >= 0; i--) {
        if (bubbles[i].onBubble(p.mouseX, p.mouseY)) {
          bubbles.splice(i, 1);
        }
      }
    };
  };

  p.draw = () => {
    p.background(0);

    bubbles.forEach((b) => {
      b.move();

      if (b.onBubble(p.mouseX, p.mouseY)) {
        b.rect();
      } else {
        b.circle();
      }

      let overlapping = false;
      bubbles.forEach((b2) => {
        if (b !== b2 && b.intersect(b2)) {
          overlapping = true;
        }
      });
      if (overlapping) {
        b.color(200);
      } else {
        b.color(0);
      }
    });
  };
});

const IntersectingBubbles = function () {
  const [sketch, setSketch] = React.useState(null);

  useEffect(() => {
    const newSketch = makeSketch();

    setSketch(newSketch);

    return () => {
      bubbleAmount = 120;
      bubbles = [];
      newSketch.remove();
    };
  }, []);

  const handleBubbleAmountChange = ({ target: { value } }) => {
    sketch.remove();
    bubbles = [];
    bubbleAmount = value;
    const newSketch = makeSketch();
    setSketch(newSketch);
  };

  return (
    <Layout
      rightComponent={(
        <label htmlFor="bubble-amount" style={{ color: 'white' }}>
          Bubble Amount
          <input
            id="bubble-amount"
            type="range"
            min="10"
            max="250"
            value={bubbleAmount}
            onChange={handleBubbleAmountChange}
          />
        </label>
      )}
    >
      <div id="parent" className="sketch-container" />
    </Layout>
  );
};

export default IntersectingBubbles;
