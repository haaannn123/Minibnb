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
        <Link className="header-link" to="/">
          <img src="https://i.imgur.com/68fXf2O.png" className="img-logo" alt="mini hand emoji" />
          <span className="header-font">minibnb</span>
        </Link>
      {isLoaded && <ProfileButton user={sessionUser}/>}
      </div>
    </>
  );
}

export default Navigation;
