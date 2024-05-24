import React, { useState } from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import SkillBox from "../SkillBox";
import { Edit } from "@mui/icons-material";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 500,
  bgcolor: "background.paper",
  border: "none",
  "&:focus-visible": {
    border: "none",
    outline: "none",
  },
  boxShadow: 24,
  p: 10,
};

const SkillsModal = () => {
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  return (
    <div>
      <Edit
        onClick={handleOpen}
        sx={{ width: "30px", height: "30px", cursor: "pointer" }}
        color="secondary"
      />

      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Typography id="modal-modal-title" variant="h6" component="h2">
            Edit Skill
          </Typography>
          <Typography id="modal-modal-description" sx={{ mt: 2 }}>
            Skills Keeping your skills up to date helps you get the jobs you
            want.
          </Typography>
          <SkillBox handleClose={handleClose} />
        </Box>
      </Modal>
    </div>
  );
};

export default SkillsModal;
