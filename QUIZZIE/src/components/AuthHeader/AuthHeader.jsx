import React from "react";
import Logo from "../Logo";
import "./AuthHeader.css";
import {  NavLink } from "react-router-dom";

function AuthHeader() {
  return (
    <div className="auth-header-grid">
      <div>
        <Logo className="auth-header-logo" />
      </div>
      <div className="auth-header-btn-div">
        <NavLink
          to="/"
          className={({isActive}) =>
            `auth-header-btn ${isActive && "btn-clicked"} `
          }
        >
          Sign Up
        </NavLink>
        <NavLink
          to="/login"
          className={({isActive}) =>
            `auth-header-btn ${isActive && "btn-clicked"}`
          }
        >
          Log In
        </NavLink>
      </div>
    </div>
  );
}

export default AuthHeader;
