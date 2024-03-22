//03-21-24 start date is already included needed db

import React from "react";
// import "./ErrandInput.css";

function ErrandInputs(props) {
  return (
    <>
      <div className="input-cont">
        <div className="errand-inputs">
            {/* commission title */}
            <div className="input-group">
              <div className="col1">
                <label style={{color:"black"}}>Commission Title</label>
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
                <label style={{color:"black"}}>Start Date</label>
              </div>
              <div className="col2">
                <input
                  type="date"
                  placeholder="Start Date"
                  onChange={props.handleChange}
                  // name={props.deadline}
                  // value={props.dlValue}
                />
              </div>
            </div>

            {/* deadline */}
            <div className="input-group">
              <div className="col1">
                <label style={{color:"black"}}>Deadline</label>
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
                <label style={{color:"black"}}>Location</label>
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
                <label htmlFor="" style={{color:"black"}}>Commission Type</label>
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
            {/* Amount */}
            <div className="input-group">
              <div className="col1">
                <label style={{color:"black"}}>Amount: ₱</label>
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
                <label style={{color:"black"}}>Contact Number</label>
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
                <label style={{color:"black"}}>Description</label>
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
            <div className="col2">
              <select
                name={props.type}
                onChange={props.handleChange}
                value={props.typeValue}
                disabled={props.disable}
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
          {/* Amount */}
          <div className="input-group">
            <div className="col1">
              <label>Amount: ₱</label>
            </div>
            <div className="col2">
              <input
                type="number"
                placeholder="0.00"
                onChange={props.handleChange}
                name={props.pay}
                value={props.payValue}
                disabled={props.disable}
                style={{
                  content: ".00",
                }}
              />
            </div>
          </div>
          {/* contact number */}
          <div className="input-group">
            <div className="col1">
              <label>Contact Number</label>
            </div>
            <div className="col2">
              <input
                type="tel"
                placeholder="Phone/Telephone number"
                onChange={props.handleChange}
                name={props.number}
                value={props.numValue}
                disabled={props.disable}
              />
            </div>
          </div>
          <div className="input-group">
            <div className="col1">
              <label>Description</label>
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
                disabled={props.disable}
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
