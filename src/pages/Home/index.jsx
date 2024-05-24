import React from "react";
import { Container } from "../../global/style";
import Header from "../../components/Header";
import TimeStatus from "../../components/HandelingTime";
import JobsLiked from "../../components/JobsLiked";
import Footer from "./../../components/Footer/index";
import ScrollButton from "../../components/ScrollButton";
import PersonalInformation from "../../components/PersonalInformation";
import { useAuthContext } from "./../../context/AuthContext";
import Searchbox from "../../components/Searchbox";
import { Box, Stack } from "@mui/material";

const Home = () => {
  const { searchValue } = useAuthContext();
  return (
    <>
      <Header />
      <Container>
        <Stack flexDirection={"row"}>
          <Box>
            <TimeStatus />
            <div>
              <Searchbox width="100%" />
              <div>
                Recent Searches:{" "}
                {searchValue.slice(-3).map((value, index) => (
                  <span key={index} style={{ textDecoration: "underline" }}>
                    {value}
                  </span>
                ))}
              </div>
              <JobsLiked />
              <ScrollButton />
            </div>
          </Box>
          <PersonalInformation />
        </Stack>
      </Container>
      <Footer />
    </>
  );
};

export default Home;
