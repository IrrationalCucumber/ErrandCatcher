//navdropdown for the profile and signout
//css/style combined here
//03-05-24 fetch&pulled, added the /:userID

import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { useAuth } from "../AuthContext";
import { Dropdown, Menu, MenuButton, MenuItem } from "@mui/joy";
import Person2Icon from "@mui/icons-material/Person2";
import HistoryIcon from '@mui/icons-material/History';
import LogoutIcon from '@mui/icons-material/Logout';
import AssignmentOutlinedIcon from '@mui/icons-material/AssignmentOutlined';
import AccountCircleOutlinedIcon from '@mui/icons-material/AccountCircleOutlined';

function NavDropdown(props) {
  const [dropdownOpen, setDropdownOpen] = useState(false);

  const toggleDropdown = () => {
    setDropdownOpen(!dropdownOpen);
  };

  const location = useLocation();
  const { user } = useAuth();

  const profileLink = `/profile/me`; // URL for the profile page
  const signOutLink = "/sign-in"; // URL for the sign out page
  const historyLink = "/history"; // URL for the history page

  const { logout } = useAuth();
  const handleLogout = () => {
    //   const userData = {
    //     username: null,
    //     userID: null,
    //     userType: null,
    //     status: null,
    //   };
    //   updateUser(userData);
    //alert("clicked");
    // log uot user

    // const handleLogout = () => {
    logout();

    // };
  };

  return (
    <Dropdown>
      <MenuButton
        variant="soft"
        color="primary"
        size="lg"
        startDecorator={<Person2Icon />}
      >
        {props.name}
      </MenuButton>
      <Menu color="primary" size="md"
        sx={{
          display: "flex",
          justifyContent: "center",
          alignContent: "center",
          // padding: "12x 16px",
          paddingTop: "8px",
          gap: "22px",
        }}>
        <MenuItem>
          <Link
            to={profileLink}
            style={{
              // display: "block",
              // padding: "12px 16px",
              textDecoration: "none",
              color: "#565360",
            }}
          >
            <AccountCircleOutlinedIcon /> My Profile
          </Link>
        </MenuItem>
        {user.userType === "Catcher" ? (
          <MenuItem>
            <Link
              to={"/dashboard/my-application"}
              style={{
                // display: "block",
                // padding: "12px 16px",
                textDecoration: "none",
                color: "#565360",
              }}
            >
              <AssignmentOutlinedIcon /> Applications
            </Link>
          </MenuItem>
        ) : null}
        <MenuItem>
          <Link
            to={historyLink}
            style={{
              // display: "block",
              // padding: "12px 16px",
              textDecoration: "none",
              color: "#565360",
            }}
          >
            <HistoryIcon /> History
          </Link>
        </MenuItem>
        <MenuItem>
          <Link
            onClick={handleLogout}
            to={signOutLink}
            style={{
              // display: "block",
              // padding: "12px 16px",
              textDecoration: "none",
              color: "#565360",
            }}
          >
            <LogoutIcon /> Sign Out
          </Link>
        </MenuItem>
      </Menu>
    </Dropdown>
  );
}

export default NavDropdown;
