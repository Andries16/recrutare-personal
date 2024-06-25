import React, { useEffect } from "react";
import { useState } from "react";
import JobCard from "../../components/JobCard";
import { collection, getDocs, query } from "firebase/firestore";
import { db } from "../../firebase";
import Fuse from "fuse.js";
import Header from "../../components/Header";
import Footer from "../../components/Footer";
import { Box, Stack, Typography } from "@mui/material";
import { StatusOfTime } from "../../components/HandelingTime/style";
import search from "../../assets/search.png";
import Searchbox from "../../components/Searchbox";
import { useAuthContext } from "../../context/AuthContext";
import TalentCard from "../../components/TalentCard";

const Filter = () => {
  const [filterItems, setFilterItems] = useState([]);
  const [searchValue] = useState(localStorage.getItem("search"));
  const { user } = useAuthContext();

  useEffect(() => {}, []);
  useEffect(() => {
    if (user.type === "recrut") {
      const fuseOptions = {
        keys: ["title", "author", "skillsRequired"],
      };
      getDocs(query(collection(db, "jobs")))
        .then(({ docs }) => docs.map((doc) => doc.data()))
        .then((jobs) => {
          const fuse = new Fuse(jobs, fuseOptions);
          const items = fuse.search(searchValue);
          setFilterItems(items.map((item) => item.item));
        });
    } else {
      const fuseOptions = {
        keys: ["jobTitle", "skills"],
      };
      getDocs(query(collection(db, "users")))
        .then(({ docs }) => docs.map((doc) => doc.data()))
        .then((talents) => {
          const fuse = new Fuse(talents, fuseOptions);
          const items = fuse.search(searchValue);
          setFilterItems(items.map((item) => item.item));
        });
    }
  }, [searchValue, user.type]);

  return (
    <>
      <Header />
      <Stack alignItems="center" sx={{ margin: "50px 0" }}>
        <StatusOfTime>
          <Stack sx={{ padding: "50px" }}>
            <Typography variant="h4">
              {user.type === "recrut" ? "Jobs" : "Talents"}
            </Typography>
            <Typography variant="h5">
              {user.type === "recrut"
                ? " Here you can find your perfect job!"
                : "Here ypu can find perfect talent"}
            </Typography>
            <Typography variant="h6">
              Showed results for {searchValue}
            </Typography>
          </Stack>
          <img src={search} alt="status" />
        </StatusOfTime>
        <Box sx={{ width: "840px" }}>
          <Searchbox width="100%" />
        </Box>

        <Box sx={{ width: "880px" }}>
          {user.type === "recrut" ? (
            <JobCard Jobdetails={filterItems} />
          ) : (
            <TalentCard talentDetails={filterItems} />
          )}
        </Box>
      </Stack>

      <Footer />
    </>
  );
};

export default Filter;
