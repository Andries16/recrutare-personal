import React from "react";
import { LiOptions, Styledul, P } from "./style";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import { NavLink, useNavigate } from "react-router-dom";
import { Button } from "@mui/material";
import { useAuthContext } from "../../../context/AuthContext";
const NavList = () => {
  const navigate = useNavigate();
  const { user } = useAuthContext();
  return (
    <Styledul>
      {user.type === "recrut" ? (
        <li>
          <P>
            Find Work
            <KeyboardArrowDownIcon sx={{ verticalAlign: "middle" }} />
          </P>
          <ul>
            <NavLink to="/saved-jobs">
              <LiOptions>Saved Jobs</LiOptions>
            </NavLink>
            <NavLink to="/profile">
              <LiOptions>Profile</LiOptions>
            </NavLink>
          </ul>
        </li>
      ) : (
        <li>
          <P>
            Find Talents
            <KeyboardArrowDownIcon sx={{ verticalAlign: "middle" }} />
          </P>
          <ul>
            <NavLink to="/saved-talents">
              <LiOptions>Saved Talents</LiOptions>
            </NavLink>
            <NavLink to="/profile">
              <LiOptions>Profile</LiOptions>
            </NavLink>
          </ul>
        </li>
      )}
      <li>
        <P onClick={() => navigate("/my-jobs")}>My Jobs</P>
      </li>
      <li>
        {user.type === "client" && (
          <Button
            color="secondary"
            onClick={() => navigate("/post-a-job")}
            variant="contained"
          >
            Post a Job
          </Button>
        )}
      </li>
    </Styledul>
  );
};

export default NavList;
