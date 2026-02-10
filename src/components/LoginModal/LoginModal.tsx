import React from "react";
import "./LoginModal.css";
import { useState } from "react";
import { registerUser } from "./LoginModalLogic";

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

    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState<string | null>(null);

    const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    try {
      await registerUser({ username, email, password });
      onClose(); // close modal
    } catch (err: any) {
      console.error(err);
      // show backend message when available (e.g. 409 -> "Email already used")
      const message = err?.message || (err?.body?.message) || "Registration failed";
      setError(message);
    }
    };

  return (
    <>
    <div className="modal-overlay" onClick={onClose}>
        <div className="modal" onClick={(e) => e.stopPropagation()}>
          <button className="close-btn" id="closeModal" onClick={onClose}>×</button>

          <h2 id="modalTitle">{isSignup ? "Sign Up" : "Login"}</h2>

          <form id="authForm" onSubmit={handleSubmit}>
            {error && <div className="auth-error">{error}</div>}
            <div className="input-group" id="usernameGroup">
              <label>Username</label>
              <input type="text" placeholder="Your username" value={username} onChange={(e) => setUsername(e.target.value)} />
            </div>

            {isSignup && (
              <div className="input-group">
                <label>Email</label>
                <input type="email" placeholder="you@example.com" value={email} onChange={(e) => setEmail(e.target.value)} required />
              </div>
            )}

            <div className="input-group">
              <label>Password</label>
              <input type="password" placeholder="••••••••" value={password} onChange={(e) => setPassword(e.target.value)} required />
            </div>

            <button type="submit" className="primary-btn">{isSignup ? "Sign Up" : "Login"}</button>
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
