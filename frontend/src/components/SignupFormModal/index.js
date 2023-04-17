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
          console.log("errors:", data.errors);
        });
    } else {
      err.confirmPassword = "Confirm Password field must be the same as the Password field";
    }

    setErrors(err)
  };
  
  if (sessionUser) return <Redirect to="/" />;

  return (
    <>
      {/* {Object.keys(errors).length > 0 && (
        <ul>
          {Object.values(errors).map((error, idx) => (
            <li key={idx}>{error}</li>
          ))}
        </ul>
      )} */}
      {errors.email && <p className="errors">{errors.email}</p>}
      {errors.username && <p className="errors">{errors.username}</p>}
      <h1 className="signup-text">Sign Up</h1>
      <form className="signup-container-form" onSubmit={handleSubmit}>
        <label>
          <input
            type="text"
            className="signup"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </label>
        <label>
          <input
            type="text"
            className="signup"
            placeholder="Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
        </label>
        <label>
          <input
            type="text"
            className="signup"
            placeholder="First Name"
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
            required
          />
        </label>
        {errors.firstName && <p className="errors">{errors.firstName}</p>}
        <label>
          <input
            type="text"
            className="signup"
            placeholder="Last Name"
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
            required
          />
        </label>
        {errors.lastName && <p className="errors">{errors.lastName}</p>}
        <label>
          <input
            type="password"
            className="signup"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </label>
        {errors.password && <p className="errors">{errors.password}</p>}
        <label>
          <input
            type="password"
            className="signup"
            placeholder="Confirm password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            required
          />
        </label>
        {errors.confirmPassword && (
          <p className="errors">{errors.confirmPassword}</p>
        )}
        <button className="signup-button" type="submit" disabled={!email.length || (!username.length) || !firstName.length|| !lastName.length || !password.length || !confirmPassword.length || username.length < 4 || password.length < 6}>Sign Up</button>
      </form>
    </>
  );
}

export default SignupFormModal;
