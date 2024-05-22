import { collection, getDocs, query, where } from "firebase/firestore";
import { useState } from "react";
import { onAuthStateChanged } from "firebase/auth";
import { auth, db } from "../firebase";
import { useEffect } from "react";
const useAuth = () => {
  const searchedValues = JSON.parse(localStorage.getItem("searchValues")) || [];

  const [loading, setLoading] = useState(false);
  const [authorized, setAuthorized] = useState(false);
  const [errors, setErrors] = useState([]);
  const [token, setToken] = useState("");
  const [user, setUser] = useState(undefined);
  const [searchValue, setSearchValue] = useState(searchedValues);

  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("name");
    setToken("");
    setUser(undefined);
    setAuthorized(false);
  };

  useEffect(
    () =>
      onAuthStateChanged(auth, async (user) => {
        if (user) {
          const userExist = await getDocs(
            query(collection(db, "users"), where("email", "==", user.email))
          );
          if (userExist) {
            setUser(userExist);
          }
        } else setUser(null);
      }),
    [setUser]
  );

  return {
    authorized,
    setAuthorized,
    loading,
    setLoading,
    errors,
    setErrors,
    token,
    setToken,
    user,
    setUser,
    logout,
    searchValue,
    setSearchValue,
  };
};

export default useAuth;
