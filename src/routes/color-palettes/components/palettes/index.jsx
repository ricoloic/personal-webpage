import React from 'react';
import {
  Accordion, AccordionDetails, AccordionSummary, Box, Typography,
} from '@material-ui/core';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import PropTypes from 'prop-types';
import usePalettesStyles from './index.styles';

function ColorPill({
  id, color, rgba, onClick, highlighted,
}) {
  const classes = usePalettesStyles({ color, highlighted });
  return (
    // eslint-disable-next-line jsx-a11y/control-has-associated-label
    <div
      role="button"
      className={classes.colorPill}
      onClick={() => onClick(color, rgba, id)}
      onKeyDown={() => onClick(color, rgba, id)}
      tabIndex={0}
    />
  );
}

function Palettes({
  paletteName, palette, selectedColor, onSelect,
}) {
  const classes = usePalettesStyles();
  return (
    <Accordion className={classes.root}>
      <AccordionSummary
        expandIcon={<ExpandMoreIcon />}
        aria-controls="panel1a-content"
        id="panel1a-header"
      >
        <Typography>{paletteName}</Typography>
      </AccordionSummary>
      <AccordionDetails>
        <Box className={classes.palettes} display="flex" alignItems="center">
          {palette.map(({ color, rgba, id }) => (
            <ColorPill
              key={`${color}-${id}`}
              id={id}
              color={color}
              rgba={rgba}
              onClick={onSelect}
              highlighted={selectedColor.paletteName === paletteName && selectedColor.palette.id === id}
            />
          ))}
        </Box>
      </AccordionDetails>
    </Accordion>
  );
}

export default Palettes;

Palettes.propTypes = {
  paletteName: PropTypes.string.isRequired,
  palette: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.number.isRequired,
    color: PropTypes.string.isRequired,
    rgba: PropTypes.shape({}).isRequired,
  })).isRequired,
  selectedColor: PropTypes.shape({
    paletteName: PropTypes.string.isRequired,
    palette: PropTypes.shape({
      id: PropTypes.number.isRequired,
      color: PropTypes.string.isRequired,
      rgba: PropTypes.shape({}).isRequired,
    }).isRequired,
  }).isRequired,
  onSelect: PropTypes.func.isRequired,
};

ColorPill.propTypes = {
  id: PropTypes.number.isRequired,
  color: PropTypes.string.isRequired,
  rgba: PropTypes.shape({}).isRequired,
  onClick: PropTypes.func.isRequired,
  highlighted: PropTypes.bool.isRequired,
};
