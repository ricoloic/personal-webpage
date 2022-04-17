import React from 'react';
import PropTypes from 'prop-types';
import { useLinkStyles } from '../../../routes/main/styles/link';

export const Link = function ({
  children, href, blank,
}) {
  const linkClasses = useLinkStyles();
  return (
    <a
      className={linkClasses.link}
      target={blank ? '_blank' : '_self'}
      href={href}
      rel="noreferrer"
    >
      {children}
    </a>
  );
};

export default Link;

Link.defaultProps = {
  blank: false,
};

Link.propTypes = {
  children: PropTypes.node.isRequired,
  href: PropTypes.string.isRequired,
  blank: PropTypes.bool,
};
