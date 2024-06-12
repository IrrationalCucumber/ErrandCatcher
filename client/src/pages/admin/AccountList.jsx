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
  const [layout, setLayout] = useState(undefined);
  const [currentId, setCurrentId] = useState(null);
  const handleOpenModal = (id) => {
    setLayout("fullscreen");
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
  //user trans
  // const [count, setCount] = useState({
  //   done: "",
  //   expired: "",
  //   cancel: "",
  // });
  // useEffect(() => {
  //   const fetchTransCount = async () => {
  //     try {
  //       const res = await axios.get(
  //         `http://localhost:8800/trans-count/${currentId}`
  //       );
  //       //console.log(res.data[0].expired);
  //       if (!!res.data) {
  //         setCount({
  //           done: res.data[0].done,
  //           expired: res.data[0].expired,
  //           cancel: res.data[0].cancel,
  //         });
  //       }
  //     } catch (err) {
  //       console.log(err);
  //     }
  //   };
  //   fetchTransCount();
  // }, [currentId]);
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
      .toLowerCase()
      .includes(searchTerm.type.toLowerCase());
    const termMatch = account.username
      .toLowerCase()
      .includes(searchTerm.term.toLowerCase());
    const termMatch2 = account.userEmail
      .toLowerCase()
      .includes(searchTerm.term.toLowerCase());
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
    account.accountType,
    DisplayDate(account.dateCreated),
    account.accountStatus,
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
      //setIsButtonClicked(true);
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
      <Modal
        open={!!layout}
        onClose={() => setLayout(undefined)}
        className="accList_modal"
      >
        <ModalDialog layout={layout} className="custom-dialog">
          <ModalClose />
          <DialogTitle>{account.username.toUpperCase()} PROFILE</DialogTitle>
          <DialogContent
            style={{
              display: "flex",
              flexDirection: "row-reverse",
              padding: "20px",
            }}
          >
            <>
              <div>
                {/* <img
                  src={
                    `http://localhost:8800/images/profile/` +
                    account.profileImage
                  }
                  alt="Profile"
                  width={150}
                  length={150}
                /> */}
                <h4>USER: {currentId}</h4>
                <h5>
                  <b>USERNAME: </b>
                  {account.username}
                  <br />
                  <b>FULL NAME: </b>
                  {account.fname} {account.lname}
                  <br />
                  <b>EMAIL: </b>
                  {account.email}
                  <br />
                  <b>GENDER: </b>
                  {account.gender} <br />
                  <b>CONTACT #: </b>
                  {account.contact} <br />
                  <b>AGE: </b>
                  {account.age} <br />
                  <b>BIRTHDAY: </b>
                  {account.bday} <br />
                  <b>ADDRESS: </b>
                  {account.address} <br />
                  <b>DESCRIPTION: </b>
                  {account.desc} <br />
                  <b>DATE CREATED: </b>
                  {account.dateC} <br />
                  <b>STATUS: </b>
                  {account.status} <br />
                  <b>RATING: </b>
                  {rating} <br />
                  {/* <b>ERRAND DONE: </b> {count.done} <br />
                  <b>ERRAND EXPIRED: </b> {count.expired} <br />
                  <b>ERRAND CANCELLED: </b> {count.cancel} <br /> */}
                </h5>
              </div>
              <img
                src={
                  `http://localhost:8800/images/profile/` + account.profileImage
                }
                alt="Profile"
                width={150}
                length={150}
                style={{ marginRight: "20px" }}
              />
            </>
          </DialogContent>
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
          Add account
        </button>
      </Link>
    </div>
  );
};

export default AccountList;
