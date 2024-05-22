import {
  Avatar,
  Stack,
  Button,
  Input,
  TextField,
  Typography,
} from "@mui/material";
import { DatePicker } from "@mui/x-date-pickers";
import { useCallback, useState } from "react";
import { useAuthContext } from "../../context/AuthContext";
import { getDocs, updateDoc } from "firebase/firestore";
import { query, collection, where } from "firebase/firestore";
import { db, storage } from "../../firebase";
import {
  ref as storageRef,
  uploadBytes,
  getDownloadURL,
} from "firebase/storage";
export default function CompleteProfile() {
  const [userDetails, setUserDetails] = useState();
  const [uploaded, setUploaded] = useState(false);
  const [selectedFileUrl, setSelectedFileUrl] = useState();
  const [imageToUpload, setImageToUpload] = useState();
  const { user, setUser } = useAuthContext();
  const handleUploadClick = (event) => {
    var file = event.target.files[0];
    const reader = new FileReader();
    var url = reader.readAsDataURL(file);
    reader.onloadend = function () {
      setSelectedFileUrl(reader.result);
    };
    setImageToUpload(file);
    setUploaded(true);
  };

  const changeHandler = useCallback(
    (field) => ({ target: { value } }) => {
      setUserDetails({ ...userDetails, [field]: value });
    },
    [userDetails]
  );

  const uploadFile = () => {
    if (imageToUpload === null) return;
    const imageRef = storageRef(storage, `users`);
    uploadBytes(imageRef, imageToUpload).then((snapshot) => {
      getDownloadURL(snapshot.ref).then((url) => save(url));
    });
  };
  const save = useCallback(
    async (url) => {
      const {
        docs: [userSnap],
      } = await getDocs(
        query(collection(db, "users"), where("email", "==", user.email))
      );
      console.log(userSnap);
      await updateDoc(userSnap.ref, {
        ...userDetails,
        photoURL: url,
        isCompleted: true,
      });
      setUser({ ...user, ...userDetails, photoURL: url, isCompleted: true });
      console.log({
        ...user,
        ...userDetails,
        photoURL: url,
        isCompleted: true,
      });
    },
    [setUser, user, userDetails]
  );
  return (
    <>
      <Stack sx={{ margin: "50px 300px" }} justifyContent="center">
        <Typography sx={{ textAlign: "center" }} variant="h4">
          Complete your account to continue
        </Typography>
        <Stack
          justifyContent="center"
          alignItems="center"
          sx={{ marginTop: "50px" }}
        >
          <label
            style={{
              display: "flex",
              flexDirection: "column",
              width: "30%",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <Avatar
              sx={{
                width: "150px",
                height: "150px",
                background: "transparent",
                border: "1px dashed white",
              }}
              src={selectedFileUrl}
            >
              <Input
                type="file"
                sx={{ display: "none" }}
                onChange={handleUploadClick}
                multiple
              />
            </Avatar>
            <Typography sx={{ marginTop: "10px" }}>Profile picture</Typography>
          </label>
        </Stack>
        <DatePicker
          sx={{
            marginTop: "20px",
          }}
          onChange={(newValue) =>
            setUserDetails({
              ...userDetails,
              birthday: newValue.format("DD/MM/YYYY"),
            })
          }
        />
        <Stack flexDirection="row">
          <TextField
            sx={{
              marginTop: "20px",
              flex: 1,
            }}
            label="Job title"
            placeholder="What is your profiency"
            onChange={changeHandler("jobTitle")}
          />
          <TextField
            sx={{
              marginTop: "20px",
              flex: 1,
              marginLeft: "10px",
            }}
            label="Categories"
            onChange={changeHandler("categories")}
            placeholder="Category"
          />
        </Stack>
        <TextField
          sx={{
            marginTop: "20px",
            flex: 1,
          }}
          label="Skills"
          onChange={changeHandler("skills")}
          placeholder="What is your profiency"
        />
        <TextField
          sx={{
            marginTop: "20px",
            flex: 1,
          }}
          label="Hourly Rate"
          onChange={changeHandler("rate")}
          placeholder="What is your profiency"
        />
        <TextField
          sx={{
            marginTop: "20px",
            textarea: { color: "white" },
            height: "400px",
          }}
          label="Description"
          placeholder="Tell More about Yourself"
          variant="outlined"
          multiline
          rows={20}
          onChange={changeHandler("description")}
        ></TextField>
        <Button variant="contained" color="secondary" onClick={uploadFile}>
          Save
        </Button>
      </Stack>
    </>
  );
}
