import React, { useState, useContext } from "react";
import { useNavigate, Link } from "react-router-dom";
import connexion from "../services/connexion";
import { AuthContext } from "../context/auth";
import "./FormLogin.css";

const user = {
  email: "",
  password: "",
};

function FormLogin() {
  const [credentials, setCredentials] = useState(user);
  const [errorMessage, setErrorMessage] = useState("");
  const { setConnected } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleCredentials = (event) => {
    setCredentials((prev) => ({
      ...prev,
      [event.target.name]: event.target.value,
    }));
  };

  const handleRequest = async (e) => {
    e.preventDefault();
    try {
      const valid = await connexion.post("/login", credentials);
      setConnected(valid.data);
      sessionStorage.setItem("connected", true);
      setTimeout(() => {
        navigate("/");
      }, 1000);
    } catch (error) {
      setCredentials(user);
      setErrorMessage("Mot de passe ou e-mail incorrect");
    }
  };

  return (
    <div>
      <main className="log-container">
        <div className="form-container">
          <h1 className="title-login">CONNEXION</h1>
          <form onSubmit={handleRequest} className="form-connection">
            {/* eslint-disable */}
            <label>
              <input
                className="label-form"
                type="email"
                name="email"
                required
                onChange={handleCredentials}
                value={credentials.email}
                placeholder="E-mail"
              />
            </label>
            <label>
              <input
                className="label-form"
                type="password"
                name="password"
                required
                onChange={handleCredentials}
                value={credentials.password}
                placeholder="Mot De Passe"
              />
            </label>
            {/* eslint-enable */}
            {errorMessage && (
              <p className="validate-password" style={{ color: "red" }}>
                {errorMessage}
              </p>
            )}
            <div className="button-container">
              <button type="submit" className="connection-button">
                Se connecter
              </button>
            </div>{" "}
            <Link to="/register" className="create-link">
              Crée un compte
            </Link>
          </form>
        </div>
      </main>
    </div>
  );
}

export default FormLogin;
