import { Add } from "@mui/icons-material";
import {
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
import axios from "axios";
import React, { useState } from "react";
import { useAuth } from "../AuthContext";

function SkillsInputModal(props) {
  const { user } = useAuth();
  //SKill tags
  // State to hold the selected skills
  const [selectedSkills, setSelectedSkills] = useState([]);
  const [inputSkill, setInputSkill] = useState("");
  const [error, setError] = useState("");
  const [details, setDetails] = useState({
    skills: "",
  });
  // Predefined list of skills (you can fetch this from the backend)
  let availableSkills = [];
  if (user.userType === "Employer") {
    availableSkills = [
      "Human Resources",
      "Housewife/Househusband",
      "Student",
      "Government Agency",
      "Self-Employed",
    ];
  } else {
    availableSkills = [
      "Communication",
      "Teamwork",
      "Problem Solving",
      "Hardworking",
      "Leadership",
      "Time Management",
      "Carpentry",
      "Plumbing",
      "Gadening",
      "Programming",
    ];
  }
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
                    {availableSkills.map((skill) => (
                      <Chip
                        key={skill}
                        onClick={() => handleAddSkill(skill)}
                        color="success"
                        variant="solid"
                        size="lg"
                        startDecorator={<Add />}
                      >
                        {skill}
                      </Chip>
                    ))}
                  </div>

                  {/* Custom skill input */}

                  <FormLabel>
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
                  </Box>

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
