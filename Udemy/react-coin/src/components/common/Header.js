import React from "react";
import "./Header.css";
import logo from "./logo.png";
import { Link } from "react-router-dom";
import Search from "./Search";
const Header = () => {
  return (
    <div className="Header">
      <Link to="/">
        <img src={logo} alt="" className="Header-logo" />
      </Link>{" "}
      <Search />
    </div>
  );
};

export default Header;
