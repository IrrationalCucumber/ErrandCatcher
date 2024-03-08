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

  //get the id from address bar
  const location = useLocation();
  const userID = location.pathname.split("/")[2];
  //display all notification
  useEffect(() => {
    const fetchNotif = async () => {
      try {
        //const res = await axios.get(`http://localhost:8800/show-notifs/${userID}`);
        const res = await axios.get("http://localhost:8800/notification");
        setNotifs(res.data);
      } catch (err) {
        console.log(err);
      }
    };
    fetchNotif();
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

  return (
    <div className="notifs">
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
