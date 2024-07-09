import React, { useContext, useState } from "react";
import { Link } from "react-router-dom";
import { userContext } from "../context/userContext.js/userContext";

const Login = () => {
  const {loginData,setloginData}=useContext(userContext)
  const [inputData, setinputData] = useState({
    email: "",
    password: "",
    confirmPassword: "",
  });

  const handleInput = (e) => {
    setinputData({
      ...inputData,
      [e.target.name]: e.target.value,
    });
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    const fetchData = await fetch("http://localhost:3001/Login/User", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(inputData),
    });
    const data = await fetchData.json();
    setloginData(data)
    console.log("login data",loginData.user);
  };
  return (
    <>
      <div className="container2">
        <div className="wrapper">
          <div className="title">
            <span>Login Form</span>
          </div>
          <form onSubmit={handleSubmit}>
            <div className="row">
              <i className="fas fa-user"></i>
              <input
                type="text"
                placeholder="Email"
                required
                name="email"
                value={inputData.email}
                onChange={handleInput}
              />
            </div>
            <div className="row">
              <i className="fas fa-lock"></i>
              <input
                type="password"
                placeholder="Password"
                required
                name="password"
                value={inputData.password}
                onChange={handleInput}
              />
            </div>
            <div className="row">
              <i className="fas fa-lock"></i>
              <input
                type="password"
                placeholder="Confirm password"
                required
                name="confirmPassword"
                value={inputData.confirmPassword}
                onChange={handleInput}
              />
            </div>
           
            <div className="pass">
              <Link href="#">Forgot password?</Link>
            </div>
            <div className="row button">
              <input type="submit" value="Login" />
            </div>
            <div className="signup-link">
              Not a member? <Link to="/signup">Signup</Link>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default Login;
