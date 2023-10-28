import axios from "axios";
import React, { useEffect } from "react";
import NotificationItem from "./NotificationItem";

function Notification() {
  const [notifs, setNotifs] = {
    notificationID: "",
    //catcherID: "",
    //employerID: "",
    //commissionID: "",
    notificationType: "",
    notifDesc: "",
    notifDate: "",
    isRead: "",
  };
  //display all notification
  useEffect(() => {
    const fetchNotif = async () => {
      try {
        await axios.get("http://localhost:8000/show-notifs/" + userID);
      } catch (err) {
        console.log(err);
      }
    };
    fetchNotif;
  }, []);
  //when user click 'mark as read'
  //update db notif isRead to Yes
  const ReadIt = async (e) => {
    try {
      await axios.post(
        "http://localhost:8000/read-notif/",
        notifs.notificationID
      );
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <>
      {notifs.map((Notif) => (
        <div key={Notif.notificationID}>
          <p>{Notif.notificationID}</p>
          <h1>{Notif.notificationType}</h1>
          <p>{Notif.notifDesc}</p>
          <p>{Notif.notifDate}</p>
          <button onClick={ReadIt}></button>
          <ul>
            <NotificationItem
              type={Notif.notificationType}
              desc={Notif.notifDesc}
              date={Notif.notifDate}
            />
          </ul>
        </div>
      ))}
    </>
  );
}

export default Notification;
