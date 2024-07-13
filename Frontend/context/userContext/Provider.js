import React, { useEffect, useState } from "react";
import { userContext } from "./userContext";
import { jwtDecode } from "jwt-decode";

const Provider = ({ children }) => {
  const [token, setToken] = useState(localStorage.getItem("token"));
  const [user, setUser] = useState("");
  const [allStudents, setallStudents] = useState([]);
  const [image, setImage] = useState("");

  let isLogin = !!token;

  const logout = () => {
    setToken("");
    return localStorage.removeItem("token");
  };

  //! Get User
  const authenticationUser = async () => {
    if (!token) {
      console.log("No token found, please login");
      return;
    }

    try {
      const res = await fetch("http://localhost:3001/auth/user/getUser", {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      });

      if (!res.ok) {
        if (res.status === 401) {
          console.log("Unauthorized access - Invalid token");
        } else {
          console.log("Failed to fetch user data:", res.status, res.statusText);
        }
        return;
      }

      const data = await res.json();
      console.log("data", data);
      setUser(data.user);
    } catch (error) {
      console.log("Error fetching user data:", error.message);
    }
  };

  //! Get All Students
  const getStudents = async () => {
    try {
      const data = await fetch("http://localhost:3001/admin/getStudents");
      const student = await data.json();
      setallStudents(student);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    authenticationUser();
    getStudents();
  }, []);
  return (
    <userContext.Provider
      value={{
        logout,
        isLogin,
        user,
        setToken,
        token,
        allStudents,
        setallStudents,
        image,
        setImage,
      }}
    >
      {children}
    </userContext.Provider>
  );
};

export default Provider;
