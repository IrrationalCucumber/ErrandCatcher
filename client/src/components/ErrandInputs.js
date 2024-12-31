import React, { useState, useEffect } from "react";
import axios from "axios";
// import "./ErrandInput.css";
/**
 * 13/04/24
 * IMPORT MUI Libraries
 *
 */
//components/ui elemens
import Textarea from "@mui/joy/Textarea";
import Chip from "@mui/joy/Chip";
import Input from "@mui/joy/Input";

//icons
import LocationOn from "@mui/icons-material/LocationOn";
import AddIcCallIcon from "@mui/icons-material/AddIcCall";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import AccessTimeFilledIcon from "@mui/icons-material/AccessTimeFilled";
import DoNotDisturbIcon from "@mui/icons-material/DoNotDisturb";
import WhereToVoteIcon from "@mui/icons-material/WhereToVote";
import { Autocomplete, Typography } from "@mui/joy";
import { AmountDecimal } from "./Display/DsiplayFunctions";

function ErrandInputs(props) {
  // Add a new state for tracking end date validation error
  const [endDateError, setEndDateError] = useState("");

  // Function to validate end date
  const validateEndDate = (startDate, endDate) => {
    if (startDate && endDate) {
      if (new Date(endDate) <= new Date(startDate)) {
        setEndDateError("End date must be after the start date");
        return false;
      } else {
        setEndDateError("");
        return true;
      }
    }
    return true;
  };

  // Modify the handleChange prop to include end date validation
  const modifiedHandleChange = (e) => {
    const { name, value } = e.target;

    // If it's the start or end date, validate
    if (name === props.start || name === props.deadline) {
      // When start date changes, validate against existing end date
      if (name === props.start) {
        validateEndDate(value, props.dlValue);
      }
      // When end date changes, validate against existing start date
      else if (name === props.deadline) {
        validateEndDate(props.startValue, value);
      }
    }

    // Call the original handleChange
    props.handleChange(e);
  };

  return (
    <>
      {/* <div className="input-group"> */}
      {props.status === "Available" && (
        <>
          <div className="input-group">
            <div className="col1">
              <Chip
                size="lg"
                variant="solid"
                color="success"
                startDecorator={<CheckCircleIcon />}
              >
                {props.status}
              </Chip>
            </div>
          </div>
        </>
      )}
      {props.status === "Expired" && (
        <>
          <div className="input-group">
            <div className="col1">
              <Chip
                size="lg"
                variant="solid"
                color="warning"
                startDecorator={<AccessTimeFilledIcon />}
              >
                {props.status}
              </Chip>
            </div>
          </div>
        </>
      )}
      {props.status === "Unavailable" && (
        <>
          <div className="input-group">
            <div className="col1">
              <Chip
                size="lg"
                variant="solid"
                color="danger"
                startDecorator={<DoNotDisturbIcon />}
              >
                {props.status}
              </Chip>
            </div>
          </div>
        </>
      )}
      {/* </div> */}
      {/* ERRAND POSTER */}
      {props.employer ? (
        <>
          <div className="input-group">
            <div className="col1">
              <Typography level="title-lg" variant="plain">
                {props.employer}
              </Typography>
            </div>
            <div className="col2">
              <Typography color="primary" level="title-lg" variant="plain">
                {props.fname} {props.lname}
              </Typography>
            </div>
          </div>
        </>
      ) : null}
      {/* commission title */}
      <div className="input-group">
        <div className="col1">
          <Typography level="title-lg" variant="plain">
            Title
          </Typography>
        </div>
        <div className="col2">
          <Input
            color="neutral"
            disabled={props.readOnly}
            size="lg"
            variant={props.variant}
            type="text"
            placeholder="Enter the title here..."
            onChange={props.handleChange}
            name={props.title}
            value={props.titleValue}
            slotProps={{
              input: {
                maxLength: 20,
              },
            }}
          />
        </div>
      </div>
      {/*start date*/}
      <div className="input-group" style={{ flexDirection: "row" }}>
        <div
          className="col"
          style={{
            display: "flex",
            flexDirection: "column",
            paddingRight: "4px",
            position: "relative",
            width: "50%",
          }}
        >
          <Typography level="title-lg" variant="plain">
            Start
          </Typography>

          <Input
            color="neutral"
            disabled={props.readOnly}
            size="lg"
            variant={props.variant}
            type="date"
            placeholder="Enter when to begin..."
            onChange={modifiedHandleChange}
            name={props.start}
            value={props.startValue}
            slotProps={{
              input: {
                min: new Date().toISOString().split("T")[0],
              },
            }}
          />
        </div>
        {/* deadline */}
        <div
          className="col"
          style={{
            display: "flex",
            flexDirection: "column",
            paddingLeft: "4px",
            width: "50%",
          }}
        >
          <Typography level="title-lg" variant="plain">
            End
          </Typography>

          <Input
            color="neutral"
            disabled={props.readOnly}
            size="lg"
            variant={props.variant}
            type="date"
            placeholder="Enter date of deadline"
            onChange={modifiedHandleChange}
            name={props.deadline}
            value={props.dlValue}
            slotProps={{
              input: {
                min: new Date().toISOString().split("T")[0],
              },
            }}
          />
        </div>
      </div>
      {/* commission type */}
      <div className="input-group">
        <div className="col1">
          <Typography level="title-lg" variant="plain">
            Errand Type
          </Typography>
        </div>
        <div className="col2">
          <select
            name={props.type}
            onChange={props.handleChange}
            value={props.typeValue}
            disabled={props.readOnly}
          >
            <option value="">Choose type of Errand....</option>
            <option value="HomeService - Indoor">Home Service - Indoor</option>
            <option value="HomeService - Outdoor">
              Home Service - Outdoor
            </option>
            <option value="Delivery">Delivery Service</option>
            <option value="Transportation">Transport Service</option>
          </select>
        </div>
      </div>
      {/* location */}
      <div className="input-group">
        <div className="col1">
          <Typography level="title-lg" variant="plain">
            {props.typeValue === "Delivery" ||
            props.typeValue === "Transportation" ? (
              <>From</>
            ) : (
              <>Where</>
            )}
          </Typography>
        </div>
        {(props.typeValue === "HomeService - Indoor" ||
          props.typeValue === "HomeService - Outdoor" ||
          props.typeValue === "") && (
          <>
            <div className="col2">
              <Input
                color="neutral"
                disabled={props.readOnly}
                size="lg"
                variant={props.variant}
                startDecorator={<LocationOn />}
                type="text"
                placeholder="Enter location of errand..."
                onChange={props.handleChange}
                value={props.locValue} // Sync input value
                name={props.location}
              />
            </div>
          </>
        )}
        {(props.typeValue === "Transportation" ||
          props.typeValue === "Delivery") && (
          <div className="col2">
            <Input
              color="neutral"
              disabled={props.readOnly}
              size="lg"
              variant={props.variant}
              startDecorator={<LocationOn />}
              type="text"
              placeholder="Enter place for pickup..."
              onChange={props.handleChange}
              value={props.locValue} // Sync input value
              name={props.location}
              // onChange={handleStartQueryChange}
              // value={startQuery} // Sync input value
              // name={props.location}
            />
          </div>
        )}
      </div>
      {/* Display when Transport Type is selected */}
      {(props.typeValue === "Transportation" ||
        props.typeValue === "Delivery") && (
        <div className="input-group">
          <div className="col1">
            <Typography level="title-lg" variant="plain">
              To
            </Typography>
          </div>
          <div className="col2">
            <Input
              color="neutral"
              disabled={props.readOnly}
              size="lg"
              variant={props.variant}
              startDecorator={<WhereToVoteIcon />}
              type="text"
              placeholder="Enter destination of errand..."
              name={props.to}
              onChange={props.handleChange}
              value={props.toValue} // Sync input value
            />
            \
          </div>
        </div>
      )}
      {/* Amount */}
      <div className="input-group" style={{ flexDirection: "row" }}>
        <div
          className="col"
          style={{
            display: "flex",
            flexDirection: "column",
            paddingLeft: "4px",
            width: "50%",
          }}
        >
          {props.typeValue !== "HomeService - Indoor" &&
          props.typeValue !== "HomeService - Outdoor" &&
          props.typeValue !== "" ? (
            <Typography level="title-lg" variant="plain">
              Payment
            </Typography>
          ) : (
            (props.typeValue === "HomeService - Indoor" ||
              props.typeValue === "HomeService - Outdoor" ||
              props.typeValue === "") && (
              <Typography level="title-lg" variant="plain">
                Payment
              </Typography>
            )
          )}

          <Input
            color="neutral"
            disabled={props.readOnly}
            size="lg"
            variant={props.variant}
            type="number"
            startDecorator="₱"
            placeholder="0.00"
            onChange={props.handleChange}
            name={props.pay}
            value={props.payValue}
          />
        </div>
        {/* contact number */}
        <div
          className="col"
          style={{
            display: "flex",
            flexDirection: "column",
            paddingLeft: "4px",
            width: "50%",
          }}
        >
          <Typography level="title-lg" variant="plain">
            Contact Number
          </Typography>

          <Input
            color="neutral"
            disabled={props.readOnly}
            size="lg"
            variant={props.variant}
            startDecorator={
              <Typography startDecorator={<AddIcCallIcon />}>+63</Typography>
            }
            type="tel"
            placeholder="Enter contact number..."
            onChange={props.handleChange}
            name={props.number}
            value={props.numValue}
          />
        </div>
      </div>
      <div className="input-group" style={{ paddingLeft: "5px" }}>
        <div className="col1">
          {props.typeValue !== "HomeService - Indoor" &&
            props.typeValue !== "HomeService - Outdoor" &&
            props.typeValue !== "" && (
              <>
                <Typography color="neutral" level="body-sm" variant="plain">
                  ₱15 X {AmountDecimal(props.distance)} km + ₱100
                </Typography>
              </>
            )}

          {!!props.minimum ? (
            <Typography color="neutral" level="body-sm" variant="plain">
              <i>Suggested Pay: {props.minimum}</i>
            </Typography>
          ) : null}
          <Typography color="neutral" level="body-sm" variant="plain">
            5% Deduction as Plaftform fee
          </Typography>
        </div>
      </div>
      {/* Tags Autocomplete */}
      <div className="input-group">
        <div className="col1">
          <Typography level="title-lg" variant="plain">
            Skill Requirement
          </Typography>
        </div>
        <div className="col2">
          <Autocomplete
            multiple
            value={props.tagValue ? props.tagValue.split(",") : []} // Ensure value is always an array
            options={jobSkills}
            readOnly={props.readOnly}
            onChange={(event, newValue) => {
              props.handleChange({
                target: {
                  name: props.tags,
                  value: newValue.join(","), // Update tags as a comma-separated string
                },
              });
            }}
            renderTags={(value, getTagProps) =>
              value.map((tag, index) => (
                <Chip
                  key={index}
                  {...getTagProps({ index })}
                  color="primary"
                  variant="solid"
                  size="md"
                >
                  {tag}
                </Chip>
              ))
            }
            renderInput={(params) => (
              <Input
                {...params}
                placeholder="Select skills..."
                variant="outlined"
                size="md"
              />
            )}
          />
        </div>
      </div>

      <div className="input-group">
        <div className="col1">
          <Typography level="title-lg" variant="plain">
            Description
          </Typography>
        </div>
        <div className="col2">
          <Textarea
            color="neutral"
            disabled={props.readOnly}
            size="lg"
            variant={props.variant}
            minRows={5}
            maxRows={5}
            placeholder="Write instruction/details for the errand...."
            onChange={props.handleChange}
            name={props.desc}
            value={props.descValue}
          />
        </div>
      </div>

      <style>
        {`
        .suggestions-list {
          border: 1px solid #ccc;
          border-radius: 4px;
          max-height: 200px;
          overflow-y: auto;
          list-style: none;
          padding: 0;
          margin: 0;
          position: absolute;
          background-color: white;
          z-index: 1000;
          width: 100%;
          font-size: 13px;
        }     
          
        .suggestion-item {
          padding: 10px;
          cursor: pointer;
        }
        
        .suggestion-item:hover {
          background-color: #f0f0f0;
        }
      `}
      </style>
    </>
  );
}

export default ErrandInputs;

const jobSkills = [
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
