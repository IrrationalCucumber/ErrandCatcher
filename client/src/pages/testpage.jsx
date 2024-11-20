import React, { useState } from "react";

function Testpage() {
  return (
    <>
      <div
        style={{
          fontFamily: "Arial, sans-serif",
          margin: "0",
          padding: "0",
          backgroundColor: "#f5f5f5",
          color: "#333",
        }}
      >
        <div
          style={{
            display: "flex",
            maxWidth: "1000px",
            margin: "20px auto",
            background: "white",
            borderRadius: "8px",
            overflow: "hidden",
            boxShadow: "0 4px 10px rgba(0, 0, 0, 0.1)",
          }}
        >
          {/* Sidebar */}
          <div
            style={{
              width: "30%",
              backgroundColor: "#006ac5",
              color: "white",
              padding: "20px",
              boxSizing: "border-box",
            }}
          >
            <div style={{ textAlign: "center" }}>
              <img
                src="https://static.vecteezy.com/system/resources/thumbnails/002/002/403/small/man-with-beard-avatar-character-isolated-icon-free-vector.jpg"
                alt="Profile Picture"
                style={{
                  width: "100%",
                  borderRadius: "50%",
                  marginBottom: "10px",
                }}
              />
              <h2 style={{ fontSize: "22px", margin: "5px 0" }}><strong>Jane Doe</strong></h2>
              <p style={{ margin: "5px 0", fontSize: "16px" }}>Designer</p>
            </div>
            <div style={{ marginTop: "15px", textAlign: "center" }}>
              <p style={{margin: "5px 0", fontSize: "15px", display: "flex", alignItems: "center", justifyContent: "center"}}>
                <i className="fa fa-map-marker-alt" style={{ marginRight: "8px"}}></i>London, UK
              </p>
              <p style={{margin: "5px 0", fontSize: "15px", display: "flex", alignItems: "center", justifyContent: "center"}}>
                <i className="fa fa-envelope" style={{ marginRight: "8px"}}></i>ex@email.com
              </p>
              <p style={{margin: "5px 0", fontSize: "15px", display: "flex", alignItems: "center", justifyContent: "center"}}>
                <i className="fa fa-phone" style={{ marginRight: "8px"}}></i>09156065521
              </p>
            </div>
            <div style={{ marginTop: "15px", textAlign: "center" }}>
              <h3 style={{ fontSize: "18px", marginBottom: "5px"}}>Skills:</h3>
              <p style={{margin: "5px 0", fontSize: "15px", display: "flex", alignItems: "center", justifyContent: "center"}}>Adobe Photoshop</p>
              <p style={{margin: "5px 0", fontSize: "15px", display: "flex", alignItems: "center", justifyContent: "center"}}>CISCO certified</p>
            </div>
          </div>

          {/* Main Content */}
          <div
            style={{
              width: "70%",
              padding: "20px",
              boxSizing: "border-box",
            }}
          >
            <h3
              style={{
                fontSize: "24px",
                marginBottom: "20px",
                color: "#2b2b2b",
              }}
            >
              <i className="fa fa-briefcase"></i> <strong>Work Experience</strong>
            </h3>
            <div style={{ marginBottom: "20px" }}>
              <h4
                style={{
                  fontSize: "19px",
                  margin: "5px 0",
                  color: "#2b2b2b",
                }}
              >
                <strong>Front End Developer</strong>
              </h4>
              <p style={{ fontSize: "18px", color: "#555", margin: "5px 0" }}>
                <i className="fa fa-calendar"></i> Jan 2015 -{" "}
                <span
                  style={{
                    color: "#4caf50",
                    fontWeight: "bold",
                  }}
                >
                  Current 
                </span>
              </p>
              <p style={{ fontSize: "18px", color: "#555" }}>
                Lorem ipsum dolor sit amet. Praesentium magnam consectetur vel
                in deserunt aspernatur est reprehenderit sunt hic.
              </p>
            </div>
            <div style={{ marginBottom: "20px" }}>
              <h4
                style={{
                  fontSize: "19px",
                  margin: "5px 0",
                  color: "#2b2b2b",
                }}
              >
                <strong>Web Developer</strong>
              </h4>
              <p style={{ fontSize: "18px", color: "#555", margin: "5px 0" }}>
                <i className="fa fa-calendar"></i> Mar 2012 - Dec 2014
              </p>
              <p style={{ fontSize: "18px", color: "#555" }}>
                Consectetur adipisicing elit. Praesentium magnam consectetur vel
                in deserunt aspernatur est reprehenderit sunt hic.
              </p>
            </div>
            <div style={{ marginBottom: "20px" }}>
              <h4
                style={{
                  fontSize: "19px",
                  margin: "5px 0",
                  color: "#2b2b2b",
                }}
              >
                <strong>Graphic Designer</strong>
              </h4>
              <p style={{ fontSize: "18px", color: "#555", margin: "5px 0" }}>
                <i className="fa fa-calendar"></i> Jun 2010 - Mar 2012
              </p>
              <p style={{ fontSize: "18px", color: "#555" }}>
                Lorem ipsum dolor sit amet, consectetur adipisicing elit.
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Testpage;