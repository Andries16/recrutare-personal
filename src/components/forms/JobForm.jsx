import React, { useState } from "react";
import {
  TextField,
  Button,
  Grid,
  Container,
  Alert,
  Autocomplete,
  Chip,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
} from "@mui/material";
import { addDoc, collection } from "firebase/firestore";
import { db } from "../../firebase";
import { useNavigate } from "react-router-dom";
import { v4 as uuidv4 } from "uuid";
import { useAuthContext } from "../../context/AuthContext";

const JobForm = () => {
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

  const [errors, setErrors] = useState({});
  const [message, setMessage] = useState("");

  const { user } = useAuthContext();
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };
  const navigate = useNavigate();
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
        const key = uuidv4();
        await addDoc(collection(db, "jobs"), {
          ...formData,
          date: Date.now(),
          key,
          author: user.email,
        });
        setMessage("Job created successfully!");
        setFormData({
          title: "",
          description: "",
          skillsRequired: "",
          category: "",
          subcategory: "",
          expertiseLevel: "",
          hoursPerWeek: "",
          salary: 0,
        });
        setErrors({});
        navigate(`/JobDetails/${key}`);
      } catch (error) {
        setMessage("Error creating job");
      }
    }
  };

  return (
    <Container maxWidth="sm">
      {message && <Alert severity="success">{message}</Alert>}
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
    </Container>
  );
};

export default JobForm;
