import React from "react";
import Header from "../../components/Header";
import Footer from "../../components/Footer/index";
import OverViewModal from "../../components/Modals/OverViewModal";
import RateModal from "../../components/Modals/RateModal";
import SkillsModal from "../../components/Modals/SkillsModal";
import TitleModal from "../../components/Modals/TitleModal";
import { Container, OverView, Title, Rate, SKILLS, Span } from "./style";
import { useAuthContext } from "../../context/AuthContext";
import { Chip, Stack } from "@mui/material";
import ImgModal from "../../components/Modals/ImgModal/ImgModal";
const Profile = () => {
  const { user } = useAuthContext();
  console.log(user);
  return (
    <div>
      <Header />
      <Container>
        <Stack flexDirection="row">
          <Stack sx={{ width: "30%" }}>
            <ImgModal />
          </Stack>
          <Stack sx={{ width: "70%" }}>
            <Stack flexDirection="row" alignItems="center">
              <Title>{user.displayName}</Title>
            </Stack>
            <Stack flexDirection="row" alignItems="center">
              <Title>{user.jobTitle}</Title>
              {user.type === "recrut" && <TitleModal />}
            </Stack>
            {user.type === "recrut" && (
              <Stack flexDirection="row" alignItems="center">
                <Rate>${user.rate}</Rate>
                <RateModal />
              </Stack>
            )}
            <Stack
              flexDirection="row"
              alignItems="center"
              sx={{ marginRight: "10px" }}
            >
              <OverView>{user.description}</OverView>
              <OverViewModal />
            </Stack>
            {user.type === "recrut" && (
              <>
                <Span>Skills</Span>
                <Stack
                  flexDirection="row"
                  alignItems="center"
                  sx={{ marginRight: "10px" }}
                >
                  <SKILLS>
                    {user.skills.map((item, key) => (
                      <Chip sx={{ margin: "2px" }} label={item} />
                    ))}
                  </SKILLS>
                  <SkillsModal />
                </Stack>
              </>
            )}
          </Stack>
        </Stack>
      </Container>
      <Footer />
    </div>
  );
};
export default Profile;
