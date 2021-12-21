import React, { useEffect } from 'react';
import P5 from 'p5';
import { Bubble } from './bubble';

let bubbleAmount = 120;
let bubbles = [];

const IntersectingBubbles = function () {
  const [, setSketch] = React.useState(null);

  useEffect(() => {
    const newSketch = new P5((p) => {
      p.windowResized = () => {
        p.resizeCanvas(p.windowWidth, p.windowHeight);
      };

      p.setup = () => {
        p.createCanvas(p.windowWidth, p.windowHeight).parent('parent');
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

    setSketch(newSketch);

    return () => {
      bubbleAmount = 120;
      bubbles = [];
      newSketch.remove();
    };
  }, []);

  return (
    <div id="parent" className="sketch-container" />
  );
};

export default IntersectingBubbles;
