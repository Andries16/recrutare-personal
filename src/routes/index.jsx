import React, { lazy } from "react";
import { useEffect } from "react";
import { Suspense } from "react";

import { Routes, Route, Navigate, useLocation } from "react-router-dom";
import Loading from "../components/Loading";
import { useAuthContext } from "../context/AuthContext";

import ProtectedRoute from "./../components/ProtectedRoute";
import PostJob from "../pages/PostJob";
import Savedjob from "../pages/SavedJobs";
import MyJobs from "../pages/MyJobs";
import SavedTalents from "../pages/SavedTalents";

const Login = lazy(() => import("../pages/Login/index"));
const Signup = lazy(() => import("../pages/Signup/index"));
const Home = lazy(() => import("../pages/Home/index"));
const Filter = lazy(() => import("./../pages/Filter/index"));
const Profile = lazy(() => import("../pages/Profile/index"));
const JobDetails = lazy(() => import("./../pages/JobDetails/index"));

const Routers = () => {
  const { authorized, setAuthorized, setToken } = useAuthContext();
  const location = useLocation();

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      setToken(token);
      setAuthorized(true);
    }
  }, [setToken, setAuthorized]);

  return (
    <Suspense fallback={<Loading />}>
      <Routes>
        <Route
          path="/login"
          element={
            authorized ? (
              <Navigate to={location.state?.from || "/home"} />
            ) : (
              <Login />
            )
          }
        />
        <Route
          path="/signup"
          element={
            authorized ? (
              <Navigate to={location.state?.from || "/home"} />
            ) : (
              <Signup />
            )
          }
        />

        <Route
          path="/"
          element={<ProtectedRoute currentLocation={location.pathname} />}
        >
          <Route path="/" element={<Home />} />
          <Route path="/filter" element={<Filter />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/redirect" element={<Navigate to={"/profile"} />} />
          <Route path="/JobDetails/:id" element={<JobDetails />} />
          <Route path="/post-a-job" element={<PostJob />} />
          <Route path="/saved-jobs" element={<Savedjob />} />
          <Route path="/saved-talents" element={<SavedTalents />} />
          <Route path="/my-jobs" element={<MyJobs />} />
        </Route>
        <Route path="/*" element={<h3>Page not Found</h3>} />
      </Routes>
    </Suspense>
  );
};

export default Routers;
