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
import { NewViewUserProfile } from "../../components/Profile/NewUserProfile";

function ViewProfile(id) {
  //get userID from url
  const userID = id.id;
  console.log(id.id);

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
    status: "",
    skills: "",
    type: "",
    id: "",
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
          status: retrievedAccount.accountStatus,
          skills: retrievedAccount.userQualification,
          type: retrievedAccount.accountType,
          id: retrievedAccount.userID,
        });
      } catch (err) {
        console.log(err);
      }
    };

    fetchAccount();
  }, [userID]);

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

  //variables to store verification details
  const [docs, setDocs] = useState({
    frontID: "",
    backID: "",
    doc1: "",
    doc2: "",
    requestStatus: "",
  });
  //fetch details and store them
  useEffect(() => {
    const fetchDetails = async () => {
      try {
        const res = await axios.get(
          `http://localhost:8800/ver-details/${userID}`
        );
        setDocs({
          requestStatus: res.data[0].requestStatus,
          frontID: res.data[0].id_picture_front,
          backID: res.data[0].id_picture_back,
          doc1: res.data[0].docu_1,
          doc2: res.data[0].docu_2,
        });
      } catch (error) {
        console.log(error);
      }
    };
    fetchDetails();
  }, [userID]);
  return (
    <div>
      {/* <ViewUserProfile
        id={account.id}
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
        //verification details
        verStatus={docs.requestStatus}
        verFront={docs.frontID}
        verBack={docs.backID}
        verDoc1={docs.doc1}
        verDoc2={docs.doc2}
        skills={account.skills}
      /> */}

      <NewViewUserProfile
        id={account.id}
        profileImg={account.profileImage}
        address={account.address}
        contact={account.contact}
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
        //verification details
        verStatus={docs.requestStatus}
        verFront={docs.frontID}
        verBack={docs.backID}
        verDoc1={docs.doc1}
        verDoc2={docs.doc2}
        skills={account.skills}
      />
    </div>
  );
}

export default ViewProfile;
