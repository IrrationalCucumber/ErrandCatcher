import {
  Badge,
  Dropdown,
  Menu,
  MenuButton,
  MenuItem,
  Typography,
  Box,
} from "@mui/joy";
import React, { useEffect, useState } from "react";
import NotificationsIcon from "@mui/icons-material/Notifications";
import axios from "axios";
import { useAuth } from "../AuthContext";
import { DisplayDate } from "../DisplayDate";

function Notification(props) {
  const [notifs, setNotifs] = useState([]);
  const { user } = useAuth();

  // Fetch and display all user's unread notifications
  useEffect(() => {
    const fetchNotif = async () => {
      try {
        const res = await axios.get(
          `http://localhost:8800/my-notif/${user.userID}`
        );
        setNotifs(res.data);
      } catch (err) {
        console.log(err);
      }
    };
    fetchNotif();
  }, [user.userID]);

  return (
    <div>
      <Dropdown>
        <MenuButton variant="plain" size="sm">
          <Badge badgeContent={props.count || notifs.length}>
            <NotificationsIcon />
          </Badge>
        </MenuButton>
        <Menu
          variant="soft"
          size="lg"
          color="primary"
          sx={{
            maxHeight: "300px", // Set maximum height
            overflowY: "auto", // Enable vertical scroll
          }}
        >
          {notifs.length > 0 ? (
            notifs.map((notif) => (
              <MenuItem
                key={notif.notificationID}
                sx={{ display: "block", padding: 2 }}
              >
                <Box sx={{ display: "flex", flexDirection: "column" }}>
                  <Typography color="primary" level="title-lg" variant="plain">
                    {notif.notificationType}
                  </Typography>
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
                {/* {notif.isRead ? (
                  <Typography
                    variant="caption"
                    color="green"
                    sx={{ marginTop: 1 }}
                  >
                    Read
                  </Typography>
                ) : (
                  <Typography
                    variant="caption"
                    color="red"
                    sx={{ marginTop: 1 }}
                  >
                    Unread
                  </Typography>
                )} */}
              </MenuItem>
            ))
          ) : (
            <MenuItem>No new notifications</MenuItem>
          )}
        </Menu>
      </Dropdown>
    </div>
  );
}

export default Notification;
