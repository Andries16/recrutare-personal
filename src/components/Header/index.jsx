import {
  Head,
  Profilediv,
  StyledBoxes,
  Stylednav,
  Stylednotifecation,
} from "./style";
import NavList from "./NavList";
import { useState } from "react";
import Logout from "../Logout";
import { useAuthContext } from "../../context/AuthContext";
import { Link, useNavigate } from "react-router-dom";
import { Button, Avatar, Stack } from "@mui/material";
export default function Header({ form }) {
  const [showDiv, setShowDiv] = useState(false);
  const handleShow = () => {
    setShowDiv(!showDiv);
  };

  const navigate = useNavigate();
  const { user, authorized } = useAuthContext();
  if (form) {
    return (
      <Stylednav>
        <Link to={"/home"}>
          <Head>Recrut</Head>
        </Link>
      </Stylednav>
    );
  } else {
    return (
      <Stylednav>
        <Link to={"/"}>
          <Head>Recrut</Head>
        </Link>
        <StyledBoxes>
          {authorized ? (
            <>
              <NavList />
              <Stylednotifecation>
                <Avatar
                  src={user.photoURL}
                  sx={{
                    width: 24,
                    height: 24,
                    "&:hover": {
                      cursor: "pointer",
                    },
                  }}
                  onClick={handleShow}
                />
                {showDiv && (
                  <Profilediv>
                    <Avatar src={user.photoURL} alt="profile" />
                    <h2>{user.displayName}</h2>
                    <span style={{ textTransform: "capitalize" }}>
                      {user.type}
                    </span>
                    <ul>
                      <Logout />
                    </ul>
                  </Profilediv>
                )}
              </Stylednotifecation>
            </>
          ) : (
            <Stack flexDirection="row" alignItems="center">
              <Button
                sx={{ textTransform: "none", fontSize: "12px", height: "24px" }}
                color="secondary"
                variant="contained"
                onClick={() => navigate("/login")}
              >
                Login
              </Button>
              <Button
                sx={{ textTransform: "none", height: "24px", fontSize: "12px" }}
                color="secondary"
                variant="outlined"
                onClick={() => navigate("/signup")}
              >
                Sign Up
              </Button>
            </Stack>
          )}
        </StyledBoxes>
      </Stylednav>
    );
  }
}
