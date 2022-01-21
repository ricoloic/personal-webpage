import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

const useCardStyle = makeStyles({
  card: ({
    img,
    // offsetX, offsetY,
  }) => {
    const a = 50;
    const b = 0.5;
    return {
      backgroundImage: `linear-gradient(rgba(${a}, ${a}, ${a}, ${b}), rgba(${a}, ${a}, ${a}, ${b})), url(${img})`,
      backgroundSize: 'cover',
      backgroundPosition: 'center',
      backgroundRepeat: 'no-repeat',
      minHeight: '350px',
      color: 'black',
      padding: '2rem',
      position: 'relative',
      fontSize: '1.5rem',
      transition: 'all 0.15s ease-in-out',
      '&:hover': {
        boxShadow: '0px 0px 10px 0px rgba(0,0,0,0.75)',
        transform: 'translateY(-5px) scale(1.02)',
        transition: 'all 0.25s ease-in-out',
      },
      '& span': {
        padding: '0.4rem',
        backgroundColor: '#F4ECE6FF',
      },
      // '& > div': {
      //   width: '100%',
      //   height: '100%',
      //   position: 'absolute',
      //   border: '3px solid black',
      //   top: `${offsetX}px`,
      //   left: `${offsetY}px`,
      //   zIndex: '10',
      // },
    };
  },
});

export const Card = function ({ img, route, title }) {
  const [dimension] = React.useState(() => {
    const rand1 = Math.random();
    const rand2 = Math.random();
    const rand3 = Math.random();
    const xoff = Math.floor(rand1 * 11 + (rand3 * 10));
    const yoff = Math.floor(rand2 * 11 + (rand3 * 10));
    return {
      offsetX: rand3 > 0.5 ? -xoff : xoff,
      offsetY: rand3 > 0.5 ? -yoff : yoff,
    };
  });
  const classes = useCardStyle({ img, ...dimension });
  return (
    <Link to={`/sketches${route}`} className={classes.card}>
      <span>{title}</span>
      <div />
    </Link>
  );
};

export default Card;

Card.propTypes = {
  img: PropTypes.string.isRequired,
  route: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
};
