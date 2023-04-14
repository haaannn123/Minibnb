import React, { useState, useEffect, useRef } from "react";
import { useDispatch } from "react-redux";
import * as sessionActions from "../../store/session";
import OpenModalButton from "../OpenModelButton";
import LoginFormModal from "../LoginFormModal";
import SignupFormModal from "../SignupFormModal";
import { NavLink } from "react-router-dom";
import { useHistory } from "react-router-dom";

function ProfileButton({ user }) {
  const dispatch = useDispatch();
  const [showMenu, setShowMenu] = useState(false);
  const ulRef = useRef();
  const history = useHistory();

  const openMenu = () => {
    if (showMenu) return;
    setShowMenu(true);
  };

  useEffect(() => {
    if (!showMenu) return;

    const closeMenu = (e) => {
      if (!ulRef.current.contains(e.target)) {
        setShowMenu(false);
      }
    };

    document.addEventListener("click", closeMenu);

    return () => document.removeEventListener("click", closeMenu);
  }, [showMenu]);

  const closeMenu = () => setShowMenu(false);

  const logout = (e) => {
    e.preventDefault();
    dispatch(sessionActions.logout());
    closeMenu();
    history.push('/')
  };

  const ulClassName = "profile-dropdown" + (showMenu ? "" : " hidden");

  return (
    <>
      <button onClick={openMenu} className="profile">
        <i className="fas fa-user-circle" />
        <i className="fa-solid fa-bars-staggered"></i>
      </button>
      <ul className={ulClassName} ref={ulRef}>
        {user ? (
          <>
            <div className="dropdown-user-info">
              <p className="user-info-styling">Hello, {user.firstName}</p>
              <p className="user-info-styling">{user.email}</p>
            <div className='user-info-styling'>
              <NavLink className="manage-spots"to="/spots/current">Manage Spots</NavLink>
            </div>
            <div className="user-info-styling">
              <button onClick={logout}>Log Out</button>
            </div>
            </div>
          </>
        ) : (
          <>
            <li>
              <OpenModalButton buttonText="Log In" onButtonClick={closeMenu} modalComponent={<LoginFormModal />} />
            </li>
            <li>
              <OpenModalButton buttonText="Sign Up" onButtonClick={closeMenu} modalComponent={<SignupFormModal />} />
            </li>
          </>
        )}
      </ul>
    </>
  );
}

export default ProfileButton;
