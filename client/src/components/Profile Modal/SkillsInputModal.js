import { Add } from "@mui/icons-material";
import {
  Autocomplete,
  Box,
  Button,
  Chip,
  ChipDelete,
  FormControl,
  FormLabel,
  Input,
  Modal,
  ModalClose,
  ModalDialog,
  ModalOverflow,
  Typography,
} from "@mui/joy";
import { TextField } from '@mui/material';
import axios from "axios";
import React, { useEffect, useState } from "react";
import { useAuth } from "../AuthContext";

function SkillsInputModal(props) {
  const { user } = useAuth();
  //SKill tags
  // State to hold the selected skills
  const [selectedSkills, setSelectedSkills] = useState([]);
  const [inputSkill, setInputSkill] = useState("");
  const [error, setError] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const [details, setDetails] = useState({
    skills: "",
  });
  useEffect(() => {
    if (props.skills !== null) {
      setSelectedSkills(props.skills);
    }
  }, [props.skills]);

  // Predefined list of skills (you can fetch this from the backend)
  const availableSkills = [
    "Plumbing",
    "Electrical Work",
    "House Cleaning",
    "Gardening",
    "Babysitting",
    "Pet Sitting",
    "Carpentry",
    "Cooking",
    "Personal Shopping",
    "Event Planning",
    "Photography",
    "Graphic Design",
    "Web Development",
    "Content Writing",
    "Translation",
    "Digital Marketing",
    "SEO Optimization",
    "Video Editing",
    "Music Lessons",
    "Fitness Training",
    "Tutoring",
    "Legal Assistance",
    "Accounting",
    "Tax Preparation",
    "Data Entry",
    "Virtual Assistance",
    "Social Media Management",
    "Customer Support",
    "IT Support",
    "App Development",
    "UX/UI Design",
    "Landscaping",
    "Moving Services",
    "Laundry Services",
    "Home Organization",
    "Property Maintenance",
    "Security Services",
    "Interior Design",
    "Real Estate Assistance",
    "Automobile Repair",
    "Bike Repair",
    "Painting",
    "Massage Therapy",
    "Driver Services",
    "Personal Training",
    "Yoga Instructor",
    "Dance Intructor",
    "Language instructor",
    "Art Lessons",
    "HTML",
    "CSS",
    "JavaScript",
    "React",
    "Vue",
    "Angular",
    "Node.js",
    "SQL",
    "C#",
    "Python",
    "Cargo Delivery",
    "Food Delivery",
    "Grocery Delivery",
    "Medicine Delivery",
    "Parcel Delivery",
    "Courier Services",
    "Furniture Delivery",
    "Appliance Delivery",
    "Vehicle Transport",
    "Pet Transport",
    "Motorcycle Transport",
    "Maintenance Services",
    "Repair Services",
    "Installation Services",
    "Assembly Services",
    "Cleaning Services",
    "Removal Services",
    "Restoration Services",
    "Renovation Services",
    "Consulting Services",
    "Training Services",
    "Coaching Services",
    "Therapy Services",
    "Counseling Services",
  ];

  const filteredSkills = availableSkills.filter(skill =>
    skill.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
  };

  // Function to add a skill to the selectedSkills array
  const handleAddSkill = (skill) => {
    if (!selectedSkills.includes(skill)) {
      setSelectedSkills([...selectedSkills, skill]);
    }
  };
  // Function to add a custom skill from input
  const handleAddCustomSkill = () => {
    if (inputSkill && !selectedSkills.includes(inputSkill)) {
      setSelectedSkills([...selectedSkills, inputSkill]);
      setInputSkill(""); // Clear the input
    }
  };
  // Function to remove a skill from the selectedSkills array
  const handleRemoveSkill = (skillToRemove) => {
    setSelectedSkills(
      selectedSkills.filter((skill) => skill !== skillToRemove)
    );
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    // Create a combined string for qualifications (general job)
    const qualificationsString = `${selectedSkills}`;
    details.skills = qualificationsString;
    if (selectedSkills === "") {
      setError("Please list your skills.");
      return;
    }
    if (!qualificationsString) {
      setError("Please list your skills.");
      return;
    }
    if (selectedSkills.length > 15) {
      setError("Maximum of 15 skills only!");
      return;
    }
    // Clear errors if all checks pass
    setError("");

    //update accound data
    // alert(qualificationsString);
    // alert(details.skills);
    await axios.put(
      "http://localhost:8800/update-info/" + user.userID,
      details
    );
    props.close();
    window.location.reload();
  };

  return (
    <>
      <Modal open={props.open} onClose={props.close}>
        <ModalOverflow>
          <ModalDialog color="neutral" size="lg" variant="outline">
            <ModalClose />
            <form onSubmit={handleSubmit}>
              <>
                {/* General (Indoor/Outdoor) Qualification */}
                {/* General Experience */}
                <Box sx={{ width: '600px', maxWidth: "80%", height: "auto", overflowY: 'auto' }}>
                  <TextField
                    label="Search Skills"
                    variant="outlined"
                    fullWidth
                    value={searchTerm}
                    onChange={handleSearchChange}
                    sx={{ marginBottom: 2, marginTop: 1.8 }}
                  />
                </Box>

                <FormControl>
                  <FormLabel>
                    <Typography
                      color="neutral"
                      level="title-lg"
                      variant="plain"
                    >
                      {user.userType === "Catcher"
                        ? "Select or Add skill"
                        : "Select or Add tags"}
                    </Typography>
                  </FormLabel>

                  {/* Predefined skills list */}
                  <FormLabel>
                    <Typography color="primary" level="body-md" variant="plain">
                      {user.userType === "Catcher"
                        ? "Select your skill here:"
                        : "Select your tags here"}
                    </Typography>
                  </FormLabel>

                  <div>
                    {/* {availableSkills.map((skill) => (
                      <Chip
                        key={skill}
                        onClick={() => handleAddSkill(skill)}
                        color={
                          selectedSkills.includes(skill) ? "success" : "neutral"
                        }
                        variant="solid"
                        size="lg"
                        startDecorator={<Add />}
                      >
                        {skill}
                      </Chip>
                    ))} */}

                    {filteredSkills.map((skill) => (
                      <Box sx={{ display: "inline-block", margin: 0.4 }}>
                        <Chip
                          key={skill}
                          onClick={() => handleAddSkill(skill)}
                          color={
                            selectedSkills.includes(skill)
                              ? "success"
                              : searchTerm && skill.toLowerCase().includes(searchTerm.toLowerCase())
                                ? "primary"
                                : "neutral"
                          }
                          variant="solid"
                          size="lg"
                          startDecorator={<Add />}
                        >
                          {skill}
                        </Chip>
                      </Box>

                    ))}
                  </div>

                  {/* Custom skill input */}

                  {/* <FormLabel>
                    <Typography color="primary" level="body-md" variant="plain">
                      {user.userType === "Catcher"
                        ? "Or Add specific skills:"
                        : "Or Add specific tags:"}
                    </Typography>
                  </FormLabel>

                  <Input
                    type="text"
                    value={inputSkill}
                    onChange={(e) => setInputSkill(e.target.value)}
                    placeholder={
                      user.userType === "Catcher"
                        ? "Enter a skill..."
                        : "Enter a tag... "
                    }
                  />
                  <Box margin={1} textAlign="e">
                    <Button
                      onClick={handleAddCustomSkill}
                      size="md"
                      variant="outlined"
                    >
                      Add
                    </Button>
                  </Box> */}

                  {/* Display selected skills */}
                  <div>
                    <FormLabel>
                      <Typography
                        color="neutral"
                        level="title-lg"
                        variant="plain"
                      >
                        {user.userType === "Catcher"
                          ? "Skills selected:"
                          : "Tags selected: "}
                      </Typography>
                    </FormLabel>

                    {selectedSkills.length > 0 ? (
                      selectedSkills.map((skill) => (
                        <Chip
                          key={skill}
                          color="primary"
                          variant="solid"
                          size="lg"
                          endDecorator={
                            <ChipDelete
                              onDelete={() => handleRemoveSkill(skill)}
                            />
                          }
                        >
                          {skill}
                        </Chip>
                      ))
                    ) : (
                      <FormLabel>
                        <Typography
                          color="warning"
                          level="body-md"
                          variant="outlined"
                        >
                          None selected.
                        </Typography>
                      </FormLabel>
                    )}
                    <Typography level="body-sm">
                      <i>15 Skills Max</i>
                    </Typography>
                  </div>
                  {error && (
                    <Typography color="danger" textAlign="center" marginTop={2}>
                      {error}
                    </Typography>
                  )}
                </FormControl>
              </>
              <div className="step__button">
                <button className="btnn" type="submit">
                  SAVE
                </button>
              </div>
            </form>
          </ModalDialog>
        </ModalOverflow>
      </Modal>
    </>
  );
}

export default SkillsInputModal;
