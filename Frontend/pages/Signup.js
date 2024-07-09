import React, { useState } from "react";
import { Link } from "react-router-dom";

const Signup = () => {
  const [inputData, setinputData] = useState({
    fullName: "",
    email: "",
    password: "",
    confirmPassword: "",
    role: "",
  });

  const handleInput = (e) => {
    setinputData({
      ...inputData,
      [e.target.name]: e.target.value,
    });
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    const fetchData = await fetch("http://localhost:3001/register/newUser", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(inputData ),
    });
    const data = await fetchData.json();
    console.log(data);
  };
  return (
    <div className="big">
      <div className="wrapper1">
        <h2>Registration</h2>
        <form onSubmit={handleSubmit}>
          <div className="input-box">
            <input
              type="text"
              placeholder="Enter your name"
              required
              name="fullName"
              value={inputData.fullName}
              onChange={handleInput}
            />
          </div>
          <div className="input-box">
            <input
              type="text"
              placeholder="Enter your email"
              required
              name="email"
              value={inputData.email}
              onChange={handleInput}
            />
          </div>
          <div className="input-box">
            <input
              type="password"
              placeholder="Create password"
              required
              name="password"
              value={inputData.password}
              onChange={handleInput}
            />
          </div>
          <div className="input-box">
            <input
              type="password"
              placeholder="Confirm password"
              required
              name="confirmPassword"
              value={inputData.confirmPassword}
              onChange={handleInput}
            />
          </div>
          <div className="input-box">
            <input
              type="text"
              placeholder="Your Role Admin or User"
              required
              name="role"
              value={inputData.role}
              onChange={handleInput}
            />
          </div>
          <div className="policy">
            <input type="checkbox" />
            <h3>I accept all terms & condition</h3>
          </div>
          <div className="input-box button">
            <input type="Submit" value="Register Now" />
          </div>
          <div className="text">
            <h3>
              Already have an account? <Link to="/login">Login now</Link>
            </h3>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Signup;
