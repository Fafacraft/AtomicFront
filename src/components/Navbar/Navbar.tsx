import React, { useEffect } from "react";
import "./navbar.css";
import { LoginModal } from "../LoginModal/LoginModal";
import { verifyAuth } from "../../contexts/UserHelper.js";
import { useAuthData } from "../../contexts/AuthDataContext.js";
import logo from "../../../assets/AtomicLogo.png";

export const Navbar: React.FC = () => {
  const {authOpen, setAuthOpen, signup, setSignup, setUser, isConnected, setIsConnected} = useAuthData();

 
  useEffect(() => {
    // on mount, check for token
    const token = sessionStorage.getItem("authToken");
    // verifyAuth may be async; handle promise and set boolean state
    const check = async () => {
      try {
        const ok = await verifyAuth(token);
        setIsConnected(Boolean(ok));
        const userData = sessionStorage.getItem("user");
        setUser(userData ? JSON.parse(userData) : null);
      } catch {
        setIsConnected(false);
      }
    };
    check();
  });

  return (
    
    <header className="navbar">
      <div className="brand">
        <img src={logo} className="logo" alt="Atomic Logo"/>
        <span>Atomic</span>
      </div>

      <nav className="nav-links" aria-label="Main navigation">
        <a href="/">AtomBuilder</a>
        <a href="/playground">Atom Playground</a>
        <a href="/molecule">Molecule Playground</a>
        <a href="/contact">Contact</a>
      </nav>

      <div className="nav-actions">
        {!isConnected ? (
          <>
            <button className="btn" onClick={() => { setAuthOpen(true); setSignup(false); }}>Login</button>
            <button className="btn primary" onClick={() => { setAuthOpen(true); setSignup(true); }}>Sign up</button>
          </>
        ) : (
          <>
            <span className="nav-user">{sessionStorage.getItem("user") ? JSON.parse(sessionStorage.getItem("user") || "{}").User_Username : ""}</span>
            <button className="btn" id="logoutBtn" onClick={() => {
              // logout
              sessionStorage.removeItem("authToken");
              sessionStorage.removeItem("user");
              setUser(null);
              setIsConnected(false);
            }}>Logout</button>
          </>
        )}
      </div>
      <LoginModal
        open={authOpen}
        isSignup={signup}
        onClose={() => { setAuthOpen(false); verifyAuth(sessionStorage.getItem("authToken")).then(v => setIsConnected(Boolean(v))).catch(() => setIsConnected(false)); }}
        onToggleSignup={() => setSignup(!signup)}
      />
    </header>
  );
};

export default Navbar;
