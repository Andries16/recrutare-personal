import React, { useState } from "react";
import google from "../../assets/google.svg";
import apple from "../../assets/apple.png";
import { useAuthContext } from "../../context/AuthContext";
import { signInWithEmailAndPassword } from "firebase/auth";
import {
  AlredyAccount,
  ErrorMessage,
  InputWrapper,
  Register,
  StyledButton,
  StyledForm,
  StyledImg,
  StyledLink,
  StyledOR,
} from "./style";
import { schema } from "./validation";
import Header from "../../components/Header";
import Footer from "../../components/Footer";

import { collection, getDocs, query, where } from "firebase/firestore";
import { db } from "../../firebase";
import { useNavigate } from "react-router-dom";
import { Button, CircularProgress, IconButton, Stack } from "@mui/material";
import { RemoveRedEyeOutlined } from "@mui/icons-material";
import { auth } from "../../firebase";

import { signInWithPopup, GoogleAuthProvider } from "firebase/auth";
function Login() {
  const {
    loading,
    setLoading,
    errors,
    setErrors,
    setUser,
    setAuthorized,
  } = useAuthContext();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordType, setPasswordType] = useState("password");

  const navigate = useNavigate();
  const handlePasswordShow = (e) => {
    e.preventDefault();
    setPasswordType(passwordType === "password" ? "text" : "password");
  };

  const handleChangeInput = (e) => {
    const { value, id } = e.target;
    if (id === "username") setEmail(value);
    if (id === "password") setPassword(value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await schema.validate({ email, password }, { abortEarly: false });
      signInWithEmailAndPassword(auth, email, password).then(
        async (userCredential) => {
          const user = userCredential.user;
          const {
            docs: [userDetails],
          } = await getDocs(
            query(collection(db, "users"), where("email", "==", user.email))
          );
          setUser(userDetails.data());
          localStorage.setItem("user", JSON.stringify(userDetails));
          setAuthorized(true);
          navigate("/");
          setLoading(false);
        }
      );
    } catch (e) {
      const errors = e.inner.reduce((acc, error) => {
        acc[error.path] = error.message;
        return acc;
      }, {});
      setErrors(errors);
      setLoading(false);
    }
  };

  const signInWithGoogle = async () => {
    const provider = new GoogleAuthProvider();
    await signInWithPopup(auth, provider);
    navigate("/");
    setLoading(false);
  };
  return (
    <>
      <Header form />
      <StyledForm>
        <Register>Log in to Recrut </Register>
        <InputWrapper>
          <label htmlFor="username">Email</label>
          <input
            type="email"
            id="username"
            onChange={handleChangeInput}
            value={email}
            placeholder="Email or phone"
          />
          {errors && errors.email && (
            <ErrorMessage>{errors.email}</ErrorMessage>
          )}
        </InputWrapper>

        <InputWrapper>
          <label htmlFor="password">Password</label>
          <Stack flexDirection={"row"}>
            <input
              type={passwordType}
              id="password"
              onChange={handleChangeInput}
              value={password}
              placeholder="Type Here"
            />

            <IconButton
              onClick={handlePasswordShow}
              sx={{ marginRight: "-38px" }}
            >
              <RemoveRedEyeOutlined />
            </IconButton>
          </Stack>
          {errors && errors.password && (
            <ErrorMessage>{errors.password}</ErrorMessage>
          )}
        </InputWrapper>

        <Button
          color="primary"
          variant="contained"
          sx={{ width: "60%", borderRadius: "20px", marginTop: "30px" }}
          onClick={handleSubmit}
        >
          {loading ? <CircularProgress color="inherit" /> : "  Log In"}
        </Button>

        <StyledOR>
          <div></div> <span>or</span> <div></div>
        </StyledOR>

        <StyledButton type="button" facebook={apple} onClick={signInWithGoogle}>
          <StyledImg src={google} alt="google" />
          Continue with Google
        </StyledButton>

        <AlredyAccount>Don’t have an Recrut account?</AlredyAccount>
        <StyledLink to="/signup"> Sign Up now</StyledLink>
      </StyledForm>
      <Footer form />
    </>
  );
}

export default Login;
