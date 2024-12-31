import axios from "axios";
import React, { useEffect, useState } from "react";
import NotificationItem from "../components/NotificationItem";
import { DisplayDate } from "../components/DisplayDate.js";
import Navbar from "../components/Navbar/Navbar.js";
import "../components//Notification.css"; // Combined CSS styles
import { useAuth } from "../components/AuthContext.js";
import { Button } from "@mui/joy";
import CheckIcon from "@mui/icons-material/Check";

function Notification() {
  const [notifs, setNotifs] = useState([]);
  const { user } = useAuth();
  const userID = user.userID;

  // Display all notifications
  const fetchNotif = async () => {
    try {
      const res = await axios.get(`http://localhost:8800/my-notif/${userID}`);
      setNotifs(res.data);
    } catch (err) {
      console.log(err);
    }
  };
  useEffect(() => {
    fetchNotif();
  }, []);

  // When user clicks 'mark as read', update db notif isRead to Yes
  const markAsRead = async (notificationID) => {
    try {
      await axios.put(
        `http://localhost:8800/read-notif/${notificationID}/${userID}`
      );
      const intervalNotif = setInterval(fetchNotif, 1000);
      return () => clearInterval(intervalNotif);
    } catch (err) {
      console.log(err);
    }
  };

  // Function to mark all notifications as read
  const handleMarkAllAsRead = async () => {
    try {
      await axios.put(`http://localhost:8800/read-all/${user.userID}`);
      // Update the notification list in the UI
      setNotifs((prevNotifs) =>
        prevNotifs.map((notif) => ({ ...notif, isRead: true }))
      );
      window.location.reload();
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <>
      <Navbar navbar_ui={`navbar__${user.userType.toLowerCase()}`} />
      <div className="notification-container">
        <main className="notification-main">
          <div className="notification-header">
            <h2 className="notification-title"
              style={{ paddingLeft: "30px" }}
            >
              Notifications
            </h2>
            <img
              src="/images/notification_icon.svg"
              className="icon"
              alt="notification_icon"
              style={{ paddingLeft: "20px" }}
            />
            <Button
              // onClick={markAsRead}
              onClick={handleMarkAllAsRead}
              startDecorator={<CheckIcon />}
              variant="outlined"
              color="primary"
              className="mark-read-button"
              style={{
                textAlign: "center",
                marginLeft: "20px",
                fontSize: "14px",
                fontWeight: 600,
              }}
            >
              Mark all as Read
            </Button>
          </div>
          <div className="notification-list">
            {notifs.map((notif) => (
              <div className="notification-item" key={notif.notificationID}>
                <NotificationItem
                  type={notif.notificationType}
                  desc={notif.notifDesc}
                  date={DisplayDate(notif.notifDate)} // Format the date
                  isRead={notif.isRead}
                  markAsRead={() => markAsRead(notif.notificationID)}
                // style={{ border: "5px solid green" }}
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
