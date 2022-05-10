import React from 'react';
import { Box } from '@material-ui/core';
import ColorPicker from './components/colorPicker';
import useColorPalettesStyles from './index.styles';
import Palettes from './components/palettes';
import { COLOR_PALETTES } from '../sketches/constants';

function ColorPalettes() {
  const [palettes, setPalettes] = React.useState(Object.entries(COLOR_PALETTES));
  const [selectedColor, setSelectedColor] = React.useState({ paletteName: palettes[0][0], palette: palettes[0][1][0] });
  const classes = useColorPalettesStyles();

  const handleSelectColor = (paletteName, color, rgba, id) => {
    setSelectedColor({ paletteName, palette: { color, rgba, id } });
  };

  const handleChangePalette = (rgba) => {
    const newPalettes = palettes.map((palette) => {
      if (palette[0] === selectedColor.paletteName) {
        return [selectedColor.paletteName, palette[1].map((paletteColor) => {
          if (paletteColor.id === selectedColor.palette.id) {
            return { id: selectedColor.palette.id, rgba, color: `rgba(${rgba.r},${rgba.g},${rgba.b},${rgba.a})` };
          }
          return paletteColor;
        })];
      }
      return palette;
    });
    setPalettes(newPalettes);
  };

  return (
    <Box
      className={`${classes.root}`}
      width="100%"
      height="100%"
      display="flex"
      justifyContent="center"
      alignItems="center"
      pt={4}
      pb={4}
    >
      <Box
        className={`${classes.palettes}`}
        display="flex"
        flexDirection="column"
        justifyContent="center"
        alignItems="center"
      >
        {palettes.map(([paletteName, palette]) => (
          <Palettes
            key={paletteName}
            paletteName={paletteName}
            palette={palette}
            selectedColor={selectedColor}
            onSelect={(color, rgba, id) => handleSelectColor(paletteName, color, rgba, id)}
          />
        ))}
      </Box>
      <ColorPicker
        selectedColor={selectedColor}
        onChangeColor={(rgba) => handleChangePalette(rgba)}
      />
    </Box>
  );
}

export default ColorPalettes;
