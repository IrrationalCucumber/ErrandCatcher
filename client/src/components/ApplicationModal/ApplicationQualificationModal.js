import React, { useState } from "react";
import {
  Modal,
  ModalClose,
  ModalDialog,
  Typography,
  Box,
  FormControl,
  FormLabel,
  RadioGroup,
  Radio,
  Checkbox,
  Input,
  Button,
  ModalOverflow,
} from "@mui/joy";
import axios from "axios";

function ApplicationQualificationModal(props) {
  // Application state
  const [application, setApplication] = useState({
    catcherID: "",
    comID: "",
    applicationDate: "",
    qualifications: "", // This will store the combined string for qualifications
  });

  //set variables for notification
  const [notif, setNotif] = useState({
    userID: "", //this is the employer/ userID of the commission
    notificationType: "", //notif description
    notifDesc: "", //contents of the notif
  });
  //get current date
  const getCurrentDate = () => {
    const currentDate = new Date();
    const year = currentDate.getFullYear();
    const month = String(currentDate.getMonth() + 1).padStart(2, "0"); // Months are 0-indexed, so add 1
    const day = String(currentDate.getDate()).padStart(2, "0");
    return `${year}-${month}-${day}`;
  };

  // State for qualification check
  const [hasLicense, setHasLicense] = useState(false);
  const [licenseType, setLicenseType] = useState("");
  const [drivingExperience, setDrivingExperience] = useState("");
  const [vehicleType, setVehicleType] = useState("");
  const [error, setError] = useState("");

  //click event for apply
  const handleApply = async (e) => {
    // Qualification check logic
    if (!hasLicense) {
      setError("You must have a license to apply.");
      return;
    }
    if (!licenseType) {
      setError("Please select a license type.");
      return;
    }
    if (!drivingExperience || drivingExperience <= 0) {
      setError("Please enter your driving experience.");
      return;
    }
    if (!vehicleType) {
      setError("Please select a vehicle type.");
      return;
    }

    // Clear errors if all checks pass
    setError("");

    // Create a combined string for qualifications
    const qualificationsString = `License: ${
      hasLicense ? "Yes" : "No"
    }, Type: ${licenseType}, Experience: ${drivingExperience} years, Vehicle: ${vehicleType}`;

    e.preventDefault();
    try {
      //console.log(userID); // Check if userID is correct

      //assign values to the variables in application
      application.applicationDate = getCurrentDate();
      application.comID = props.commissionID;
      application.catcherID = props.userID;
      // Update the application state with the combined string
      setApplication({
        ...application, // Keep other properties intact
        qualifications: qualificationsString, // Add qualifications string
      });

      console.log(application); // Check the updated commission object
      await axios.post("http://localhost:8800/apply", application);

      //add a notification to the commission's employer
      notif.notifDesc = "A Catcher has applied to on of your errand";
      notif.userID = props.employerID;
      notif.notificationType = "Errand Application";

      await axios.post("http://localhost:8800/notify", notif);
      alert("You have applied to this Errand!");
      //navigate(`/application/${userID}`);
      console.log(notif); // check variables state
      props.close();
    } catch (err) {
      console.log(err);
    }
  };
  return (
    <div>
      <Modal open={props.open} onClose={props.close}>
        <ModalOverflow>
          <ModalDialog
            color="primary"
            layout="fullscreen"
            size="lg"
            variant="soft"
          >
            <ModalClose />
            <Typography level="h4" textAlign="center" marginBottom={2}>
              Qualification Check
            </Typography>

            <Box>
              {/* License Check */}
              <FormControl>
                <FormLabel>Do you have a driver's license?</FormLabel>
                <Checkbox
                  label="Yes, I have a driver's license"
                  checked={hasLicense}
                  onChange={(e) => setHasLicense(e.target.checked)}
                />
              </FormControl>

              {/* License Type */}
              {hasLicense && (
                <FormControl>
                  <FormLabel>License Type</FormLabel>
                  <RadioGroup
                    value={licenseType}
                    onChange={(e) => setLicenseType(e.target.value)}
                  >
                    <Radio value="Non-Professional" label="Non-Professional" />
                    <Radio value="Professional" label="Professional" />
                  </RadioGroup>
                </FormControl>
              )}

              {/* Driving Experience */}
              {hasLicense && (
                <FormControl>
                  <FormLabel>Driving Experience (in years)</FormLabel>
                  <Input
                    type="number"
                    min="0"
                    value={drivingExperience}
                    onChange={(e) => setDrivingExperience(e.target.value)}
                    placeholder="Enter number of years"
                  />
                </FormControl>
              )}

              {/* Vehicle Type */}
              {hasLicense && (
                <FormControl>
                  <FormLabel>Vehicle Type</FormLabel>
                  <RadioGroup
                    value={vehicleType}
                    onChange={(e) => setVehicleType(e.target.value)}
                  >
                    <Radio value="motorcycle" label="Motorcycle" />
                    <Radio value="sedan" label="Sedan" />
                    <Radio value="SUV" label="SUV" />
                    <Radio value="Pickup" label="Pickup" />
                    <Radio value="Van" label="Van" />
                    <Radio value="Truck" label="Truck" />
                  </RadioGroup>
                </FormControl>
              )}

              {/* Error Message */}
              {error && (
                <Typography color="danger" textAlign="center" marginTop={2}>
                  {error}
                </Typography>
              )}

              {/* Submit Button */}
              <Box marginTop={3} textAlign="center">
                <Button onClick={handleApply}>Apply Now</Button>
              </Box>
            </Box>
          </ModalDialog>
        </ModalOverflow>
      </Modal>
    </div>
  );
}

export default ApplicationQualificationModal;
