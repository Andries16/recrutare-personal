import React from "react";
import { Outlet } from "react-router";
import { useAuthContext } from "../../context/AuthContext";
import Main from "../../pages/Main";
import CompleteProfile from "../../pages/CompleteProfile/index.jsx";

const ProtectedRoute = () => {
  const { authorized, user } = useAuthContext();
  return (
    <div>
      {authorized ? (
        user.isCompleted ? (
          <>
            <Outlet />
          </>
        ) : (
          <CompleteProfile />
        )
      ) : (
        <Main />
      )}
    </div>
  );
};

export default ProtectedRoute;
