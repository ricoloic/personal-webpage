import React from 'react';
import { Link } from 'react-router-dom';
import mouseFollowPreview from './images/mouse-follow-preview.png';
import chaosGamePreview from './images/chaos-game-preview.png';
import intersectingBubblesPreview from './images/intersecting-bubbles-preview.png';
import blackHolePreview from './images/black-hole-preview.png';
import flowFieldPreview from './images/flow-field-preview.png';
import './main.css';

const getImgStyle = (img) => ({
  backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.6), rgba(0, 0, 0, 0.6)), url(${img})`,
  backgroundSize: 'cover',
  backgroundPosition: 'center',
  backgroundRepeat: 'no-repeat',
});

const App = function () {
  return (
    <main className="gridTestimonial">
      <Link to="/sketches/mouse-follow" className="testimonial title" style={{ ...getImgStyle(mouseFollowPreview) }}>
        A mouse following experience that is not only fun, but also average
      </Link>
      <Link to="/sketches/chaos-game" className="testimonial title" style={{ ...getImgStyle(chaosGamePreview) }}>
        An ordered chaos that creates shapes
      </Link>
      <Link to="/sketches/intersecting-bubbles" className="testimonial title" style={{ ...getImgStyle(intersectingBubblesPreview) }}>
        Colorful bubbles bouncing around and intersecting with stuff
      </Link>
      <Link to="/sketches/black-hole" className="testimonial title" style={{ ...getImgStyle(blackHolePreview) }}>
        Never seen a black hole before? Here is your chance to see it..
      </Link>
      <Link to="/sketches/flow-field" className="testimonial title" style={{ ...getImgStyle(flowFieldPreview) }}>
        A flow field as beautiful as the ocean
      </Link>
    </main>
  );
};

export default App;
