import React from 'react';

import NavLink from './nav-link';

const MainNav = () => {
  return (
    <header>
      <nav>
        <NavLink to="/">Home</NavLink> <NavLink to="/sign-in">Sign in</NavLink>{' '}
        <NavLink to="/sign-up">Sign up</NavLink>
      </nav>
    </header>
  );
};

export default MainNav;
