import React from 'react';
import { Grid } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import loic from '../../../../images/photos/loic.webp';
import { useLineStyles } from '../styles/line';
import { Link } from '../../../reusables/link';

const useStyles = makeStyles({
  self: {
    backgroundColor: '#f4ece6',
    padding: '2rem',
  },
  img: {
    display: 'block',
    maxWidth: '300px',
    maxHeight: '300px',
    width: '100%',
    height: '100%',
    objectFit: 'cover',
    borderRadius: '50%',
    userSelect: 'none',
  },
  name: {
    fontSize: '3rem',
    fontWeight: 'bold',
    marginTop: '0.8rem',
    marginBottom: '0.8rem',
  },
  description: {
    maxWidth: '700px',
    fontSize: '1rem',
    marginLeft: '1rem',
  },
});

const age = (() => {
  const ageDifMs = Date.now() - new Date('2002-09-23').getTime();
  const ageDate = new Date(ageDifMs); // milliseconds from epoch
  return Math.abs(ageDate.getUTCFullYear() - 1970);
})();

export const AboutMe = function () {
  const classes = useStyles();
  const lineClasses = useLineStyles();
  return (
    <Grid className={classes.self} container item alignItems="center" xs={12}>
      <Grid container item justifyContent="center" xs={12} sm={5} md={4}>
        <img className={classes.img} width={300} height={300} src={loic} alt="loic rico" />
      </Grid>
      <Grid className={classes.self__info} item xs={12} sm={7} md={8}>
        <h4 className={classes.name}>
          <a href="https://github.com/ricoloic">Loïc Rico</a>
        </h4>
        <hr className={lineClasses.line} />
        <p className={classes.description}>
          Hi, I'm Loïc Rico, a
          {' '}
          {age}
          {' '}
          years old
          {' '}
          canadian web developer.
          This page is a personal website of mine where I can display my creations.
          I'm currently working at
          {' '}
          <Link href="https://www.codeboxx.biz/">
            Codeboxx
          </Link>
          {' '}
          as a full-stack developer.
          I'm passionate about generative art and I love to learn new things.
        </p>
      </Grid>
    </Grid>
  );
};

export default AboutMe;
