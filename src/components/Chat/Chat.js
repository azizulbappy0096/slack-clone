import React, { useState, useEffect } from "react";
import "./Chat.css";

import Message from "../Message/Message";
import TextBox from "../TextBox/TextBox";
import db from "../../utils/firebaseConfig";

// Material-ui Icons
import InfoOutlinedIcon from "@material-ui/icons/InfoOutlined";
import StarBorderIcon from "@material-ui/icons/StarBorder";
import StarIcon from "@material-ui/icons/Star";
import PersonAddOutlinedIcon from "@material-ui/icons/PersonAddOutlined";
import { useParams } from "react-router-dom";
import { useStateValue } from "../../utils/StateProvider";

function Chat() {
  const [starredChannel, setStarredChannel] = useState(false);
  const [channelMessages, setChannelMessages] = useState([]);
  const { roomId } = useParams();
  const [{user, currentChannel}] = useStateValue();

  useEffect(() => {
    db
    .collection("workStation")
    .doc("youtube")
    .collection("user")
      .doc(user?.id)
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

  const handleStarred = () => {
    setStarredChannel((prev) => !prev);
  };

  return (
    <div className="chat">
      <section className="chat__header">
        <div className="chat__headerTitle">
          <h4>
            #{currentChannel}
            {!starredChannel ? (
              <StarBorderIcon onClick={handleStarred} />
            ) : (
              <StarIcon onClick={handleStarred} />
            )}
          </h4>
          <p> Add a topic </p>
        </div>
        <div className="chat__headerInfo">
          <PersonAddOutlinedIcon />
          <InfoOutlinedIcon />
        </div>
      </section>
      <section className="chat__message">
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

      <section className="chat__textBox">
        <TextBox />
      </section>
    </div>
  );
}

export default Chat;
