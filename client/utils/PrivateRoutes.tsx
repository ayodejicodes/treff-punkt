import React from "react";
import { useSelector } from "react-redux";
import { RootState, store } from "../src/app/store";
import { Navigate, Outlet } from "react-router-dom";
import Login from "../src/pages/login";

const PrivateRoutes = () => {
  const user = JSON.parse(localStorage.getItem("user") || "null");

  return user?.token ? <Outlet /> : <Navigate to={"/login"} />;
};
export default PrivateRoutes;
