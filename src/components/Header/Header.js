import React, { useEffect, useState } from "react";
import "./Header.css";

// Material-Ui Icon
import QueryBuilderIcon from "@material-ui/icons/QueryBuilder";
import HelpOutlineIcon from "@material-ui/icons/HelpOutline";
import SearchIcon from "@material-ui/icons/Search";
import CloseIcon from "@material-ui/icons/Close";

// Material-core
import Avatar from "@material-ui/core/Avatar";

function Header() {
  const [isSearchBar, setIsSearchBar] = useState(false);

  const showSearchBar = () => {
    setIsSearchBar((prev) => !prev);
  };

  return (
    <header className="header">
      <section className="header__searchBar">
        <div
          className="header__history"
          style={!isSearchBar ? { display: "flex" } : { display: "none" }}
        >
          <QueryBuilderIcon className="header__historyIcon" />
        </div>

        <div
          className="header__search"
          style={!isSearchBar ? { display: "flex" } : { display: "none" }}
          onClick={showSearchBar}
        >
          <SearchIcon className="header__searchIcon" />
          <span>Search Workplace-Name</span>
        </div>

        <div
          className="header__search--active"
          style={isSearchBar ? { display: "block" } : { display: "none" }}
        >
          <div className="header__searchTop">
            <SearchIcon className="header__searchTop--icon" />
            <input
              type="text"
              placeholder="Surely that's around here somewhere..."
            />
            <CloseIcon
              className="header__searchTop--icon"
              style={{ cursor: "pointer" }}
              onClick={showSearchBar}
            />
          </div>
        </div>

        <div
          className="header__help"
          style={!isSearchBar ? { display: "flex" } : { display: "none" }}
        >
          <HelpOutlineIcon className="header__helpIcon" />
        </div>
      </section>
      <section className="header__profile">
        <Avatar alt="dp" src="./logo192.png" className="header__profileIcon" />
      </section>
    </header>
  );
}

export default Header;
