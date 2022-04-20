import React, { useRef } from 'react';
import { Box, Typography } from '@material-ui/core';

function Disclaimer() {
  const w = useRef(window);
  return (
    <Box
      display="flex"
      flexDirection="column"
      justifyContent="space-between"
      alignItems="center"
      mt={0}
      mb={0}
      pt={0}
      pb={0}
    >
      <Box mb={2}>
        <Typography>
          This is not my CODE it was taken from this video
          <br />
          <a href="https://www.maxemitchell.com/code_art/thanksgiving_break/">
            <b style={{ color: 'rgb(197, 138, 249)' }}>maxemitchell.com</b>
          </a>
        </Typography>
      </Box>
      <iframe
        width={(() => (w.current.innerWidth * 0.85 > 1080 ? 1080 : w.current.innerWidth * 0.85))()}
        height={(() => (w.current.innerHeight * 0.60 > 600 ? 600 : w.current.innerHeight * 0.60))()}
        src="https://www.youtube.com/embed/_yXQayoxJOg"
        title="YouTube video player"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        allowFullScreen
      />
    </Box>
  );
}

export default Disclaimer;
