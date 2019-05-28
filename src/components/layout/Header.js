import React from 'react';
import { Link } from 'react-router-dom';
function Header() {
  return (
    <header>
      <Link to="/">Home</Link>
      &nbsp;
      <Link to="/about-us">About</Link>
      &nbsp;
      <Link to="/game">Game</Link>
    </header>
  );
}

export default Header;
