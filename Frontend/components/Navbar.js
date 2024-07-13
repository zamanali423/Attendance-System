import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { userContext } from "../context/userContext/userContext";
import LogoutButton from "../pages/Logout";

const Navbar = () => {
  const { isLogin, user } = useContext(userContext);
  return (
    <nav className="navbar">
      <div className="navbar-container container1">
        <input type="checkbox" name="" id="" />
        <div className="hamburger-lines">
          <span className="line line1"></span>
          <span className="line line2"></span>
          <span className="line line3"></span>
        </div>
        <ul className="menu-items">
          <li>
            <Link to="/">Home</Link>
          </li>
          <li>
            <Link to="/about">About</Link>
          </li>
          {user.role === "admin" ? (
            <li>
              <Link to="/generatereport">Generate Report</Link>
            </li>
          ) : null}
          {isLogin ? (
            <LogoutButton />
          ) : (
            <>
              {" "}
              <li>
                <Link to="/login">Login</Link>
              </li>
              <li>
                <Link to="/signup">Sigup</Link>
              </li>
            </>
          )}
          {user ? (
            <div className="avatar-container ms-5">
              <img
                src={user.profilePicture}
                alt="Avatar"
                className="avatar"
              />
            </div>
          ) : null}
        </ul>
        <h1 className="logo">Assignments</h1>
      </div>
    </nav>
  );
};

export default Navbar;
