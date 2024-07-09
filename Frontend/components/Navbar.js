import React from "react";
import { Link } from "react-router-dom";

const Navbar = () => {
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
            <li>
              <Link to="/contact">Contact</Link>
            </li>
            <li>
              <Link to="/login">Login</Link>
            </li>
            <li>
              <Link to="/signup">Sigup</Link>
            </li>
          </ul>
          <h1 className="logo">Assignments</h1>
        </div>
      </nav>
  );
};

export default Navbar;
