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
          console.log('errors', data.errors)
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
      <h1 className="signup-header-text">Sign Up</h1>
      <div className="signup-errors-container">
          {errors.email && <p className="errors">{errors.email}</p>}
          {errors.username && <p className="errors">{errors.username}</p>}
          {errors.firstName && <p className="errors">{errors.firstName}</p>}
          {errors.lastName && <p className="errors">{errors.lastName}</p>}
          {errors.password && <p className="errors">{errors.password}</p>}
          {errors.confirmPassword && (<p className="errors">{errors.confirmPassword}</p>)}
      </div>
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
          <input
            type="text"
            className="signup-credentials-input"
            placeholder="Last Name"
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
            required
          />
          <input
            type="password"
            className="signup-credentials-input"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <input
            type="password"
            className="signup-credentials-input"
            placeholder="Confirm password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            required
          />
        <button className="signup-button" type="submit">Sign Up</button>
        </div>
      </form>
  );
}

export default SignupFormModal;
