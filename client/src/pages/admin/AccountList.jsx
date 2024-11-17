//updated
import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import "./accountlist.css";
import Pagination from "../../components/Pagination";
import Table from "../../components/Table";
import { useAuth } from "../../components/AuthContext";
import { DisplayDate } from "../../components/DisplayDate";
// ui components
import Dropdown from "@mui/joy/Dropdown";
import Menu from "@mui/joy/Menu";
import MenuButton from "@mui/joy/MenuButton";
import MenuItem from "@mui/joy/MenuItem";
import Modal from "@mui/joy/Modal";
import ModalClose from "@mui/joy/ModalClose";
import ModalDialog from "@mui/joy/ModalDialog";
import DialogTitle from "@mui/joy/DialogTitle";
import DialogContent from "@mui/joy/DialogContent";
import VerifiedUserIcon from "@mui/icons-material/VerifiedUser";
import ErrorIcon from "@mui/icons-material/Error";
import CancelIcon from "@mui/icons-material/Cancel";
import ManageAccountsIcon from "@mui/icons-material/ManageAccounts";
import HailIcon from "@mui/icons-material/Hail";
import AssignmentIndIcon from "@mui/icons-material/AssignmentInd";
import ViewProfile from "../profile/ViewProfile";

const AccountList = () => {
  const [accounts, setAccounts] = useState([]);
  const [searchTerm, setSearchTerm] = useState({
    term: "",
    type: "",
    status: "",
  });
  // const { user } = useAuth();
  // const userID = user.userID;
  const navigate = useNavigate();
  const [showProfileModal, setShowProfileModal] = useState(false);
  const [currentId, setCurrentId] = useState(null);
  const handleOpenModal = (id) => {
    setShowProfileModal(true);
    setCurrentId(id); // Set the ID in state
  };

  //pagination --Ash
  const [currentPage, setCurrentPage] = useState(1);
  //Pagination --Ash
  //display data per page
  const [itemsPerPage] = useState(10);
  //useEffect to handle error
  useEffect(() => {
    const fetchAllAccount = async () => {
      try {
        const res = await axios.get("http://localhost:8800/users");
        //http://localhost:8800/user - local
        //http://192.168.1.47:8800/user - network
        setAccounts(res.data);
        //console.log(res.data);
      } catch (err) {
        console.log(err);
      }
    };
    fetchAllAccount();
  }, []);
  //view user details
  const [account, setAccount] = useState({
    username: "",
    password: "",
    lname: "",
    fname: "",
    gender: "",
    email: "",
    contact: "",
    age: "",
    bday: "",
    address: "",
    desc: "",
    profileImage: "",
    dateC: "",
    status: "",
  });
  //pre-fill the fields
  useEffect(() => {
    const fetchAccount = async () => {
      try {
        const res = await axios.get(`http://localhost:8800/user/${currentId}`);
        const retrievedAccount = res.data[0];
        // Update the state with retrieved account data
        setAccount({
          username: retrievedAccount.username,
          password: retrievedAccount.password,
          lname: retrievedAccount.userLastname,
          fname: retrievedAccount.userFirstname,
          gender: retrievedAccount.userGender,
          email: retrievedAccount.userEmail,
          contact: retrievedAccount.userContactNum,
          age: retrievedAccount.userAge,
          bday: DisplayDate(retrievedAccount.userBirthday),
          address: retrievedAccount.userAddress,
          desc: retrievedAccount.userDesc,
          profileImage: retrievedAccount.profileImage,
          dateC: DisplayDate(retrievedAccount.dateCreated),
          status: retrievedAccount.accountStatus,
        });
      } catch (err) {
        console.log(err);
      }
    };
    fetchAccount();
  }, [currentId]);
  //get the rating of the user
  const [rating, setRating] = useState("0");
  useEffect(() => {
    const fetchRating = async () => {
      try {
        const res = await axios.get(
          `http://localhost:8800/user-rating/${currentId}`
        );
        if (!!res.data) {
          setRating(res.data[0].c);
        }
      } catch (err) {
        console.log(err);
      }
    };
    fetchRating();
  }, [currentId]);

  //FOR NOTIFICATION
  //set variables for notification
  const [notif, setNotif] = useState({
    userID: "", //this is the employer/ userID of the commission
    notificationType: "", //notif description
    notifDesc: "", //contents of the notif
    notifDate: "", //time and date notif is added
  });
  //get current time and date for notif
  const getTimeAndDate = () => {
    const currentDate = new Date();
    // Get the date components
    const year = currentDate.getFullYear();
    const month = String(currentDate.getMonth() + 1).padStart(2, "0"); // Months are zero-based
    const day = String(currentDate.getDate()).padStart(2, "0");
    // Get the time components
    const hours = String(currentDate.getHours()).padStart(2, "0");
    const minutes = String(currentDate.getMinutes()).padStart(2, "0");
    const seconds = String(currentDate.getSeconds()).padStart(2, "0");

    // Create a string representing the current date and time
    return `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;
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
  const filterAccounts = accounts.filter((account) => {
    const type = account.accountType
      ?.toLowerCase()
      .includes(searchTerm.type.toLowerCase() ?? "");
    const termMatch = account.username
      ?.toLowerCase()
      .includes(searchTerm.term.toLowerCase() ?? "");
    const termMatch2 = account.userEmail
      ?.toLowerCase()
      .includes(searchTerm.term.toLowerCase() ?? "");
    const status = account.accountStatus.includes(searchTerm.status);

    return type && (termMatch || termMatch2) && status;
  });

  //Logic of Pagination
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentAccounts = filterAccounts.slice(
    indexOfFirstItem,
    indexOfLastItem
  );
  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  const headers = [
    "ID",
    "Username",
    "Name",
    "Email",
    "Type",
    "Date Created",
    "Status",
    "",
  ];
  const accountData = currentAccounts.map((account) => [
    account.userID,
    account.username,
    `${account.userFirstname} ${account.userLastname}`,
    account.userEmail,
    // account.accountType,
    account.accountType === "Employer" ? (
      <>
        <HailIcon style={{ color: "green" }} />
        <span> Employer</span>
      </>
    ) : account.accountType === "Catcher" ? (
      <>
        <AssignmentIndIcon style={{ color: "purple" }} />
        <span> Catcher</span>
      </>
    ) : account.accountType === "admin" ? (
      <>
        <ManageAccountsIcon style={{ color: "red" }} />
        <span> Admin</span>
      </>
    ) : null, // handle any other status if necessary..
    DisplayDate(account.dateCreated),
    // account.accountStatus,
    account.accountStatus === "Verified" ? (
      <>
        <VerifiedUserIcon style={{ color: "green" }} />
        <span> Verified</span>
      </>
    ) : account.accountStatus === "Unverified" ? (
      <>
        <ErrorIcon style={{ color: "orange" }} />
        <span> Unverified</span>
      </>
    ) : account.accountStatus === "Suspended" ? (
      <>
        <CancelIcon style={{ color: "red" }} />
        <span> Suspended</span>
      </>
    ) : account.accountStatus === "Deactivated" ? (
      <>
        <CancelIcon style={{ color: "red" }} />
        <span> Deactivated</span>
      </>
    ) : null, // handle any other status if necessary..
    <Dropdown>
      <MenuButton>ACTIONS</MenuButton>
      <Menu>
        <MenuItem
          onClick={() => {
            handleOpenModal(account.userID);
          }}
        >
          View
        </MenuItem>
        <MenuItem onClick={() => onSuspend(account.userID)}>Suspend</MenuItem>
        <MenuItem onClick={() => onDeactivate(account.userID)}>
          Deactivate
        </MenuItem>
        <MenuItem onClick={() => onReactivate(account.userID)}>
          Reactivate
        </MenuItem>
      </Menu>
    </Dropdown>,
  ]);
  //console.log(searchTerm);
  /**
   * ACTIONS OF ADMIN
   */
  //view profile
  const onView = (id) => {
    navigate(`/profile/user/${id}`);
  };
  //suspend user
  const onSuspend = async (id) => {
    try {
      const status = "Suspended";
      await axios.put(`http://localhost:8800/change-status/${id}/${status}`);
      //console.log("Request verified:", request);
      //add a notification to the request user
      notif.notifDesc = "Your account has been suspended";
      notif.userID = id;
      notif.notificationType = "Suspension";
      notif.notifDate = getTimeAndDate();
      await axios.post("http://localhost:8800/notify", notif);
    } catch (err) {
      console.log(err);
    }
  };
  //Reactivate user account
  const onReactivate = async (id) => {
    try {
      const status = "Verified";
      await axios.put(`http://localhost:8800/change-status/${id}/${status}`);
      //add a notification to the request user
      notif.notifDesc = "Your account has been reactivated";
      notif.userID = id;
      notif.notificationType = "Account Reactivation";
      notif.notifDate = getTimeAndDate();
      await axios.post("http://localhost:8800/notify", notif);
    } catch (err) {
      console.log(err);
    }
  };
  const onDeactivate = async (id) => {
    try {
      const status = "Deactivated";
      await axios.put(`http://localhost:8800/change-status/${id}/${status}`);
      //add a notification to the request user
      notif.notifDesc = "Your account has been deactivated";
      notif.userID = id;
      notif.notificationType = "Account Deactivated";
      notif.notifDate = getTimeAndDate();
      await axios.post("http://localhost:8800/notify", notif);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="containerAcc">
      <h1
        className="header"
        style={{
          paddingLeft: "20px",
          justifyContent: "center",
          fontFamily:
            "'Lucida Sans', 'Lucida Sans Regular', 'Lucida Grande', 'Lucida Sans Unicode', Geneva, Verdana, sans-serif",
        }}
      >
        Account List
      </h1>
      <div
        className="search"
        style={{
          paddingLeft: "20px",
          marginBottom: "10px",
          display: "flex",
          alignItems: "center",
          width: "60%",
        }}
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
          <option value="Verified">Verified</option>
          <option value="Unverified">Unverified</option>
          <option value="Suspended">Suspended</option>
        </select>
      </div>
      <div className="accounts">
        {/*table*/}
        <Table headers={headers} data={accountData} />
        <Pagination
          itemsPerPage={itemsPerPage}
          totalItems={accounts.length}
          paginate={paginate}
        />
      </div>
      <Modal open={showProfileModal} onClose={() => setShowProfileModal(false)}>
        <ModalDialog layout="fullscreen" sx={{ overflowY: "auto" }}>
          <ModalClose />
          <ViewProfile id={currentId} />
        </ModalDialog>
      </Modal>
      <Link to="/profile/add" style={{ textDecoration: "none" }}>
        <button
          style={{
            marginLeft: "20px",
            padding: "8px 12px",
            fontSize: "12px",
            cursor: "pointer",
            border: "none",
            // backgroundColor: "#CE9251",
            backgroundColor: "#1679AB",
            color: "white",
            borderRadius: "4px",
            display: "inline-block",
            textAlign: "center",
            lineHeight: "1.5",
            fontFamily:
              "'Lucida Sans', 'Lucida Sans Regular', 'Lucida Grande', 'Lucida Sans Unicode', Geneva, Verdana, sans-serif",
          }}
        >
          Add account
        </button>
      </Link>
    </div>
  );
};

export default AccountList;
