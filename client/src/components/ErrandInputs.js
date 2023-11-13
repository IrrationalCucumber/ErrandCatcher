import React from "react";

function ErrandInputs(props) {
  return (
    <div className="cont">
      <label>
        Commission Title
        <input
          type="text"
          placeholder="Errand Title"
          onChange={props.handleChange}
          name={props.title}
        />
      </label>
      <label>
        DeadLine
        <input
          type="date"
          placeholder="Deadline"
          onChange={props.handleChange}
          name={props.deadline}
        />
      </label>
      <br />
      Location
      <input
        type="text"
        placeholder="Location"
        onChange={props.handleChange}
        name={props.location}
      />
      <br />
      <label htmlFor="">
        Commission Type
        <select
          name={props.type}
          onChange={props.handleChange}
          value={props.typeValue}
        >
          <option value="">Choose type....</option>
          <option value="HomeService - Indoor">Home Service - Indoor</option>
          <option value="HomeService - Outdoor">Home Service - Outdoor</option>
          <option value="Delivery">Delivery Service</option>
          <option value="Transport">Transport Service</option>
        </select>
      </label>
      <br />
      <textarea
        cols="20"
        rows="11"
        type="text"
        placeholder="Description"
        onChange={props.handleChange}
        name={props.desc}
      />
      <br />
      <label>
        Amount: ₱
        <input
          type="number"
          placeholder="0.00"
          onChange={props.handleChange}
          name={props.pay}
        />
      </label>
      <input
        type="tel"
        placeholder="Contact Number"
        onChange={props.handleChange}
        name={props.number}
      />
      <br />
      <div className="map-post-wrap">
        <div ref={props.mapContainer} className="map" />
      </div>
      <button onClick={props.handleAddMarkerClick}>Add Marker</button>
      <label>
        <p>X: {props.long}</p>
      </label>
      <label>
        <p>Y: {props.lat}</p>
      </label>
    </div>
  );
}

export default ErrandInputs;
