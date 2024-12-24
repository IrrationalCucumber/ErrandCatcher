import React, { useEffect, useState } from "react";
import axios from "axios";
import { Autocomplete, Button, Input, TextField, Typography } from "@mui/joy";
import {
  Add,
  CalendarMonth,
  Close,
  Delete,
  LocationCity,
  LocationOn,
  Work,
} from "@mui/icons-material";

function Experience(props) {
  const [experience, setExperience] = useState([]); //state to store experience
  const [showForm, setShowForm] = useState(false); //state to show form
  const [newExperience, setNewExperience] = useState({
    userID: "",
    jobTitle: "",
    employer: "",
    location: "",
    startDate: "",
    endDate: "",
    desc: "",
    startMonth: "",
    startYear: "",
    endMonth: "",
    endYear: "",
  });
  //fetch experience
  const fetch = async () => {
    try {
      const response = await axios(
        `http://localhost:8800/experience/${props.id}`
      );
      const data = await response.data;
      setExperience(data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetch();
  }, []);
  //handle change for form
  const handleChange = (e) => {
    const { name, value } = e.target;
    setNewExperience({ ...newExperience, [name]: value });
  };
  //add epxerience
  const addExperience = async () => {
    newExperience.userID = props.id;
    newExperience.startDate = `${newExperience.startMonth} ${newExperience.startYear}`;
    newExperience.endDate = `${newExperience.endMonth} ${newExperience.endYear}`;
    await axios.post(`http://localhost:8800/experience`, newExperience);
    console.log(newExperience);
    setShowForm(false);
    //refresh experience display
    const interval = setInterval(fetch, 1000);
    return () => clearInterval(interval);
  };

  //delete experience
  const deleteExperience = async (id) => {
    try {
      await axios.delete(`http://localhost:8800/delete-experience/${id}`);
      //refresh experience display
      const interval = setInterval(fetch, 1000);
      return () => clearInterval(interval);
    } catch (error) {
      console.log(error);
    }
  };
  console.log(newExperience);
  return (
    <div>
      <Button
        startDecorator={showForm === false ? <Add /> : <Close />}
        sx={{ display: "flex", mr: "1rem", ml: "auto" }}
        size="lg"
        onClick={
          showForm === false
            ? () => setShowForm(true)
            : () => setShowForm(false)
        }
      >
        {showForm === false ? "Add" : "Close"}
      </Button>
      {showForm && (
        <div
          className="exp__form"
          style={{ display: "flex", flexDirection: "column", padding: "1rem" }}
        >
          <Input
            sx={{ mt: "1rem" }}
            color="neutral"
            placeholder="Job Title"
            variant="outlined"
            type="text"
            name="jobTitle"
            onChange={handleChange}
          />
          <Input
            sx={{ mt: "1rem" }}
            color="neutral"
            placeholder="Company/Organization"
            variant="outlined"
            type="text"
            name="employer"
            onChange={handleChange}
          />
          <Input
            sx={{ mt: "1rem" }}
            color="neutral"
            placeholder="Address"
            variant="outlined"
            type="text"
            name="location"
            onChange={handleChange}
          />
          <div style={{ display: "flex", padding: "1rem" }}>
            <Typography
              sx={{ width: "20%" }}
              color="primary"
              level="title-lg"
              variant="plain"
              style={{ marginRight: "1.5rem" }}
            >
              Date Started
            </Typography>
            <Autocomplete
              options={months}
              placeholder="Month"
              sx={{ width: "40%", marginRight: "1.5rem" }}
              getOptionLabel={(option) => option.toString()} // Ensure the label is a string
              name="startMonth"
              onChange={(event, newValue) =>
                handleChange({
                  target: { name: "startMonth", value: newValue },
                })
              } // Adjust onChange to handle the new value
              renderInput={(params) => (
                <TextField {...params} label="Start Month" />
              )} // Render the input with a label
            />
            <Autocomplete
              options={years}
              name="startYear"
              placeholder="Year"
              sx={{ width: "40%" }}
              onChange={(event, newValue) =>
                handleChange({ target: { name: "startYear", value: newValue } })
              } // Adjust onChange to handle the new value
              getOptionLabel={(option) => option.toString()} // Convert number to string
              renderinput={(params) => <TextField {...params} label="Year" />}
            />
          </div>
          <div
            className="exp__end"
            style={{ display: "flex", padding: "1rem" }}
          >
            <Typography
              color="primary"
              level="title-lg"
              variant="plain"
              style={{ marginRight: "1.5rem", width: "20%" }}
            >
              Date Ended
            </Typography>
            <Autocomplete
              options={months}
              sx={{ width: "40%", marginRight: "1.5rem" }}
              getOptionLabel={(option) => option.toString()} // Ensure the label is a string
              name="endMonth"
              placeholder="Month"
              onChange={(event, newValue) =>
                handleChange({ target: { name: "endMonth", value: newValue } })
              } // Adjust onChange to handle the new value
              renderInput={(params) => (
                <TextField {...params} label="End Month" />
              )} // Render the input with a label
            />
            <Autocomplete
              sx={{ width: "40%" }}
              options={years}
              name="endYear"
              placeholder="Year"
              onChange={(event, newValue) =>
                handleChange({ target: { name: "endYear", value: newValue } })
              } // Adjust onChange to handle the new value
              getOptionLabel={(option) => option.toString()} // Convert number to string
              renderinput={(params) => <TextField {...params} label="Year" />}
            />
          </div>
          <textarea
            placeholder="Description"
            name="desc"
            onChange={handleChange}
          ></textarea>
          <Button size="md" onClick={() => addExperience()} sx={{ mt: "1rem" }}>
            SAVE
          </Button>
        </div>
      )}
      {experience.length > 0 ? (
        experience.map((exp) => (
          <div
            key={exp.expID}
            className="exp__display"
            style={{
              padding: "2rem",
              border: "1px solid #ccc",
              margin: "1rem 0",
              borderRadius: "20px",
            }}
          >
            <Button
              color="danger"
              onClick={() => deleteExperience(exp.expID)}
              size="sm"
              variant="plain"
              sx={{ display: "flex", mr: "1rem", ml: "auto" }}
            >
              <Delete />
            </Button>
            <Typography
              startDecorator={<Work />}
              level="h3"
              variant="plain"
              noWrap
            >
              {exp.expJobTitle}
            </Typography>
            <Typography
              startDecorator={<LocationCity />}
              level="title-lg"
              variant="plain"
              noWrap
            >
              {exp.expEmployer}
            </Typography>
            <Typography
              startDecorator={<LocationOn />}
              level="title-md"
              variant="plain"
            >
              {exp.expLocation}
            </Typography>
            <Typography
              startDecorator={<CalendarMonth />}
              level="body-sm"
              variant="plain"
              noWrap
            >
              <i>
                {exp.expStartDate} - {exp.expEndDate}
              </i>
            </Typography>
            <Typography color="neutral" level="body-md" variant="outlined">
              {exp.expDesc}
            </Typography>
          </div>
        ))
      ) : (
        <div>
          <h4>No Experience Added</h4>
        </div>
      )}
    </div>
  );
}

const months = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];

