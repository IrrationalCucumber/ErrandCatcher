import React from "react";

const ImageModal = ({ images, handleClose }) => {
  return (
    <div className="modal" style={modalStyle}>
      <div className="modal-content" style={modalContentStyle}>
        <span className="close" onClick={handleClose} style={closeStyle}>
        <i class="fa-regular fa-circle-xmark"></i>
        </span>
        <h2 style={{ margin: "20px" }}>Images</h2>
        <div className="scroll-container" style={scrollContainerStyle}>
          {images.map((image, index) => (
            <img
              key={index}
              src={image}
              alt={`Image ${index + 1}`}
              style={imageStyle}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

const modalStyle = {
  display: "block",
  position: "fixed",
  zIndex: "1",
  left: "0",
  top: "0",
  width: "100%",
  height: "100%",
  overflow: "auto",
  backgroundColor: "rgba(0,0,0,0.4)",
};

const modalContentStyle = {
  backgroundColor: "#fefefe",
  margin: "15% auto",
  padding: "20px",
  border: "1px solid #888",
  width: "80%",
  maxWidth: "500px",
  borderRadius: "10px",
  boxShadow: "0 4px 8px rgba(0,0,0,0.2)",
};

const closeStyle = {
  color: "#aaa",
  float: "right",
  fontSize: "28px",
  fontWeight: "bold",
};

const scrollContainerStyle = {
  backgroundColor: "#333",
  overflowX: "auto",
  whiteSpace: "nowrap",
  padding: "10px",
};

const imageStyle = {
  padding: "10px",
  maxWidth: "100%",
};

export default ImageModal;
