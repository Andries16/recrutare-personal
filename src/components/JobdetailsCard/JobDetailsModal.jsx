import { Edit } from "@mui/icons-material";
import {
  Autocomplete,
  Box,
  Button,
  Chip,
  FormControl,
  Grid,
  InputLabel,
  MenuItem,
  Modal,
  Select,
  TextField,
} from "@mui/material";
import {
  collection,
  getDocs,
  query,
  updateDoc,
  where,
} from "firebase/firestore";
import { useEffect, useState } from "react";
import { db } from "../../firebase";

export default function JobDetailsModal({ job, setJob }) {
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
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

  const [formData, setFormData] = useState({
    title: "",
    description: "",
    skillsRequired: "",
    category: "",
    subcategory: "",
    expertiseLevel: "",
    hoursPerWeek: "",
    salary: 0,
  });

  useEffect(() => setFormData(job), [job]);
  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };
  const validateForm = () => {
    let errors = {};
    if (!formData.title) errors.title = "Title is required";
    if (!formData.description) errors.description = "Description is required";
    if (!formData.hoursPerWeek) errors.hoursPerWeek = "Type is required";
    if (!formData.salary) errors.salary = "Salary is required";
    if (!formData.skillsRequired) errors.skillsRequired = "Skills are required";
    if (!formData.category) errors.category = "Category is required";
    if (!formData.location) errors.location = "Location is required";

    if (!formData.level) errors.level = "Level is required";
    return errors;
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    const formErrors = validateForm();
    if (Object.keys(formErrors).length > 0) {
      setErrors(formErrors);
    } else {
      try {
        const {
          docs: [jobSnap],
        } = await getDocs(
          query(collection(db, "jobs"), where("key", "==", job.key))
        );
        await updateDoc(jobSnap.ref, formData);
        setErrors({});
        handleClose();
        setJob({ ...job, ...formData });
      } catch (error) {}
    }
  };

  return (
    <div>
      <Edit
        onClick={handleOpen}
        sx={{
          width: "30px",
          height: "30px",
          cursor: "pointer",
          float: "right",
          margin: "10px",
        }}
        color="secondary"
      />

      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <form onSubmit={handleSubmit}>
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  label="Title"
                  name="title"
                  value={formData.title}
                  onChange={handleChange}
                  error={!!errors.title}
                  helperText={errors.title}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  label="Location"
                  name="location"
                  value={formData.location}
                  onChange={handleChange}
                  error={!!errors.location}
                  helperText={errors.location}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  multiline
                  rows={4}
                  label="Description"
                  name="description"
                  value={formData.description}
                  onChange={handleChange}
                  error={!!errors.description}
                  helperText={errors.description}
                />
              </Grid>
              <Grid item xs={12}>
                <FormControl fullWidth>
                  <InputLabel id="demo-simple-select-label">Type</InputLabel>
                  <Select
                    value={formData.hoursPerWeek}
                    label="Age"
                    name="hoursPerWeek"
                    onChange={handleChange}
                    error={!!errors.hoursPerWeek}
                    helperText={errors.hoursPerWeek}
                  >
                    <MenuItem value={"Full Time"}>Full Time</MenuItem>
                    <MenuItem value={"Part Time"}>Part Time</MenuItem>
                  </Select>
                </FormControl>
              </Grid>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  label="Slary (MDL)"
                  name="salary"
                  type="number"
                  InputLabelProps={{ shrink: true }}
                  value={formData.salary}
                  onChange={handleChange}
                  error={!!errors.salary}
                  helperText={errors.salary}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  label="Level"
                  name="level"
                  InputLabelProps={{ shrink: true }}
                  value={formData.level}
                  onChange={handleChange}
                  error={!!errors.level}
                  helperText={errors.level}
                />
              </Grid>

              <Grid item xs={12}>
                <Autocomplete
                  defaultValue={[]}
                  multiple
                  id="tags-filled"
                  options={[]}
                  name="skillsRequired"
                  freeSolo
                  renderTags={(value, getTagProps) =>
                    value.map((option, index) => (
                      <Chip
                        variant="outlined"
                        label={option}
                        {...getTagProps({ index })}
                      />
                    ))
                  }
                  onChange={(event, values) => {
                    handleChange({
                      target: { name: "skillsRequired", value: values },
                    });
                  }}
                  renderInput={(params) => (
                    <TextField
                      {...params}
                      fullWidth
                      label="Skills Required"
                      value={formData.skillsRequired}
                      error={!!errors.skillsRequired}
                      helperText={errors.skillsRequired}
                    />
                  )}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  label="Category"
                  name="category"
                  value={formData.category}
                  onChange={handleChange}
                  error={!!errors.category}
                  helperText={errors.category}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  label="Subcategory"
                  name="subcategory"
                  value={formData.subcategory}
                  onChange={handleChange}
                />
              </Grid>
              <Grid item xs={12}>
                <Button
                  type="submit"
                  variant="contained"
                  color="secondary"
                  fullWidth
                >
                  Create Job
                </Button>
              </Grid>
            </Grid>
          </form>
        </Box>
      </Modal>
    </div>
  );
}