const years = Array.from({ length: 55 }, (_, i) => i + 1970);
export default Experience;

export function ViewExperience(props) {
  const [experience, setExperience] = useState([]); //state to store experience

  //fetch experience
  const fetch = async () => {
    try {
      const response = await axios(
        `http://localhost:8800/experience/${props.id}`
      );
      const data = await response.data;
      setExperience(data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetch();
  }, []);
  return (
    <>
      {experience.length > 0 ? (
        experience.map((exp) => (
          <div
            key={exp.expID}
            className="exp__display"
            style={{
              padding: "2rem",
              border: "1px solid #ccc",
              margin: "1rem 0",
              borderRadius: "20px",
            }}
          >
            <Typography
              startDecorator={<Work />}
              level="h3"
              variant="plain"
              noWrap
            >
              {exp.expJobTitle}
            </Typography>
            <Typography
              startDecorator={<LocationCity />}
              level="title-lg"
              variant="plain"
              noWrap
            >
              {exp.expEmployer}
            </Typography>
            <Typography
              startDecorator={<LocationOn />}
              level="title-md"
              variant="plain"
            >
              {exp.expLocation}
            </Typography>
            <Typography
              startDecorator={<CalendarMonth />}
              level="body-sm"
              variant="plain"
              noWrap
            >
              <i>
                {exp.expStartDate} - {exp.expEndDate}
              </i>
            </Typography>
            <Typography color="neutral" level="body-md" variant="outlined">
              {exp.expDesc}
            </Typography>
          </div>
        ))
      ) : (
        <div>
          <h4>No Experience Added</h4>
        </div>
      )}
    </>
  );
}
