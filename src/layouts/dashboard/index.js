import { Stack } from "@mui/material";
import React from "react";
import { Outlet } from "react-router-dom";
import SideBar from "./SideBar";


const DashboardLayout = () => {
  return (
    <Stack direction="row">
      {/*SideBar*/}
      <SideBar />
      <Outlet />
      {/*Outlet is used so that the generalApp code can also be rendered*/}
    </Stack>
  );
};

export default DashboardLayout;
