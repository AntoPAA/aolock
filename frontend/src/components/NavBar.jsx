import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useAuthContext } from "../context/auth";
import "./NavBar.css";
import NavBarmini from "./NavBarmini";
import MenuBurger from "./MenuBurger";

function NavBar() {
  const { connected, logout } = useAuthContext();
  const [NavBarMiniVisible, setNavBarMiniVisible] = useState(false);
  const [isBurgerActive, setIsBurgerActive] = useState(false);

  const toggleNavBarMini = () => {
    setNavBarMiniVisible(!NavBarMiniVisible);
    setIsBurgerActive(!isBurgerActive);
  };

  return (
    <div>
      <div className="navbar">
        <Link className="link-page" to="/">
          Home
        </Link>
        {connected.role_id === 2 && (
          <Link className="link-page" to="/administration">
            Administration
          </Link>
        )}
        <button
          type="button"
          className="shop-button"
          onClick={toggleNavBarMini}
        >
          Shop
        </button>
        {connected !== "not connected" ? (
          <button type="button" className="button-connect" onClick={logout}>
            Se déconnecter
          </button>
        ) : (
          <Link className="button-connect" to="/login">
            Se connecter
          </Link>
        )}
        <div className="burgerVisible">
          <MenuBurger />
        </div>
      </div>

      {NavBarMiniVisible && <NavBarmini />}
    </div>
  );
}

export default NavBar;
