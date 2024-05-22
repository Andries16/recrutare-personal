import React from "react";
import { useAuthContext } from "../../../context/AuthContext";
import { Avatar, Input, Typography } from "@mui/material";
const ProfileImage = ({ click }) => {
  const { user } = useAuthContext();
  return (
    <label
      style={{
        display: "flex",
        flexDirection: "column",
        margin: "30px",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Avatar
        sx={{
          width: "200px",
          height: "200px",
          background: "transparent",
          border: "1px dashed white",
        }}
        src={user.photoURL}
      >
        <Input type="file" sx={{ display: "none" }} multiple />
      </Avatar>
      <Typography sx={{ marginTop: "10px" }}>Profile picture</Typography>
    </label>
  );
};

export default ProfileImage;
