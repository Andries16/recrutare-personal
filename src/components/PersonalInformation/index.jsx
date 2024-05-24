import React from "react";
import { Box, Info, Profile } from "./style";
import { Avatar, Divider, Switch, Typography } from "@mui/material";
import { useAuthContext } from "../../context/AuthContext";
import { useNavigate } from "react-router-dom";
import {
  collection,
  getDocs,
  query,
  updateDoc,
  where,
} from "firebase/firestore";
import { db } from "../../firebase";
const PersonalInformation = () => {
  const { user, setUser } = useAuthContext();
  const navigate = useNavigate();

  const onChangeAvailability = async ({ target: { value } }) => {
    const {
      docs: [userSnap],
    } = await getDocs(
      query(collection(db, "users"), where("email", "==", user.email))
    );
    setUser({ ...user, available: !user.available });
    updateDoc(userSnap.ref, { available: !user.available });
  };
  return (
    <Box>
      <Profile>
        <Avatar src={user.photoURL} />
        <h2 onClick={() => navigate("/profile")}>{user.displayName}</h2>
        <Typography>{user.jobTitle}</Typography>
        <Typography component="h6" sx={{ textTransform: "capitalize" }}>
          {user.type}
        </Typography>
        <Divider
          variant="fullWidth"
          orientation="horizontal"
          sx={{ borderColor: "white" }}
        />
        {user.type === "recrut" && (
          <div>{user.connects || 0} Available Connects</div>
        )}
      </Profile>
      {user.type === "recrut" && (
        <Info>
          <li>
            <p>
              Availability Badge
              <span>{user.available ? "Available" : "Not available"}</span>
            </p>

            <Switch checked={user.available} onChange={onChangeAvailability} />
          </li>

          <li>
            <p>
              Profile Visibility
              <span>{user.visibility || "Public"}</span>
            </p>
          </li>
        </Info>
      )}
    </Box>
  );
};

export default PersonalInformation;
