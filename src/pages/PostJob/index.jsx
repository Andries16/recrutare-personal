import { Box, Stack, Typography } from "@mui/material";
import Footer from "../../components/Footer";
import Header from "../../components/Header";
import JobForm from "../../components/forms/JobForm";
import { StatusOfTime } from "../../components/HandelingTime/style";
import postJob from "../../assets/postJob.png";

export default function PostJob() {
  return (
    <>
      <Header form />
      <Box sx={{ margin: "40px 100px" }}>
        <Stack alignItems="center">
          <StatusOfTime>
            <Stack sx={{ padding: "50px" }}>
              <Typography variant="h4">Post a Job</Typography>
              <Typography variant="h5">Here you can create a job </Typography>
            </Stack>
            <img src={postJob} alt="status" />
          </StatusOfTime>
          <Box
            sx={{
              padding: "50px 20px",
              borderRadius: "20px",
              background: "rgb(49, 58, 73)",
            }}
          >
            <JobForm />
          </Box>
        </Stack>
      </Box>
      <Footer form />
    </>
  );
}
