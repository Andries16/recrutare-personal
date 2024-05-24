import React, { useEffect, useState } from "react";
import Box from "@mui/material/Box";

import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import ProfileImage from "../../../pages/Profile/ProfileImage/ProfileImage";
import {
  ref as storageRef,
  uploadBytes,
  getDownloadURL,
} from "firebase/storage";
import { useAuthContext } from "../../../context/AuthContext";
import { getDocs, updateDoc } from "firebase/firestore";
import { query, collection, where } from "firebase/firestore";
import { db, storage } from "../../../firebase";
import { Avatar, Button, Stack, TextField } from "@mui/material";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 500,
  bgcolor: "background.paper",
  border: "2px solid #000",
  "&:focus-visible": {
    border: "none",
    outline: "none",
  },
  boxShadow: 24,
  p: 10,
};

const ImgModal = () => {
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const [selectedFileUrl, setSelectedFileUrl] = useState();
  const [imageToUpload, setImageToUpload] = useState();

  const { user, setUser } = useAuthContext();
  useEffect(() => {
    setSelectedFileUrl(user.photoURL);
  }, [user.photoURL]);

  const handleUploadClick = (event) => {
    var file = event.target.files[0];
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onloadend = function () {
      setSelectedFileUrl(reader.result);
    };
    setImageToUpload(file);
  };

  const uploadFile = async (e) => {
    e.preventDefault();
    if (imageToUpload === null) return;
    const imageRef = storageRef(storage, `users`);
    uploadBytes(imageRef, imageToUpload).then(async (snapshot) => {
      const url = await getDownloadURL(snapshot.ref);
      setUser({ ...user, photoURL: url });
      const {
        docs: [userSnap],
      } = await getDocs(
        query(collection(db, "users"), where("email", "==", user.email))
      );
      await updateDoc(userSnap.ref, {
        photoURL: url,
      });
      handleClose();
    });
  };

  return (
    <div>
      <Box onClick={handleOpen}>
        <ProfileImage />
      </Box>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Stack sx={{ justifyContent: "center" }}>
            <Typography id="modal-modal-title" variant="h6" component="h1">
              Edit Your Image
            </Typography>
            <Avatar
              sx={{
                width: "150px",
                height: "150px",
                background: "transparent",
                border: "1px dashed white",
                alignSelf: "center",
              }}
              src={selectedFileUrl}
            />
            <label
              style={{
                display: "flex",
                flexDirection: "column",
                width: "100%",
                justifyContent: "center",
                alignItems: "center",
                margin: "10px 0",
              }}
            >
              <TextField type="file" onChange={handleUploadClick} />
            </label>
            <form onSubmit={uploadFile}>
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
          </Stack>
        </Box>
      </Modal>
    </div>
  );
};

export default ImgModal;
