import React from "react";
import { Link } from "react-router-dom";
import "./NavBar.css";

function NavBar() {
  return (
    <div className="navbar">
      <Link className="link-page" to="/">
        Home
      </Link>
      <Link className="link-page" to="/administration">
        administration
      </Link>
      <Link className="link-page" to="/products/type/1">
        Type1
      </Link>
      <Link className="link-page" to="/products/type/2">
        Type2
      </Link>
    </div>
  );
}

export default NavBar;
