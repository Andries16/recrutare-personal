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
import { Button, TextField } from "@mui/material";
import { useAuthContext } from "../../context/AuthContext";

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

const TitleModal = () => {
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const [newTitle, setNewTitle] = useState("");
  const { user, setUser } = useAuthContext();

  const handleChangeInput = (e) => {
    const { value } = e.target;
    setNewTitle(value);
  };
  useEffect(() => {
    setNewTitle(user.jobTitle);
  }, [user.jobTitle]);
  const handleUpdateTitle = async (e) => {
    e.preventDefault();
    const {
      docs: [userSnap],
    } = await getDocs(
      query(collection(db, "users"), where("email", "==", user.email))
    );
    setUser({ ...user, jobTitle: newTitle });
    await updateDoc(userSnap.ref, { jobTitle: newTitle });
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
          <Typography id="modal-modal-title" variant="h6" component="h2">
            Edit Your Title
          </Typography>
          <Typography id="modal-modal-description" sx={{ mt: 4, mb: 5 }}>
            Your title: Enter a single sentence description of your professional
            skills/experience (e.g. Expert Web Designer with Ajax experience)
          </Typography>
          <form onSubmit={handleUpdateTitle}>
            <TextField
              type="text"
              value={newTitle}
              onChange={handleChangeInput}
              sx={{ width: "100%", marginBottom: "20px" }}
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

export default TitleModal;
