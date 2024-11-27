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
import { Typography } from "@mui/joy";

function ErrandInputs(props) {
  const [startSuggestions, setStartSuggestions] = useState([]);
  const [startQuery, setStartQuery] = useState(""); // For starting location input (props.location)
  const [startCoordinates, setStartCoordinates] = useState(null); // For selected starting location coordinates

  const [destSuggestions, setDestSuggestions] = useState([]);
  const [destQuery, setDestQuery] = useState(props.toValue); // For destination input
  const [destCoordinates, setDestCoordinates] = useState(null); // For selected destination coordinates

  const [isStartSelected, setIsStartSelected] = useState(false); // New state to track if a suggestion was clicked
  const [isDestSelected, setIsDestSelected] = useState(false); // Same for destination

  // Fetch suggestions for start location from Mapbox API
  // const fetchStartSuggestions = async (searchText) => {
  //   if (!searchText) {
  //     setStartSuggestions([]);
  //     return;
  //   }

  //   try {
  //     const response = await axios.get(
  //       `https://api.mapbox.com/geocoding/v5/mapbox.places/${searchText}.json`,
  //       {
  //         params: {
  //           access_token: props.accessToken, // Add your Mapbox access token
  //           autocomplete: true,
  //           limit: 5,
  //           country: "PH", // Restrict oy Philippines
  //         },
  //       }
  //     );
  //     const features = response.data.features || [];
  //     setStartSuggestions(
  //       features.map((feature) => ({
  //         place_name: feature.place_name,
  //         coordinates: feature.geometry.coordinates,
  //       }))
  //     );
  //   } catch (error) {
  //     console.error("Error fetching start suggestions:", error);
  //   }
  // };

  // Fetch suggestions for destination location from Mapbox API
  // const fetchDestSuggestions = async (searchText) => {
  //   if (!searchText) {
  //     setDestSuggestions([]);
  //     return;
  //   }

  //   try {
  //     const response = await axios.get(
  //       `https://api.mapbox.com/geocoding/v5/mapbox.places/${searchText}.json`,
  //       {
  //         params: {
  //           access_token: props.accessToken, // Add your Mapbox access token
  //           autocomplete: true,
  //           limit: 5,
  //           country: "PH",
  //         },
  //       }
  //     );
  //     const features = response.data.features || [];
  //     setDestSuggestions(
  //       features.map((feature) => ({
  //         place_name: feature.place_name,
  //         coordinates: feature.geometry.coordinates,
  //       }))
  //     );
  //   } catch (error) {
  //     console.error("Error fetching destination suggestions:", error);
  //   }
  // };

  // Debounce for start suggestions
  // useEffect(() => {
  //   if (isStartSelected) return; // If a suggestion was clicked, skip fetching

  //   const timeoutId = setTimeout(() => {
  //     fetchStartSuggestions(startQuery);
  //   }, 300); // Debounce time (300ms)

  //   return () => clearTimeout(timeoutId);
  // }, [startQuery]);

  // Debounce for destination suggestions
  // useEffect(() => {
  //   if (isDestSelected) return; // If a suggestion was clicked, skip fetching

  //   const timeoutId = setTimeout(() => {
  //     fetchDestSuggestions(destQuery);
  //   }, 300); // Debounce time (300ms)

  //   return () => clearTimeout(timeoutId);
  // }, [destQuery]);

  // Handle start location suggestion click
  // const handleStartSuggestionClick = (suggestion) => {
  //   setStartQuery(suggestion.place_name);
  //   setStartCoordinates(suggestion.coordinates);
  //   setStartSuggestions([]); // Clear suggestions
  //   setIsStartSelected(true); // Mark that a suggestion was clicked

  //   // Sync with parent component
  //   props.handleChange({
  //     target: {
  //       name: props.location,
  //       value: suggestion.place_name,
  //     },
  //   });

  //   if (props.onStartLocationSelect) {
  //     props.onStartLocationSelect(suggestion.coordinates);
  //   }
  // };

  // Reset the `isStartSelected` state when the user types
  // const handleStartQueryChange = (e) => {
  //   // onChange={(e) => setStartQuery(e.target.value)}
  //   setStartQuery(e.target.value);
  //   setIsStartSelected(false); // Reset the state when the user starts typing again
  // };

  // Handle destination location suggestion click
  // const handleDestSuggestionClick = (suggestion) => {
  //   setDestQuery(suggestion.place_name);
  //   setDestCoordinates(suggestion.coordinates);
  //   setDestSuggestions([]); // clear suggestions
  //   setIsDestSelected(true); // Mark that a suggestion was clicked

  //   // Sync with parent component
  //   props.handleChange({
  //     target: {
  //       name: props.to,
  //       value: suggestion.place_name,
  //     },
  //   });

  //   if (props.onLocationSelect) {
  //     props.onLocationSelect(suggestion.coordinates);
  //   }
  // };

  // const handleDestQueryChange = (e) => {
  //   // onChange={(e) => setStartQuery(e.target.value)}
  //   setDestQuery(e.target.value);
  //   setIsDestSelected(false); // Reset the state when the user starts typing again
  // };

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
      <div className="input-group">
        <div className="col1">
          <Typography level="title-lg" variant="plain">
            Start
          </Typography>
        </div>
        <div className="col2">
          <Input
            color="neutral"
            disabled={props.readOnly}
            size="lg"
            variant={props.variant}
            type="date"
            placeholder="Enter when to begin..."
            onChange={props.handleChange}
            name={props.start}
            value={props.startValue}
            slotProps={{
              input: {
                min: new Date().toISOString().split("T")[0],
              },
            }}
          />
        </div>
      </div>
      {/* deadline */}
      <div className="input-group">
        <div className="col1">
          <Typography level="title-lg" variant="plain">
            End
          </Typography>
        </div>
        <div className="col2">
          <Input
            color="neutral"
            disabled={props.readOnly}
            size="lg"
            variant={props.variant}
            type="date"
            placeholder="Enter date of deadline"
            onChange={props.handleChange}
            name={props.deadline}
            value={props.dlValue}
            slotProps={{
              input: {
                min: new Date(new Date().setDate(new Date().getDate() + 1))
                  .toISOString()
                  .split("T")[0],
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
            {/* search suggestion */}
            {/* {startSuggestions.length > 0 && (
              <ul className="suggestions-list">
                {startSuggestions.map((suggestion, index) => (
                  <li
                    key={index}
                    onClick={() => handleStartSuggestionClick(suggestion)}
                    className="suggestion-item"
                  >
                    {suggestion.place_name}
                  </li>
                ))}
              </ul>
            )} */}
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
              // onChange={handleDestQueryChange}
              // value={destQuery} // Sync input value
            />
            {/* search suggestion */}
            {/* {destSuggestions.length > 0 && (
              <ul className="suggestions-list">
                {destSuggestions.map((suggestion, index) => (
                  <li
                    key={index}
                    onClick={() => handleDestSuggestionClick(suggestion)}
                    className="suggestion-item"
                  >
                    {suggestion.place_name}
                  </li>
                ))}
              </ul>
            )} */}
          </div>
        </div>
      )}
      {/* Amount */}
      <div className="input-group">
        <div className="col1">
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
          <div className="col2">
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
            {props.typeValue !== "HomeService - Indoor" &&
              props.typeValue !== "HomeService - Outdoor" &&
              props.typeValue !== "" && (
                <>
                  <Typography color="neutral" level="body-sm" variant="plain">
                    15/km + ₱100
                  </Typography>
                  {props.distance ? (
                    <Typography color="neutral" level="body-sm" variant="plain">
                      {props.distance} km
                    </Typography>
                  ) : null}{" "}
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
        {/* PAYMENT METOD */}
        {/* <div className="input-group">
          <div className="col1">
            <Typography level="title-lg" variant="plain">
              Payment Method
            </Typography>
          </div>
          <div className="col2">
            <select
              name={props.method}
              onChange={props.handleChange}
              value={props.methodValue}
              disabled={props.readOnly}
            >
              <option value="">Choose method....</option>
              <option value="g-cash">G-Cash</option>
              <option value="paymaya">Paymaya</option>
              <option value="on-hand">Cash on Hand</option>
              <option value="credit card">Credit Card</option>
            </select>
          </div>
        </div> */}
      </div>

      {/* contact number */}
      <div className="input-group">
        <div className="col1">
          <Typography level="title-lg" variant="plain">
            Contact Number
          </Typography>
        </div>
        <div className="col2">
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
