import React from 'react';
import PropTypes from 'prop-types';
import './navbar.css';
import { useNavigate } from 'react-router-dom';
import BackArrow from './images/left-arrow.png';
import RefreshArrow from './images/refresh-icon.png';
import SaveIcon from './images/diskette-icon.png';
import PlayIcon from './images/play-icon.png';
import PauseIcon from './images/pause-icon.png';

const Layout = function ({
  children,
  handleRefresh,
  handleSave,
  rightComponent,
  handleLooping,
  isLooping,
}) {
  const navigate = useNavigate();

  const handleGoBack = () => {
    navigate('/');
  };

  return (
    <>
      <div className="navbar">
        <div className="inside-nav">
          <button className="btn p-2" type="button" onClick={handleGoBack}>
            <img
              unselectable="on"
              alt="back arrow"
              src={BackArrow}
              className="p-2 arrow-icon"
            />
          </button>
          {handleRefresh && (
            <button className="btn p-2" type="button" onClick={handleRefresh}>
              <img unselectable="on" alt="refresh" src={RefreshArrow} className="arrow-icon" />
            </button>
          )}
          {handleSave && (
            <button className="btn p-2" type="button" onClick={handleSave}>
              <img unselectable="on" alt="save" src={SaveIcon} className="arrow-icon" />
            </button>
          )}
          {handleLooping && (
            <button className="btn p-2" type="button" onClick={handleLooping}>
              <img unselectable="on" alt="play pause" src={isLooping ? PauseIcon : PlayIcon} className="arrow-icon" />
            </button>
          )}

          <div className="right-container">
            {rightComponent}
          </div>
        </div>
      </div>
      { children }
    </>
  );
};

export default Layout;

Layout.defaultProps = {
  rightComponent: null,
  handleRefresh: null,
  handleSave: null,
  handleLooping: null,
  isLooping: true,
};

Layout.propTypes = {
  children: PropTypes.node.isRequired,
  rightComponent: PropTypes.node,
  handleRefresh: PropTypes.func,
  handleSave: PropTypes.func,
  handleLooping: PropTypes.func,
  isLooping: PropTypes.bool,
};
