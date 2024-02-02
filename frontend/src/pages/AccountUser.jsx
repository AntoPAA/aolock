import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuthContext } from "../context/auth";
import connexion from "../services/connexion";
import "./AccountUser.css";

function CandidatAccount() {
  const { connected, setConnected, logout } = useAuthContext();
  const navigate = useNavigate();

  const [nameForm, setNameForm] = useState({
    lastname: connected.lastname || "",
    firstname: connected.firstname || "",
  });

  const getProfile = async () => {
    try {
      const profile = await connexion.get(`/customers/profile`);
      setConnected(profile.data);
    } catch (err) {
      console.error(err);
    }
  };

  const handleNameSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await connexion.put(
        `/customers/${connected.id}/name`,
        nameForm
      );
      setConnected(response.data);
      getProfile();
    } catch (error) {
      console.error("Error updating name", error);
    }
  };

  useEffect(() => {
    if (connected.role_id === null) {
      navigate("/");
    }
  }, [connected, navigate]);

  const handleNameChange = (e) => {
    setNameForm({
      ...nameForm,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <div className="form-register">
      <h1>MON COMPTE</h1>
      <button type="button" className="button-connected" onClick={logout}>
        Se déconnecter
      </button>
      <h1>DETAIL DU COMPTE</h1>

      <form onSubmit={handleNameSubmit} className="form-input">
        {/* eslint-disable */}
        <label>
          <input
            type="text"
            name="lastname"
            className="label-form"
            placeholder="Nom de famille"
            value={nameForm.lastname}
            onChange={handleNameChange}
          />
        </label>
        <label>
          <input
            type="text"
            name="firstname"
            className="label-form"
            placeholder="Prénom"
            value={nameForm.firstname}
            onChange={handleNameChange}
          />
        </label>
        {/* eslint-enable */}
        <button type="submit" className="button-connected">
          Update Name
        </button>
      </form>
    </div>
  );
}

export default CandidatAccount;
