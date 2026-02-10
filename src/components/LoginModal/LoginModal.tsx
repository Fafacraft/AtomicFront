import React from "react";
import "./LoginModal.css";
import { useState } from "react";

type Props = {
  open: boolean;
  isSignup: boolean;
  onClose: () => void;
  onToggleSignup: () => void;
};

export const LoginModal: React.FC<Props> = ({
  open,
  isSignup,
  onClose,
  onToggleSignup
}) => {

  if (!open) return null;

  return (
    <>
    <div className="modal-overlay" onClick={onClose}>
        <div className="modal" onClick={(e) => e.stopPropagation()}>
          <button className="close-btn" id="closeModal" onClick={onClose}>×</button>

          <h2 id="modalTitle">{isSignup ? "Sign Up" : "Login"}</h2>

          <form id="authForm">
            <div className="input-group" id="usernameGroup">
              <label>Username</label>
              <input type="text" placeholder="Your username" />
            </div>

            {isSignup && (
              <div className="input-group">
                <label>Email</label>
                <input type="email" placeholder="you@example.com" required />
              </div>
            )}

            <div className="input-group">
              <label>Password</label>
              <input type="password" placeholder="••••••••" required />
            </div>

            <button type="submit" className="primary-btn">Submit</button>
          </form>

          <p className="switch">
            <span id="switchText">{isSignup ? "Already have an account?" : "Don't have an account?"}</span>
            <button id="switchMode" type="button" onClick={onToggleSignup}>{isSignup ? "Login" : "Sign up"}</button>
          </p>
        </div>
      </div>
    </>
  );
};

export default LoginModal;
