import React from "react";
//import "./ErrandInput.css";

function ErrandInputs(props) {
  return (
    <>
      <div className="input-cont">
        <div className="errand-inputs">
          <label>
            Commission Title
            <input
              type="text"
              placeholder="Errand Title"
              onChange={props.handleChange}
              name={props.title}
              value={props.titleValue}
            />
          </label>
          <label>
            DeadLine
            <input
              type="date"
              placeholder="Deadline"
              onChange={props.handleChange}
              name={props.deadline}
              value={props.dlValue}
            />
          </label>
          <br />
          <label>
            Location
            <input
              type="text"
              placeholder="Location"
              onChange={props.handleChange}
              name={props.location}
              value={props.locValue}
            />
          </label>
          <br />
          <label htmlFor="">
            Commission Type
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
          </label>
          <br />
          <label>
            Description
            <textarea
              cols="20"
              rows="11"
              type="text"
              placeholder="Description"
              onChange={props.handleChange}
              name={props.desc}
              value={props.descValue}
            />
          </label>
          <br />
          <label>
            Amount: ₱
            <input
              type="number"
              placeholder="0.00"
              onChange={props.handleChange}
              name={props.pay}
              value={props.payValue}
            />
          </label>
          <label>
            Contact Number
            <input
              type="tel"
              placeholder="Phone/Telephone number"
              onChange={props.handleChange}
              name={props.number}
              value={props.numValue}
            />
          </label>

          <br />

          <button onClick={props.handleAddMarkerClick}>Add Marker</button>
        </div>
        <div className="map--wrap">
          <label>
            <p>
              X: {props.long} Y: {props.lat}
            </p>
          </label>
          <div ref={props.mapContainer} className="map-small" />
        </div>
      </div>
    </>
  );
}

export default ErrandInputs;
