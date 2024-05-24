import React, { useEffect, useState } from "react";
import Header from "../../components/Header";
import Footer from "../../components/Footer/index";
import JobCard from "../../components/JobCard";
import { Box, Stack, Typography } from "@mui/material";
import { StatusOfTime } from "../../components/HandelingTime/style";
import { useAuthContext } from "../../context/AuthContext";
import { collection, getDocs, query, where } from "firebase/firestore";
import { db } from "../../firebase";

import status1 from "../../assets/status1.png";

const MyJobs = () => {
  const [jobs, setJobs] = useState([]);
  const { user } = useAuthContext();
  useEffect(() => {
    if (user.type === "recrut") {
      getDocs(
        query(
          collection(db, "jobs"),
          where("aplicants", "array-contains", user.email)
        )
      ).then(({ docs }) => setJobs(docs.map((doc) => doc.data())));
    } else {
      getDocs(
        query(collection(db, "jobs"), where("author", "==", user.email))
      ).then(({ docs }) => setJobs(docs.map((doc) => doc.data())));
    }
  }, [user.email, user.type]);
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
            <Typography variant="h4">My Jobs</Typography>
            <Typography variant="h5">
              {user.type === "recrut"
                ? "Here you can find jobs you applied for"
                : "Here you can find jobs you posted"}
            </Typography>
          </Stack>
          <img src={status1} alt="status" />
        </StatusOfTime>
        <Box
          sx={{
            margin: "0 0 50px ",
            borderRadius: "10px",
            width: "820px",
          }}
        >
          <JobCard Jobdetails={jobs} />
        </Box>
      </Stack>

      <Footer />
    </>
  );
};

export default MyJobs;
