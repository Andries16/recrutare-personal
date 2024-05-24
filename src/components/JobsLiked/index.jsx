import React from "react";
import BasicTabs from "../JobsTabs";
import { Jobs, Title } from "./style";
import { useAuthContext } from "../../context/AuthContext";

const JobsLiked = () => {
  const { user } = useAuthContext();
  return (
    <Jobs>
      <Title>
        {user.type === "recrut" ? "Jobs" : "Talents"} you might like
      </Title>
      <BasicTabs />
    </Jobs>
  );
};

export default JobsLiked;
