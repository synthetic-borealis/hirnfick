import React from 'react';
import { NavLink } from 'react-router-dom';
import './NavBar.scss';

function NavBar() {
  const navLinkClass = ({ isActive }: { isActive: boolean }) => (
    isActive ? 'NavBar__link NavBar__link_active' : 'NavBar__link'
  );
  return (
    <header className="NavBar">
      <nav className="NavBar__link-container">
        <NavLink className={navLinkClass} to="/" end>Home</NavLink>
        <NavLink className={navLinkClass} to="/features">Features</NavLink>
        <NavLink className={navLinkClass} to="/play">Play</NavLink>
        <a
          className="NavBar__link"
          href="https://github.com/synthetic-borealis/hirnfick/"
          target="_blank"
          rel="noreferrer"
        >
          GitHub
        </a>
      </nav>
    </header>
  );
}

export default NavBar;
