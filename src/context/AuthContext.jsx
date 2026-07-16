import { createContext, useContext, useState, useCallback } from "react";
import { useSiteData } from "./SiteDataContext";
import { loadFromSession, saveToSession } from "../utils/storage";

const STORAGE_KEY = "pbl-plants:admin-auth:v1";
const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const { adminCredentials } = useSiteData();
  const [isAuthenticated, setIsAuthenticated] = useState(() => loadFromSession(STORAGE_KEY, false));
  const [error, setError] = useState("");

  const login = useCallback(
    (username, password) => {
      if (
        username.trim().toLowerCase() === adminCredentials.username.toLowerCase() &&
        password === adminCredentials.password
      ) {
        setIsAuthenticated(true);
        saveToSession(STORAGE_KEY, true);
        setError("");
        return true;
      }
      setError("Incorrect username or password. Please try again.");
      return false;
    },
    [adminCredentials]
  );

  const logout = useCallback(() => {
    setIsAuthenticated(false);
    saveToSession(STORAGE_KEY, false);
  }, []);

  return (
    <AuthContext.Provider value={{ isAuthenticated, login, logout, error, setError }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used within an AuthProvider");
  return ctx;
}
