import React, { useState, useEffect, useRef } from "react";
import "./Chat.css";

import Message from "../Message/Message";
import TextBox from "../TextBox/TextBox";
import db from "../../utils/firebaseConfig";
import firebase from "firebase";

// Material-ui Icons
import InfoOutlinedIcon from "@material-ui/icons/InfoOutlined";
import StarBorderIcon from "@material-ui/icons/StarBorder";
import StarIcon from "@material-ui/icons/Star";
import PersonAddOutlinedIcon from "@material-ui/icons/PersonAddOutlined";
import { useParams } from "react-router-dom";
import { useStateValue } from "../../utils/StateProvider";
import StorageOutlinedIcon from '@material-ui/icons/StorageOutlined';
import {actionTypes} from "../../utils/reducer";

function Chat() {
  const [starredChannel, setStarredChannel] = useState(false);
  const [channelMessages, setChannelMessages] = useState([]);
  const [msgPadding, setMsgPadding] = useState(null);
  const [msgHeight, setMsgHeight] = useState(null);

  const { roomId } = useParams();
  const [{user, currentChannel, ShowSidebar}, dispatch] = useStateValue();
  const {workSpaceId} = useParams();
  const ref = useRef(null);
  const chatHeaderRef = useRef(null);
  const chatTextBoxRef = useRef(null);

  useEffect(() => {
    db
    .collection("workStation")
    .doc(workSpaceId)
      .collection("channels")
      .doc(roomId)
      .collection("messages")
      .orderBy("timeStamp", "desc")
      .onSnapshot((snapShot) => {
        // setChannelMessages([])

        setChannelMessages(
          snapShot.docs.map((doc) => ({
            id: doc.id,
            senderName: doc.data()?.senderName,
            senderURL: doc.data()?.senderURL,
            time: doc.data()?.timeStamp?.seconds,
            msg: doc.data()?.message,
          }))
        );
      });
  }, [roomId]);

  useEffect(() => {
    const removeEvent = () => {
      dispatch({
        type: actionTypes.SET_SIDEBAR,
        sidebar: false
        
      });
    }
    console.log(ref.current)
    if(ref && ShowSidebar) {
      ref.current.addEventListener("click", removeEvent, false)
    }

    return() => {
      if(ref.current) {
      ref.current.removeEventListener("click", removeEvent, false)
      }
    }
   

  }, [ShowSidebar === true]);

  useEffect(() => {
    const handlePadding = () => {
      setMsgHeight(ref.current.offsetHeight - chatHeaderRef.current.offsetHeight);
      setMsgPadding(chatTextBoxRef.current.offsetHeight)
    }
    handlePadding();
    window.addEventListener("resize", handlePadding);

    return () => {
      window.removeEventListener("resize", handlePadding);
    };
  }, [])

  const handleStarred = () => {
    setStarredChannel((prev) => !prev);
  };

  const addPerson = () => {
    const newEmail = prompt("Enter E-mail: ");

    db
    .collection("workStation")
    .doc(workSpaceId)
    .collection("users")
    .add({
      email: newEmail, name: null
    })
  }

  const showSidebar = () => {
    dispatch({
      type: actionTypes.SET_SIDEBAR,
      sidebar: true
    });
  }

  return (
    <div className="chat" ref={ref} >
      <section className="chat__header" ref={chatHeaderRef}>
        <div className="chat__headerTitle">
          <StorageOutlinedIcon onClick={showSidebar} />
          <div className="chat__headerTitle--mobile">
          <h4>
            #{currentChannel}
            {!starredChannel ? (
              <StarBorderIcon onClick={handleStarred} />
            ) : (
              <StarIcon onClick={handleStarred} />
            )}
          </h4>
          <p> heheboy </p>
          </div>

        </div>
        <div className="chat__headerInfo">
          <PersonAddOutlinedIcon onClick={addPerson} />
          <InfoOutlinedIcon />
        </div>
      </section>
      <section className="chat__message" style={setMsgHeight && {maxHeight: `${msgHeight}px`, minHeight: `${msgHeight}px`, paddingBottom: `${msgPadding}px`}} >
        {channelMessages.map((msg) => (
          <Message
            key={msg.id}
            userName={msg.senderName}
            userURL={msg.senderURL}
            timeStamp={msg.time}
            msg={msg.msg}
          />
        ))}
      </section>

      <section className="chat__textBox" ref={chatTextBoxRef}>
        <TextBox />
      </section>
    </div>
  );
}

export default Chat;
