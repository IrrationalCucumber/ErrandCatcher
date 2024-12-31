import { DialogContent, DialogTitle, ModalClose } from "@mui/joy";

const ImageModal = ({ request, handleClose }) => {
  return (
    <>
      <ModalClose />
      <DialogTitle>{request.id}</DialogTitle>
      <DialogContent>
        <>
          <div style={imageContainerStyle}>
            <h2 style={header}>ID Picture:</h2>
            <h7 style={header}>Front:</h7>
            <img
              src={`http://localhost:8800/images/docu/${request.id_picture_front}`}
              alt={`Image `}
              style={imageStyle}
            />
            <br></br>
            <h7 style={header}>Back:</h7>
            <img
              src={`http://localhost:8800/images/docu/${request.id_picture_back}`}
              alt={`Image `}
              style={imageStyle}
            />
            <br></br>
            <h2 style={header}>Documents:</h2>

            <img
              src={`http://localhost:8800/images/docu/${request.docu_1}`}
              alt={`Image `}
              style={imageStyle}
            />
            <br></br>
            <img
              src={`http://localhost:8800/images/docu/${request.docu_2}`}
              alt={`Image `}
              style={imageStyle}
            />
            <h2 style={header}>Driver License:</h2>
            <h7 style={header}>Front:</h7>
            <img
              src={`http://localhost:8800/images/docu/${request.driversLicense1}`}
              alt={`Image `}
              style={imageStyle}
            />
            <h7 style={header}>Back:</h7>
            <img
              src={`http://localhost:8800/images/docu/${request.driversLicense2}`}
              alt={`Image `}
              style={imageStyle}
            />
          </div>
        </>
      </DialogContent>
    </>
    // <div className="modal" style={modalStyle}>
    //   <div className="modal-content" style={modalContentStyle}>
    //     <span className="close" onClick={handleClose} style={closeStyle}>
    //       &times;
    //     </span>
    //     <h2 style={{ margin: "20px" }}>Images</h2>
    //     <div className="scroll-container" style={scrollContainerStyle}>
    //       <img
    //         src={`http://localhost:8800/images/docu/${request.id_picture_front}`}
    //         alt={`Image `}
    //         style={imageStyle}
    //       />
    //       <img
    //         src={`http://localhost:8800/images/docu/${request.id_picture_back}`}
    //         alt={`Image `}
    //         style={imageStyle}
    //       />
    //     </div>
    //   </div>
    // </div>
  );
};

const header = {
  fontWeight: "700",
  fontSize: "1.80rem",
  color: "#333",
  marginBottom: "10px",
  marginLeft: "16px",
}

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
  cursor: "pointer",
};

const scrollContainerStyle = {
  backgroundColor: "#333",
  overflowX: "auto",
  whiteSpace: "nowrap",
  padding: "10px",
};

const imageContainerStyle = {
  display: "flex",
  flexDirection: "column",
  justifyContent: "center",
  gap: "10px",
  alignItems: "center",
  // flexWrap: "wrap",
};

const imageStyle = {
  padding: "20px",
  margin: "10px",
  maxWidth: "95%",
  borderRadius: "5px",
  border: "1px solid #ccc",
  boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)",
};

export default ImageModal;
