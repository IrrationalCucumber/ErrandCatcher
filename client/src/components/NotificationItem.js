import React from "react";

function NotificationItem(props) {
  return (
    <>
      <li className="notif_item">
        <h3>{props.type}</h3>
        <div className="notif_item_info">
          <p className="notif_item_text">{props.desc}</p>
          <p className="notif_item_date">{props.date}</p>
        </div>
        <button className="btn" onClick={props.reddit}>
          <i className="fa-solid fa-check"></i>
        </button>
      </li>
    </>
  );
}

export default NotificationItem;
