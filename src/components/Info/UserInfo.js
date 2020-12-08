import React from 'react';
import "./Info.css";

import { Avatar } from '@material-ui/core';
import { useStateValue } from '../../utils/StateProvider';
import FiberManualRecordIcon from '@material-ui/icons/FiberManualRecord';
import { useHistory } from 'react-router-dom';
import firebase from "firebase";
import { actionTypes } from '../../utils/reducer';

function UserInfo({display}) {
  const [{user}, dispatch] = useStateValue();
  const history = useHistory();

  const chooseWorkSpace = () => {
      history.push("/");
  };

  const signOut = () => {
    firebase.auth().signOut().then(() => {
        dispatch({
            type: actionTypes.SET_USER,
            user: null
        })
        history.push("/");
    }).catch(error => {
        console.log("error>>>",error.message)
    })
  }

    return (
        <div className="userInfo" style={!display ? {display: "none"} : {display: "block"}} >
            <section className="userInfo__avatar">
                <Avatar src={user?.url} alt="user-photo">
                    {user?.name}
                </Avatar>
                <div className="userInfo__status">
                    <h5> {user?.name} </h5>
                    <div style={{display: "flex", alignItems: "center"}}>
                    <FiberManualRecordIcon style={{color: "green", fontSize: "14px"}} />
                    <span style={{fontSize: "12px"}}> Active</span>
                    </div>
                </div>
            </section>

            <section className="userInfo__out">
                <p onClick={chooseWorkSpace}> Switch to another WorkSpace </p>
                <p onClick={signOut}> Sign out </p>
            </section>
        </div>
    )
}

export default UserInfo;
