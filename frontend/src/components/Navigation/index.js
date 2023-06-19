import React from "react";
import { NavLink } from "react-router-dom";
import { useSelector } from "react-redux";
import ProfileButton from "./ProfileButton";
import OpenModalButton from "../OpenModelButton";
import LoginFormModal from "../LoginFormModal";
import SignupFormModal from "../SignupFormModal";
import "./Navigation.css";
import SearchBar from "../Search";

function Navigation({ isLoaded }) {
  const sessionUser = useSelector((state) => state.session.user);
  let sessionLinks;
  if (sessionUser) {
    sessionLinks = (
      <div className='profile-button-container'>
        <ProfileButton user={sessionUser} />
      </div>
    );
  } else {
    sessionLinks = (
      <div className="user-dropdown">
        <OpenModalButton buttonText="Log In" modalComponent={<LoginFormModal />} />
        <OpenModalButton buttonText="Sign Up" modalComponent={<SignupFormModal />} />
      </div>
    );
    }

    const createSpotButton = () => {
      if (sessionUser) {
        return <NavLink className="create-new-spot" to="/spots/new">Create a New Spot</NavLink>;
      }
    };

  return (
    <div className="navbar">
      <NavLink exact to="/" className="header-link">
        <img src="https://i.imgur.com/68fXf2O.png" className="img-logo" alt="mini hand emoji" />
        <span className="header-font">minibnb</span>
      </NavLink>
      <SearchBar />
      {createSpotButton()}
      {isLoaded && (
        <div>
          <ProfileButton user={sessionUser} />
        </div>
      )}
    </div>
  );
}

export default Navigation;
