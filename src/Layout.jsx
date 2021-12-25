import React from 'react';
import PropTypes from 'prop-types';
import './navbar.css';
import { useNavigate } from 'react-router-dom';
import BackArrow from './images/back-arrow.svg';
import RefreshArrow from './images/refresh-arrow.svg';

const Layout = function ({ children, handleRefresh, rightComponent }) {
  const navigate = useNavigate();

  const handleGoBack = () => {
    navigate('/');
  };

  return (
    <>
      <div className="navbar">
        <div className="inside-nav">
          <button className="no-btn" type="button" onClick={handleGoBack}>
            <img unselectable="on" alt="back arrow" src={BackArrow} className="back-arrow" />
          </button>
          {handleRefresh && (
            <button className="no-btn" type="button" onClick={handleRefresh}>
              <img unselectable="on" alt="menu" src={RefreshArrow} className="refresh-arrow" />
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
};

Layout.propTypes = {
  children: PropTypes.node.isRequired,
  rightComponent: PropTypes.node,
  handleRefresh: PropTypes.func,
};
