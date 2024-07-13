import React, { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { userContext } from "../context/userContext/userContext";

const Signup = () => {
  const { setToken, image, setImage } = useContext(userContext);
  const navigate = useNavigate();
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

  //! submit form
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const fetchData = await fetch("https://attendance-system-pied-seven.vercel.app/register/newUser", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ ...inputData, profilePicture: image }),
      });
      const data = await fetchData.json();

      if (!fetchData.ok) {
        toast.error(data.error || "Registration failed");
      }

      if (!data.user || !data.user.tokens || data.user.tokens.length === 0) {
        console.error("Token not found in response");
      }

      const token = data.user.tokens[0].token;
      setToken(token);
      localStorage.setItem("token", token);
      navigate("/");
      toast.success(data.error);
    } catch (error) {
      console.error(error.message || "Registration failed");
    }
  };

  function convertToBase64(e) {
    var reader = new FileReader();
    reader.readAsDataURL(e.target.files[0]);
    reader.onload = () => {
      setImage(reader.result);
    };
  }
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
              placeholder="Your Role Admin or Student"
              required
              name="role"
              value={inputData.role}
              onChange={handleInput}
            />
          </div>
          <div className="input-box">
            <input
              type="file"
              className="form-control"
              id="inputGroupFile02"
              accept="image/*"
              onChange={convertToBase64}
            />
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
