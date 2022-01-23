import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
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

const useStyles = makeStyles({
  container: {
    display: 'grid',
    gap: '1.5rem',
    gridAutoColumns: '1fr',
    paddingTop: '2rem',
    paddingBottom: '2rem',
    width: 'min(95%, 100rem)',
    margin: 'auto',

    '& > a:nth-child(1)': { gridArea: 'one' },
    '& > a:nth-child(2)': { gridArea: 'two' },
    '& > a:nth-child(3)': { gridArea: 'three' },
    '& > a:nth-child(4)': { gridArea: 'four' },
    '& > a:nth-child(5)': { gridArea: 'five' },
    '& > a:nth-child(6)': { gridArea: 'six' },
    '& > a:nth-child(7)': { gridArea: 'seven' },
    '& > a:nth-child(8)': { gridArea: 'eight' },
    '& > a:nth-child(9)': { gridArea: 'nine' },
    '& > a:nth-child(10)': { gridArea: 'ten' },
    '& > a:nth-child(11)': { gridArea: 'eleven' },
    '& > a:nth-child(12)': { gridArea: 'twelve' },

    gridTemplateAreas: `
      "one"
      "two"
      "three"
      "four"
      "five"
      "six"
      "seven"
      "eight"
      "nine"
      "ten"
      "eleven"
      "twelve"
    `,

    '@media (min-width: 33em)': {
      gridTemplateAreas: `
        "one one"
        "two three"
        "four four"
        "five five"
        "six six"
        "seven eight"
        "nine nine"
        "ten eleven"
      `,
    },

    '@media (min-width: 38em)': {
      gridTemplateAreas: `
        "one one"
        "two three"
        "five three"
        "four four"
        "six six"
        "seven eight"
        "seven nine"
        "ten ten"
        "eleven eleven"
      `,
    },

    '@media (min-width: 54em)': {
      gridTemplateAreas: `
        "one one two"
        "five five five"
        "three four four"
        "six six six"
        "seven seven nine"
        "eight eight nine"
        "ten eleven eleven"
      `,
    },

    '@media (min-width: 75em)': {
      gridTemplateAreas: `
        "one one two five"
        "three four four five"
        "eight six six six"
        "eight seven seven nine"
        "ten ten eleven eleven"
      `,
    },
  },
});

export const SketchesCards = function () {
  const classes = useStyles();
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
      </main>
    </Grid>
  );
};

export default SketchesCards;
