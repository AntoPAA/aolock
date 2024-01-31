import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuthContext } from "../context/auth";
import connexion from "../services/connexion";

function CandidatAccount() {
  const { connected, setConnected } = useAuthContext();
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
    <div>
      <h1>CandidatAccount</h1>

      <form onSubmit={handleNameSubmit}>
        <label>
          Last Name:
          <input
            type="text"
            name="lastname"
            value={nameForm.lastname}
            onChange={handleNameChange}
          />
        </label>
        <label>
          First Name:
          <input
            type="text"
            name="firstname"
            value={nameForm.firstname}
            onChange={handleNameChange}
          />
        </label>
        <button type="submit">Update Name</button>
      </form>
    </div>
  );
}

export default CandidatAccount;
