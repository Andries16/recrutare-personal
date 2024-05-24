import React, { useEffect, useState } from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import {
  collection,
  getDocs,
  query,
  updateDoc,
  where,
} from "firebase/firestore";
import { db } from "../../firebase";
import { Edit } from "@mui/icons-material";
import { useAuthContext } from "../../context/AuthContext";
import { Button, TextField } from "@mui/material";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 500,
  bgcolor: "background.paper",
  "&:focus-visible": {
    border: "none",
    outline: "none",
  },
  border: "none",
  boxShadow: 24,
  p: 10,
};

const OverViewModal = () => {
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const [newOverView, setNewOverView] = useState("");
  const { user, setUser } = useAuthContext();

  useEffect(() => {
    setNewOverView(user.description);
  }, [user.description]);

  const handleChangeInput = (e) => {
    const { value } = e.target;
    setNewOverView(value);
  };

  const handleUpdateTitle = async (e) => {
    e.preventDefault();
    const {
      docs: [userSnap],
    } = await getDocs(
      query(collection(db, "users"), where("email", "==", user.email))
    );
    setUser({ ...user, description: newOverView });
    await updateDoc(userSnap.ref, { description: newOverView });
    handleClose();
  };

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
          <Typography id="modal-modal-title" variant="h4" component="h2">
            Edit Your Description
          </Typography>
          <div
            style={{
              width: "400px",
              height: "60px",
              marginBottom: "50px",
              marginTop: "20px",
            }}
          >
            Use this space to show clients you have the skills and experience
            they're looking for. Describe your strengths and skills. Highlight
            projects, accomplishments and education Keep it short and make sure
            it's error-free
          </div>
          <form onSubmit={handleUpdateTitle}>
            <TextField
              sx={{
                marginTop: "20px",
                textarea: { color: "white" },
                height: "400px",
                width: "100%",
              }}
              label="Description"
              placeholder="Tell More about Yourself"
              variant="outlined"
              multiline
              rows={20}
              value={newOverView}
              onChange={handleChangeInput}
            />

            <Button type="submit" color="secondary">
              Save
            </Button>
            <Button
              type="button"
              color="secondary"
              variant="outlined"
              onClick={handleClose}
            >
              Cancel
            </Button>
          </form>
        </Box>
      </Modal>
    </div>
  );
};

export default OverViewModal;
