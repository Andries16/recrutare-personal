import React from "react";
import { LiOptions, Styledul, P } from "./style";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import { NavLink } from "react-router-dom";
const NavList = () => {
  return (
    <Styledul>
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
      <li>
        <p>
          My Jobs
          <KeyboardArrowDownIcon sx={{ verticalAlign: "middle" }} />
        </p>
        <ul>
          <LiOptions>My Jobs</LiOptions>
          <LiOptions>All Contracts</LiOptions>
        </ul>
      </li>
    </Styledul>
  );
};

export default NavList;
