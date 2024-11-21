import React from "react";
import PropTypes from "prop-types";
// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
// import { faBell } from '@fortawesome/free-regular-svg-icons';
import { Link } from "react-router-dom";

const NotificationIcon = ({
  hasNotification,
  notificationCount,
  onClick,
  to,
}) => (
  <Link to={to} style={{ textDecoration: "none" }}>
    <div
      style={{
        cursor: "pointer",
        position: "relative",
        display: "inline-block",
      }}
    >
      {/* <FontAwesomeIcon icon={faBell} color={'white'} size="1x" /> */}
      <NotificationIcon />
      {notificationCount > 0 && (
        <div
          style={{
            position: "absolute",
            top: "-8px",
            right: "-8px",
            backgroundColor: "red",
            color: "white",
            borderRadius: "50%",
            width: "20px",
            height: "20px",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            fontSize: "12px",
          }}
        >
          {notificationCount}
        </div>
      )}
    </div>
  </Link>
);

NotificationIcon.propTypes = {
  hasNotification: PropTypes.bool.isRequired,
  notificationCount: PropTypes.number.isRequired,
  onClick: PropTypes.func.isRequired,
};

export default NotificationIcon;
