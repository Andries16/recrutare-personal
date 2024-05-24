import React from "react";
import Header from "../../components/Header";
import Footer from "../../components/Footer/index";
import { Box, Stack, Typography } from "@mui/material";
import { StatusOfTime } from "../../components/HandelingTime/style";
import status from "../../assets/status.png";
import { useTalentContext } from "../../context/talentContext";
import TalentCard from "../../components/TalentCard";

const SavedTalents = () => {
  const { state } = useTalentContext();
  return (
    <>
      <Header />
      <Stack
        justifyContent={"center"}
        alignItems={"center"}
        sx={{ marginTop: "50px" }}
      >
        <StatusOfTime>
          <Stack sx={{ padding: "50px" }}>
            <Typography variant="h4">Saved Talents</Typography>
            <Typography variant="h5">
              Here you can find users whose profiles you have recently viewed
            </Typography>
          </Stack>
          <img src={status} alt="" />
        </StatusOfTime>
        <Box
          sx={{
            margin: "0 0 50px ",
            borderRadius: "10px",
            width: "820px",
          }}
        >
          <TalentCard talentDetails={state.talents} />
        </Box>
      </Stack>

      <Footer />
    </>
  );
};

export default SavedTalents;
