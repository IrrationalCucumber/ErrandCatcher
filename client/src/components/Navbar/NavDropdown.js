//navdropdown for the profile and signout
//css/style combined here
//03-05-24 fetch&pulled, added the /:userID

import React, { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useAuth } from "../AuthContext";
import {
  Chip,
  Dropdown,
  Menu,
  MenuButton,
  MenuItem,
  Typography,
} from "@mui/joy";
import Person2Icon from "@mui/icons-material/Person2";
import HistoryIcon from "@mui/icons-material/History";
import LogoutIcon from "@mui/icons-material/Logout";
import AssignmentOutlinedIcon from "@mui/icons-material/AssignmentOutlined";
import AccountCircleOutlinedIcon from "@mui/icons-material/AccountCircleOutlined";
import { ApplicationCount } from "../Display/DsiplayFunctions";

function NavDropdown(props) {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [numCount, setNumCount] = useState(null);

  const toggleDropdown = () => {
    setDropdownOpen(!dropdownOpen);
  };

  const location = useLocation();
  const { user } = useAuth();
  const navigate = useNavigate();
  const handleSignOut = () => {
    navigate(signOutLink);
    logout();
  };
  const profileLink = `/profile/me`; // URL for the profile page
  const signOutLink = "/sign-in"; // URL for the sign out page
  const historyLink = "/history"; // URL for the history page
  const generateReportLink = "/dashboard/admin/generate-report";

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
      <Menu
        color="primary"
        size="md"
        sx={{
          display: "flex",
          justifyContent: "center",
          alignContent: "center",
          // padding: "12x 16px",
          paddingTop: "8px",
          gap: "22px",
        }}
      >
        <MenuItem onClick={() => navigate(profileLink)}>
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
          <MenuItem
            onClick={() => {
              navigate("/dashboard/my-application");
            }}
          >
            <Link
              to={"/dashboard/my-application"}
              style={{
                // display: "block",
                // padding: "12px 16px",
                textDecoration: "none",
                color: "#565360",
              }}
            >
              <Typography>
                <AssignmentOutlinedIcon /> Applications
                {numCount !== null && numCount > 0 ? (
                  <Chip
                    color="danger"
                    size="md"
                    variant="solid">
                    <ApplicationCount id={user.userID} />
                  </Chip>
                ) : (
                  <Chip
                    // color="success"
                    color="danger"
                    variant="soft">
                    <ApplicationCount id={user.userID} />
                  </Chip>
                  // <ApplicationCount id={user.userID} />
                )}
              </Typography>
            </Link>
          </MenuItem>
        ) : null}
        {/* admin history: generate report */}
        {user.userType === "admin" ? (
          <MenuItem onClick={() => navigate(generateReportLink)}>
            <Link
              to={historyLink}
              style={{
                // display: "block",
                // padding: "12px 16px",
                textDecoration: "none",
                color: "#565360",
              }}
            >
              <HistoryIcon /> Generate Report
            </Link>
          </MenuItem>) :
          // employer & catcher history
          <MenuItem onClick={() => navigate(historyLink)}>
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
        }
        <MenuItem
          onClick={() => {
            handleSignOut();
          }}
        >
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
