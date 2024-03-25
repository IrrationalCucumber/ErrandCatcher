import React from "react";

function NotificationItem(props) {
  return (
    <div className="notification-item-container">
      <h3 className="notification-type">{props.type}</h3>
      <div className="notification-item-info">
        <p className="notification-desc">{props.desc}</p>
        <p className="notification-date">{props.date}</p>
      <div className="notification-button">
        <button onClick={props.markAsRead} className="button">
          <i className="fa-solid fa-check"></i>
        </button>
      </div>
    </div>
    </div>
  );
}

export default NotificationItem;
