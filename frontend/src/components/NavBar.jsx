import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useAuthContext } from "../context/auth";
import "./NavBar.css";
import NavBarmini from "./NavBarmini";
import MenuBurger from "./MenuBurger";
import account from "../public/account.png";
import logo from "../public/logo.png";

function NavBar() {
  const { connected } = useAuthContext();
  const [NavBarMiniVisible, setNavBarMiniVisible] = useState(false);
  const [isBurgerActive, setIsBurgerActive] = useState(false);

  const toggleNavBarMini = () => {
    setNavBarMiniVisible(!NavBarMiniVisible);
    setIsBurgerActive(!isBurgerActive);
  };

  return (
    <div>
      <div className="navbar">
        <div className="burgerVisible">
          <MenuBurger />
        </div>
        <div className="navbar-container">
          <div className="user-container">
            <Link className="link-user" to="/">
              HOME
            </Link>
            <button
              type="button"
              className="shop-button"
              onClick={toggleNavBarMini}
            >
              SHOP
            </button>
            <Link className="link-user" to="/aboutus">
              ABOUT
            </Link>
          </div>
          <div>
            <Link to="/404" type="button" className="logo-main">
              <img src={logo} alt="Account" />
            </Link>
          </div>
          <div className="link-role">
            {connected.role_id === 2 && (
              <Link className="link-admin" to="/administration">
                Administration
              </Link>
            )}
            {connected !== "not connected" ? (
              <Link to="/account" type="button" className="link-account">
                <img src={account} alt="Account" />
              </Link>
            ) : (
              <Link className="link-account" to="/login">
                <img src={account} alt="Account" />
              </Link>
            )}
          </div>
        </div>
        {NavBarMiniVisible && <NavBarmini />}
      </div>
    </div>
  );
}

export default NavBar;
