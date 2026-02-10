import React, { useState } from "react";
import "./Navbar.css";
import { LoginModal } from "../LoginModal/LoginModal";

export const Navbar: React.FC = () => {
  const [authOpen, setAuthOpen] = useState(false);  
  const [signup, setSignup] = useState(false);

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
        <button className="btn" onClick={() => { setAuthOpen(true); setSignup(false); }}>Login</button>
        <button className="btn primary" onClick={() => { setAuthOpen(true); setSignup(true); }}>Sign up</button>
      </div>
      <LoginModal
        open={authOpen}
        isSignup={signup}
        onClose={() => setAuthOpen(false)}
        onToggleSignup={() => setSignup(!signup)}
      />
    </header>
  );
};

export default Navbar;
