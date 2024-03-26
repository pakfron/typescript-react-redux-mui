import React from "react";
import { Outlet } from "react-router-dom";
import Navbar from "./Navbar";

type Props = {};

export default function Layout({}: Props) {
  return (
    <>
      <Navbar />
      <Outlet />
    </>
  );
}
