import React from "react";

function NotificationItem(props) {
  return (
    <>
      <li>
        <h1>{props.type}</h1>
        <p>{props.desc}</p>
        <p>{props.date}</p>
      </li>
    </>
  );
}

export default NotificationItem;
