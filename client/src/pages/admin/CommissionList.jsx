import React, { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import axios from "axios";
import "./commissionlist.css";
import Pagination from "../../components/Pagination.js";
import Table from "../../components/Table.js";
import Select from "@mui/joy/Select";
import Option from "@mui/joy/Option";
import { DisplayDate } from "../../components/DisplayDate.js";
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
import { PanoramaFishEye, RemoveRedEyeSharp } from "@mui/icons-material";
import EventBusyOutlinedIcon from "@mui/icons-material/EventBusyOutlined";

const CommissionList = () => {
  const [commissions, setCommissions] = useState([]);
  const [searchTerm, setSearchTerm] = useState({
    term: "",
    type: "",
    status: "",
  });
  const location = useLocation();
  const userID = location.pathname.split("/")[2];

  //current page state --Ash
  const [currentPage, setCurrentPage] = useState(1);

  //Pagination --Ash
  //display data per page
  const [itemsPerPage] = useState(10);

  //handle error
  //rretrieve data
  useEffect(() => {
    const fetchAllCommission = async () => {
      try {
        const res = await axios.get("http://localhost:8800/errands");
        //"http://localhost:8800/commission" - local computer
        //"http://192.168.1.47:8800/commission" - netwrok
        setCommissions(res.data);
      } catch (err) {
        console.log(err);
      }
    };
    fetchAllCommission();
  }, []);

  //funtion to delete commission
  const handleDelete = async (commissionID) => {
    try {
      //"http://localhost:8800/commission" - local computer
      //"http://192.168.1.47:8800/commission" - netwrok
      await axios.delete(`http://localhost:8800/commission/${commissionID}`);
      window.location.reload();
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
      ?.toLowerCase()
      .includes(searchTerm.type.toLowerCase() ?? "");
    const termMatch = commission.commissionTitle
      ?.toLowerCase()
      .includes(searchTerm.term.toLowerCase() ?? "");
    const termMatch2 = commission.userFirstname
      ?.toLowerCase()
      .includes(searchTerm.term.toLowerCase() ?? "");
    const termMatch3 = commission.userLastname
      ?.toLowerCase()
      .includes(searchTerm.term.toLowerCase() ?? "");
    const status = commission.commissionStatus.includes(searchTerm.status);

    return type && (termMatch || termMatch2 || termMatch3) && status;
  });

  //Logic of Pagination
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = filterErrands.slice(indexOfFirstItem, indexOfLastItem);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  //need front end
  return (
    <div>
      <div className="commissions">
        <h1
          style={{
            marginTop: "10px",
            marginBottom: "10px",
            fontFamily:
              "'Lucida Sans', 'Lucida Sans Regular', 'Lucida Grande', 'Lucida Sans Unicode', Geneva, Verdana, sans-serif",
          }}
        >
          Errand List
        </h1>
        <div
          className="searchAdmin"
        // style={{
        //   marginTop: "10px",
        //   marginBottom: "10px",
        //   display: "flex",
        //   alignItems: "center",
        //   width: "50%",
        // }}
        >
          <input
            className="inputSearchAdmin"
            type="text"
            name="term"
            placeholder="Search..."
            value={searchTerm.term}
            onChange={handleChange}
          // style={{
          //   padding: "8px",
          //   fontSize: "12px",
          //   border: "1px solid #ccc",
          //   borderRadius: "4px",
          //   margin: "10px 0px 10px 0px",
          // }}
          />

          <div
            className="filter__admin__accountList"
            style={{ display: "flex", alignItems: "center", width: "60%" }}
          >
            <select
              className="CLstatus"
              name="status"
              onChange={handleChange}
              value={searchTerm.status}
            // style={{
            //   padding: "8px",
            //   fontSize: "12px",
            //   border: "1px solid #ccc",
            //   borderRadius: "4px",
            //   margin: "10px 20px",
            // }}
            >
              <option value="">Status</option>
              <option value="Pending">Pending</option>
              <option value="Completed">Completed</option>
              <option value="Cancelled">Cancelled</option>
              <option value="Expired">Expired</option>
              <option value="Caught">Caught</option>
              <option value="Available">Available</option>
            </select>
            <select
              className="CLtype"
              onChange={handleChange}
              value={searchTerm.type}
              name="type"
            // style={{
            //   padding: "8px 10px 8px 10px",
            //   fontSize: "12px",
            //   border: "1px solid #ccc",
            //   borderRadius: "4px",
            //   margin: "10px",
            // }}
            >
              <option value="">Type</option>
              <option value="Home">Home</option>
              <option value="Transportation">Transportation</option>
              <option value="Delivery">Delivery</option>
            </select>
          </div>
        </div>

        <Table
          headers={[
            "ID",
            "Title",
            "Employer",
            "Type",
            "Payment",
            "Date Posted",
            "Status",
            "Action",
          ]}
          data={currentItems.map((Commission) => [
            Commission.commissionID,
            Commission.commissionTitle,
            `${Commission.userFirstname} ${Commission.userLastname}`,
            // Commission.commissionType,
            Commission.commissionType === "HomeService - Indoor" ? (
              <>
                <OtherHousesIcon style={{ color: "purple" }} />
                <span> Home Service Indoor</span>
              </>
            ) : Commission.commissionType === "HomeService - Outdoor" ? (
              <>
                <CameraOutdoorIcon style={{ color: "brown" }} />
                <span> Home Service Outdoor</span>
              </>
            ) : Commission.commissionType === "Delivery" ? (
              <>
                <DirectionsCarIcon style={{ color: "darkblue" }} />
                <span> Delivery</span>
              </>
            ) : Commission.commissionType === "Transportation" ? (
              <>
                <LocalShippingIcon style={{ color: "orange" }} />
                <span> Transportation</span>
              </>
            ) : null,
            "Php " + Commission.commissionPay,
            DisplayDate(Commission.DatePosted),
            //Remove transaction complete date due to unable to display if no transaction yet
            // Commission.transDateComplete === null ? (
            //   <EventBusyOutlinedIcon
            //     style={{ color: "#c99f5a", marginLeft: "48px" }}
            //   />
            // ) : (
            //   DisplayDate(Commission.transDateComplete)
            // ),
            // Commission.commissionStatus,
            Commission.commissionStatus === "Pending" ? (
              <>
                <PendingIcon style={{ color: "purple" }} />
                <span> Pending</span>
              </>
            ) : Commission.commissionStatus === "Completed" ? (
              <>
                <CheckCircleIcon style={{ color: "green" }} />
                <span> Completed</span>
              </>
            ) : Commission.commissionStatus === "Canceled" ? (
              <>
                <CancelIcon style={{ color: "orange" }} />
                <span> Canceled</span>
              </>
            ) : Commission.commissionStatus === "Expired" ? (
              <>
                <TimerOffIcon style={{ color: "orange" }} />
                <span> Expired</span>
              </>
            ) : Commission.commissionStatus === "Caught" ? (
              <>
                <HandshakeIcon style={{ color: "green" }} />
                <span> Caught</span>
              </>
            ) : Commission.commissionStatus === "Available" ? (
              <>
                <EventAvailableIcon style={{ color: "darkgreen" }} />
                <span> Available</span>
              </>
            ) : null,
            <>
              {/* <button onClick={() => handleDelete(Commission.commissionID)}>
             
              </button> */}
              <button className="update">
                <Link to={`/errand/view/${Commission.commissionID}`}
                  style={{
                    textDecoration: "none",
                    display: "flex",
                    alignItems: "center",
                    gap: "4px",
                  }}
                >
                  <RemoveRedEyeSharp
                    className="iconSharp"
                    sx={{
                      fontSize: 24,
                      transition: "color 0.3s ease",
                    }}
                  /> View
                </Link>
              </button>
            </>,
          ])}
        />
        {/* Pagination controls */}
        {commissions.length > 0 && (
          <Pagination
            itemsPerPage={itemsPerPage}
            totalItems={commissions.length}
            paginate={paginate}
          />
        )}
      </div>
      {/* onClick={handleAddCommission} logic for the button since this is a link inside a button */}
      {/* <Link to="/post-commission" style={{ textDecoration: "none" }}>
        <button
          style={{
            marginLeft: "20px",
            padding: "8px 12px",
            fontSize: "12px",
            cursor: "pointer",
            border: "none",
            backgroundColor: "#CE9251",
            color: "white",
            borderRadius: "4px",
            display: "inline-block",
            textAlign: "center",
            lineHeight: "1.5",
            fontFamily:
              "'Lucida Sans', 'Lucida Sans Regular', 'Lucida Grande', 'Lucida Sans Unicode', Geneva, Verdana, sans-serif",
          }}
        >
          Add Errand
        </button>
      </Link> */}
    </div>
  );
};

export default CommissionList;
