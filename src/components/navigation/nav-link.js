import React from 'react';
import { Link } from '@reach/router';
import cx from 'classnames';

import styles from './nav-link.module.css';

const NavLink = ({ to, children }) => {
  return (
    <Link
      to={to}
      getProps={({ isCurrent }) => {
        return {
          className: cx(styles.link, {
            [`${styles.active}`]: isCurrent,
          }),
        };
      }}
    >
      {children}
    </Link>
  );
};

export default NavLink;
