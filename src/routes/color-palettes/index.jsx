import React from 'react';
import { TwitterPicker } from 'react-color';
import { Box } from '@material-ui/core';

const initialColors = [
  '#FF6900',
  '#FCB900',
  '#7BDCB5',
  '#00D084',
  '#8ED1FC',
  '#0693E3',
  '#ABB8C3',
  '#EB144C',
  '#F78DA7',
  '#9900EF',
];

function ColorPalettes() {
  const [selectedColor, setSelectedColor] = React.useState(initialColors[0]);
  const [colors] = React.useState(initialColors);

  return (
    <Box
      width="100%"
      height="100%"
      display="flex"
      justifyContent="center"
      alignItems="center"
      sx={{
        position: 'absolute',
        top: '0',
        bottom: '0',
        right: '0',
        left: '0',
        backgroundColor: selectedColor,
      }}
    >
      <TwitterPicker
        colors={colors}
        triangle="hide"
        onChange={(color) => setSelectedColor(color.hex)}
        onChangeComplete={(color) => console.log(color.hex)}
      />
    </Box>
  );
}

export default ColorPalettes;
