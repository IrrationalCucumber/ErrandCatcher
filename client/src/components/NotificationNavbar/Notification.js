import { Badge, Dropdown, Menu, MenuButton, MenuItem } from "@mui/joy";
import React, { useEffect, useState } from "react";
import NotificationsNoneIcon from "@mui/icons-material/NotificationsNone";
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
  }, []);
  return (
    <div>
      <Dropdown>
        <MenuButton variant="plain" size="sm">
          <Badge badgeContent={props.count}>
            <NotificationsNoneIcon />
          </Badge>
        </MenuButton>
        {notifs.map((notif) => {
          <Menu key={notif.notificationID} variant="soft" size="md">
            <MenuItem>{notif.notificationType}</MenuItem>
          </Menu>;
        })}
      </Dropdown>
    </div>
  );
}

export default Notification;
