import React from "react";
// import "./ErrandInput.css";

function ErrandInputs(props) {
  return (
    <>
      <div className="input-cont">
        <div className="errand-inputs">
          <div>
            <p>{props.status}</p>
          </div>
          {/* commission title */}
          <div className="input-group">
            <div className="col1">
              <label style={{ color: "black" }}>Errand Name</label>
            </div>
            <div className="col2">
              <input
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
              <label style={{ color: "black" }}>Start Date</label>
            </div>
            <div className="col2">
              <input
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
              <label style={{ color: "black" }}>Due Date</label>
            </div>
            <div className="col2">
              <input
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
              <label style={{ color: "black" }}>Location</label>
            </div>
            <div className="col2">
              <input
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
                <input
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
                <input
                  type="text"
                  placeholder="Destination"
                  onChange={props.handleChange}
                  name={props.to}
                  value={props.toValue}
                  style={{fontFamily:"Lucida Sans, Lucida Sans Regular, Lucida Grande, Lucida Sans Unicode, Geneva, Verdana, sans-serif"}}
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
              <input
                type="number"
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
              <input
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
              <textarea
                cols="26"
                rows="11"
                type="text"
                placeholder="Description"
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
