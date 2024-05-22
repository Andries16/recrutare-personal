import React from "react";
import { Box, Info, Profile } from "./style";
import SliderSizes from "../SliderSizes";
import { Avatar, Divider, Typography } from "@mui/material";
import { useAuthContext } from "../../context/AuthContext";
import { Edit } from "@mui/icons-material";
import { useNavigate } from "react-router-dom";
const PersonalInformation = () => {
  const { user } = useAuthContext();
  const navigate = useNavigate();

  return (
    <Box>
      <Profile>
        <Avatar src={user.photoURL} />
        <h2 onClick={() => navigate("/profile")}>{user.displayName}</h2>
        <Typography>{user.jobTitle}</Typography>
        <p>Profile Completeness:</p>
        <p>
          <SliderSizes />
        </p>

        <Divider variant="fullWidth" />
        <div>{user.connects || 0} Available Connects</div>
      </Profile>

      <Info>
        <li>
          <p>
            Availability Badge
            <span>{user.available ? "Available" : "Not available"}</span>
          </p>

          <Edit sx={{ color: "black" }} />
        </li>

        <li>
          <p>
            Profile Visibility
            <span>{user.visibility || "Public"}</span>
          </p>

          <Edit sx={{ color: "black" }} />
        </li>

        <Divider variant="fullWidth" />
        <li>
          <p>
            My Categories
            <span>{user.categories}</span>
          </p>

          <Edit sx={{ color: "black" }} />
        </li>
      </Info>
    </Box>
  );
};

export default PersonalInformation;
