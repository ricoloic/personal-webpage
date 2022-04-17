import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

const useCardStyle = makeStyles({
  card: ({
    img,
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
        transition: 'all 0.15s ease-in-out',
      },
      '& p': {
        display: 'inline-block',
        margin: '0',
        padding: '0.4rem 0.8rem',
        backgroundColor: '#F4ECE6FF',
      },
    };
  },
});

export const Card = function ({ img, route, title }) {
  const classes = useCardStyle({ img });
  return (
    <Link to={`/sketches${route}`} className={classes.card}>
      <p>{title}</p>
    </Link>
  );
};

export default Card;

Card.propTypes = {
  img: PropTypes.string.isRequired,
  route: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
};
