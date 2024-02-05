import React from "react";
import { FaLinkedin, FaInstagram } from "react-icons/fa";
import { BsTwitterX } from "react-icons/bs";
import "./Footer.css";
import whitelogo from "../public/whitelogo.png";

function Footer() {
  const style = { color: "white" };
  return (
    <footer className="footerContainer">
      <div className="socialIcon">
        <a href="https://www.linkedin.com/" aria-label="LinkedIn">
          <FaLinkedin style={style} className="fake-button" />
        </a>
        <a href="https://www.twitter.com/" aria-label="Twitter">
          <BsTwitterX style={style} className="fake-button" />
        </a>
        <a href="https://www.instagram.com/" aria-label="Instagram">
          <FaInstagram style={style} className="fake-button" />
        </a>
      </div>
      <div className="contact">
        <p className="contacte">CGV </p>
        <p className="contacte">CONTACT </p>
        <p className="contacte">ABOUT </p>
      </div>
      <div className="allRight">
        <p className="allRight">© AOLOCK, 12 RUE DE LAWS, PARIS</p>
      </div>
      <div className="white-logo">
        <img className="white-logoo" src={whitelogo} alt="" />
      </div>
    </footer>
  );
}

export default Footer;
