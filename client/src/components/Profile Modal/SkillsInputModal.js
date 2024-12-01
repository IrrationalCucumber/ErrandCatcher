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
import React, { useState } from "react";

function SkillsInputModal(props) {
  //SKill tags
  // State to hold the selected skills
  const [selectedSkills, setSelectedSkills] = useState([]);
  const [inputSkill, setInputSkill] = useState("");
  const [error, setError] = useState("");
  // Predefined list of skills (you can fetch this from the backend)
  const availableSkills = [
    "Communication",
    "Teamwork",
    "Problem Solving",
    "Hardworking",
    "Leadership",
    "Time Management",
  ];
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
  const handleSubmit = (e) => {
    e.preventDefault();

    if (!selectedSkills) {
      setError("Please list your skills.");
      return;
    }
    // Clear errors if all checks pass
    setError("");
    // Create a combined string for qualifications (general job)
    const qualificationsString = `${selectedSkills}`;
    //details.skills = qualificationsString;
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
                      Select/Add your skill
                    </Typography>
                  </FormLabel>

                  {/* Predefined skills list */}
                  <FormLabel>
                    <Typography color="primary" level="body-md" variant="plain">
                      Select your Skill/s here:
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
                      Or your specific skills here:
                    </Typography>
                  </FormLabel>

                  <Input
                    type="text"
                    value={inputSkill}
                    onChange={(e) => setInputSkill(e.target.value)}
                    placeholder="Enter a skill"
                  />
                  <Box margin={1} textAlign="e">
                    <Button
                      onClick={handleAddCustomSkill}
                      size="md"
                      variant="outlined"
                    >
                      Add Skill
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
                        Skills you have selected:
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
                          No skills selected.
                        </Typography>
                      </FormLabel>
                    )}
                  </div>

                  {/* Comma-separated string of selected skills */}
                  {/* <div>
                      <h4>Skills as Comma-Separated String:</h4>
                      <p>{selectedSkills.join(",")}</p>
                    </div> */}
                </FormControl>
              </>
              <div className="step__button">
                <button className="btnn" type="submit">
                  Next
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
