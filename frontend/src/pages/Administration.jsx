import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";

import { useAuthContext } from "../context/auth";
import ProductForm from "../components/FormProduct";
import SizeForm from "../components/FormSize";
import "./Administration.css";

function Administration() {
  const { connected } = useAuthContext();
  const navigate = useNavigate();
  useEffect(() => {
    if (connected.role_id !== 2) {
      navigate("/");
    }
  }, [connected]);
  return (
    <div className="administration">
      <ProductForm />
      <SizeForm hideForm hideFormadd />
    </div>
  );
}

export default Administration;
