import React from 'react';
import PropTypes from 'prop-types';
import './navbar.css';
import { useNavigate } from 'react-router-dom';
import {
  Box,
  Button, Divider, List, ListItem, Modal, Popover,
} from '@material-ui/core';
import KeyboardBackspace from '@material-ui/icons/KeyboardBackspace';
import Replay from '@material-ui/icons/Replay';
import Save from '@material-ui/icons/Save';
import Pause from '@material-ui/icons/Pause';
import PlayArrow from '@material-ui/icons/PlayArrow';
import Menu from '@material-ui/icons/Menu';
import InfoIcon from '@material-ui/icons/Info';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles({
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

const Layout = function ({
  children,
  sketchDescription,
  handleRefresh,
  handleSave,
  handleLooping,
  isLooping,
  controls,
}) {
  const classes = useStyles();
  const [openSketchDescription, setOpenSketchDescription] = React.useState(!!sketchDescription);
  const anchorEl = React.useRef(null);
  const [openOptions, setOpenOptions] = React.useState(false);
  const navigate = useNavigate();

  const handleOpenOptions = () => {
    setOpenOptions(true);
  };

  const handleCloseOptions = () => {
    setOpenOptions(false);
  };

  const handleOpenSketchDescription = () => {
    setOpenSketchDescription(true);
  };

  const handleCloseSketchDescription = () => {
    setOpenSketchDescription(false);
  };

  const handleGoBack = () => {
    navigate('/');
  };

  return (
    <>
      <div className="navbar">
        <div className="inside-nav">
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
      { children }
    </>
  );
};

export default Layout;

Layout.defaultProps = {
  controls: null,
  sketchDescription: null,
  handleRefresh: null,
  handleSave: null,
  handleLooping: null,
  isLooping: true,
};

Layout.propTypes = {
  children: PropTypes.node.isRequired,
  sketchDescription: PropTypes.oneOfType([PropTypes.string, PropTypes.arrayOf(PropTypes.string)]),
  controls: PropTypes.arrayOf(PropTypes.shape({
    key: PropTypes.string.isRequired,
    control: PropTypes.node.isRequired,
  })),
  handleRefresh: PropTypes.func,
  handleSave: PropTypes.func,
  handleLooping: PropTypes.func,
  isLooping: PropTypes.bool,
};
