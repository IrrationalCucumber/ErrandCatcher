import React from "react";
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
import Select from "@mui/joy/Select";
import Option from "@mui/joy/Option";

//icons
import LocationOn from "@mui/icons-material/LocationOn";
import AddIcCallIcon from "@mui/icons-material/AddIcCall";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import AccessTimeFilledIcon from "@mui/icons-material/AccessTimeFilled";
import DoNotDisturbIcon from "@mui/icons-material/DoNotDisturb";

function ErrandInputs(props) {
  return (
    <>
      <div className="input-cont">
        <div className="errand-inputs">
          <div className="input-group">
            {props.status === "Available" && (
              <>
                <div className="col1">
                  <label style={{ color: "black" }}>{props.statusHeader}</label>
                </div>
                <div className="col2">
                  <Chip
                    size="lg"
                    variant="solid"
                    color="success"
                    startDecorator={<CheckCircleIcon />}
                  >
                    {props.status}
                  </Chip>
                </div>
              </>
            )}
            {props.status === "Expired" && (
              <>
                <div className="col1">
                  <label style={{ color: "black" }}>{props.statusHeader}</label>
                </div>
                <div className="col2">
                  <Chip
                    size="lg"
                    variant="solid"
                    color="warning"
                    startDecorator={<AccessTimeFilledIcon />}
                  >
                    {props.status}
                  </Chip>
                </div>
              </>
            )}
            {props.status === "Unavailable" && (
              <>
                <div className="col1">
                  <label style={{ color: "black" }}>{props.statusHeader}</label>
                </div>
                <div className="col2">
                  <Chip
                    size="lg"
                    variant="solid"
                    color="danger"
                    startDecorator={<DoNotDisturbIcon />}
                  >
                    {props.status}
                  </Chip>
                </div>
              </>
            )}
          </div>

          {/* commission title */}
          <div className="input-group">
            <div className="col1">
              <label style={{ color: "black" }}>Title</label>
            </div>
            <div className="col2">
              <Input
                color="neutral"
                disabled={props.readOnly}
                size="lg"
                variant={props.variant}
                type="text"
                placeholder="Errand Title"
                onChange={props.handleChange}
                name={props.title}
                value={props.titleValue}
              />
            </div>
          </div>

          {/*start date*/}
          <div className="input-group">
            <div className="col1">
              <label style={{ color: "black" }}>Start </label>
            </div>
            <div className="col2">
              <Input
                color="neutral"
                disabled={props.readOnly}
                size="lg"
                variant={props.variant}
                type="date"
                placeholder="Start Date"
                onChange={props.handleChange}
                name={props.start}
                value={props.startValue}
              />
            </div>
          </div>

          {/* deadline */}
          <div className="input-group">
            <div className="col1">
              <label style={{ color: "black" }}>End</label>
            </div>
            <div className="col2">
              <Input
                color="neutral"
                disabled={props.readOnly}
                size="lg"
                variant={props.variant}
                type="date"
                placeholder="Deadline"
                onChange={props.handleChange}
                name={props.deadline}
                value={props.dlValue}
              />
            </div>
          </div>

          {/* location */}
          <div className="input-group">
            <div className="col1">
              <label style={{ color: "black" }}>Where</label>
            </div>
            <div className="col2">
              <Input
                color="neutral"
                disabled={props.readOnly}
                size="lg"
                variant={props.variant}
                startDecorator={<LocationOn />}
                type="text"
                placeholder="Location"
                onChange={props.handleChange}
                name={props.location}
                value={props.locValue}
              />
            </div>
          </div>
          {/* commission type */}
          <div className="input-group">
            <div className="col1">
              <label style={{ color: "black" }} htmlFor="">
                Errand Type
              </label>
            </div>
            <div className="col2">
              <select
                name={props.type}
                onChange={props.handleChange}
                value={props.typeValue}
                disabled={props.readOnly}
              >
                <option value="">Choose type....</option>
                <option value="HomeService - Indoor">
                  Home Service - Indoor
                </option>
                <option value="HomeService - Outdoor">
                  Home Service - Outdoor
                </option>
                <option value="Delivery">Delivery Service</option>
                <option value="Transport">Transport Service</option>
              </select>
            </div>
          </div>
          {/* Display when Transport Type is selected */}
          {props.typeValue === "Transport" && (
            <div className="input-group">
              <div className="col1">
                <label style={{ color: "black" }}>Destination</label>
              </div>
              <div className="col2">
                <Input
                  color="neutral"
                  disabled={props.readOnly}
                  size="lg"
                  variant={props.variant}
                  type="text"
                  placeholder="Destination"
                  onChange={props.handleChange}
                  name={props.to}
                  value={props.toValue}
                />
              </div>
            </div>
          )}
          {/* Display when Delivery Type is selected */}
          {props.typeValue === "Delivery" && (
            <div className="input-group">
              <div className="col1">
                <label style={{ color: "black" }}>Destination</label>
              </div>
              <div className="col2">
                <Input
                  color="neutral"
                  disabled={props.readOnly}
                  size="lg"
                  variant={props.variant}
                  type="text"
                  placeholder="Destination"
                  onChange={props.handleChange}
                  name={props.to}
                  value={props.toValue}
                  style={{
                    fontFamily:
                      "Lucida Sans, Lucida Sans Regular, Lucida Grande, Lucida Sans Unicode, Geneva, Verdana, sans-serif",
                  }}
                />
              </div>
            </div>
          )}
          {/* Amount */}
          <div className="input-group">
            <div className="col1">
              <label style={{ color: "black" }}>Amount: ₱</label>
            </div>
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
            </div>
          </div>
          {/* contact number */}
          <div className="input-group">
            <div className="col1">
              <label style={{ color: "black" }}>Contact Number</label>
            </div>
            <div className="col2">
              <Input
                color="neutral"
                disabled={props.readOnly}
                size="lg"
                variant={props.variant}
                startDecorator={<AddIcCallIcon />}
                type="tel"
                placeholder="Phone/Telephone number"
                onChange={props.handleChange}
                name={props.number}
                value={props.numValue}
              />
            </div>
          </div>
          <div className="input-group">
            <div className="col1">
              <label style={{ color: "black" }}>Description</label>
            </div>
            <div className="col2">
              <Textarea
                color="neutral"
                disabled={props.readOnly}
                size="lg"
                variant={props.variant}
                minRows={5}
                maxRows={5}
                placeholder="Write here..."
                onChange={props.handleChange}
                name={props.desc}
                value={props.descValue}
              />
            </div>
          </div>
        </div>
        <div className="map--wrap">
          <div ref={props.mapContainer} className="map-small" />
          <p className="coord">
            X: {props.long} Y: {props.lat}
          </p>
        </div>
      </div>
    </>
  );
}

export default ErrandInputs;
