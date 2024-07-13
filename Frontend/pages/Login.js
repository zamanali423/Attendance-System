import React, { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { userContext } from "../context/userContext/userContext";
import { toast } from "react-toastify";

const Login = () => {
  const { setToken } = useContext(userContext);
  const navigate = useNavigate();
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

    try {
      const fetchData = await fetch("http://localhost:3001/Login/User", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(inputData),
      });

      const data = await fetchData.json();

      if (!fetchData.ok) {
        toast.error(data.error || "Login failed");
        return; // Early exit if login fails
      }

      if (!data.user || !data.user.tokens || data.user.tokens.length === 0) {
        toast.error("Token not found in response");
        console.error("Token not found in response", data);
        return; // Early exit if token is missing
      }

      const token = data.user.tokens[0].token;
      setToken(token);
      localStorage.setItem("token", token);
      navigate("/");
      toast.success("Login successful");
    } catch (error) {
      toast.error(error.message || "Login failed");
      console.error("Login failed", error);
    }
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
