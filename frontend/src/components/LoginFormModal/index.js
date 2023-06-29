import React, { useState } from "react";
import * as sessionActions from "../../store/session";
import { useDispatch } from "react-redux";
import { useModal } from "../../context/Modal";
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


  const demoUser = () => {
    return dispatch(sessionActions.login({ credential: "DemoUser", password: "coolbeans123" }))
      .then(closeModal)
      .catch(async (res) => {
        const data = await res.json();
        if (data && data.errors) {
          setErrors({credential: "The provided credentials were invalid."});
        }
      });
  }

  return (
      <form onSubmit={handleSubmit}>
          <div className="login-modal-container">
          <h1 className="login-modal-header" >Log In</h1>
          <span>Welcome to Minibnb</span>
          {errors.credential && (
              <p className="credentials-error">{errors.credential}</p>
            )}
            <div className="credentials-container">
                <input
                    className="credentials-input bottom"
                    type="text"
                    placeholder="Username or Email"
                    value={credential}
                    onChange={(e) => setCredential(e.target.value)}
                    required
                  />
                  <input
                    className="credentials-input top"
                    type="password"
                    placeholder="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                  />
            </div>
            <div className="login-button-container">
            <button  className="login-button" type="submit" >Log In</button>
            <div className="divider">
                <div className="line"></div>
                <span className="or">or</span>
                <div className="line"></div>
            </div>
            <button className="demo-user-button" onClick={demoUser}>Log in as Demo User</button>
            </div>
          </div>
      </form>
  );
}

export default LoginFormModal;
