import React from "react";
import "./Navbar.css"; /* optional if you want separate CSS; global styles already support .navbar */

export const Navbar: React.FC = () => {
  return (
    <header className="navbar">
      <div className="brand">
        <span className="logo" />
        <span>Atomic</span>
      </div>

      <nav className="nav-links" aria-label="Main navigation">
        <a href="/">AtomBuilder</a>
        <a href="/playground">Atom Playground</a>
        <a href="/molecule">Molecule Playground</a>
        <a href="/contact">Contact</a>
      </nav>

      <div className="nav-actions">
        <button className="btn">Login</button>
        <button className="btn primary">Sign up</button>
      </div>
    </header>
  );
};

export default Navbar;
