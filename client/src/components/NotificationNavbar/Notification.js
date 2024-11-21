import {
  Badge,
  Dropdown,
  Menu,
  MenuButton,
  MenuItem,
  Typography,
  Box,
  Button,
} from "@mui/joy";
import React, { useEffect, useState } from "react";
import NotificationsIcon from "@mui/icons-material/Notifications";
import axios from "axios";
import { useAuth } from "../AuthContext";
import { DisplayDate } from "../DisplayDate";
import { useNavigate } from "react-router-dom";

function Notification(props) {
  const [notifs, setNotifs] = useState([]);
  const { user } = useAuth();
  const navigate = useNavigate();

  // Fetch and display all user's unread notifications
  useEffect(() => {
    const fetchNotif = async () => {
      try {
        const res = await axios.get(
          `http://localhost:8800/unread-notifs/${user.userID}`
        );
        setNotifs(res.data);
      } catch (err) {
        console.log(err);
      }
    };
    fetchNotif();
    const intervalNotif = setInterval(fetchNotif, 1000);
    return () => clearInterval(intervalNotif);
  }, [user.userID]);

  // Function to mark all notifications as read
  const handleMarkAllAsRead = async () => {
    try {
      await axios.put(`http://localhost:8800/read-all/${user.userID}`);
      // Update the notification list in the UI
      setNotifs((prevNotifs) =>
        prevNotifs.map((notif) => ({ ...notif, isRead: true }))
      );
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div>
      <Dropdown>
        <MenuButton variant="primary" size="sm">
          <Badge color="danger" badgeContent={props.count}
            sx={{
              "& .MuiBadge-badge": {
                border: "none",
                boxShadow: "none",
              },
            }}
          >
            <NotificationsIcon sx={{ color: "white" }} />
          </Badge>
        </MenuButton>
        <Menu
          variant="soft"
          size="lg"
          color="primary"
          sx={{
            maxHeight: "350px", // Set maximum height
            overflowY: "auto", // Enable vertical scroll
          }}
        >
          {/* "Mark All as Read" Button */}
          {notifs.length > 0 && (
            <Box sx={{ display: "flex", justifyContent: "center", mb: 1 }}>
              <Button size="sm" color="primary" onClick={handleMarkAllAsRead}>
                Mark All as Read
              </Button>
            </Box>
          )}

          {notifs.length > 0 ? (
            notifs.map((notif) => (
              <MenuItem
                key={notif.notificationID}
                sx={{ display: "block", padding: 2 }}
              >
                <Box sx={{ display: "flex", flexDirection: "column" }}>
                  {notif.isRead === "no" ? (
                    <Typography
                      color="primary"
                      level="title-lg"
                      variant="plain"
                    >
                      {notif.notificationType}
                    </Typography>
                  ) : (
                    <Typography
                      color="neutral"
                      level="title-lg"
                      variant="plain"
                    >
                      {notif.notificationType}
                    </Typography>
                  )}
                  <Typography
                    color="neutral"
                    level="body-md"
                    noWrap
                    variant="plain"
                    sx={{ marginBottom: 1 }}
                  >
                    {notif.notifDesc}
                  </Typography>
                  <Typography
                    color="neutral"
                    level="body-sm"
                    variant="outlined"
                  >
                    {DisplayDate(notif.notifDate)}
                  </Typography>
                </Box>
              </MenuItem>
            ))
          ) : (
            <MenuItem>No new notifications</MenuItem>
          )}
          {/* "View All Notifications" Button */}

          <Box sx={{ display: "flex", justifyContent: "center", mt: 1 }}>
            <Button
              size="sm"
              color="primary"
              onClick={(e) => navigate(`/notifications`)}
            >
              View All Notifications
            </Button>
          </Box>
        </Menu>
      </Dropdown>
    </div>
  );
}

export default Notification;
