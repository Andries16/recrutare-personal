import React, { useState, useEffect } from "react";
import JobCard from "../JobCard";
import styled from "styled-components";
import { Divider } from "@mui/material";
import { collection, query, limit, getDocs, where } from "firebase/firestore";
import { db } from "../../firebase";
import { useAuthContext } from "../../context/AuthContext";
import TalentCard from "../TalentCard";

function JobDetails() {
  const [job, setJob] = useState([]);
  const { user } = useAuthContext();
  useEffect(() => {
    if (user.type === "recrut")
      getDocs(query(collection(db, "jobs"), limit(5))).then((snap) => {
        if (snap.docs.length) setJob(snap.docs.map((doc) => doc.data()));
      });
    else
      getDocs(
        query(
          collection(db, "users"),
          limit(30),
          where("type", "==", "recrut"),
          where("available", "==", true)
        )
      ).then((snap) => {
        if (snap.docs.length) setJob(snap.docs.map((doc) => doc.data()));
      });
  }, [user.type]);
  return (
    <>
      <Text>
        {user.type === "recrut"
          ? "Browse jobs that match your experience to a client's hiring preferences.Ordered by most relevant."
          : " Browse talents that match your hiring preferences."}
      </Text>
      {user.type === "recrut" ? (
        <JobCard Jobdetails={job} />
      ) : (
        <TalentCard talentDetails={job} />
      )}

      <Divider variant="fullWidth" />
    </>
  );
}

export const Text = styled.span`
  font-size: 14px;
  color: #ffff;
  margin-bottom: 20px;
`;

export default JobDetails;
