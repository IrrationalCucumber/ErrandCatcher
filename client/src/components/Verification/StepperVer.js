import React, { useState } from "react";
import { Step1, Step2, Step3 } from "./StepContent";
import {
  Box,
  Step,
  StepLabel,
  Stepper,
  Button,
  Typography,
} from "@mui/material";

const steps = ["Step 1", "Step 2", "Step 3"];

export default function StepperVer() {
  const [activeStep, setActiveStep] = useState(0);
  // variables to store step's user data
  //data will be pass around
  const [details, setDetails] = useState({
    firstName: "",
    lastName: "",
    age: "",
    date: "",
    sex: "",
    address: "",
    email: "",
    cnum: "",
  });
  const [images, setImages] = useState({
    image1: null,
    image2: null,
    preview1: "",
    preview2: "",
  });
  //Hadnle changing steps
  const handleNext = () => {
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
  };
  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };
  const handleReset = () => {
    setActiveStep(0);
  };
  //based on current step, render step contents
  const renderContent = (step) => {
    switch (step) {
      case 0:
        return (
          <Step1 details={details} setDetail={setDetails} onNext={handleNext} />
        );
      case 1:
        return (
          <Step2
            images={images}
            setImages={setImages}
            details={details}
            onNext={handleNext}
            onPrev={handleBack}
          />
        );
      case 2:
        return <Step3 details={details} images={images} onPrev={handleBack} />;
      default:
        return <Typography>Unknown Step</Typography>;
    }
  };

  return (
    <Box sx={{ width: "100%" }}>
      <Stepper activeStep={activeStep}>
        {steps.map((label, index) => (
          <Step key={index}>
            <StepLabel>{label}</StepLabel>
          </Step>
        ))}
      </Stepper>
      <Box sx={{ mt: 2, mb: 1 }}>{renderContent(activeStep)}</Box>
      <Box sx={{ display: "flex", flexDirection: "row", pt: 2 }}>
        <Button
          color="inherit"
          disabled={activeStep === 0}
          onClick={handleBack}
          sx={{ mr: 1 }}
        >
          Back
        </Button>
        <Box sx={{ flex: "1 1 auto" }} />
        <Button onClick={handleNext}>
          {activeStep === steps.length - 1 ? "Finish" : "Next"}
        </Button>
      </Box>
      {activeStep === steps.length && (
        <Box sx={{ mt: 2, mb: 1 }}>
          <Typography>All steps completed - you&apos;re finished</Typography>
          <Button onClick={handleReset}>Reset</Button>
        </Box>
      )}
    </Box>
  );
}
