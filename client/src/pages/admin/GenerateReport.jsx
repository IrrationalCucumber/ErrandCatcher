import React, { useEffect, useState } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import axios from "axios";
import Table from "../../components/Table.js";
import Pagination from "../../components/Pagination.js";
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

const GenerateReport = () => {
    const [commissions, setCommissions] = useState([]);
    const [invoices, setInvoices] = useState([]);
    const [totalinvoices, settotalInvoices] = useState({});
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

    useEffect(() => {
        const fetchAllInvoice = async () => {
            try {
                // all-invoice
                const res = await axios.get("http://localhost:8800/all-invoice");
                //"http://localhost:8800/commission" - local computer
                //"http://192.168.1.47:8800/commission" - netwrok
                setInvoices(res.data);
                console.log(invoices)
            } catch (err) {
                console.log(err);
            }
        };
        fetchAllInvoice();
    }, []);


    useEffect(() => {
        const fetchTotalInvoice = async () => {
            try {
                // all-invoice
                const res = await axios.get("http://localhost:8800/total-earnings");
                //"http://localhost:8800/commission" - local computer
                //"http://192.168.1.47:8800/commission" - netwrok
                settotalInvoices(res.data);
                console.log(totalinvoices, "total sum");
            } catch (err) {
                console.log(err);
            }
        };
        fetchTotalInvoice();
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
    const currentItems = invoices.slice(indexOfFirstItem, indexOfLastItem);

    const paginate = (pageNumber) => setCurrentPage(pageNumber);
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
                    Generate Report
                </h1>
                <h1>
                    Total Invoice: {totalinvoices.t ? totalinvoices.t : 0}
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
                        "Invoice ID",
                        "Description",
                        "Errand Type",
                        "Paid Date",
                        "Total Payment",
                    ]}
                    data={currentItems.map((Invoice) => [
                        Invoice.invoiceID,
                        Invoice.description,
                        // `${Invoice.userFirstname} ${Invoice.userLastname}`,
                        // Invoice.commissionType,
                        Invoice.type === "HomeService - Indoor" ? (
                            <>
                                <OtherHousesIcon style={{ color: "purple" }} />
                                <span> Home Service Indoor</span>
                            </>
                        ) : Invoice.type === "HomeService - Outdoor" ? (
                            <>
                                <CameraOutdoorIcon style={{ color: "brown" }} />
                                <span> Home Service Outdoor</span>
                            </>
                        ) : Invoice.type === "Delivery" ? (
                            <>
                                <DirectionsCarIcon style={{ color: "darkblue" }} />
                                <span> Delivery</span>
                            </>
                        ) : Invoice.type === "Transportation" ? (
                            <>
                                <LocalShippingIcon style={{ color: "orange" }} />
                                <span> Transportation</span>
                            </>
                        ) : null,
                        DisplayDate(Invoice.paid),
                        "Php " + Invoice.total,
                    ])}
                />
                {/* Pagination controls */}
                {invoices.length > 0 && (
                    <Pagination
                        itemsPerPage={itemsPerPage}
                        totalItems={invoices.length}
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

export default GenerateReport;
