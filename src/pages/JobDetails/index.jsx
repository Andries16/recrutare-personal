import React from "react";
import JobdetailsCard from "../../components/JobdetailsCard";

import Header from "./../../components/Header/index";
import { StatusOfTime } from "../../components/HandelingTime/style";
import { Stack, Typography } from "@mui/material";
import status3 from "../../assets/status3.png";
const JobDetails = () => {
  return (
    <>
      <Header />
      <Stack sx={{ marginTop: "50px" }} alignItems="center">
        <StatusOfTime>
          <Stack sx={{ padding: "50px" }}>
            <Typography variant="h4">Make yourself visible</Typography>
            <Typography variant="h5">
              Complete your profile to make you mare visible for clients !
            </Typography>
          </Stack>
          <img src={status3} alt="" />
        </StatusOfTime>
      </Stack>
      <JobdetailsCard />
    </>
  );
};

export default JobDetails;
