import React, { useState, useEffect } from "react";
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
import MoreHorizOutlinedIcon from '@material-ui/icons/MoreHorizOutlined';

function TextBox() {
  const [userInput, setUserInput] = useState("");
  const [showMore, setShowMore] = useState(false);
  const [showMoreBtn, setShowMoreBtn] = useState(true);
  const [isBlue, setIsBlue] = useState(false)
  const { workSpaceId, roomId } = useParams();
  const [{ user }] = useStateValue();

useEffect(() => {
  window.addEventListener("resize", () => {
    console.log(window.innerWidth)
    if(window.innerWidth < 568) {
      setShowMoreBtn(true);
    }else {
      setShowMoreBtn(false);
    }
  })

  return () => {
    window.addEventListener("resize", () => {
      console.log(window.innerWidth)
      if(window.innerWidth < 568) {
        setShowMoreBtn(true);
      }else {
        setShowMoreBtn(false);
      }
    })
  }
}, [])

  const handleInput = (e) => {
    const { value } = e.target;
    if(value.length > 0) {
      setIsBlue(true)
    }else {
      setIsBlue(false)
    }
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
          setIsBlue(false)
        });
    }
  };

  const handleMore = () => {
    setShowMore(prev => !prev);
  }

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
            {showMoreBtn && window.innerWidth < 568 ? <MoreHorizOutlinedIcon onClick={handleMore} /> : <div className="textBox__right--mobile" >
            <FormatListNumberedOutlinedIcon />
            <ListOutlinedIcon />
            <FormatAlignLeftOutlinedIcon />
            </div>}
            <div className="textBox__right--mobile" style={!showMore ? {display: "none"} : {display: "block"}} >
            <FormatListNumberedOutlinedIcon />
            <ListOutlinedIcon />
            <FormatAlignLeftOutlinedIcon />
            </div>
            
          </div>
          <div className="textBox__left">
            <AlternateEmailIcon />
            <SentimentSatisfiedOutlinedIcon />
            <AttachFileOutlinedIcon />
            <SendOutlinedIcon onClick={handleSentMsg} style={isBlue ? {color: "blue"} : {color: "rgb(92, 90, 90)"}} />
          </div>
        </div>
      </form>
    </div>
  );
}

export default TextBox;
