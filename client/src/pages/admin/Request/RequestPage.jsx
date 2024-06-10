import React, { useState, useEffect } from "react";
import Pagination from "../../../components/Pagination";
import RequestModal from "./RequestModal";
import { useLocation } from "react-router-dom";
import axios from "axios";
import RequestImages from "./RequestImage";
import "../Request/request.css";
import { Modal, ModalDialog } from "@mui/joy";

function RequestPage() {
  // Mock list of verification requests
  const [requests, setRequests] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(5);
  const [selectedRequest, setSelectedRequest] = useState(null);
  const [selectedImages, setSelectedImages] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [showImageModal, setShowImageModal] = useState(false);
  const location = useLocation();
  const userID = location.pathname.split("/")[2];

  useEffect(() => {
    // Simulate fetching data (you can replace this with actual API calls)
    const fetchData = async () => {
      try {
        const res = await axios.get(`http://localhost:8800/requests`);
        setRequests(res.data);
      } catch (err) {
        console.log(err);
      }
    };

    fetchData();
  }, []);

  const handleClick = (request) => {
    setSelectedRequest(request); // Set selected request
    setShowModal(true); // Show modal
  };

  // Function to handle click on RequestImage button
  const handleImageButtonClick = (requestImages) => {
    setSelectedImages(requestImages);
    setShowImageModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false); // Hide modal
  };

  // Function to close image modal
  const handleCloseImageModal = () => {
    setShowImageModal(false);
  };

  // Get current items
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentRequests = requests.slice(indexOfFirstItem, indexOfLastItem);

  // Change page
  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  //request image modal
  const [layout, setLayout] = useState(undefined);
  const handleOpenModal = (request) => {
    setLayout("fullscreen");
    setSelectedImages(request);
  };

  return (
    <>
      <div className="containerReq">
        <h1 style={{ textAlign: "center", marginBottom: "20px" }}>
          Verification Requests
        </h1>
        <table
          style={{ margin: "0 auto", width: "80%", borderCollapse: "collapse" }}
        >
          <thead>
            <tr>
              <th style={{ ...tableHeaderStyle, width: "10%" }}>ID</th>
              <th style={{ ...tableHeaderStyle, width: "30%" }}>User</th>
              <th style={{ ...tableHeaderStyle, width: "25%" }}>Type</th>
              <th style={{ ...tableHeaderStyle, width: "10%" }}>Status</th>
              <th style={{ ...tableHeaderStyle, width: "20%" }}>DOCUMENTS</th>
              <th style={{ ...tableHeaderStyle, width: "25%" }}>Action</th>
            </tr>
          </thead>
          <tbody>
            {requests.map((request) => (
              <tr key={request.id} style={tableRowStyle}>
                <td style={tableCellStyle}>{request.userID}</td>
                <td style={tableCellStyle}>{request.username}</td>
                <td style={tableCellStyle}>{request.accountType}</td>
                <td style={tableCellStyle}>{request.requestStatus}</td>
                <td style={tableCellStyle}>
                  {/* for Image request */}
                  <button
                    className="RequestImage"
                    style={buttonStyle}
                    onClick={() => handleOpenModal(request)}
                  >
                    View
                  </button>
                </td>
                <td style={tableCellStyle}>
                  <button
                    style={buttonStyle}
                    onClick={() => handleClick(request)}
                  >
                    Action
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        <Pagination
          itemsPerPage={itemsPerPage}
          totalItems={requests.length}
          paginate={paginate}
        />
        {showModal && (
          <RequestModal
            request={selectedRequest}
            handleClose={handleCloseModal}
          />
        )}
        {showImageModal && (
          <RequestImages
            request={selectedImages}
            handleClose={handleCloseImageModal}
          />
        )}
      </div>
      <Modal open={!!layout} onClose={() => setLayout(undefined)}>
        <ModalDialog layout={layout}>
          <RequestImages request={selectedImages} />
        </ModalDialog>
      </Modal>
    </>
  );
}

const tableHeaderStyle = {
  backgroundColor: "#f2f2f2",
  padding: "10px",
  textAlign: "left",
  fontSize: "12px",
};

const tableCellStyle = {
  padding: "10px",
  borderBottom: "1px solid #ddd",
  fontSize: "12px",
};

const tableRowStyle = {
  ":hover": {
    backgroundColor: "#f2f2f2",
  },
};

const buttonStyle = {
  backgroundColor: "#4CAF50",
  border: "none",
  color: "white",
  padding: "8px 20px",
  textAlign: "center",
  textDecoration: "none",
  display: "inline-block",
  fontSize: "12px",
  margin: "4px 2px",
  cursor: "pointer",
  borderRadius: "5px",
};

export default RequestPage;
