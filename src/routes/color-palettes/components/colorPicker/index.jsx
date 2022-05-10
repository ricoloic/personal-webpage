/* eslint-disable react/jsx-props-no-spreading,jsx-a11y/label-has-associated-control */
import React, { useEffect } from 'react';
import { CustomPicker } from 'react-color';
import {
  Box, Grid, IconButton,
} from '@material-ui/core';
import { Twitter } from 'react-color/lib/components/twitter/Twitter';
import { Visibility, VisibilityOff } from '@material-ui/icons';
import { Alpha, Hue } from 'react-color/lib/components/common';
import PropTypes from 'prop-types';
import { convert255toHex, hexToRgba, hslToRgb } from '../../utils/convertion';
import useColorPickerStyles from './index.styles';

function CustomPointer() {
  return <div />;
}

function ColorPicker({ selectedColor, onChangeColor, ...props }) {
  const [redHex, setRedHex] = React.useState('ff');
  const [greenHex, setGreenHex] = React.useState('10');
  const [blueHex, setBlueHex] = React.useState('10');
  const [alfaHex, setAlfaHex] = React.useState('ff');

  const setHexes = (hexC) => {
    setRedHex(hexC.charAt(1) + hexC.charAt(2));
    setGreenHex(hexC.charAt(3) + hexC.charAt(4));
    setBlueHex(hexC.charAt(5) + hexC.charAt(6));
  };

  const hex = `#${redHex}${greenHex}${blueHex}${alfaHex}`.toUpperCase();
  const rgba = hexToRgba(hex);

  useEffect(() => {
    const {
      r, g, b, a,
    } = selectedColor.palette.rgba;
    setRedHex(convert255toHex(r));
    setGreenHex(convert255toHex(g));
    setBlueHex(convert255toHex(b));
    setAlfaHex(convert255toHex(a * 255));
  }, [selectedColor]);

  useEffect(() => {
    const chex = `#${redHex}${greenHex}${blueHex}${alfaHex}`.toUpperCase();
    const crgba = hexToRgba(chex);
    onChangeColor({ ...crgba, a: parseInt((alfaHex), 16) / 255 });
  }, [redHex, greenHex, blueHex, alfaHex]);

  const handleChange = (changes) => {
    changes();
  };

  const classes = useColorPickerStyles({ backgroundColor: hex });

  return (
    <Box className={classes.root} flexDirection="column" display="flex" justifyContent="center" alignItems="center">
      <Grid item>
        <div className={classes.colorPicker}><div className={classes.colorPickerDisplayColor} /></div>
      </Grid>
      <Grid item>
        <Twitter
          {...props}
          triangle="hide"
          color={hex}
          onChange={(color) => handleChange(() => setHexes(color.hex))}
        />
      </Grid>
      <Grid className={classes.colorPickerVisibility} item container direction="row" justifyContent="center">
        <Grid item className={`${classes.colorPicker} ${classes.width_100}  ${classes.noSelect}`}>
          <Alpha
            {...props}
            color={hex}
            pointer={CustomPointer}
            onChange={(color) => handleChange(() => setAlfaHex(convert255toHex(color.a * 255)))}
          />
        </Grid>
        <Grid item className={`${classes.colorPicker}`}>
          <IconButton onClick={() => handleChange(() => setAlfaHex(alfaHex === '00' ? 'FF' : '00'))}>
            {alfaHex === '00' ? (
              <VisibilityOff fontSize="medium" className={classes.icon} />
            ) : (
              <Visibility fontSize="medium" className={classes.icon} />
            )}
          </IconButton>
        </Grid>
      </Grid>
      <Grid item className={`${classes.colorPicker} ${classes.height_34} ${classes.noSelect}`}>
        <Hue
          {...props}
          pointer={CustomPointer}
          direction="horizontal"
          color={hex}
          onChange={(color) => handleChange(() => {
            const { r, g, b } = hslToRgb(Math.floor(color.h), 100, 100);
            setRedHex(convert255toHex(r));
            setGreenHex(convert255toHex(g));
            setBlueHex(convert255toHex(b));
          })}
        />
      </Grid>
      <Grid className={classes.colorPickerVisibility} item container direction="row" justifyContent="space-between">
        <Grid item container direction="column" className={`${classes.colorPicker}`}>
          <Grid>
            <p>R</p>
          </Grid>
          <Grid>
            <input
              id="red"
              className={classes.input}
              onChange={({ target }) => handleChange(() => setRedHex(convert255toHex(target.value)))}
              value={rgba.r}
              placeholder="R"
              type="number"
              min={0}
              max={255}
            />
          </Grid>
        </Grid>
        <Grid item container direction="column" className={`${classes.colorPicker}`}>
          <Grid>
            <p>G</p>
          </Grid>
          <Grid>
            <input
              id="green"
              className={classes.input}
              onChange={({ target }) => handleChange(() => setGreenHex(convert255toHex(target.value)))}
              value={rgba.g}
              placeholder="G"
              type="number"
              min={0}
              max={255}
            />
          </Grid>
        </Grid>
        <Grid item container direction="column" className={`${classes.colorPicker}`}>
          <Grid>
            <p>B</p>
          </Grid>
          <Grid>
            <input
              id="blue"
              className={classes.input}
              onChange={({ target }) => handleChange(() => setBlueHex(convert255toHex(target.value)))}
              value={rgba.b}
              placeholder="B"
              type="number"
              min={0}
              max={255}
            />
          </Grid>
        </Grid>
        <Grid item container direction="column" className={`${classes.colorPicker}`}>
          <Grid>
            <p>A</p>
          </Grid>
          <Grid>
            <input
              id="alfa"
              className={classes.input}
              onChange={({ target }) => handleChange(() => setAlfaHex(convert255toHex(target.value)))}
              value={rgba.a}
              placeholder="A"
              type="number"
              min={0}
              max={255}
            />
          </Grid>
        </Grid>
      </Grid>
    </Box>
  );
}

export default CustomPicker(ColorPicker);

ColorPicker.propTypes = {
  selectedColor: PropTypes.shape({
    palette: PropTypes.shape({
      rgba: PropTypes.shape({
        r: PropTypes.number.isRequired,
        g: PropTypes.number.isRequired,
        b: PropTypes.number.isRequired,
        a: PropTypes.number.isRequired,
      }).isRequired,
    }),
  }).isRequired,
  onChangeColor: PropTypes.func.isRequired,
};
