import React from 'react';
import { Link } from 'react-router-dom';
import mouseFollowPreview from './images/previews/mouse-follow-preview.png';
import chaosGamePreview from './images/previews/chaos-game-preview.png';
import intersectingBubblesPreview from './images/previews/intersecting-bubbles-preview.png';
import blackHolePreview from './images/previews/black-hole-preview.png';
import flowFieldPreview from './images/previews/flow-field-preview.png';
import flockingPreview from './images/previews/flocking-preview.png';
import circularMotionPreview from './images/previews/circular-motion-preview.png';
import './main.css';

const getImgStyle = (img) => ({
  backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.6), rgba(0, 0, 0, 0.6)), url(${img})`,
  backgroundSize: 'cover',
  backgroundPosition: 'center',
  backgroundRepeat: 'no-repeat',
});

const Navigation = function () {
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
      <Link to="/sketches/flocking" className="testimonial title" style={{ ...getImgStyle(flockingPreview) }}>
        Hein, are those birds ?
      </Link>
      <Link to="/sketches/circular-motion" className="testimonial title" style={{ ...getImgStyle(circularMotionPreview) }}>
        My head is spinning like CRAZY !! Ahhhhh...
      </Link>
    </main>
  );
};

export default Navigation;
