import Chip from "@mui/material/Chip";
import Autocomplete from "@mui/material/Autocomplete";
import TextField from "@mui/material/TextField";
import Stack from "@mui/material/Stack";
import { useEffect, useState } from "react";
import { Button } from "@mui/material";
import { useAuthContext } from "../../context/AuthContext";
import {
  collection,
  getDocs,
  query,
  updateDoc,
  where,
} from "firebase/firestore";
import { db } from "../../firebase";

export default function SkillBox(props) {
  const [choosenSkills, setChoosenSkills] = useState([]);

  const { user, setUser } = useAuthContext();
  useEffect(() => {
    setChoosenSkills(user.skills);
  }, [user.skills]);

  const handleUpdateSkills = async (e) => {
    e.preventDefault();
    const {
      docs: [userSnap],
    } = await getDocs(
      query(collection(db, "users"), where("email", "==", user.email))
    );
    setUser({ ...user, skills: choosenSkills });
    await updateDoc(userSnap.ref, { skills: choosenSkills });
    props.handleClose();
  };

  return (
    <>
      <Stack spacing={3} sx={{ width: 500, marginTop: "30px" }}>
        <Autocomplete
          defaultValue={[]}
          multiple
          id="tags-filled"
          options={[]}
          freeSolo
          renderTags={(value, getTagProps) =>
            value.map((option, index) => (
              <Chip
                key={index}
                variant="outlined"
                label={option}
                {...getTagProps({ index })}
              />
            ))
          }
          onChange={(e, choosenSkills) => {
            e.preventDefault();
            setChoosenSkills(choosenSkills);
          }}
          value={choosenSkills}
          renderInput={(params) => (
            <TextField {...params} fullWidth label="Skills Required" />
          )}
        />

        <form onSubmit={handleUpdateSkills}>
          <Button type="submit" color="secondary">
            Save
          </Button>
          <Button
            type="button"
            color="secondary"
            variant="outlined"
            onClick={props.handleClose}
          >
            Cancel
          </Button>
        </form>
      </Stack>
    </>
  );
}
