import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import {
  Jobtitle,
  JobDetailCard,
  Span,
  Jobdescription,
  Right,
  Left,
  JobStatus,
} from "./style";
import {
  Alert,
  Box,
  Button,
  Chip,
  Divider,
  Stack,
  Typography,
} from "@mui/material";
import {
  collection,
  deleteDoc,
  getDocs,
  query,
  updateDoc,
  where,
} from "firebase/firestore";
import { db } from "../../firebase";
import {
  AccessTime,
  BrowseGallery,
  Favorite,
  FavoriteBorder,
  LocationOn,
  Psychology,
} from "@mui/icons-material";
import { useAuthContext } from "../../context/AuthContext";
import JobDetailsModal from "./JobDetailsModal";
import { ToggleSaveBtn } from "../JobCard/style";
import { useJobContext } from "../../context/jobContext";
import TalentCard from "../TalentCard";
import { useModal } from "../../context/confirmationContext";

const JobdetailsCard = () => {
  const { id } = useParams();
  const [jobdetails, setJobDetails] = useState({});
  const [jobSnap, setJobSnap] = useState();
  const [deletedSuccessfully, setDeletedSuccesfully] = useState(false);
  const [appliedSuccessfully, setApliedSuccesfully] = useState(false);
  const [aplicants, setAplicants] = useState([]);
  const { openModal } = useModal();
  const { navigate } = useNavigate();

  useEffect(() => {
    getDocs(query(collection(db, "jobs"), where("key", "==", id))).then(
      ({ docs: [job] }) => {
        setJobDetails(job.data());
        setJobSnap(job);
      }
    );
  }, [id]);
  const { user } = useAuthContext();
  const applyJob = () => {
    openModal(
      "Apply for Job",
      "Are you sure you want to aplly to this job?",
      async () => {
        const aplicants = jobdetails.aplicants || [];
        aplicants.push(user.email);
        updateDoc(jobSnap.ref, { ...jobdetails, aplicants });
        setJobDetails({ ...jobdetails, aplicants });
        setApliedSuccesfully(true);
        setTimeout(() => {
          setApliedSuccesfully(false);
        }, 2000);
      },
      () => {}
    );
  };

  const deleteJob = async () => {
    openModal(
      "Delete Job",
      "Are you sure you want to delete this job?",
      async () => {
        await deleteDoc(jobSnap.ref);
        setDeletedSuccesfully(true);
        setTimeout(() => {
          setDeletedSuccesfully(false);
          navigate(-1);
        }, 2000);
      },
      () => {}
    );
  };
  const { state, addToSaved, removeFromSaved } = useJobContext();

  useEffect(() => {
    localStorage.setItem("savedJobs", JSON.stringify(state.jobs));
    localStorage.setItem("count", state.count);
  }, [state.jobs, state.count]);

  useEffect(() => {
    if (
      user.type === "client" &&
      user.email === jobdetails.author &&
      jobdetails.aplicants
    ) {
      getDocs(
        query(
          collection(db, "users"),
          where("email", "in", jobdetails.aplicants)
        )
      ).then(({ docs }) => {
        setAplicants(docs.map((doc) => doc.data()));
      });
    }
  });

  const handleToggleSaved = (detail) => {
    const isSaved = state.jobs.find((item) => item.key === detail.key);
    isSaved ? removeFromSaved(detail.key) : addToSaved(detail);
  };

  return (
    <JobDetailCard>
      <Right>
        {deletedSuccessfully && (
          <Alert
            severity="success"
            sx={{ position: "absolute", top: 20, right: 20, width: "200px" }}
          >
            Job is deleted successfully.
          </Alert>
        )}
        {appliedSuccessfully && (
          <Alert
            severity="success"
            sx={{ position: "absolute", top: 20, right: 20, width: "200px" }}
          >
            Applied successfuly to this Job.
          </Alert>
        )}
        <Box
          sx={{
            background: " rgb(49, 58, 73)",
            borderTopLeftRadius: "10px",
            position: "relative",
          }}
        >
          {jobdetails.author === user.email && user.type === "client" ? (
            <JobDetailsModal job={jobdetails} setJob={setJobDetails} />
          ) : (
            <ToggleSaveBtn onClick={() => handleToggleSaved(jobdetails)}>
              {state.jobs.find((item) => item.key === jobdetails.key) ? (
                <Favorite sx={{ color: "white", fontSize: "30px" }} />
              ) : (
                <FavoriteBorder sx={{ color: "white", fontSize: "30px" }} />
              )}
            </ToggleSaveBtn>
          )}

          <Jobtitle>{jobdetails.title}</Jobtitle>
          <Span>{new Date(jobdetails.date).toLocaleDateString()}</Span>
        </Box>
        <Jobdescription>{jobdetails.description}</Jobdescription>
        <Typography sx={{ marginLeft: "5px", fontWeight: "bolder" }}>
          Skills Required
        </Typography>
        <Stack flexDirection="row">
          {jobSnap &&
            jobdetails?.skillsRequired.map((skill) => (
              <Chip label={skill} sx={{ margin: "5px" }} color="secondary" />
            ))}
        </Stack>
        <Divider variant="fullWidth" />
        {jobdetails.author === user.email && user.type === "client" && (
          <Button
            color="error"
            variant="contained"
            sx={{ width: "90%", margin: "40px", boxSizing: "border-box" }}
            onClick={deleteJob}
          >
            Delete
          </Button>
        )}
        {user.type === "recrut" && (
          <Stack
            flexDirection={"row"}
            sx={{ margin: "40px" }}
            justifyContent="space-between"
          >
            <Button
              color="secondary"
              variant="contained"
              sx={{ width: "100%" }}
              onClick={applyJob}
              disabled={
                jobdetails.aplicants?.find((item) => item === user.email) ||
                false
              }
            >
              {jobdetails.aplicants?.find((item) => item === user.email)
                ? "You applied for this job"
                : "Apply"}
            </Button>
          </Stack>
        )}
        {user.type === "client" &&
          user.email === jobdetails.author &&
          jobdetails.aplicants && (
            <>
              <Typography variant="h5" sx={{ padding: "10px" }}>
                Applicants
              </Typography>
              <TalentCard talentDetails={aplicants} />
            </>
          )}
      </Right>
      <Left>
        <JobStatus>
          <Stack
            flexDirection={"row"}
            alignItems="center"
            sx={{ width: "100%" }}
          >
            <BrowseGallery sx={{ color: "white", marginRight: "10px" }} />
            {jobdetails.hoursPerWeek}
          </Stack>
          <Stack
            flexDirection={"row"}
            alignItems="center"
            sx={{ width: "100%" }}
          >
            <Psychology sx={{ color: "white", marginRight: "10px" }} />
            {jobdetails.level}
          </Stack>
          <Stack
            flexDirection={"row"}
            alignItems="center"
            sx={{ width: "100%" }}
          >
            <AccessTime sx={{ color: "white", marginRight: "10px" }} />
            {jobdetails.salary}
            {" MDL"}
          </Stack>
          <Stack
            flexDirection={"row"}
            alignItems="center"
            sx={{ width: "100%" }}
          >
            <LocationOn sx={{ color: "white", marginRight: "10px" }} />
            {jobdetails.location}
          </Stack>
        </JobStatus>
      </Left>
    </JobDetailCard>
  );
};

export default JobdetailsCard;
