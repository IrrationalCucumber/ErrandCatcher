import axios from "axios";
import React, { useEffect, useState } from "react";
import NotificationItem from "../components/NotificationItem";
import Navbar from "../components/Navbar/Navbar.js";
import Pagination from "../components/Pagination"; // Import Pagination component
import "../components/Notification.css"; // Combined CSS styles
import { useAuth } from "../components/AuthContext.js";

function Notification() {
  const [notifs, setNotifs] = useState([]);
  const { user } = useAuth();
  const userID = user.userID;

  // Pagination state
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5; // Set items per page to 5

  // Fetch notifications
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
  }, [userID]);

  // Calculate the indices for pagination
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentNotifs = notifs.slice(indexOfFirstItem, indexOfLastItem);

  // Handle page change
  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  // Function to format date
  const formatDate = (dateString) => {
    const options = { month: "long", day: "numeric", year: "numeric" };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  // Function to mark all notifications as read
  // const markAsRead = async () => {
  //   try {
  //     await axios.post(`http://localhost:8800/read-notif/${userID}`);
  //     fetchNotif(); // Refresh notifications
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
              // onClick={markAsRead}
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
            {currentNotifs.map((notif) => (
              <div className="notification-item" key={notif.notificationID}>
                <NotificationItem
                  type={notif.notificationType}
                  desc={notif.notifDesc}
                  date={formatDate(notif.notifDate)} // Format the date
                  // markAsRead={() => markAsRead(notif.notificationID)}
                />
              </div>
            ))}
          </div>
          <Pagination
            currentPage={currentPage}
            itemsPerPage={itemsPerPage}
            totalItems={notifs.length}
            onPageChange={handlePageChange}
          />
        </main>
      </div>
    </>
  );
}

export default Notification;
