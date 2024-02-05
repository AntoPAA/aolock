import React from "react";
import { Link } from "react-router-dom";
import "./NavBarmini.css";
import AOLOCKlogo from "../public/AOLOCKlogo.png";

function NavBarmini() {
  return (
    <div className="navbar-mini">
      <div className="mini-container">
        <h1 className="link-pagee">CLOTHING</h1>
        <Link className="link-page" to="/products/type/1">
          T-SHIRT
        </Link>
        <Link className="link-page" to="/products/type/2">
          SWEATSHIRT
        </Link>
        <Link className="link-page" to="/products/type/3">
          MASTERCLASS
        </Link>
      </div>
      <div className="logo-aolock">
        <img src={AOLOCKlogo} alt="Account" />
      </div>
    </div>
  );
}

export default NavBarmini;
