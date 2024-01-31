import React from "react";
import { Link } from "react-router-dom";
import "./NavBarmini.css";

function NavBarmini() {
  return (
    <div className="navbar-mini">
      <Link className="link-page" to="/products/type/1">
        Type1
      </Link>
      <Link className="link-page" to="/products/type/2">
        Type2
      </Link>
    </div>
  );
}

export default NavBarmini;
