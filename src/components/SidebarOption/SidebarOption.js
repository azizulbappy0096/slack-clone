import React from "react";
import "./SidebarOption.css";

import AddIcon from '@material-ui/icons/Add';
import db from "../../utils/firebaseConfig";
import { useHistory, useParams } from "react-router-dom";
import { useStateValue } from "../../utils/StateProvider";
import { actionTypes } from "../../utils/reducer";

function SidebarOption({ Icon, SubIcon, addSidebarOption, id, title }) {
  const history = useHistory();
  const {workSpaceId} = useParams();
  const [{user}, dispatch] = useStateValue();

  const addChannel = () => {
    const input = prompt("Give a name:");
    if(input) {
      db
      .collection("workStation")
      .doc(workSpaceId)
      .collection("channels")
      .add({
        name: input
      })
    }

  }

  const selectChannel = () => {
    if(id) {
      dispatch({
        type: actionTypes.SET_CHANNEL,
        channel: title
      })
      history.push(`/client/${workSpaceId}/chat/${id}`)
    }
  }

  return (
    <div className="sidebarOption" onClick={id ? selectChannel : null} >
      <div className="sidebarOption__left">
        {Icon && <Icon />}
        {Icon ? (
          <h4> {title}</h4>
        ) : (
          <>
            {" "}
            <SubIcon className="sidebarOption__subIcon" /> <h5> {title}</h5>{" "}
          </>
        )}
      </div>
      {addSidebarOption && <AddIcon onClick={addChannel} />}
    </div>
  );
}

export default SidebarOption;
