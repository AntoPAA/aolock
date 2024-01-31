import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";

import { useAuthContext } from "../context/auth";
import ProductForm from "../components/FormProduct";

function Administration() {
  const { connected } = useAuthContext();
  const navigate = useNavigate();
  useEffect(() => {
    if (connected.role_id !== 2) {
      navigate("/");
    }
  }, [connected]);
  return (
    <div>
      Administration <ProductForm />
    </div>
  );
}

export default Administration;
