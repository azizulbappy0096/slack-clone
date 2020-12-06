import React, { useState } from "react";
import "./TextBox.css";

import db from "../../utils/firebaseConfig";
import firebase from "firebase";

// Material-ui icons
import FormatBoldOutlinedIcon from "@material-ui/icons/FormatBoldOutlined";
import FormatItalicOutlinedIcon from "@material-ui/icons/FormatItalicOutlined";
import CodeOutlinedIcon from "@material-ui/icons/CodeOutlined";
import LinkOutlinedIcon from "@material-ui/icons/LinkOutlined";
import FormatListNumberedOutlinedIcon from "@material-ui/icons/FormatListNumberedOutlined";
import ListOutlinedIcon from "@material-ui/icons/ListOutlined";
import FormatAlignLeftOutlinedIcon from "@material-ui/icons/FormatAlignLeftOutlined";
import AlternateEmailIcon from "@material-ui/icons/AlternateEmail";
import SentimentSatisfiedOutlinedIcon from "@material-ui/icons/SentimentSatisfiedOutlined";
import AttachFileOutlinedIcon from "@material-ui/icons/AttachFileOutlined";
import SendOutlinedIcon from "@material-ui/icons/SendOutlined";
import { useParams } from "react-router-dom";
import { useStateValue } from "../../utils/StateProvider";

function TextBox() {
  const [userInput, setUserInput] = useState("");
  const { workSpaceId, roomId } = useParams();
  const [{ user }] = useStateValue();

  const handleInput = (e) => {
    const { value } = e.target;
    setUserInput(value);
  };

  const handleSentMsg = (e) => {
    e.preventDefault();

    if (userInput.length > 0) {
      db.collection("workStation")
        .doc(workSpaceId)
        .collection("channels")
        .doc(roomId)
        .collection("messages")
        .add({
          message: userInput,
          senderName: user?.name,
          senderURL: "...",
          timeStamp: firebase.firestore.FieldValue.serverTimestamp(),
        })
        .then(() => {
          setUserInput("");
        });
    }
  };

  return (
    <div className="textBox">
      <form onSubmit={handleSentMsg} className="textBox__form">
        <input
          value={userInput}
          onChange={handleInput}
          placeholder="Message #demo"
        />
        <div className="textBox__editor">
          <div className="textBox__right">
            <FormatBoldOutlinedIcon />
            <FormatItalicOutlinedIcon />
            <CodeOutlinedIcon />
            <LinkOutlinedIcon />
            <FormatListNumberedOutlinedIcon />
            <ListOutlinedIcon />
            <FormatAlignLeftOutlinedIcon />
          </div>
          <div className="textBox__left">
            <AlternateEmailIcon />
            <SentimentSatisfiedOutlinedIcon />
            <AttachFileOutlinedIcon />
            <SendOutlinedIcon onClick={handleSentMsg} />
          </div>
        </div>
      </form>
    </div>
  );
}

export default TextBox;
