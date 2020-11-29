import React from "react";
import "./SidebarOption.css";

function SidebarOption({ Icon, SubIcon, title }) {
  return (
    <div className="sidebarOption">
      {Icon && <Icon />}
  {Icon ? <h4> {title}</h4> : ( <> <SubIcon className="sidebarOption__subIcon" />  <h5> {title}</h5> </>)}
    </div>
  );
}

export default SidebarOption;
