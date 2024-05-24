import { getAuth, signOut } from "firebase/auth";
import { useState } from "react";
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
    const auth = getAuth();
    signOut(auth);
    setUser(undefined);
    setAuthorized(false);
  };

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
