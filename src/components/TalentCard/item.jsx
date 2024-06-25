import * as React from "react";
import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";
import CardContent from "@mui/material/CardContent";
import CardActions from "@mui/material/CardActions";
import Collapse from "@mui/material/Collapse";
import Avatar from "@mui/material/Avatar";
import Typography from "@mui/material/Typography";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { Chip, Stack } from "@mui/material";
import { ToggleSaveBtn } from "../JobCard/style";
import { Favorite, FavoriteBorder } from "@mui/icons-material";

import { useTalentContext } from "../../context/talentContext";

import { styled } from "@mui/material/styles";
import IconButton from "@mui/material/IconButton";
const ExpandMore = styled((props) => {
  const { expand, ...other } = props;
  return <IconButton {...other} />;
})(({ theme, expand }) => ({
  transform: !expand ? "rotate(0deg)" : "rotate(180deg)",
  marginLeft: "auto",
  transition: theme.transitions.create("transform", {
    duration: theme.transitions.duration.shortest,
  }),
}));
export default function Item({ talent }) {
  const [expanded, setExpanded] = React.useState(false);

  const handleExpandClick = () => {
    setExpanded(!expanded);
  };
  const { state, addToSaved, removeFromSaved } = useTalentContext();

  React.useEffect(() => {
    localStorage.setItem("savedTalents", JSON.stringify(state.talents));
  }, [state.talents]);

  const handleToggleSaved = (detail) => {
    const isSaved = state.talents.find((item) => item.email === detail.email);
    isSaved ? removeFromSaved(detail.email) : addToSaved(detail);
  };
  return (
    <Card
      sx={{
        width: "100%",
        background: "rgb(49, 58, 73)",
        margin: "10px 0",
        position: "relative",
      }}
    >
      <CardHeader
        avatar={<Avatar src={talent.photoURL} />}
        title={talent.displayName + " | " + talent.email}
        subheader={talent.birthday + (talent.phone ? " | " + talent.phone : "")}
      />

      <CardContent>
        <Typography variant="h4" color="text.primary">
          {talent.jobTitle}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          {talent.description.slice(0, 200)}
        </Typography>

        <Stack flexDirection={"row"} sx={{ marginTop: "20px" }}>
          {talent.skills.map((item, key) => (
            <Chip label={item} key={key} />
          ))}
        </Stack>
      </CardContent>
      <CardActions disableSpacing>
        <ToggleSaveBtn onClick={() => handleToggleSaved(talent)}>
          {state.talents.find((item) => item.email === talent.email) ? (
            <Favorite sx={{ color: "white", fontSize: "30px" }} />
          ) : (
            <FavoriteBorder sx={{ color: "white", fontSize: "30px" }} />
          )}
        </ToggleSaveBtn>

        <ExpandMore
          expand={expanded}
          onClick={handleExpandClick}
          aria-expanded={expanded}
          aria-label="show more"
        >
          <ExpandMoreIcon />
        </ExpandMore>
      </CardActions>
      <Collapse in={expanded} timeout="auto" unmountOnExit>
        <CardContent>{talent.description}</CardContent>
      </Collapse>
    </Card>
  );
}
