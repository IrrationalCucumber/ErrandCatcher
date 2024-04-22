import axios from "axios";
import React, { useEffect, useState } from "react";
import NotificationItem from "../components/NotificationItem";
import { useLocation } from "react-router-dom";
import Navbar from "../components/Navbar/Navbar.js";
import "../components//Notification.css"; // Combined CSS styles
import { useAuth } from "../components/AuthContext.js";

function Notification() {
  const [notifs, setNotifs] = useState([]);
  const { user } = useAuth();
  const userID = user.userID;

  // Display all notifications
  useEffect(() => {
    const fetchNotif = async () => {
      try {
        const res = await axios.get(`http://localhost:8800/my-notif/${userID}`);
        setNotifs(res.data);
      } catch (err) {
        console.log(err);
      }
    };
    fetchNotif();
  }, []);

  // Function to format date
  const formatDate = (dateString) => {
    const options = { month: "long", day: "numeric", year: "numeric" };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  // When user clicks 'mark as read', update db notif isRead to Yes
  // const markAsRead = async (notificationID) => {
  //   try {
  //     await axios.post(`http://localhost:8800/read-notif/${notificationID}/${userID}`);
  //   } catch (err) {
  //     console.log(err);
  //   }
  // };

  return (
    <>
      <Navbar />
      <div className="notification-container">
        <main className="notification-main">
          <div className="notification-header">
            <p className="notification-title" style={{ paddingLeft: "30px" }}>
              Notifications
            </p>
            <img
              src="/images/notification_icon.svg"
              className="icon"
              alt="notification_icon"
              style={{ paddingLeft: "20px" }}
            />
            <button
              //onClick={markAsRead}
              className="mark-read-button"
              style={{ textAlign: "center" }}
            >
              <img
                src="/images/check_icon.svg"
                className="check-icon"
                alt="check_icon"
              />
              Mark all as Read
            </button>
          </div>
          <div className="notification-list">
            {notifs.map((notif) => (
              <div className="notification-item" key={notif.notificationID}>
                <NotificationItem
                  type={notif.notificationType}
                  desc={notif.notifDesc}
                  date={formatDate(notif.notifDate)} // Format the date
                  // markAsRead={()=>markAsRead(notif.notificationID)}
                />
              </div>
            ))}
          </div>
        </main>
      </div>
    </>
  );
}

export default Notification;
