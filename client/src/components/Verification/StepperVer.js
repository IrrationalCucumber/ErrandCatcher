import React, { useState } from "react";
import { Stepper, Step, StepIndicator, StepButton } from "@mui/joy";
import { Check } from "@mui/icons-material";

const steps = ["Step 1", "Step 2", "Step 3"];

export default function StepperVer() {
  const [active, setActive] = useState(1);
  return (
    <>
      <Stepper>
        {/* 
        Map each steps array variables
      */}
        {steps.map((step, index) => (
          <Step
            key={step}
            orientation="vertical"
            indicator={
              <StepIndicator
                //if active, change style
                variant={active <= index ? "soft" : "solid"}
                color={active < index ? "neutral" : "primary"}
              >
                {active <= index ? index + 1 : <Check />}
              </StepIndicator>
            }
            sx={{
              "&::after": {
                ...(active > index &&
                  index !== 2 && { bgcolor: "primary.solidBg" }),
              },
            }}
          >
            <StepButton
              onClick={() => {
                setActive(index);
              }}
            >
              {step}
            </StepButton>
          </Step>
        ))}
      </Stepper>
    </>
  );
}
