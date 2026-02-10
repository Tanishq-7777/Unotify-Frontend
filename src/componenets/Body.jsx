import React from "react";
import Navbar from "./Navbar";
import { Outlet, useParams } from "react-router-dom";
import useProfile from "../store/User";
import Login from "./Login";
import Otp from "./Otp";

const Body = () => {
  const userData = useProfile((state) => state.userData);
  console.log(userData);
  if (!userData) return <Login />;
  else if (userData?.isVerified === false) return <Otp />;
  return (
    <div>
      <Navbar />
      <Outlet />
    </div>
  );
};

export default Body;
