import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useModal } from "../../context/Modal";
import * as sessionActions from "../../store/session";
import { Redirect } from "react-router-dom";
import "./SignupForm.css";

function SignupFormModal() {
  const dispatch = useDispatch();
  const sessionUser = useSelector((state) => state.session.user);
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [errors, setErrors] = useState({});
  const { closeModal } = useModal();

  const handleSubmit = (e) => {
    e.preventDefault();
    let err = {};
    if (password === confirmPassword) {
      setErrors({});
      return dispatch(
        sessionActions.signup({
          email,
          username,
          firstName,
          lastName,
          password,
        })
      )
        .then(closeModal)
        .catch(async (res) => {
          const data = await res.json();
          if (data && data.errors) setErrors(data.errors);
        });
    } else {
      err.confirmPassword = "Confirm Password field must be the same as the Password field";
    }

    setErrors(err)
  };
  
  if (sessionUser) return <Redirect to="/" />;

  return (
      <form onSubmit={handleSubmit}>
      <div className="signup-container-form">
      {errors.email && <p className="errors">{errors.email}</p>}
      {errors.username && <p className="errors">{errors.username}</p>}
      <h1 className="signup-header-text">Sign Up</h1>
      <span>Welcome to Minibnb</span>
          <input
            type="text"
            className="signup-credentials-input"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <input
            type="text"
            className="signup-credentials-input"
            placeholder="Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
          <input
            type="text"
            className="signup-credentials-input"
            placeholder="First Name"
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
            required
          />
        {errors.firstName && <p className="errors">{errors.firstName}</p>}
          <input
            type="text"
            className="signup-credentials-input"
            placeholder="Last Name"
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
            required
          />
        {errors.lastName && <p className="errors">{errors.lastName}</p>}
          <input
            type="password"
            className="signup-credentials-input"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        {errors.password && <p className="errors">{errors.password}</p>}
          <input
            type="password"
            className="signup-credentials-input"
            placeholder="Confirm password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            required
          />
        {errors.confirmPassword && (
          <p className="errors">{errors.confirmPassword}</p>
        )}
        <button className="signup-button" type="submit" disabled={!email.length || (!username.length) || !firstName.length|| !lastName.length || !password.length || !confirmPassword.length || username.length < 4 || password.length < 6}>Sign Up</button>
        </div>
      </form>
  );
}

export default SignupFormModal;
