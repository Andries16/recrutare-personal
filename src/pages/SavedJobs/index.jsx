import React from "react";
import Header from "../../components/Header";
import Footer from "../../components/Footer/index";
import JobCard from "../../components/JobCard";
import { useJobContext } from "../../context/jobContext";
import { Box, Stack, Typography } from "@mui/material";
import { StatusOfTime } from "../../components/HandelingTime/style";
import status from "../../assets/status.png";

const Savedjob = () => {
  const { state } = useJobContext();
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
            <Typography variant="h4">Saved Jobs</Typography>
            <Typography variant="h5">Here you can find saved jobs</Typography>
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
          <JobCard Jobdetails={state.jobs} />
        </Box>
      </Stack>

      <Footer />
    </>
  );
};

export default Savedjob;
