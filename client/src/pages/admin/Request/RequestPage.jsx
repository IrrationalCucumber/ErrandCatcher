import React, { useState, useEffect } from "react";
import Pagination from "../../../components/Pagination";
import RequestModal from "./RequestModal";
import { useLocation } from "react-router-dom";
import axios from "axios";

function RequestPage() {
  // Mock list of verification requests
  const [requests, setRequests] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(5);
  const [selectedRequest, setSelectedRequest] = useState(null);
  const [showModal, setShowModal] = useState(false);
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

  const handleCloseModal = () => {
    setShowModal(false); // Hide modal
  };

  // Get current items
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentRequests = requests.slice(indexOfFirstItem, indexOfLastItem);

  // Change page
  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  return (
    <div>
      <h1 style={{ textAlign: "center", marginBottom: "20px" }}>
        Verification Requests
      </h1>
      <table
        style={{ margin: "0 auto", width: "80%", borderCollapse: "collapse" }}
      >
        <thead>
          <tr>
            <th style={{ ...tableHeaderStyle, width: "25%" }}>ID</th>
            <th style={{ ...tableHeaderStyle, width: "40%" }}>User</th>
            <th style={{ ...tableHeaderStyle, width: "30%" }}>Type</th>
            <th style={{ ...tableHeaderStyle, width: "10%" }}>Status</th>
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
                <button
                  style={buttonStyle}
                  onClick={() => handleClick(request)}
                >
                  View
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
    </div>
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
