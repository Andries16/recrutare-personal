import React, { useState } from "react";
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
  SubmitButton,
} from "../Login/style";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth, db } from "../../firebase";
import { addDoc, collection } from "firebase/firestore";
import google from "../../assets/google.svg";
import apple from "../../assets/apple.png";

import { CheckedInputWrapper } from "./style";
import { useAuthContext } from "../../context/AuthContext";
import { schema } from "./validation";
import Header from "../../components/Header";
import Footer from "../../components/Footer";

import { IconButton, Stack } from "@mui/material";
import { RemoveRedEyeOutlined } from "@mui/icons-material";

import { signInWithPopup, GoogleAuthProvider } from "firebase/auth";
const Signup = () => {
  const {
    setAuthorized,
    loading,
    setLoading,
    errors,
    setErrors,
    setUser,
  } = useAuthContext();

  const [firstname, setFirstName] = useState("");
  const [lastname, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [checked, setChecked] = useState(false);
  const [passwordType, setPasswordType] = useState("password");

  const handleChangeInput = (e) => {
    const { value, id } = e.target;
    if (id === "firstname") setFirstName(value);
    if (id === "lastname") setLastName(value);
    if (id === "email") setEmail(value);
    if (id === "password") setPassword(value);
    if (id === "checked") setChecked(e.target.checked);
  };

  const handlePasswordShow = (e) => {
    e.preventDefault();
    setPasswordType(passwordType === "password" ? "text" : "password");
  };

  const handleSubmit = () => {
    setLoading(true);
    schema
      .validate(
        {
          firstname,
          email,
          password,
          lastname,
          checked,
        },
        { abortEarly: false }
      )
      .then(async () => {
        createUserWithEmailAndPassword(auth, email, password).then(
          async (userCredential) => {
            const user = userCredential.user;
            let { photoURL, displayName, email } = user;
            if (!displayName) displayName = firstname + " " + lastname;
            const userToSave = {
              photoURL,
              displayName,
              email,
              isCompleted: false,
              connects: 100,
            };
            await addDoc(collection(db, "users"), userToSave);
            setUser(userToSave);
            setAuthorized(true);
          }
        );
      })
      .catch((e) => {
        const errors = e.inner.reduce((acc, error) => {
          acc[error.path] = error.message;
          return acc;
        }, {});
        setErrors(errors);
        setLoading(false);
      });
  };

  const signInWithGoogle = async () => {
    const provider = new GoogleAuthProvider();
    await signInWithPopup(auth, provider);
  };

  return (
    <>
      <Header form />
      <StyledForm>
        <Register>Sign up to find work you love</Register>
        <StyledButton type="button" facebook={apple} onClick={signInWithGoogle}>
          <StyledImg src={google} alt="google" />
          Continue with Google
        </StyledButton>
        <StyledOR>
          <div></div> <span>or</span> <div></div>
        </StyledOR>

        <InputWrapper>
          <label htmlFor="firstname">First Name</label>
          <input
            type="text"
            id="firstname"
            onChange={handleChangeInput}
            value={firstname}
            placeholder="Type here"
          />
        </InputWrapper>

        <InputWrapper>
          <label htmlFor="lastname">Last Name</label>
          <input
            type="text"
            id="lastname"
            onChange={handleChangeInput}
            value={lastname}
            placeholder="Type here"
          />
        </InputWrapper>

        {errors && errors.firstname && (
          <ErrorMessage>{errors.firstname}</ErrorMessage>
        )}
        {errors && errors.lastname && (
          <ErrorMessage>{errors.lastname}</ErrorMessage>
        )}
        <InputWrapper>
          <label htmlFor="email">Email</label>
          <input
            type="email"
            id="email"
            onChange={handleChangeInput}
            value={email}
            placeholder="Email "
          />
        </InputWrapper>
        {errors && errors.email && <ErrorMessage>{errors.email}</ErrorMessage>}
        <InputWrapper>
          <label htmlFor="password">Password</label>
          <Stack flexDirection={"row"}>
            <input
              type={passwordType}
              id="password"
              onChange={handleChangeInput}
              value={password}
              placeholder="Password (8 or more characters)"
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

        <CheckedInputWrapper>
          <input
            type="checkbox"
            id="checked"
            onChange={handleChangeInput}
            checked={checked}
          />
          <label htmlFor="checked">
            Yes, I agree to the freelnace Terms of Service
          </label>
        </CheckedInputWrapper>
        {errors && errors.checked && (
          <ErrorMessage>{errors.checked}</ErrorMessage>
        )}
        <SubmitButton type="button" onClick={handleSubmit}>
          {loading ? "loading..." : "Create My Account"}
        </SubmitButton>
        <AlredyAccount>Already have an account?</AlredyAccount>
        <StyledLink to="/login"> Log In</StyledLink>
      </StyledForm>
      <Footer form />
    </>
  );
};

export default Signup;
