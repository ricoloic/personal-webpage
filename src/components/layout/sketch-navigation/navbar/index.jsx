import React from 'react';
import {
  Box, Button, Divider, List, ListItem, Modal, Popover,
} from '@material-ui/core';
import KeyboardBackspace from '@material-ui/icons/KeyboardBackspace';
import Replay from '@material-ui/icons/Replay';
import Save from '@material-ui/icons/Save';
import Pause from '@material-ui/icons/Pause';
import PlayArrow from '@material-ui/icons/PlayArrow';
import InfoIcon from '@material-ui/icons/Info';
import Menu from '@material-ui/icons/Menu';
import { makeStyles } from '@material-ui/core/styles';
import { useNavbar } from './useNavbar';

const useStyles = makeStyles({
  navbar: {
    position: 'fixed',
    left: 0,
    right: 0,
    top: 0,
    minHeight: '60px',
    backgroundColor: 'hsla(0, 0%, 0%, 0.1)',
    transition: 'background-color 0.3s linear',
    '&:hover': {
      transition: 'background-color 0.5s linear',
      backgroundColor: 'hsla(0, 0%, 0%, 0.5)',
    },
  },
  navbar__inside: {
    minHeight: 'inherit',
    maxHeight: 'inherit',
    display: 'flex',
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  modal__container: {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: '70rem',
    maxWidth: '95vw',
    maxHeight: '80vh',
    overflow: 'auto',
    backgroundColor: '#fff',
    padding: '1.3rem',
    '&:focus-visible': {
      outline: 'none',
    },
  },
});

const Navbar = function () {
  const classes = useStyles();
  const {
    openSketchDescription,
    sketchDescription,
    handleOpenSketchDescription,
    handleCloseSketchDescription,
    openOptions,
    handleOpenOptions,
    handleCloseOptions,
    handleGoBack,
    handleRefresh,
    handleSave,
    handleLooping,
    isLooping,
    controls,
    anchorEl,
  } = useNavbar();

  return (
    <div className={classes.navbar}>
      <div className={classes.navbar__inside}>
        <Button className="btn" onClick={handleGoBack}>
          <KeyboardBackspace htmlColor="#fff" fontSize="large" />
        </Button>

        {handleRefresh && (
        <Button className="btn" onClick={handleRefresh}>
          <Replay htmlColor="#fff" fontSize="large" />
        </Button>
        )}

        {handleSave && (
        <Button className="btn" onClick={handleSave}>
          <Save htmlColor="#fff" fontSize="large" />
        </Button>
        )}

        {handleLooping && (
        <Button className="btn" onClick={handleLooping}>
          {isLooping ? (
            <Pause htmlColor="#fff" fontSize="large" />
          ) : (
            <PlayArrow htmlColor="#fff" fontSize="large" />
          )}
        </Button>
        )}

        {sketchDescription && (
        <Button className="btn" onClick={handleOpenSketchDescription}>
          <InfoIcon htmlColor="#fff" fontSize="large" />
        </Button>
        )}

        {controls && (
        <>
          <Button onClick={handleOpenOptions} ref={anchorEl}>
            <Menu htmlColor="#fff" fontSize="large" />
          </Button>
          <Popover
            id="controls-menu"
            open={openOptions}
            anchorEl={anchorEl?.current}
            onClose={handleCloseOptions}
            anchorOrigin={{
              vertical: 'bottom',
              horizontal: 'left',
            }}
          >
            <Box minWidth="100px" width="300px" maxWidth="100%">
              <List>
                {controls.map(({ key, control }, i) => (
                  <React.Fragment key={key}>
                    <ListItem>
                      <Box width="100%">
                        {control}
                      </Box>
                    </ListItem>
                    {i !== controls.length - 1 && <Divider />}
                  </React.Fragment>
                ))}
              </List>
            </Box>
          </Popover>
        </>
        )}

        <Modal
          open={openSketchDescription}
          onClose={handleCloseSketchDescription}
        >
          <Box className={classes.modal__container}>
            <Box>
              {Array.isArray(sketchDescription) ? sketchDescription.map((description, i) => (
                <React.Fragment key={`${i + 1}`}>
                  {description}
                  {i !== sketchDescription.length - 1 && <br />}
                </React.Fragment>
              )) : sketchDescription}
            </Box>
          </Box>
        </Modal>
      </div>
    </div>
  );
};

export default Navbar;
