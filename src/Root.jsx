import React from 'react';
import {
  Grid,
} from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import loic from './images/photos/loic.webp';
import { Sketches } from './Sketches';

const useStyles = makeStyles({
  self: {
    backgroundColor: '#f4ece6',
    padding: '2rem',
  },
  img: {
    width: '100%',
    maxWidth: '300px',
    aspectRatio: 1,
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
  link: {
    textDecoration: 'underline',
    color: '#000',
    fontWeight: 'bold',
  },
  line: {
    border: '1px solid #333',
  },
  about: {
    backgroundColor: '#DBCFC4',
    padding: '2rem',
  },
  about__title: {
    fontSize: '2rem',
    fontWeight: 'bold',
    marginTop: '1rem',
    marginBottom: '1rem',
    marginLeft: '0.5rem',
  },
  about__description: {
    maxWidth: '90rem',
    fontSize: '1rem',
    marginLeft: '1rem',
    marginRight: '1rem',
  },
});

const age = (() => { // birthday is a date
  const ageDifMs = Date.now() - new Date('2002-09-23').getTime();
  const ageDate = new Date(ageDifMs); // milliseconds from epoch
  return Math.abs(ageDate.getUTCFullYear() - 1970);
})();

const Root = function () {
  const classes = useStyles();

  return (
    <Grid container justifyContent="center" alignItems="center">
      <Grid className={classes.self} container item alignItems="center" xs={12}>
        <Grid container item justifyContent="center" xs={12} sm={5} md={4}>
          <img className={classes.img} src={loic} alt="loic rico" />
        </Grid>
        <Grid item xs={12} sm={7} md={8}>
          <h4 className={classes.name}>
            <a href="https://github.com/ricoloic">Loïc Rico</a>
          </h4>
          <hr className={classes.line} />
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
            <a className={classes.link} href="https://www.codeboxx.biz/">CodeBoxx</a>
            {' '}
            as a full-stack developer.
            I'm passionate about generative art and I love to learn new things.
          </p>
        </Grid>
      </Grid>
      <Grid className={classes.about} container item justifyContent="center" xs={12}>
        <Grid item xs={12} lg={10}>
          <h4 className={classes.about__title}>
            About this page
          </h4>
          <hr className={classes.line} />
          <p className={classes.about__description}>
            This page is a personal website of mine where I can display my creations.
            It was build with
            {' '}
            <a className={classes.link} target="_blank" href="https://reactjs.org/" rel="noreferrer">React</a>
            {' '}
            and
            {' '}
            <a className={classes.link} target="_blank" href="https://p5js.org/" rel="noreferrer">P5</a>
            .
            The source code is available on the
            {' '}
            <a
              className={classes.link}
              target="_blank"
              href="https://github.com/ricoloic/personal-webpage/"
              rel="noreferrer"
            >
              Github Repo
            </a>
            .
            I'm currently working on this page on my free time.
            {' '}
            If you would like to suggest a feature or a bug, feel free to leave a issue on the project repository.
            {' '}
            Before I decided to create this page, I was always finding my self searching for a particular project to show to someone.
            {' '}
            {/* eslint-disable-next-line max-len */}
            And more often than not I wasn't even able to start the project since the person I would be showing it to were not setup to run it locally.
            {' '}
            So I decided to build this page to show my creations to people who are interested in my work.
            {' '}
            I hope you enjoy it.
          </p>
        </Grid>
      </Grid>
      <Grid item xs={12}>
        <Sketches />
      </Grid>
    </Grid>
  );
};

export default Root;
