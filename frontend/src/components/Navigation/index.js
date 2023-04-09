import React from "react";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import ProfileButton from "./ProfileButton";
import "./Navigation.css";

function Navigation({ isLoaded }) {
  const sessionUser = useSelector((state) => state.session.user);

  return (
    <>
      <div className="header">
        {/* for logo */}
        <Link className="header-link">
          <img src="https://i.imgur.com/68fXf2O.png" className="img-logo" alt="mini hand emoji" />
          <span className="header-font">minibnb</span>
        </Link>
      </div>
      {isLoaded && (
        <li>
          <ProfileButton user={sessionUser} />
        </li>
      )}
    </>
  );
}

export default Navigation;
