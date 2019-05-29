import React from 'react';
import { Link } from 'react-router-dom';

function Header() {
  return (
    <div className="navbar">
      <div className="link">
        <Link to="/">Home</Link>
      </div>
      <div className="link">
        <Link to="/favorites">Favorites</Link>
      </div>
      <div className="link">
        <Link to="/game">Game</Link>
      </div>
    </div>
  );
}

export default Header;
