/**
 * VIEW PROFILE
 * view profile of the user - readonlu
 * APS - 30/03/24
 */
import React, { useEffect, useState } from "react";
import NavbarPage from "../../components/Navbar/NavBarPage";
import "./profile.css";
import { useLocation } from "react-router-dom";
import axios from "axios";
import { ViewUserProfile } from "../../components/Profile/UserProfile";

function ViewProfile() {
  const [activeTab, setActiveTab] = useState("about");
  const [verified, setVerified] = useState(false);
  //get userID from url
  const location = useLocation();
  const userID = location.pathname.split("/")[3];
  //variable for account details
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
  });

  //pre-fill the fields
  useEffect(() => {
    const fetchAccount = async () => {
      try {
        const res = await axios.get(`http://localhost:8800/user/${userID}`);
        const retrievedAccount = res.data[0];
        //format date
        const formattedDate = new Date(retrievedAccount.userBirthday)
          .toISOString()
          .substr(0, 10);

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
          bday: formattedDate,
          address: retrievedAccount.userAddress,
          desc: retrievedAccount.userDesc,
          profileImage: retrievedAccount.profileImage,
        });
      } catch (err) {
        console.log(err);
      }
    };

    fetchAccount();
  }, [userID]);

  //useState for Status
  const [status, setStatus] = useState("");
  //update display for status
  useEffect(() => {
    const fetchStatus = async () => {
      try {
        const res = await axios.get(
          `http://localhost:8800/user-verify/${userID}`
        );
        //console.log(res.data[0].accountStatus);
        setStatus(res.data[0].accountStatus);
        if (status.toUpperCase === "VERIFIED") {
          setVerified(true);
          console.log(verified);
        }
      } catch (err) {
        console.log(err);
      }
    };
    fetchStatus();
  }, [status, userID, verified]);

  //get the rating of the user
  const [rating, setRating] = useState("");
  useEffect(() => {
    const fetchRating = async () => {
      try {
        const res = await axios.get(
          `http://localhost:8800/user-rating/${userID}`
        );
        //console.log(res.data[0].c);
        setRating(res.data[0].c);
      } catch (err) {
        console.log(err);
      }
    };
    fetchRating();
  }, [userID]);
  return (
    <div>
      <NavbarPage />
      <ViewUserProfile
        profileImg={account.profileImage}
        address={account.address}
        cnum={account.contact}
        email={account.email}
        rate={rating}
        type={account.type}
        desc={account.desc}
        //right hemisphere
        username={account.username}
        fname={account.fname}
        lname={account.lname}
        sex={account.gender}
        age={account.age}
        bday={account.bday}
        status={account.status}
      />
    </div>
  );
}

export default ViewProfile;
