import React, {
  createContext,
  useState,
  useMemo,
  useEffect,
  useContext,
} from "react";
import PropTypes from "prop-types";

import connexion from "../services/connexion";

export const AuthContext = createContext();

export const useAuthContext = () => useContext(AuthContext);

export function AuthProvider({ children }) {
  const [connected, setConnected] = useState("not connected");

  function logout() {
    setConnected("not connected");
    sessionStorage.removeItem("connected");
  }

  const contextValue = useMemo(
    () => ({ connected, setConnected, logout }),
    [connected, setConnected]
  );
  useEffect(() => {
    if (sessionStorage.getItem("connected")) {
      const getProfile = async () => {
        try {
          const profile = await connexion.get(`/customers/profile`);
          setConnected(profile.data);
        } catch (err) {
          console.error(err);
        }
      };
      getProfile();
    }
  }, [sessionStorage.getItem("connected")]);

  return (
    <AuthContext.Provider value={contextValue}>{children}</AuthContext.Provider>
  );
}

AuthProvider.propTypes = {
  children: PropTypes.node.isRequired,
};
