import React from "react";
import { Navigate, Outlet } from "react-router";
import { useAuthContext } from "../../context/AuthContext";
import Main from "../../pages/Main";

const ProtectedRoute = () => {
  const { authorized } = useAuthContext();
  return (
    <div>
      {authorized ? (
        <>
          <Outlet />
        </>
      ) : (
        <Main />
      )}
    </div>
  );
};

export default ProtectedRoute;
