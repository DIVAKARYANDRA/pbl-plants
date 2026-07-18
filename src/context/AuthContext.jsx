import { createContext, useContext, useState, useCallback, useEffect } from "react";
import {
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged
} from "firebase/auth";

import {
  collection,
  query,
  where,
  getDocs
} from "firebase/firestore";

import { auth, db } from "../utils/firebaseConfig";

const AuthContext = createContext(null);

export function AuthProvider({ children }) {

  const [isAuthenticated, setIsAuthenticated] = useState(
    () => sessionStorage.getItem("pbl-admin-auth") === "true"
  );

  const [error, setError] = useState("");
  const [role, setRole] = useState(null);
  const [loading, setLoading] = useState(true);


  const fetchUserRole = async (email) => {

  try {

    const usersRef = collection(
      db,
      "Users"
    );


    const q = query(
      usersRef,
      where("email", "==", email)
    );


    const snapshot = await getDocs(q);


    if(!snapshot.empty){

      const userData = snapshot.docs[0].data();

      console.log(
        "Logged user role:",
        userData.role
      );


      setRole(
        userData.role
      );

    }
    else {

      console.error(
        "User role not found"
      );

    }


  } catch(error){

    console.error(
      "Fetching role failed:",
      error
    );

  }

};

useEffect(() => {

  const unsubscribe = onAuthStateChanged(
    auth,
    async (user) => {

      if (user) {
        setIsAuthenticated(true);
        await fetchUserRole(
          user.email
        );
      } else {
        setIsAuthenticated(false);
        setRole(null);
      }

      setLoading(false);
    }
  );

  return unsubscribe;

}, []);

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
    setRole(null);

    sessionStorage.removeItem(
      "pbl-admin-auth"
    );

  }, []);

  if (loading) {
  return null;
}


  return (
    <AuthContext.Provider
      value={{
        isAuthenticated,
        role,
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
