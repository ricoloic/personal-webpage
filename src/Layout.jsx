import React from 'react';
import PropTypes from 'prop-types';
import './navbar.css';
import { useNavigate } from 'react-router-dom';
import {
  Box,
  Button, Divider, List, ListItem, Popover,
} from '@material-ui/core';
import KeyboardBackspace from '@material-ui/icons/KeyboardBackspace';
import Replay from '@material-ui/icons/Replay';
import Save from '@material-ui/icons/Save';
import Pause from '@material-ui/icons/Pause';
import PlayArrow from '@material-ui/icons/PlayArrow';
import Menu from '@material-ui/icons/Menu';

const Layout = function ({
  children,
  handleRefresh,
  handleSave,
  handleLooping,
  isLooping,
  controls,
}) {
  const anchorEl = React.useRef(null);
  const [open, setOpen] = React.useState(false);
  const navigate = useNavigate();

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
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

          {controls && (
            <>
              <Button onClick={handleOpen} ref={anchorEl}>
                <Menu htmlColor="#fff" fontSize="large" />
              </Button>
              <Popover
                id="controls-menu"
                open={open}
                anchorEl={anchorEl?.current}
                onClose={handleClose}
                anchorOrigin={{
                  vertical: 'bottom',
                  horizontal: 'left',
                }}
              >
                <Box minWidth="100px">
                  <List>
                    {controls.map(({ key, control }, i) => (
                      <React.Fragment key={key}>
                        <ListItem minWidth="100%">
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
        </div>
      </div>
      { children }
    </>
  );
};

export default Layout;

Layout.defaultProps = {
  controls: null,
  handleRefresh: null,
  handleSave: null,
  handleLooping: null,
  isLooping: true,
};

Layout.propTypes = {
  children: PropTypes.node.isRequired,
  controls: PropTypes.arrayOf(PropTypes.shape({
    key: PropTypes.string.isRequired,
    control: PropTypes.node.isRequired,
  })),
  handleRefresh: PropTypes.func,
  handleSave: PropTypes.func,
  handleLooping: PropTypes.func,
  isLooping: PropTypes.bool,
};
