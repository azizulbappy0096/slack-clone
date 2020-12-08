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
import ClearAllIcon from "@material-ui/icons/ClearAll";
import { useStateValue } from "../../utils/StateProvider";
import { useParams } from "react-router-dom";

// direct message icon
import PersonIcon from "@material-ui/icons/Person";

function Sidebar() {
  const [channelsName, setChannelsName] = useState([]);
  const [directMsg, setDirectMsg] = useState([]);
  const [currentWorkSpace, setCurrentWorkSpace] = useState(null);
  const [{ user, ShowSidebar, headerHeight }] = useStateValue();
  const { workSpaceId } = useParams();

  useEffect(() => {
    db.collection("workStation")
      .doc(workSpaceId)
      .collection("channels")
      .onSnapshot((snapShot) => {
        console.log(snapShot);

        setChannelsName(
          snapShot.docs.map((doc) => ({ id: doc.id, name: doc.data().name }))
        );
      });

    db.collection("workStation")
      .doc(workSpaceId)
      .get()
      .then((doc) => {
        setCurrentWorkSpace(doc.data()?.name);
      });
  }, []);

  useEffect(() => {
    db.collection("workStation")
      .doc(workSpaceId)
      .collection("users")
      .onSnapshot((snapShot) => {
        setDirectMsg(
          snapShot.docs.map((data) => {
            if (data.data().name !== null && data.data().name.length > 0) {
              return { id: data.id, name: data.data().name };
            }
          })
        );
      });
  }, []);

  return (
    <div className="sidebar" style={ShowSidebar ? {left: 0, top: headerHeight} : {left: "-100%"}} >
      <section className="sidebar__header">
        <h3>
          {currentWorkSpace}
          <KeyboardArrowDownIcon />
        </h3>

        <CreateIcon />
      </section>
      <hr />
      <section className="sidebar__options">
        <SidebarOption Icon={AlternateEmailIcon} title="Mentions & reactions" />
        <SidebarOption Icon={MoreVertIcon} title="More" />
        <SidebarOption
          Icon={KeyboardArrowDownIcon}
          addSidebarOption
          title="Channels"
        />
        {channelsName.map((name) => (
          <SidebarOption
            SubIcon={ClearAllIcon}
            id={name.id}
            title={name.name}
          />
        ))}

        <br />
        <SidebarOption Icon={KeyboardArrowDownIcon} title="Group members" />
        {directMsg.map((name) => {
          if (name) {
            return (
              <SidebarOption
              SubIcon={PersonIcon}
              
              title={name?.name}
            />
            )
          }
        })}
      </section>
    </div>
  );
}

export default Sidebar;
