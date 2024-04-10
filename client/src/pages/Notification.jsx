import axios from "axios";
import React, { useEffect, useState } from "react";
import NotificationItem from "../components/NotificationItem";
import { useLocation } from "react-router-dom";
import Navbar from "../components/Navbar.js";
import "../components//Notification.css"; // Combined CSS styles

function Notification() {
  const [notifs, setNotifs] = useState([]);

  // Get the id from the address bar
  const location = useLocation();
  const userID = location.pathname.split("/")[2];

  // Display all notifications
  useEffect(() => {
    const fetchNotif = async () => {
      try {
        const res = await axios.get(
          `http://localhost:8800/show-notif/${userID}`
        );
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
  const markAsRead = async () => {
    try {
      await axios.post("http://localhost:8800/read-notif/" + notifs, userID);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <>
      <Navbar />
      <div className="notification-container">
        <main className="notification-main">
          <div className="notification-header">

            <p className="notification-title" style={{paddingLeft:"30px"}}>Notifications</p>
            <img 
                 src="/images/notification_icon.svg" 
                 className="icon" 
                 alt="notification_icon" 
                 style={{paddingLeft:"20px"}}/>
            <button onClick={markAsRead} className="mark-read-button" style={{textAlign:"center"}}>
              Mark all as Read
              <img 
                 src="/images/check_icon.svg" 
                 className="check-icon" 
                 alt="check_icon"
              />


            </button>
          </div>
          <div className="notification-list">
            {notifs.map((notif) => (
              <div className="notification-item" key={notif.notificationID}>
                <NotificationItem
                  type={notif.notificationType}
                  desc={notif.notifDesc}
                  date={formatDate(notif.notifDate)} // Format the date
                  markAsRead={markAsRead}
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
