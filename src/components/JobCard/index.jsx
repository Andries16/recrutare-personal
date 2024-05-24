import React, { useEffect, useState } from "react";
import Technology from "../ListOfSkills";
import { useJobContext } from "./../../context/jobContext";

import {
  Cardjob,
  JobDescription,
  Jobdetail,
  Jobdetail2,
  Span,
  ToggleSaveBtn,
  P,
} from "./style";
import LocationOnOutlinedIcon from "@mui/icons-material/LocationOnTwoTone";
import Stars from "../Stars";
import { useNavigate } from "react-router-dom";
import { Favorite, FavoriteBorder } from "@mui/icons-material";
import { useAuthContext } from "../../context/AuthContext";

const JobCard = ({ Jobdetails }) => {
  const { state, addToSaved, removeFromSaved } = useJobContext();
  const { user } = useAuthContext();
  const [expandedJobId, setExpandedJobId] = useState(null);

  useEffect(() => {
    localStorage.setItem("savedJobs", JSON.stringify(state.jobs));
    localStorage.setItem("count", state.count);
  }, [state.jobs, state.count]);

  const handleToggleSaved = (detail) => {
    const isSaved = state.jobs.find((item) => item.key === detail.key);
    isSaved ? removeFromSaved(detail.key) : addToSaved(detail);
  };

  const toggleShow = (id) => {
    setExpandedJobId(expandedJobId === id ? null : id);
  };

  const navigate = useNavigate();
  return (
    <>
      {Jobdetails?.map((detail) => (
        <Cardjob key={detail.id}>
          <P onClick={() => navigate("/JobDetails/" + detail.key)}>
            {detail.title}
          </P>
          <Jobdetail>
            {detail.author}
            <br></br>
            {detail.salary} MDL - {detail.level}. {detail.hoursPerWeek} - Posted
            in:
            {"" + new Date(detail.date).toLocaleDateString()}
          </Jobdetail>
          <JobDescription>
            {expandedJobId === detail.key
              ? detail.description
              : `${detail.description.slice(0, 200)}... `}
            {detail.description.length > 200 && (
              <Span onClick={() => toggleShow(detail.key)}>
                {expandedJobId === detail.key ? "less" : "more"}
              </Span>
            )}
          </JobDescription>
          <Technology technologiesOfItem={detail?.skillsRequired} />
          <p>
            <span>Proposals:</span>{" "}
            {detail.aplicants ? detail.aplicants.length : 0}
          </p>

          <Jobdetail2>
            {detail.paymentVerified ? (
              <span>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  aria-hidden="true"
                  fill="blue"
                  style={{
                    width: "16px",
                    verticalAlign: "middle",
                    paddingRight: "6px",
                  }}
                  viewBox="0 0 14 14"
                  role="img"
                >
                  <path d="M13.72 7.03c.45-.56.34-1.39-.24-1.82l-.55-.41c-.34-.25-.53-.66-.51-1.08l.03-.68c.03-.72-.53-1.32-1.25-1.33h-.68c-.42 0-.81-.22-1.05-.57L9.11.57c-.39-.6-1.2-.75-1.79-.33l-.55.4c-.34.24-.79.3-1.18.15L4.95.55c-.67-.25-1.41.11-1.64.79l-.21.65c-.14.4-.46.71-.87.82l-.65.18C.89 3.19.5 3.92.71 4.6l.21.65c.13.41.04.85-.22 1.18l-.42.54c-.45.56-.34 1.39.24 1.81l.55.41c.34.25.53.66.51 1.08l-.03.68c-.03.72.54 1.32 1.25 1.33h.68c.42 0 .81.22 1.05.57l.37.57c.39.6 1.21.75 1.79.33l.55-.4c.34-.25.78-.31 1.18-.16l.64.24c.67.25 1.41-.1 1.64-.79l.21-.65c.13-.4.45-.71.86-.82l.65-.17c.69-.19 1.09-.92.87-1.61l-.21-.65c-.13-.4-.05-.85.22-1.18l.42-.53zM6.06 9.84L3.5 7.27l1.23-1.23 1.33 1.33 3.21-3.21L10.5 5.4 6.06 9.84z"></path>
                </svg>
                Payment Verified <Stars filled />
              </span>
            ) : (
              <span>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  aria-hidden="true"
                  viewBox="0 0 14 14"
                  role="img"
                  fill="grey"
                  style={{
                    width: "16px",
                    verticalAlign: "middle",
                    paddingRight: "6px",
                  }}
                >
                  <path d="M12.6 7.181V1.4c0-.771-.63-1.4-1.4-1.4H1.399C.63 0 0 .629 0 1.4v7c0 .771.63 1.4 1.399 1.4h4.918A3.85 3.85 0 1012.6 7.181zM11.2 1.4v1.401H1.399V1.4H11.2zm-4.477 7H1.399V4.901H11.2v1.548a3.84 3.84 0 00-1.051-.149 3.845 3.845 0 00-3.426 2.1zm5.527 2.917l-.934.933-1.167-1.166-1.167 1.166-.932-.933 1.166-1.167L8.05 8.983l.932-.933 1.167 1.168 1.167-1.168.934.934-1.168 1.167 1.168 1.166z"></path>
                </svg>
                Payment Unverified <Stars />
              </span>
            )}
            <span>
              {" "}
              <LocationOnOutlinedIcon
                sx={{ verticalAlign: "middle", width: "25px" }}
              />
              {detail.location}
            </span>
          </Jobdetail2>

          {detail.author !== user.email && (
            <ToggleSaveBtn onClick={() => handleToggleSaved(detail)}>
              {state.jobs.find((item) => item.key === detail.key) ? (
                <Favorite sx={{ color: "white", fontSize: "30px" }} />
              ) : (
                <FavoriteBorder sx={{ color: "white", fontSize: "30px" }} />
              )}
            </ToggleSaveBtn>
          )}
        </Cardjob>
      ))}
    </>
  );
};

export default JobCard;
