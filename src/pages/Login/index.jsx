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
          navigate("/home");
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

  return (
    <>
      <Header form />
      <StyledForm onSubmit={handleSubmit}>
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

            {errors && errors.password && (
              <ErrorMessage>{errors.password}</ErrorMessage>
            )}
            <IconButton
              onClick={handlePasswordShow}
              sx={{ marginRight: "-38px" }}
            >
              <RemoveRedEyeOutlined />
            </IconButton>
          </Stack>
        </InputWrapper>

        <Button
          color="primary"
          variant="contained"
          type="submit"
          sx={{ width: "60%", borderRadius: "20px", marginTop: "30px" }}
        >
          {loading ? <CircularProgress color="inherit" /> : "  Log In"}
        </Button>

        <StyledOR>
          <div></div> <span>or</span> <div></div>
        </StyledOR>

        <StyledButton facebook={apple}>
          <StyledImg src={google} alt="google" />
          Continue with Google
        </StyledButton>

        <StyledButton>
          <StyledImg src={apple} alt="facebook" facebook={apple} />
          Continue with apple
        </StyledButton>

        <AlredyAccount>Don’t have an Recrut account?</AlredyAccount>
        <StyledLink to="/signup"> Sign Up now</StyledLink>
      </StyledForm>
      <Footer form />
    </>
  );
}

export default Login;
