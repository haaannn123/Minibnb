import React, { useState } from "react";
import * as sessionActions from "../../store/session";
import { useDispatch } from "react-redux";
import { useModal } from "../../context/Modal";
import { NavLink } from "react-router-dom";
import "./LoginForm.css";

function LoginFormModal() {
  const dispatch = useDispatch();
  const [credential, setCredential] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState({});
  const { closeModal } = useModal();

  const handleSubmit = (e) => {
    e.preventDefault();
    setErrors({});
    return dispatch(sessionActions.login({ credential, password }))
      .then(closeModal)
      .catch(async (res) => {
        const data = await res.json();
        if (data && data.errors) {
          setErrors({credential: "The provided credentials were invalid."});
        }
      });
  };
  // console.log('Errors:', errors.credential);

  const demoUser = () => {
    return dispatch(sessionActions.login({ credential: "DemoUser", password: "password" }))
      .then(closeModal)
      .catch(async (res) => {
        const data = await res.json();
        if (data && data.errors) {
          setErrors({credential: "The provided credentials were invalid."});
        }
      });
  }

  return (
    <>
    <div className="login-modal-container">
      <h1 >Log In</h1>
      <form onSubmit={handleSubmit}>
      {errors.credential && (
          <p className="credentials-error">{errors.credential}</p>
        )}
        <div className="credentials-container">
        <label>
          <input
            className="credentials-input"
            type="text"
            placeholder="Username or Email"
            value={credential}
            onChange={(e) => setCredential(e.target.value)}
            required
          />
        </label>
        <label>
          <input
            className="credentials-input"
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </label>
        </div>
        <div className="login-button-container">
        <button  className="login-button" type="submit" disabled={credential.length < 4 || password.length < 6}>Log In</button>
        <NavLink onClick={() => demoUser()} to="">Log in as Demo User</NavLink>
        </div>
      </form>
      </div>
    </>
  );
}

export default LoginFormModal;
