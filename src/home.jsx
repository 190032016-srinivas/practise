import { Link, Outlet } from "react-router-dom";
import "./home.css";
import React from "react";
export default function Home() {
  return (
    <div className="home">
      <div className="header">
        <Link to={"/"}>home</Link>
        <Link to={"/stopwatch"}>stopwatch</Link>
        <Link to={"/control techniques"}>control techniques</Link>
      </div>
      <Outlet />
    </div>
  );
}
