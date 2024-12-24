import { Check } from "@mui/icons-material";
import React from "react";

function NotificationItem(props) {
  return (
    <>
      {props.isRead === "no" && (
        <div
          className="notification-item-container"
        >
          <h3 className="notification-type">{props.type}</h3>
          <div className="notification-item-info">
            <p className="notification-desc">{props.desc}</p>
            <p className="notification-date">{props.date}</p>
            <div className="notification-button">
              <button onClick={props.markAsRead} className="read-button">
                <Check />
              </button>
            </div>
          </div>
        </div>
      )}
      {props.isRead === "yes" && (
        <div className="notification-item-container">
          <h3 className="notification-type">{props.type}</h3>
          <div className="notification-item-info">
            <p className="notification-desc">{props.desc}</p>
            <p className="notification-date">{props.date}</p>
          </div>
        </div>
      )}
    </>
  );
}

export default NotificationItem;
