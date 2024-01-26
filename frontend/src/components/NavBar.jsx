import React from "react";
import { Link } from "react-router-dom";
import { useAuthContext } from "../context/auth";
import "./NavBar.css";

function NavBar() {
  const { connected } = useAuthContext();
  return (
    <div className="navbar">
      <Link className="link-page" to="/">
        Home
      </Link>
      {connected.role_id === 2 ? (
        <Link className="link-page" to="/administration">
          administration
        </Link>
      ) : (
        ""
      )}

      <Link className="link-page" to="/products/type/1">
        Type1
      </Link>
      <Link className="link-page" to="/products/type/2">
        Type2
      </Link>
      <Link className="button-connect" to="/login">
        Se connecter
      </Link>
    </div>
  );
}

export default NavBar;
