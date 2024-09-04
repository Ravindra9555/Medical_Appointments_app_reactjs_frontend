import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Outlet } from "react-router-dom";
const PrivateRoute = () => {
  // check if user is authenticated
  // if not, redirect to login page
  // else, render the component for the route
  const navigate = useNavigate();

  useEffect(() => {

    // const access_token = localStorage.getItem("access_token");
    // if (!access_token) {
    //   navigate("/");
    // }
  }, []);

  return (
    <>
      <Outlet />
    </>
  );
};

export default PrivateRoute;
