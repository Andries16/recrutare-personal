import { Autocomplete, TextField } from "@mui/material";
import React, { useEffect, useState } from "react";
import { Iconsearch, Search } from "./style";
import SearchIcon from "@mui/icons-material/Search";
import { useNavigate } from "react-router-dom";
import { useAuthContext } from "../../context/AuthContext";
import { collection, getDocs, query } from "firebase/firestore";
import { db } from "../../firebase";

const Searchbox = ({ width }) => {
  const [search, setSearch] = useState("");
  const [allJobs, setAllJobs] = useState([]);
  const { searchValue, setSearchValue } = useAuthContext();

  useEffect(() => {
    getDocs(query(collection(db, "jobs"))).then((result) =>
      setAllJobs(result.docs.map((el) => el.data()))
    );
  }, []);

  const { user } = useAuthContext();

  const navigate = useNavigate();

  const handleSubmit = (e) => {
    localStorage.setItem("search", search);
    console.log(search);
    navigate("/filter");
    const searched = [...searchValue, search];
    setSearchValue((prevState) => [...prevState, search]);
    localStorage.setItem("searchValues", JSON.stringify(searched));
  };

  return (
    <Search width={"100%"} onSubmit={handleSubmit}>
      <Autocomplete
        freeSolo
        disableClearable
        options={allJobs.map((job) => job.title)}
        sx={{ width: "100%" }}
        renderInput={(params) => (
          <TextField
            sx={{
              "& .MuiOutlinedInput-root": {
                borderTopLeftRadius: "8px",
                borderBottomLeftRadius: "8px",
                padding: "0",
                border: "none",
                width: "100%",
                height: "50px",
              },

              "& .MuiOutlinedInput-root:active": {
                border: "none",
              },
              "& .MuiOutlinedInput-root .MuiOutlinedInput-notchedOutline": {
                border: "1px solid #3b3c40",
                width: width,
              },
            }}
            {...params}
            label={
              user.type === "recrut"
                ? "Search for Job..."
                : "Search for Talents..."
            }
            onChange={(e) => setSearch(e.target.value)}
            InputProps={{
              ...params.InputProps,
              type: "search",
            }}
          />
        )}
      />
      <Iconsearch>
        <SearchIcon sx={{ width: "40px", margin: "-8px", color: "white" }} />
      </Iconsearch>
    </Search>
  );
};

export default Searchbox;
