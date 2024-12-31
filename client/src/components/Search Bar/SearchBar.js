import React from "react";
import "./css/style.css";
import SearchIcon from "@mui/icons-material/Search";
import { Button } from "@mui/joy";
import { useNavigate } from "react-router-dom";

function SearchBar(props) {
  const navigate = useNavigate();

  return (
    <form onSubmit={props.onClick}>
      <div className="search__bar__container">
        {props.hasErrand === "false" || props.user === "admin" ? (
          <>
            <h1>Search what errands you want</h1>
            <div className="group">
              <SearchIcon className="icon" />
              <input
                className="inputsss"
                type="text"
                placeholder="Search"
                value={props.value}
                onChange={props.onChange}
              />
              <button className="buttonss" type="submit">
                Search
              </button>
            </div>
          </>
        ) : (
          <>
            <h1>You still have an Errands to do!</h1>
            <Button
              onClick={() => navigate(`/dashboard/catcher-errands`)}
              size="lg"
              variant="soft"
            >
              VIEW ERRANDS
            </Button>
          </>
        )}
      </div>
    </form>
  );
}

export default SearchBar;
