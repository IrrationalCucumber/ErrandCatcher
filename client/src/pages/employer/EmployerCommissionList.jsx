//03-10-24 updated w/ filter
import React, { useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import NavBar from "../../components/Navbar/Navbar.js";
import "./ecommission.css";
import Table from "../../components/Table.js";
import Pagination from "../../components/Pagination.js";
import Button from "@mui/joy/Button";
import ButtonGroup from "@mui/joy/ButtonGroup";
import IconButton from "@mui/joy/IconButton";
import Divider from "@mui/joy/Divider";
import DialogTitle from "@mui/joy/DialogTitle";
import DialogContent from "@mui/joy/DialogContent";
import DialogActions from "@mui/joy/DialogActions";
import Modal from "@mui/joy/Modal";
import ModalDialog from "@mui/joy/ModalDialog";
import DeleteForever from "@mui/icons-material/DeleteForever";
import WarningRoundedIcon from "@mui/icons-material/WarningRounded";
//import Settings from "@mui/icons-material/Settings";
import { useAuth } from "../../components/AuthContext.js";
import { DisplayDate } from "../../components/DisplayDate.js";
import { BannerEmployerPages } from "../../components/Banner/HeroSection.js";

import OtherHousesIcon from "@mui/icons-material/OtherHouses";
import DirectionsCarIcon from "@mui/icons-material/DirectionsCar";
import LocalShippingIcon from "@mui/icons-material/LocalShipping";
import CameraOutdoorIcon from "@mui/icons-material/CameraOutdoor";

import PendingIcon from "@mui/icons-material/Pending";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import CancelIcon from "@mui/icons-material/Cancel";
import TimerOffIcon from "@mui/icons-material/TimerOff";
import HandshakeIcon from "@mui/icons-material/Handshake";
import EventAvailableIcon from "@mui/icons-material/EventAvailable";
import { Add } from "@mui/icons-material";
import ModalFeedback from "../../components/ModalFeedback.js";
import CancelOutlinedIcon from "@mui/icons-material/CancelOutlined";

const CommissionList = () => {
  const [commissions, setCommissions] = useState([]);
  //filter
  const [searchTerm, setSearchTerm] = useState({
    term: "",
    type: "",
    status: "",
  });
  const navigate = useNavigate();
  const { user } = useAuth();
  const userID = user.userID;
  // Pagination
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(10);
  const [open, setOpen] = useState(false); // modal
  const [currentId, setCurrentId] = useState(null);
  const handleOpenModal = (id) => {
    setOpen(true);
    setCurrentId(id); // Set the ID in state
  };
  // Use this ID when confirming the deletion
  const confirmDelete = () => {
    handleDelete(currentId);
    setOpen(false);
  };

  // modal message pop-up
  const [openDel, setOpenDel] = useState(false);
  const handleOpenDel = () => {
    setOpenDel(true);
  };
  const handleCloseDel = () => {
    setOpenDel(false);

  };

  //handle error
  //rretrieve data
  // Frontend code
  const fetchAllCommission = async () => {
    try {
      const response = await axios.get(
        `http://localhost:8800/your-commission/${userID}`
      );
      setCommissions(response.data);
    } catch (err) {
      console.log("Error fetching commissions:", err);
    }
  };
  useEffect(() => {
    fetchAllCommission(); // Initial fetch
    const intervalId = setInterval(fetchAllCommission, 5000); // Fetch every 5 seconds
    // Cleanup function to clear the interval when the component unmounts
    return () => clearInterval(intervalId);
  }, []);

  //funtion to delete commission
  const handleDelete = async (commissionID) => {
    try {
      //"http://localhost:8800/commission" - local computer
      //"http://192.168.1.47:8800/commission" - netwrok
      await axios.delete(`http://localhost:8800/delete-errand/${commissionID}`);

      // popup delete modal
      setTimeout(() => {
        // setLoading(false);
        // modal will pop-up in 1 seconds
        handleOpenDel();
      }, 1000);

      // window.location.reload();
      //alert(commissionID);
    } catch (err) {
      console.log(err);
    }
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

  //filter
  const filterErrands = commissions.filter((commission) => {
    const type = commission.commissionType
      .toLowerCase()
      .includes(searchTerm.type.toLowerCase());
    const termMatch = commission.commissionTitle
      .toLowerCase()
      .includes(searchTerm.term.toLowerCase());
    // const termMatch2 = commission.userFirstname
    //   .toLowerCase()
    //   .includes(searchTerm.term.toLowerCase());
    // const termMatch3 = commission.userLastname
    //   .toLowerCase()
    //   .includes(searchTerm.term.toLowerCase());
    const status = commission.commissionStatus.includes(searchTerm.status);

    return type && termMatch && status;
  });

  // Pagination functions
  const paginate = (pageNumber) => setCurrentPage(pageNumber);
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = filterErrands.slice(indexOfFirstItem, indexOfLastItem);

  //need front end
  return (
    <>
      <ModalFeedback
        open={openDel}
        handleClose={handleCloseDel}
        headerMes="Deleted!"
        contentMes="You have deleted an errand."
        color="error"
        colorText="error"
        icon={CancelOutlinedIcon}
      />


      <div>
        <BannerEmployerPages
          bannerMessage={`These are what you have posted so far, ${user.username.toUpperCase()}`}
        />
        <div className="Commission-page-container">
          <div className="Commission-page">
            <div className="commissions">
              <div className="search-filter">
                <div className="employer__errand__search">
                  <input
                    type="text"
                    placeholder="Search..."
                    value={searchTerm.term}
                    name="term"
                    onChange={handleChange}
                  />
                </div>
                <div className="filter">
                  <select
                    onChange={handleChange}
                    name="status"
                    value={searchTerm.status}
                  >
                    <option value="">All Status</option>
                    <option value="Taken">Pending</option>
                    <option value="Completed">Completed</option>
                    <option value="Cancelled">Cancelled</option>
                    <option value="Available">Available</option>
                    <option value="Expired">Expired</option>
                    <option value="Caught">Caught</option>
                  </select>
                </div>
                <div className="employer__errand_list__add__btn">
                  <Button
                    startDecorator={<Add />}
                    size="lg"
                    variant="solid"
                    onClick={(e) => navigate(`/errand/post-errand`)}
                  >
                    Add Errand
                  </Button>
                </div>
              </div>

              <div className="table-container">
                <Table
                  headers={[
                    "ID",
                    "ERRAND TITLE",
                    "TYPE",
                    "START DATE",
                    "DUE DATE",
                    "STATUS",
                    "ACTION",
                  ]}
                  // update the data here
                  data={currentItems.map((commissionItem) => [
                    commissionItem.commissionID,
                    commissionItem.commissionTitle,
                    // commissionItem.commissionType,
                    commissionItem.commissionType === "HomeService - Indoor" ? (
                      <>
                        <OtherHousesIcon style={{ color: "purple" }} />
                        <span> Home Service Indoor</span>
                      </>
                    ) : commissionItem.commissionType ===
                      "HomeService - Outdoor" ? (
                      <>
                        <CameraOutdoorIcon style={{ color: "brown" }} />
                        <span> Home Service Outdoor</span>
                      </>
                    ) : commissionItem.commissionType === "Delivery" ? (
                      <>
                        <DirectionsCarIcon style={{ color: "darkblue" }} />
                        <span> Delivery</span>
                      </>
                    ) : commissionItem.commissionType === "Transportation" ? (
                      <>
                        <LocalShippingIcon style={{ color: "orange" }} />
                        <span> Transportation</span>
                      </>
                    ) : null,
                    DisplayDate(commissionItem.commissionStartDate),
                    DisplayDate(commissionItem.commissionDeadline),
                    // commissionItem.commissionStatus,
                    commissionItem.commissionStatus === "Pending" ? (
                      <>
                        <PendingIcon style={{ color: "purple" }} />
                        <span> Pending</span>
                      </>
                    ) : commissionItem.commissionStatus === "Completed" ? (
                      <>
                        <CheckCircleIcon style={{ color: "green" }} />
                        <span> Completed</span>
                      </>
                    ) : commissionItem.commissionStatus === "Canceled" ? (
                      <>
                        <CancelIcon style={{ color: "orange" }} />
                        <span> Canceled</span>
                      </>
                    ) : commissionItem.commissionStatus === "Expired" ? (
                      <>
                        <TimerOffIcon style={{ color: "orange" }} />
                        <span> Expired</span>
                      </>
                    ) : commissionItem.commissionStatus === "Caught" ? (
                      <>
                        <HandshakeIcon style={{ color: "green" }} />
                        <span> Caught</span>
                      </>
                    ) : commissionItem.commissionStatus === "Available" ? (
                      <>
                        <EventAvailableIcon style={{ color: "darkgreen" }} />
                        <span> Available</span>
                      </>
                    ) : null,
                    <React.Fragment>
                      <ButtonGroup aria-label="spacing button group">
                        <Button
                          variant="outlined"
                          color="danger"
                          endDecorator={<DeleteForever />}
                          onClick={() =>
                            handleOpenModal(commissionItem.commissionID)
                          }
                        ></Button>
                        <Modal open={open} onClose={() => setOpen(false)}>
                          <ModalDialog variant="outlined" role="alertdialog">
                            <DialogTitle>
                              <WarningRoundedIcon />
                              Confirmation
                            </DialogTitle>
                            <Divider />
                            <DialogContent>
                              Are you sure you want to discard Errand {currentId}{" "}
                              ?{/* Display the current ID from state */}
                            </DialogContent>
                            <DialogActions>
                              <Button
                                variant="solid"
                                color="danger"
                                onClick={confirmDelete}
                              >
                                Delete
                              </Button>
                              <Button
                                variant="plain"
                                color="neutral"
                                onClick={() => setOpen(false)}
                              >
                                Cancel
                              </Button>
                            </DialogActions>
                          </ModalDialog>
                        </Modal>
                        {/* <Button
                    onClick={() => handleDelete(commissionItem.commissionID)}
                    >
                    DELETE
                    </Button> */}
                        <Button>
                          <Link
                            to={`/errand/update/${commissionItem.commissionID}`}
                          >
                            View
                          </Link>
                        </Button>
                      </ButtonGroup>
                    </React.Fragment>,
                  ])}
                />
              </div>
            </div>
          </div>
          {/* Pagination controls */}
          {commissions.length > 0 && (
            <Pagination
              itemsPerPage={itemsPerPage}
              totalItems={commissions.length}
              paginate={paginate}
            />
          )}
        </div>
        {/* <button
        className="add-errand"
        onClick={(e) => navigate(`/errand/post-errand`)}
      >
        Add Errand
      </button> */}
      </div>
    </>
  );
};

export default CommissionList;
