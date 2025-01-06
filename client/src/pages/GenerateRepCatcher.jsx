import React, { useEffect, useState, useRef } from "react";
import { useLocation } from "react-router-dom";
import axios from "axios";
import Table from "../components/Table";
import Pagination from "../components/Pagination";
import { DisplayDate } from "../components/Display/DsiplayFunctions";
import OtherHousesIcon from "@mui/icons-material/OtherHouses";
import DirectionsCarIcon from "@mui/icons-material/DirectionsCar";
import LocalShippingIcon from "@mui/icons-material/LocalShipping";
import CameraOutdoorIcon from "@mui/icons-material/CameraOutdoor";
import SyncAltIcon from "@mui/icons-material/SyncAlt";
import PaymentsIcon from "@mui/icons-material/Payments";
import Filter9PlusOutlinedIcon from "@mui/icons-material/Filter9PlusOutlined";
import { Slider, Box, Typography, TextField } from "@mui/material";
import GeneratePDF from "../components/GeneratePDF";
import { useAuth } from "../components/AuthContext";
import NavbarPage from "../components/Navbar/NavBarPage";

const GenerateRepCatcher = () => {
    const [invoices, setInvoices] = useState([]);
    const [totalinvoices, settotalInvoices] = useState({});
    const [searchTerm, setSearchTerm] = useState({
        term: "",
        type: "",
        status: "",
        minPay: "",
        maxPay: "",
        date: "",
        month: "",
        year: "",
    });
    const location = useLocation();
    // const userID = location.pathname.split("/")[2];
    const { user } = useAuth();
    const userID = user.userID;

    //current page state --Ash
    const [currentPage, setCurrentPage] = useState(1);

    //Pagination --Ash
    //display data per page
    const [itemsPerPage] = useState(10);

    const contentRef = useRef();



    useEffect(() => {
        const fetchAllInvoice = async () => {
            try {
                // all-invoice
                // const res = await axios.get("http://localhost:8800/all-transcat/" + userID);
                //"http://localhost:8800/commission" - local computer
                //"http://192.168.1.47:8800/commission" - netwrok
                const res = await axios.get(`http://localhost:8800/all-transcat/${userID}`);
                setInvoices(res.data);
                console.log(invoices, "all invoice", userID);
            } catch (err) {
                console.log(err);
            }
        };
        fetchAllInvoice();
    }, []);




    // /all-invoice-catcher/:id
    useEffect(() => {
        const fetchTotalInvoice = async () => {
            try {
                // all-invoice
                const res = await axios.get("http://localhost:8800/all-invoice-catcher/" + userID);
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

    // const [month, setMonth] = useState('January');
    // const [year, setYear] = useState(new Date().getFullYear());
    const [totalInvoice, setTotalInvoice] = useState(0);

    const handleSliderChange = (event, newValue) => {
        setSearchTerm((prev) => ({
            ...prev,
            minPay: newValue[0],
            maxPay: newValue[1],
        }));
    };

    // DisplayDate(Invoice.paid),

    // Filter invoices based on month and year
    const filterInvoices = invoices.filter((invoice) => {
        const invoiceDate = new Date(invoice.paid); //.date
        // const invoiceMonth = invoiceDate.toLocaleString('default', { month: 'long' });
        // const invoiceMonth = new Date(invoice.paid).toLocaleString('default', { month: 'long' });
        // const invoiceMonth = new Date(invoice.paid).toLocaleString('default', { month: 'long', timeZone: 'UTC' });
        const invoiceMonth = new Date(invoice.paid).toLocaleString('default', { month: 'long', timeZone: 'Asia/Manila' });

        const invoiceYear = invoiceDate.getFullYear();

        const monthMatch = invoiceMonth === searchTerm.month;
        const yearMatch = invoiceYear === parseInt(searchTerm.year);

        return monthMatch && yearMatch;
    });



    useEffect(() => {
        // Calculate the total invoice amount based on the filtered invoices
        const total = filterInvoices.reduce((acc, invoice) => acc + invoice.total, 0);
        setTotalInvoice(total);
    }, [searchTerm.month, searchTerm.year, invoices]);

    //filter
    const filterErrands = invoices.filter((invoice) => {
        const type = invoice.type
            ?.toLowerCase()
            .includes(searchTerm.type.toLowerCase() ?? "");
        const termMatch = invoice.description
            ?.toLowerCase()
            .includes(searchTerm.term.toLowerCase() ?? "");
        const termMatch2 = invoice.paid
            ?.toLowerCase()
            .includes(searchTerm.term.toLowerCase() ?? "");

        const employerFullName =
            `${invoice.employerFirstName} ${invoice.employerLastName}`
                .toLowerCase();
        const catcherFullName =
            `${invoice.catcherFirstName} ${invoice.catcherLastName}`
                .toLowerCase();

        const termMatchFullName = employerFullName.includes(searchTerm.term.toLowerCase() ?? "") ||
            catcherFullName.includes(searchTerm.term.toLowerCase() ?? "");


        let searchDate = true;
        if (searchTerm.date) {
            const selectedDate = new Date(searchTerm.date).toDateString();
            const invoiceDate = new Date(invoice.paid).toDateString();
            searchDate = selectedDate === invoiceDate;
        }

        let searchMonth = true;
        if (searchTerm.month) {
            const selectedMonth = searchTerm.month;
            const invoiceMonth = new Date(invoice.paid).toLocaleString('default', { month: 'long', timeZone: 'Asia/Manila' });

            searchMonth = selectedMonth === invoiceMonth;
        }


        let searchYear = true;
        if (searchTerm.year) {
            const selectedYear = parseInt(searchTerm.year);
            const invoiceYear = new Date(invoice.paid).getFullYear();
            searchYear = selectedYear === invoiceYear;
        }

        let priceMatches = true;
        if (searchTerm.minPay !== "" && searchTerm.maxPay !== "") {
            const total = invoice.total / 100;
            const minPay = parseFloat(searchTerm.minPay);
            const maxPay = parseFloat(searchTerm.maxPay);

            priceMatches = total >= minPay && total <= maxPay;
        }

        return (termMatch || termMatch2 || termMatchFullName)
            && type && priceMatches && searchDate && (searchMonth && searchYear);
    });

    // convert to centavo
    const amountInCents = (invoices.total / 100).toFixed(2);
    const amountInCentsTotal = (totalinvoices.t / 100).toFixed(2);

    //Logic of Pagination
    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentItems = filterErrands.slice(indexOfFirstItem, indexOfLastItem);

    const paginate = (pageNumber) => setCurrentPage(pageNumber);

    return (
        <>
            <div ref={contentRef}>
                <NavbarPage />
                <div className="commissions">
                    <div style={{ display: "flex", justifyContent: "center", marginTop: "4px", gap: "20px", alignItems: "stretch", }}>
                        <div class="col-md-4 col-xl-3 mb-3">
                            <div class="card bg-c-blue order-card text-center" style={{ height: "200px" }}>
                                <div class="card-block">
                                    <h3 class="m-b-20 fw-semibold">
                                        <PaymentsIcon sx={{ color: "white", fontSize: 24 }} /> Generate Report Catcher
                                    </h3>
                                    <h2 class="text-center">
                                        <i class="fa fa-cart-plus f-left"></i>
                                        <span>₱{amountInCentsTotal ? amountInCentsTotal : 0}</span>
                                    </h2>
                                    <p class="m-b-0">Total invoice trasaction</p>
                                </div>
                            </div>
                        </div>

                        <div class="col-md-4 col-xl-3 mb-3">
                            <div class="card bg-c-green order-card text-center" style={{ height: "200px" }}>
                                {/* <div class="card bg-c-yellow order-card text-center"> */}
                                <div class="card-block">
                                    <h3 class="m-b-20 fw-semibold">
                                        <Filter9PlusOutlinedIcon sx={{ color: "white", fontSize: 24 }} /> Payment range
                                    </h3>
                                    <h2 class="text-center">
                                        <Box sx={{ display: "flex", alignItems: "center", gap: 2, marginTop: 2 }}>
                                            <TextField
                                                label="Minimum"
                                                type="number"
                                                name="minPay"
                                                value={searchTerm.minPay}
                                                onChange={handleChange}
                                                variant="outlined"
                                                size="small"
                                                sx={{
                                                    width: 120,
                                                    fontWeight: 1000,
                                                    "& .MuiOutlinedInput-root": {
                                                        "& fieldset": {
                                                            borderColor: "white",
                                                        },
                                                        "&:hover fieldset": {
                                                            borderColor: "white",
                                                        },
                                                        "&.Mui-focused fieldset": {
                                                            borderColor: "white",
                                                        },
                                                        color: "white",
                                                    },
                                                    "& .MuiInputLabel-root": {
                                                        color: "white",
                                                        fontWeight: 670,
                                                    },
                                                    "& .MuiInputLabel-root.Mui-focused": {
                                                        color: "white",
                                                        fontWeight: 670,

                                                    },
                                                }}
                                            />
                                            <SyncAltIcon sx={{ color: "#1679ABs", fontSize: 24 }} />
                                            <TextField
                                                label="Maximum"
                                                type="number"
                                                name="maxPay"
                                                value={searchTerm.maxPay}
                                                onChange={handleChange}
                                                variant="outlined"
                                                size="small"
                                                sx={{
                                                    width: 120,
                                                    "& .MuiOutlinedInput-root": {
                                                        "& fieldset": {
                                                            borderColor: "white",
                                                        },
                                                        "&:hover fieldset": {
                                                            borderColor: "white",
                                                        },
                                                        "&.Mui-focused fieldset": {
                                                            borderColor: "white",
                                                        },
                                                        color: "white",
                                                    },
                                                    "& .MuiInputLabel-root": {
                                                        color: "white",
                                                        fontWeight: 670,
                                                    },
                                                    "& .MuiInputLabel-root.Mui-focused": {
                                                        color: "white",
                                                        fontWeight: 670,

                                                    },
                                                }}
                                            />
                                        </Box>
                                        <Slider
                                            value={[
                                                Number(searchTerm.minPay),
                                                Number(searchTerm.maxPay)
                                            ]}
                                            onChange={handleSliderChange}
                                            // valueLabelDisplay="on"
                                            min={500}
                                            max={10000}
                                            // max={searchTerm.maxPay}
                                            // step={100}
                                            sx={{ marginTop: 2, color: "white" }}
                                        />

                                    </h2>
                                    {/* <p class="m-b-0">Total invoice trasaction</p> */}
                                </div>
                            </div>
                        </div>




                        {/* Generate Report Within This Month */}
                        <div class="col-md-4 col-xl-3 mb-3">
                            <div class="card bg-c-blue order-card text-center" style={{ height: "400px" }}>
                                <div class="card-block">
                                    <h3 class="m-b-20 fw-semibold">
                                        <PaymentsIcon sx={{ color: "white", fontSize: 24 }} /> Generate Report Within This Month
                                    </h3>
                                    <div class="dropdown">
                                        <label
                                            for="month"
                                            style={{
                                                color: "white",
                                                fontSize: "1rem",
                                                fontWeight: "500",
                                            }}>
                                            Month:
                                        </label>
                                        <select
                                            id="month"
                                            name="month"
                                            value={searchTerm.month}
                                            onChange={(e) => setSearchTerm((prev) => ({ ...prev, month: e.target.value }))}
                                        >
                                            <option value="">Select Month</option>
                                            <option value="January">January</option>
                                            <option value="February">February</option>
                                            <option value="March">March</option>
                                            <option value="April">April</option>
                                            <option value="May">May</option>
                                            <option value="June">June</option>
                                            <option value="July">July</option>
                                            <option value="August">August</option>
                                            <option value="September">September</option>
                                            <option value="October">October</option>
                                            <option value="November">November</option>
                                            <option value="December">December</option>
                                        </select>
                                    </div>
                                    <div class="dropdown">
                                        <label
                                            for="year"
                                            style={{
                                                color: "white",
                                                fontSize: "1rem",
                                                fontWeight: "500",
                                            }}
                                        >
                                            Year:
                                        </label>
                                        <select
                                            id="year"
                                            name="year"
                                            value={searchTerm.year} // Updated to use searchTerm.year
                                            onChange={(e) => setSearchTerm((prev) => ({ ...prev, year: e.target.value }))}
                                        >
                                            <option value="">Select Year</option>
                                            {Array.from(new Array(10), (v, i) => (
                                                <option key={i} value={new Date().getFullYear() - i}>
                                                    {new Date().getFullYear() - i}
                                                </option>
                                            ))}
                                        </select>
                                    </div>
                                    <h2 class="text-center">
                                        <i class="fa fa-cart-plus f-left"></i>
                                        <span>
                                            ₱{(totalInvoice / 100).toFixed(2)}
                                        </span>
                                    </h2>
                                    <p class="m-b-0">Total invoice transaction within this month</p>
                                </div>
                            </div>
                        </div>
                    </div>
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

                        <input
                            style={{
                                padding: "8px 10px 8px 10px",
                                fontSize: "12px",
                                border: "1px solid #ccc",
                                borderRadius: "4px",
                                margin: "10px",
                            }}
                            type="date"
                            name="date"
                            onChange={handleChange}
                            placeholder="Select deadline date..."
                        />

                    </div>

                    <Table
                        headers={[
                            "Invoice ID",
                            "Employer Full Name",
                            "Catcher Full Name",
                            "Errand Title",
                            "Errand Type",
                            "Paid Date",
                            "Total Payment",
                        ]}
                        data={currentItems.map((Invoice) => [
                            Invoice.invoiceID,
                            `${Invoice.employerFirstName} ${Invoice.employerLastName}`,
                            `${Invoice.catcherFirstName} ${Invoice.catcherLastName}`,
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
                            // date paid
                            DisplayDate(Invoice.paid),
                            "Php " + (Invoice.total / 100).toFixed(2),
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

                <GeneratePDF
                    contentRef={contentRef}
                    buttonLabel="Generate PDF"
                />

            </div>
        </>
    );
};

export default GenerateRepCatcher;
