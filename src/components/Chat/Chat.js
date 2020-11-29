import React, { useState } from "react";
import "./Chat.css";

// Material-ui Icons
import InfoOutlinedIcon from "@material-ui/icons/InfoOutlined";
import StarBorderIcon from "@material-ui/icons/StarBorder";
import StarIcon from "@material-ui/icons/Star";
import PersonAddOutlinedIcon from "@material-ui/icons/PersonAddOutlined";

function Chat() {
    const [starredChannel, setStarredChannel] = useState(false);
    
    const handleStarred = () => {
        setStarredChannel(prev => !prev);
    }

  return (
    <div className="chat">
      <section className="chat__header">
        <div className="chat__headerTitle">
          <h4>
            #general {!starredChannel ? <StarBorderIcon onClick={handleStarred} /> : <StarIcon onClick={handleStarred} />}
          </h4>
          <p> Add a topic </p>
        </div>
        <div className="chat__headerInfo">
          <PersonAddOutlinedIcon />
          <InfoOutlinedIcon />
        </div>
      </section>
    </div>
  );
}

export default Chat;
