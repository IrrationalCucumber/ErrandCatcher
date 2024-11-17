import React, { useState, useEffect } from "react";
import Pagination from "../../../components/Pagination";
import RequestModal from "./RequestModal";
import { useLocation } from "react-router-dom";
import axios from "axios";
import RequestImages from "./RequestImage";
import "../Request/request.css";
import { Modal, ModalDialog } from "@mui/joy";
import VerifiedIcon from '@mui/icons-material/Verified';
import PendingIcon from '@mui/icons-material/Pending';
import ManageAccountsIcon from '@mui/icons-material/ManageAccounts';
import HailIcon from '@mui/icons-material/Hail';
import AssignmentIndIcon from '@mui/icons-material/AssignmentInd';

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
  const [searchTerm, setSearchTerm] = useState({
    term: "",
    type: "",
    status: "",
  });

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

  const handleChange = (e) => {
    // For the 'gender' field, directly set the value without using spread syntax
    if (e.target.name === "status") {
      setSearchTerm((prev) => ({ ...prev, status: e.target.value }));
    } else if (e.target.name === "type") {
      setSearchTerm((prev) => ({ ...prev, type: e.target.value }));
    } else {
      // For other fields, use spread syntax as before
      setSearchTerm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
    }
  };

  const filterAccounts = requests.filter((request) => {
    const type = request.accountType
      ?.toLowerCase()
      .includes(searchTerm.type.toLowerCase() ?? "");
    const termMatch = request.username
      ?.toLowerCase()
      .includes(searchTerm.term.toLowerCase() ?? "");
    const termMatch2 = request.userEmail
      ?.toLowerCase()
      .includes(searchTerm.term.toLowerCase() ?? "");
    const status = request.requestStatus.includes(searchTerm.status);

    return type && (termMatch || termMatch2) && status;
  });

  // Get current items
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentRequests = filterAccounts.slice(
    indexOfFirstItem,
    indexOfLastItem
  );

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
        <div
          className="searchReqAdmin"
          // style={{
          //   paddingLeft: "120px",
          //   marginBottom: "10px",
          //   display: "flex",
          //   alignItems: "center",
          //   width: "60%",
          // }}
        >
          <input
            type="text"
            name="term"
            placeholder="Search..."
            value={searchTerm.term}
            onChange={handleChange}
            style={{
              padding: "8px",
              fontSize: "12px",
              border: "1px solid #ccc",
              borderRadius: "4px",
              marginRight: "10px",
              marginBottom: "10px",
              maxWidth: "450px",
              // margin: "0 auto"
            }}
          />

          <select
            className="ALtype"
            name="type"
            onChange={handleChange}
            value={searchTerm.type}
            style={{
              padding: "8px",
              fontSize: "12px",
              border: "1px solid #ccc",
              borderRadius: "4px",
              marginRight: "10px",
              marginBottom: "10px",
              width: "150px",
            }}
          >
            <option value="">Type</option>
            <option value="Employer">Employer</option>
            <option value="Catcher">Catcher</option>
            <option value="admin">Admin</option>
          </select>

          <select
            className="ALstatus"
            name="status"
            onChange={handleChange}
            value={searchTerm.status}
            style={{
              padding: "8px",
              fontSize: "12px",
              border: "1px solid #ccc",
              borderRadius: "4px",
              marginRight: "10px",
              marginBottom: "10px",
              width: "150px",
            }}
          >
            <option value="">Status</option>
            <option value="Complete">Complete</option>
            <option value="Pending">Pending</option>
            {/* <option value="Suspended">Suspended</option> */}
          </select>
        </div>
        <div style={{ overflow: "auto" }}>
          <table
            style={{ margin: "0 auto", width: "80%", borderCollapse: "collapse" }}
          >
            <thead>
              <tr style={{ background: "#1679AB" }}>
                <th style={{ ...tableHeaderStyle, width: "10%" }}>ID</th>
                <th style={{ ...tableHeaderStyle, width: "30%" }}>User</th>
                <th style={{ ...tableHeaderStyle, width: "25%" }}>Type</th>
                <th style={{ ...tableHeaderStyle, width: "10%", textAlign: "center" }}>Status</th>
                <th style={{ ...tableHeaderStyle, width: "20%", textAlign: "center" }}>Documents</th>
                <th style={{ ...tableHeaderStyle, width: "25%", textAlign: "center" }}>Action</th>
              </tr>
            </thead>
            <tbody>
              {currentRequests.map((request) => (
                <tr key={request.id} style={tableRowStyle} className="tableRow">
                  <td style={tableCellStyle}>{request.userID}</td>
                  <td style={tableCellStyle}>{request.username}</td>
                  {/* <td style={tableCellStyle}>{request.accountType}</td> */}
                  <td style={tableCellStyle}>
                    {request.accountType === "Employer" ? (
                      <HailIcon
                        color="success"
                        sx={{
                          paddingRight: "2px",
                          fontSize: "large",
                        }}
                      />
                    ) : request.accountType === "Catcher" ? (
                      <AssignmentIndIcon
                        color="purple"
                        sx={{
                          paddingRight: "2px",
                          fontSize: "large",
                        }}
                      />
                    ) : request.accountType === "Admin" ? (
                      <ManageAccountsIcon
                        color="primary"
                        sx={{
                          paddingRight: "2px",
                          fontSize: "large",
                        }}
                      />
                    ) : null}
                    {request.accountType}
                  </td>
                  {/* <td style={tableCellStyle}>{request.requestStatus}</td> */}
                  <td style={tableCellStyle}>
                    {request.requestStatus === "Complete" ?
                      <VerifiedIcon color="success"
                        sx={{
                          paddingRight: "2px",
                          fontSize: "large",
                        }} /> :
                      <PendingIcon color="error"
                        sx={{
                          paddingRight: "2px",
                          fontSize: "large",
                        }} />}
                    {request.requestStatus}
                  </td>
                  <td style={{ tableCellStyle, textAlign: "center" }}>
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
                      style={buttonStyleac}
                      onClick={() => handleClick(request)}
                    >
                      Action
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
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
  // backgroundColor: "#f2f2f2",
  backgroundColor: "#1679AB",
  padding: "10px",
  textAlign: "left",
  fontSize: "12px",
  color: "white",
  textAlign: "center",
};

const tableCellStyle = {
  padding: "10px",
  borderBottom: "1px solid #ddd",
  fontSize: "12px",
  color: "black",
  border: "1px solid #ddd"
};

const tableRowStyle = {
  ":hover": {
    backgroundColor: "#f2f2f2",
  },
  borderBottom: "1px solid #ddd",
};

const buttonStyle = {
  backgroundColor: "#ded5c6",
  // backgroundColor: "#4CAF50",
  border: "none",
  color: "black",
  padding: "8px 20px",
  textAlign: "center",
  textDecoration: "none",
  display: "inline-block",
  fontSize: "12px",
  margin: "4px 2px",
  cursor: "pointer",
  borderRadius: "5px",
};

const buttonStyleac = {
  backgroundColor: "#378ce7",
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
