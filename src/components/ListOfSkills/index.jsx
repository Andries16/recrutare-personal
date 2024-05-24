import { Chip } from "@mui/material";
import { Skilll } from "./style";

const Technology = ({ technologiesOfItem }) => {
  return (
    <Skilll>
      {technologiesOfItem?.map((techItem, index) => (
        <Chip key={index} label={techItem} sx={{ margin: "5px" }} />
      ))}
    </Skilll>
  );
};

export default Technology;
