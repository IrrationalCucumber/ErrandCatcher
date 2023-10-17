import axios from "axios";
import React, { useState } from "react";

function Notification() {
  const [notif, setNotif] = {
    notificationID: "",
    catcherID: "",
    employerID: "",
    commissionID: "",
    notifDesc: "",
    isRead: "",
  };

  //fetch all notifs
  const fetchSearchResults = async () => {
    try {
      //http://localhost:8800/user - local
      //http://192.168.1.47:8800/user - network
      const res = await axios.get("http://localhost:8800/notifs", {});
      setAccounts(res.data);
    } catch (err) {
      console.log(err);
    }
  };
  return <div></div>;
}

export default Notification;
