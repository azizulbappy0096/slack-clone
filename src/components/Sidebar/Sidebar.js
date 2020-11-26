import React from "react";
import "./Sidebar.css";

// components
import SidebarOption from "../SidebarOption/SidebarOption";

// Material-icons
import CreateIcon from "@material-ui/icons/Create";
import KeyboardArrowDownIcon from "@material-ui/icons/KeyboardArrowDown";

// sidebar-options icon
import AlternateEmailIcon from "@material-ui/icons/AlternateEmail";
import MoreVertIcon from "@material-ui/icons/MoreVert";

function Sidebar() {
  return (
    <div className="sidebar">
      <section className="sidebar__header">
        <h3>
          LazyProgs
          <KeyboardArrowDownIcon />
        </h3>

        <CreateIcon />
      </section>
      <hr />
      <section className="sidebar__options">
        <SidebarOption Icon={AlternateEmailIcon} title="Mentions & reactions" />
        <SidebarOption Icon={MoreVertIcon} title="More" />
        <SidebarOption Icon={KeyboardArrowDownIcon} title="Channels" />
        <SidebarOption title="developing" />
        <SidebarOption title="general" />
        <SidebarOption title="random" />
        <SidebarOption title="backups" />
        <br />
        <SidebarOption Icon={KeyboardArrowDownIcon} title="Direct messages" />
      </section>
    </div>
  );
}

export default Sidebar;
