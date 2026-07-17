import { createContext, useContext, useState, useCallback } from "react";
import {
  signInWithEmailAndPassword,
  signOut
} from "firebase/auth";

import { auth } from "../utils/firebaseConfig";

const AuthContext = createContext(null);

export function AuthProvider({ children }) {

  const [isAuthenticated, setIsAuthenticated] = useState(
    () => sessionStorage.getItem("pbl-admin-auth") === "true"
  );

  const [error, setError] = useState("");

  const login = useCallback(async (email, password) => {

    try {

      await signInWithEmailAndPassword(
        auth,
        email,
        password
      );

      setIsAuthenticated(true);

      sessionStorage.setItem(
        "pbl-admin-auth",
        "true"
      );

      setError("");

      return true;

    } catch (err) {

      console.error(
        "Firebase login failed:",
        err
      );

      setError(
        "Invalid email or password."
      );

      return false;
    }

  }, []);


  const logout = useCallback(async () => {

    await signOut(auth);

    setIsAuthenticated(false);

    sessionStorage.removeItem(
      "pbl-admin-auth"
    );

  }, []);


  return (
    <AuthContext.Provider
      value={{
        isAuthenticated,
        login,
        logout,
        error,
        setError
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}


export function useAuth() {

  const ctx = useContext(AuthContext);

  if (!ctx) {
    throw new Error(
      "useAuth must be used within AuthProvider"
    );
  }

  return ctx;
}
