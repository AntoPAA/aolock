import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { slide as Menu } from "react-burger-menu";
import "./MenuBurger.css";
import AOLOCKlogo from "../public/AOLOCKlogo.png";

function MenuBurger() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [showHomeLogin, setShowHomeLogin] = useState(true);

  const closeMenu = () => {
    setMenuOpen(false);
  };

  const switchLinks = () => {
    setShowHomeLogin(false);
  };

  const switchShop = () => {
    setShowHomeLogin(true);
  };
  useEffect(() => {
    const handleOutsideClick = (event) => {
      if (menuOpen && !event.target.closest(".burgerVisible")) {
        const isShopOrReturnClick =
          event.target.classList.contains("switch-links") ||
          event.target.classList.contains("link-page");

        if (!isShopOrReturnClick) {
          closeMenu();
        }
      }
    };

    document.addEventListener("click", handleOutsideClick);

    return () => {
      document.removeEventListener("click", handleOutsideClick);
    };
  }, [menuOpen]);

  return (
    <div className="burgerVisible">
      <Menu
        isOpen={menuOpen}
        onStateChange={(state) => setMenuOpen(state.isOpen)}
      >
        {showHomeLogin ? (
          <>
            <Link to="/" className="menu-items" onClick={closeMenu}>
              Home
            </Link>
            <div
              className="switch-links"
              onClick={() => {
                switchLinks();
              }}
              onKeyDown={() => {}}
              role="button"
              tabIndex={0}
            >
              Shop →
            </div>
            <Link to="/login" className="menu-items" onClick={closeMenu}>
              Login
            </Link>
            <div className="logo-mini">
              <img src={AOLOCKlogo} alt="Account" className="logo-mini" />
            </div>
          </>
        ) : (
          <>
            <div
              className="switch-links"
              onClick={switchShop}
              onKeyDown={() => {}}
              role="button"
              tabIndex={0}
            >
              ← retour
            </div>
            <Link
              className="link-page"
              to="/products/type/1"
              onClick={closeMenu}
            >
              Type1
            </Link>
            <Link
              className="link-page"
              to="/products/type/2"
              onClick={closeMenu}
            >
              Type2
            </Link>
            <div className="logo-mini">
              <img src={AOLOCKlogo} alt="Account" className="logo-mini" />
            </div>
          </>
        )}
      </Menu>
    </div>
  );
}

export default MenuBurger;
