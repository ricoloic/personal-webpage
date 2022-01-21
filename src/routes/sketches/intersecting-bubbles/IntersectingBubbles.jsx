import React, { useEffect } from 'react';
import P5 from 'p5';
import { ListItemText, Slider } from '@material-ui/core';
import { Bubble } from './bubble';
import Layout from '../../../Layout';

let bubbles = [];
let bubbleAmount = 100;

const makeBubble = (p) => {
  const r = p.random(20, 60);
  const x = p.random((r + r / 2), p.width - (r + r / 2));
  const y = p.random((r + r / 2), p.height - (r + r / 2));
  return new Bubble(p, x, y, r, 2);
};

const makeSketch = () => new P5((p) => {
  p.windowResized = () => {
    p.resizeCanvas(p.windowWidth, p.windowHeight);
  };

  p.setup = () => {
    p.createCanvas(window.innerWidth, window.innerHeight).parent('parent');
    p.strokeWeight(2);

    for (let i = 0; i < bubbleAmount; i++) {
      bubbles.push(makeBubble(p));
    }
  };

  p.draw = () => {
    p.background(0);

    bubbles.forEach((b) => {
      b.move();
      b.circle();

      const overlapping = bubbles.some((b2) => b !== b2 && b.intersect(b2));
      if (overlapping) b.color(200);
      else b.color(0);
    });
  };

  p.mouseDragged = () => {
    for (let i = bubbles.length - 1; i >= 0; i--) {
      if (bubbles[i].onBubble()) {
        bubbles.splice(i, 1);
      }
    }
  };
});

const IntersectingBubbles = function () {
  const [sketch, setSketch] = React.useState(null);
  const [bubbleAmountState, setBubbleAmountState] = React.useState(bubbleAmount);

  useEffect(() => {
    const newSketch = makeSketch();

    setSketch(newSketch);

    return () => {
      bubbles = [];
      newSketch.remove();
    };
  }, []);

  const handleRefresh = () => {
    sketch.remove();
    bubbles = [];
    const newSketch = makeSketch();
    setSketch(newSketch);
  };

  const handleBubbleAmountChange = (v) => {
    setBubbleAmountState(v);
    bubbleAmount = v;
    const offsetAmount = bubbleAmount - bubbles.length;
    if (offsetAmount > 0) {
      for (let i = 0; i < offsetAmount; i++) {
        bubbles.push(makeBubble(sketch));
      }
    } else if (offsetAmount < 0) {
      for (let i = 0; i < Math.abs(offsetAmount); i++) {
        bubbles.pop();
      }
    }
  };

  return (
    <Layout
      handleRefresh={handleRefresh}
      sketchDescription={[
        'Intersecting bubbles',
        '',
        'How to use:',
        '1. Click and drag the mouse to remove bubbles',
        '2. Adjust the bubble amount slider - burger menu',
        '3. Refresh the page to regenerate the bubbles - refresh icons',
      ]}
      controls={[
        {
          key: 'Bubble Amount',
          control: (
            <>
              <ListItemText>Bubble Amount</ListItemText>
              <Slider
                value={bubbleAmountState}
                onChange={(e, v) => handleBubbleAmountChange(v)}
                min={10}
                max={250}
                defaultValue={120}
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

export default IntersectingBubbles;
