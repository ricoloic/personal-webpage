import React from 'react';
import { Grid } from '@material-ui/core';
import audioSpectrumPreview from '../../../images/previews/audio-spectrum-preview.png';
import { Card } from './card';
import mouseFollowPreview from '../../../images/previews/mouse-follow-preview.png';
import chaosGamePreview from '../../../images/previews/chaos-game-preview.png';
import intersectingBubblesPreview from '../../../images/previews/intersecting-bubbles-preview.png';
import blackHolePreview from '../../../images/previews/black-hole-preview.png';
import flowFieldPreview from '../../../images/previews/flow-field-preview.png';
import flockingPreview from '../../../images/previews/flocking-preview.png';
import circularMotionPreview from '../../../images/previews/circular-motion-preview.png';
import mouseConfettiPreview from '../../../images/previews/mouse-confetti-preview.png';
import maurerRosePreview from '../../../images/previews/maurer-rose-preview.png';
import fireworksPreview from '../../../images/previews/fireworks-preview.png';
import rayCastingPreview from '../../../images/previews/ray-casting-preview.png';
import marchingSquarePreview from '../../../images/previews/marching-square-preview.png';
// import sortingPreview from '../../../images/previews/sorting-preview.png';
import clockPreview from '../../../images/previews/clock-preview.png';
import timesTablesPreview from '../../../images/previews/times-tables-preview.png';
import useSketchCardsStyles from './useSketchCardsStyles';

export const SketchesCards = function () {
  const classes = useSketchCardsStyles();
  return (
    <Grid item xs={12}>
      <main className={classes.container}>
        <Card
          img={mouseFollowPreview}
          route="/mouse-follow"
          title="A mouse following experience that is not only fun, but also average"
        />
        <Card
          img={chaosGamePreview}
          route="/chaos-game"
          title="An ordered chaos that creates shapes"
        />
        <Card
          img={intersectingBubblesPreview}
          route="/intersecting-bubbles"
          title="Colorful bubbles bouncing around and intersecting with stuff"
        />
        <Card
          img={blackHolePreview}
          route="/black-hole"
          title="Never seen a black hole before? Here is your chance to see it.."
        />
        <Card
          img={flowFieldPreview}
          route="/flow-field"
          title="A flow field as beautiful as the ocean"
        />
        <Card
          img={flockingPreview}
          route="/flocking"
          title="Hein, are those birds ?"
        />
        <Card
          img={circularMotionPreview}
          route="/circular-motion"
          title="My head is spinning like CRAZY !! Ahhhhh..."
        />
        <Card
          img={mouseConfettiPreview}
          route="/mouse-confetti"
          title="So many confetties, I think I'm in heaven now"
        />
        <Card
          img={maurerRosePreview}
          route="/maurer-rose"
          title="This Rose is so beautiful, I can't stop thinking about it"
        />
        <Card
          img={audioSpectrumPreview}
          route="/audio-spectrum"
          title="What ! the sound is moving ?!"
        />
        <Card
          img={fireworksPreview}
          route="/fireworks"
          title="Fireworks !!"
        />
        <Card
          img={rayCastingPreview}
          route="/ray-casting"
          title="Ray casting"
        />
        <Card
          img={marchingSquarePreview}
          route="/marching-square"
          title="Marching square"
        />
        {/* <Card */}
        {/*  img={sortingPreview} */}
        {/*  route="/sorting" */}
        {/*  title="Visualize multiple sorting algorithms" */}
        {/* /> */}
        <Card
          img={clockPreview}
          route="/clock"
          title="A Beautiful clock visual"
        />
        <Card
          img={timesTablesPreview}
          route="/times-tables"
          title="Times Tables - Cardioid"
        />
      </main>
    </Grid>
  );
};

export default SketchesCards;
