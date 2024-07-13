import React, { useContext } from "react";
import { userContext } from "../context/userContext/userContext";
import { useNavigate } from "react-router";
import { Link } from "react-router-dom";

const LogoutButton = () => {
  const { logout } = useContext(userContext);
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return <li className="logout" onClick={handleLogout}>Logout</li>;
};

export default LogoutButton;
