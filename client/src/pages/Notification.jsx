/**------------NOTE--------------------
 * this could be tranferred to/chaanged as 'Notification' page
 */
import axios from "axios";
import React, { useEffect, useState } from "react";
import NotificationItem from "../components/NotificationItem";
import { useLocation } from "react-router-dom";
import "../components/Notification.css";

function Notification() {
  const [notifs, setNotifs] = useState([]);
  const [readButton, setReadButton] = useState("Show All");
  const [notifCount, setNotifCount] = useState([]);

  //get the id from address bar
  const location = useLocation();
  const userID = location.pathname.split("/")[2];
  console.log(userID);
  //display all notification
  useEffect(() => {
    const fetchNotif = async () => {
      try {
        const res = await axios.get(
          `http://localhost:8800/show-notifs/${userID}`
        );
        //const res = await axios.get("http://localhost:8800/notification");
        setNotifs(res.data);
      } catch (err) {
        console.log(err);
      }
    };
    fetchNotif();
  }, []);
  /**REMIDNER:
   *  USE THIS IN NAVBAR
   * */
  //get notif count
  useEffect(() => {
    const fetchCount = async () => {
      try {
        const res = await axios.get(
          "http://localhost:8800/notif-count/",
          userID
        );
        setNotifCount(res.data);
      } catch (err) {
        console.log(err);
      }
    };
    fetchCount();
  }, []);
  //when user click 'mark as read'
  //update db notif isRead to Yes
  const ReadIt = async (e) => {
    try {
      await axios.post("http://localhost:8800/read-notif/" + notifs, userID);
    } catch (err) {
      console.log(err);
    }
  };
  //when user click the read it all
  //change all unread notif to read
  const RedditAll = async (e) => {
    try {
      await axios.post("http://localhost:8800/notif-readall/:userID/" + userID);
      alert("All Notification has been read");
    } catch (err) {
      console.log(err);
    }
  };
  //show all notif
  useEffect(() => {
    const showAll = async () => {
      try {
        const res = await axios.get(
          `http://localhost:8800/showall-notif/${userID}`
        );
        //const res = await axios.get("http://localhost:8800/notification");
        setNotifs(res.data);
      } catch (err) {
        console.log(err);
      }
    };
    showAll();
  }, []);

  return (
    <div className="notifs">
      <h1>Your Notifications</h1>
      <button onClick={RedditAll}>MARK AS READ</button>
      <button>{readButton}</button>
      <p>notif{notifCount}</p>
      <div className="notifs_container">
        <div className="notifs_wrapper">
          {notifs.map((Notif) => (
            <div className="notif" key={Notif.notificationID}>
              <ul className="notifs_items">
                <NotificationItem
                  type={Notif.notificationType}
                  desc={Notif.notifDesc}
                  date={Notif.notifDate}
                  // type="APPLICATION"
                  // desc="There is an Catcher that wants to apply on one of your commission"
                  // date="3:00 11-11-11"
                  reddit={ReadIt}
                />
              </ul>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Notification;
