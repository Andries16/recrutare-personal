import React, { useEffect, useState } from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import { Input } from "./ImgModal/style";
import { useAuthContext } from "../../context/AuthContext";
import {
  collection,
  getDocs,
  query,
  updateDoc,
  where,
} from "firebase/firestore";
import { db } from "../../firebase";
import { Edit } from "@mui/icons-material";
import { Button } from "@mui/material";

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
  p: 8,
};

const RateModal = () => {
  const [open, setOpen] = useState(false);
  const handleClose = () => setOpen(false);
  const handleOpen = () => {
    handleSavedRateStatus(newRate);
    setOpen(true);
  };

  const handleSavedRateStatus = (value) => {
    setFee(value * (20 / 100));
    setReceive(value - value * (20 / 100));
  };

  const [newRate, setNewRate] = useState(0);

  const [fee, setFee] = useState(0);
  const [receive, setReceive] = useState(0);

  const { user, setUser } = useAuthContext();

  useEffect(() => {
    setNewRate(user.rate);
  }, [user.rate]);

  const handleChangeInput = (e) => {
    const { value, id } = e.target;
    if (id === "newRate") {
      setNewRate(value);
      setFee(value * (20 / 100));
      setReceive(value - value * (20 / 100));
    }
    if (id === "receive") setReceive(value);
  };

  const handleUpdateTitle = async (e) => {
    e.preventDefault();
    const {
      docs: [userSnap],
    } = await getDocs(
      query(collection(db, "users"), where("email", "==", user.email))
    );
    setUser({ ...user, rate: newRate });
    await updateDoc(userSnap.ref, { rate: newRate });
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
          <Typography id="modal-modal-title" variant="h5" component="h2">
            Edit Your Rate
          </Typography>
          <Typography id="modal-modal-description" sx={{ mt: 2, mb: 3 }}>
            Please note that your new hourly rate will only apply to new
            contracts. The Upwork Service Fee is 20% when you begin a contract
            with a new client. Once you bill over $500 with your client, the fee
            will be 10%.
          </Typography>
          <form onSubmit={handleUpdateTitle}>
            Hourly Rate Total amount the client will see
            <Input
              type="text"
              value={newRate}
              onChange={handleChangeInput}
              id="newRate"
            />
            $
            <br />
            20% Upwork Service Fee
            <Input
              type="text"
              value={fee}
              onChange={handleChangeInput}
              id="fee"
              disabled
            />
            $
            <br />
            You'll Receive The estimated amount you'll receive after service
            fees
            <Input
              type="text"
              value={receive}
              onChange={handleChangeInput}
              id="receive"
            />
            ${" "}
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

export default RateModal;
