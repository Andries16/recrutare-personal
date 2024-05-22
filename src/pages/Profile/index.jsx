import React, { useEffect, useState } from "react";
import Header from "../../components/Header";
import Footer from "../../components/Footer/index";
import OverViewModal from "../../components/Modals/OverViewModal";
import RateModal from "../../components/Modals/RateModal";
import SkillsModal from "../../components/Modals/SkillsModal";
import TitleModal from "../../components/Modals/TitleModal";
import { Container, OverView, Title, Hr, Rate, SKILLS, Span } from "./style";
import ProfileImage from "./ProfileImage/ProfileImage";
import { Styledskill } from "../../components/ListOfSkills/style";
import { useAuthContext } from "../../context/AuthContext";
import { Stack } from "@mui/material";
const Profile = () => {
  const { user } = useAuthContext();
  console.log(user);
  return (
    <div>
      <Header />
      <Container>
        <Stack flexDirection="row">
          <Stack sx={{ width: "30%" }}>
            <ProfileImage />
          </Stack>
          <Stack sx={{ width: "70%" }}>
            <Stack flexDirection="row" alignItems="center">
              <Title>{user.jobTitle}</Title>
              <TitleModal />
            </Stack>
            <Stack flexDirection="row" alignItems="center">
              <Rate>${user.rate}</Rate>
              <RateModal />
            </Stack>
            <Stack
              flexDirection="row"
              alignItems="center"
              sx={{ marginRight: "10px" }}
            >
              <OverView>{user.description}</OverView>
              <OverViewModal />
            </Stack>
            <Span>skills</Span>
            <Stack
              flexDirection="row"
              alignItems="center"
              sx={{ marginRight: "10px" }}
            >
              <SKILLS>
                {[1, 2, 3, 4].map((item, key) => (
                  <Styledskill key={key}>{"React"}</Styledskill>
                ))}
              </SKILLS>
              <SkillsModal />
            </Stack>
          </Stack>
        </Stack>
      </Container>
      <Footer />
    </div>
  );
};
export default Profile;
