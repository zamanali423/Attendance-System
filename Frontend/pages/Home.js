import React, { useContext, useEffect, useState } from "react";
import AttendanceTable from "../components/AttendanceTable";
import { userContext } from "../context/userContext/userContext";
import AdminHome from "./Admin/AdminHome";

const Home = () => {
  const { user } = useContext(userContext);
  console.log("user", user);

  if (!user) {
    return <div>Loading...</div>;
  }

  return (
    <>
      {user && (user.role === "student" ? <AttendanceTable /> : <AdminHome />)}
    </>
  );
};

export default Home;
