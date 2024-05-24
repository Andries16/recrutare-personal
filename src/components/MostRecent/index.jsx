import { Divider } from "@mui/material";
import React, { useEffect, useState } from "react";
import {
  collection,
  query,
  limit,
  getDocs,
  orderBy,
  where,
} from "firebase/firestore";
import JobCard from "../JobCard";
import { Text } from "../JobDetails";
import { db } from "../../firebase";
import { useAuthContext } from "../../context/AuthContext";
import TalentCard from "../TalentCard";

const MostRecent = () => {
  const [mostJob, setMostJob] = useState([]);
  const user = useAuthContext();
  useEffect(() => {
    if (user.type === "recrut") {
      getDocs(
        query(collection(db, "jobs"), limit(30), orderBy("date", "desc"))
      ).then((snap) => {
        if (snap.docs.length) setMostJob(snap.docs.map((doc) => doc.data()));
      });
    } else {
      getDocs(
        query(
          collection(db, "users"),
          limit(30),
          where("type", "==", "recrut"),
          where("available", "==", true)
        )
      ).then((snap) => {
        if (snap.docs.length) setMostJob(snap.docs.map((doc) => doc.data()));
      });
    }
  }, [user.type]);

  return (
    <>
      <Text>
        {user.type === "recrut"
          ? "Browse the most recent jobs that match your skills and profile description to the skills clients are looking for."
          : "Browse the most recent recruts that match your job skills"}
      </Text>
      {user.type === "recrut" ? (
        <JobCard Jobdetails={mostJob} />
      ) : (
        <TalentCard talentDetails={mostJob} />
      )}
      <Divider variant="fullWidth" />
    </>
  );
};

export default MostRecent;
