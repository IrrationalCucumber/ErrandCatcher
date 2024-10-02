import { Badge, Dropdown, Menu, MenuButton, MenuItem } from "@mui/joy";
import React, { useEffect, useState } from "react";
import NotificationsIcon from "@mui/icons-material/Notifications";
import axios from "axios";
import { useAuth } from "../AuthContext";

function Notification(props) {
  const [notifs, setNotifs] = useState([]);
  const { user } = useAuth();
  //fetch and display all user's unread notif
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
          <Badge badgeContent={props.count}>
            <NotificationsIcon />
          </Badge>
        </MenuButton>
        <Menu variant="soft" size="lg" color="primary">
          {notifs.length > 0 ? (
            notifs.map((notif) => (
              <MenuItem key={notif.notificationID}>
                {notif.notificationType}
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
