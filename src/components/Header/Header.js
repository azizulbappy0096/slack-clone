import React from 'react';
import "./Header.css";

// Material-Ui Icon
import QueryBuilderIcon from '@material-ui/icons/QueryBuilder';
import HelpOutlineIcon from '@material-ui/icons/HelpOutline';
import AccountBoxIcon from '@material-ui/icons/AccountBox';
import SearchIcon from '@material-ui/icons/Search';

import Avatar from "@material-ui/core/Avatar";

function Header() {
    return (
        <header className="header">
            <section className="header__searchBar">
                <div className="header__history">
                    <QueryBuilderIcon className="header__historyIcon" />
                </div>
                
                <div className="header__search">
                    <SearchIcon className="header__searchIcon" />
                    <span>Search Workplace-Name</span>
                    {/* <input type="text" placeholder="Search Workplace-Name" /> */}
                </div>

                <div className="header__help">
                    <HelpOutlineIcon className="header__helpIcon" />
                </div>
            
            </section>
            <section className="header__profile">
                <Avatar alt="dp" src="./logo192.png" className="header__profileIcon" />
            </section>
        </header>
    )
}

export default Header;
