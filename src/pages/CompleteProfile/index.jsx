import {
  Avatar,
  Stack,
  Button,
  TextField,
  Typography,
  Box,
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
import { RadioButtonChecked, RadioButtonUnchecked } from "@mui/icons-material";
export default function CompleteProfile() {
  const [userDetails, setUserDetails] = useState();
  const [selectedFileUrl, setSelectedFileUrl] = useState();
  const [imageToUpload, setImageToUpload] = useState();
  const { user, setUser } = useAuthContext();
  const [errors, setErrors] = useState({});

  const handleUploadClick = (event) => {
    var file = event.target.files[0];
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onloadend = function () {
      setSelectedFileUrl(reader.result);
    };
    setImageToUpload(file);
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
  const [typeSelected, setTypeSelected] = useState();
  const save = useCallback(
    async (url) => {
      const validateForm = () => {
        let errors = {};

        if (!selectedFileUrl) errors.image = "Image is required";
        if (!userDetails.birthday) errors.birthday = "Birthday is required";
        if (!userDetails.phone) errors.salary = "Phone is required";
        if (!userDetails.description)
          errors.description = "Description is required";
        if (userDetails.type === "recrut") {
          if (!userDetails.jobTitle) errors.title = "Job title is required";
          if (!userDetails.skills) errors.skills = "Skills are required";
          if (!userDetails.rate) errors.rate = "Rate is required";
        }
        return errors;
      };
      const errors = validateForm();
      if (!errors) {
        const {
          docs: [userSnap],
        } = await getDocs(
          query(collection(db, "users"), where("email", "==", user.email))
        );
        await updateDoc(userSnap.ref, {
          ...userDetails,
          photoURL: url,
          isCompleted: true,
        });
        setUser({ ...user, ...userDetails, photoURL: url, isCompleted: true });
      } else setErrors(errors);
    },
    [selectedFileUrl, setUser, user, userDetails]
  );
  return (
    <>
      {user.type === "client" || user.type === "recrut" ? (
        user.type === "recrut" ? (
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
                />
                <TextField
                  sx={{ margin: "10px 0" }}
                  type="file"
                  onChange={handleUploadClick}
                />
                <Typography sx={{ marginTop: "10px" }}>
                  Profile picture
                </Typography>
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
              error={!!errors.birtday}
              helperText={errors.birthday}
            />
            <TextField
              sx={{
                marginTop: "20px",
                flex: 1,
              }}
              label="Phone"
              placeholder="Phone"
              error={!!errors.phone}
              helperText={errors.phone}
              onChange={changeHandler("phone")}
            />

            <Stack flexDirection="row">
              <TextField
                sx={{
                  marginTop: "20px",
                  flex: 1,
                }}
                label="Job title"
                placeholder="What is your profiency"
                error={!!errors.title}
                helperText={errors.title}
                onChange={changeHandler("jobTitle")}
              />
            </Stack>
            <TextField
              sx={{
                marginTop: "20px",
                flex: 1,
              }}
              label="Skills"
              error={!!errors.skills}
              helperText={errors.skills}
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
              error={!!errors.rate}
              helperText={errors.rate}
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
              error={!!errors.description}
              helperText={errors.description}
              onChange={changeHandler("description")}
            />
            <Button variant="contained" color="secondary" onClick={uploadFile}>
              Save
            </Button>
          </Stack>
        ) : (
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
                  />
                  <TextField
                    sx={{ margin: "10px 0" }}
                    type="file"
                    onChange={handleUploadClick}
                  />
                  <Typography sx={{ marginTop: "10px" }}>
                    Profile picture
                  </Typography>
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
                error={!!errors.birtday}
                helperText={errors.birtday}
              />
              <TextField
                sx={{
                  marginTop: "20px",
                  flex: 1,
                }}
                label="Phone"
                placeholder="Phone"
                onChange={changeHandler("phone")}
                error={!!errors.phone}
                helperText={errors.phone}
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
                error={!!errors.description}
                helperText={errors.description}
                onChange={changeHandler("description")}
              />
              <Button
                variant="contained"
                color="secondary"
                onClick={uploadFile}
              >
                Save
              </Button>
            </Stack>
          </>
        )
      ) : (
        <Stack
          flexDirection="row"
          sx={{ margin: "100px" }}
          justifyContent={"center"}
          flexWrap="wrap"
        >
          <Box
            sx={{
              width: "30%",
              height: "200px",
              background: "rgb(49 58 73)",
              margin: "10px",
              borderRadius: "20px",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              padding: "10px",
              border: "1px solid rgb(49 58 73)",
              "&:hover": {
                border: "1px solid white",
                cursor: "pointer",
              },
              position: "relative",
            }}
            onClick={() => setTypeSelected("client")}
          >
            <Typography variant="h4">I want to hire recruts</Typography>
            <Box sx={{ position: "absolute", top: 10, right: 10 }}>
              {typeSelected === "client" ? (
                <RadioButtonChecked />
              ) : (
                <RadioButtonUnchecked />
              )}
            </Box>
          </Box>
          <Box
            sx={{
              width: "30%",
              height: "200px",
              background: "rgb(49 58 73)",
              margin: "10px",
              borderRadius: "20px",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              padding: "10px",
              border: "1px solid rgb(49 58 73)  ",
              "&:hover": {
                border: "1px solid white",
                cursor: "pointer",
              },
              position: "relative",
            }}
            onClick={() => setTypeSelected("recrut")}
          >
            <Typography variant="h4">I want to find a job</Typography>
            <Box sx={{ position: "absolute", top: 10, right: 10 }}>
              {typeSelected === "recrut" ? (
                <RadioButtonChecked />
              ) : (
                <RadioButtonUnchecked />
              )}
            </Box>
          </Box>
          <Box
            sx={{ width: "100%", display: "flex", justifyContent: "center" }}
          >
            <Button
              sx={{ width: "50%" }}
              onClick={() => {
                setUser({ ...user, type: typeSelected });
                setUserDetails({ ...userDetails, type: typeSelected });
              }}
            >
              Continue
            </Button>
          </Box>
        </Stack>
      )}
    </>
  );
}
