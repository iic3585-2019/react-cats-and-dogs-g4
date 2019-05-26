import React from 'react';
import { Link } from 'react-router-dom';
function Header() {
  return (
    <header>
      <Link to="/">Home</Link>
      &nbsp;
      <Link to="/about-us">About</Link>
    </header>
  );
}

export default Header;
