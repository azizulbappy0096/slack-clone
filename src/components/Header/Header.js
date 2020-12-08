import React, { useEffect, useRef, useState } from "react";
import "./Header.css";

// Material-Ui Icon
import QueryBuilderIcon from "@material-ui/icons/QueryBuilder";
import HelpOutlineIcon from "@material-ui/icons/HelpOutline";
import SearchIcon from "@material-ui/icons/Search";
import CloseIcon from "@material-ui/icons/Close";

// Material-core
import Avatar from "@material-ui/core/Avatar";
import { useStateValue } from "../../utils/StateProvider";
import { actionTypes } from "../../utils/reducer";
import UserInfo from "../Info/UserInfo";

function Header() {
  const [isSearchBar, setIsSearchBar] = useState(false);
  const [isOpenInfo, setIsOpenInfo] = useState(false);
  const [{ user }, dispatch] = useStateValue();
  const headerRef = useRef();

  const showSearchBar = () => {
    setIsSearchBar((prev) => !prev);
  };

  useEffect(() => {
    if (headerRef.current) {
      dispatch({
        type: actionTypes.SET_HEADERHEIGHT,
        headerHeight: headerRef.current.offsetHeight,
      });

      window.addEventListener("resize", () => {
        dispatch({
          type: actionTypes.SET_HEADERHEIGHT,
          headerHeight: headerRef.current.offsetHeight,
        });
      });

      return () => {
        window.removeEventListener("resize", () => {
          dispatch({
            type: actionTypes.SET_HEADERHEIGHT,
            headerHeight: headerRef.current.offsetHeight,
          });
        });
      };
    }
  }, []);

  const openInfo = () => {
    setIsOpenInfo((prev) => !prev);
  };

  return (
    <header className="header" ref={headerRef}>
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
          style={isSearchBar ? { display: "flex" } : { display: "none" }}
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
        <Avatar
          onClick={openInfo}
          alt="dp"
          src={user?.url}
          className="header__profileIcon"
        >
          {user?.name}
        </Avatar>
        <UserInfo display={isOpenInfo} />
      </section>
    </header>
  );
}

export default Header;
