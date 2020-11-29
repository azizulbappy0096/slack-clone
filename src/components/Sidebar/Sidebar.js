import React, { useState, useEffect } from "react";
import "./Sidebar.css";
import db from "../../utils/firebaseConfig";

// components
import SidebarOption from "../SidebarOption/SidebarOption";

// Material-icons
import CreateIcon from "@material-ui/icons/Create";
import KeyboardArrowDownIcon from "@material-ui/icons/KeyboardArrowDown";

// sidebar-options icon
import AlternateEmailIcon from "@material-ui/icons/AlternateEmail";
import MoreVertIcon from "@material-ui/icons/MoreVert";

// channel icon
import ClearAllIcon from '@material-ui/icons/ClearAll';


function Sidebar() {
  const [channelsName, setChannelsName] = useState([]);

  useEffect(() => {
   
    db.collection("user")
    .doc("userId")
    .collection("channels")
    .onSnapshot(snapShot => {
      console.log(snapShot)
      snapShot.docs.map(doc => {
        console.log(doc.data())
      })
    })
  }, [])

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
        <SidebarOption SubIcon={ClearAllIcon} title="developing" />
        <SidebarOption SubIcon={ClearAllIcon} title="general" />
        <SidebarOption SubIcon={ClearAllIcon} title="random" />
        <SidebarOption SubIcon={ClearAllIcon} title="backups" />
        <br />
        <SidebarOption Icon={KeyboardArrowDownIcon} title="Direct messages" />
      </section>
    </div>
  );
}

export default Sidebar;
