import React from 'react';
import "./Message.css";

import { Avatar } from '@material-ui/core';
import moment from 'moment';

function Message({userName, userURL, timeStamp, msg}) {

    return (
        <div className="message">
            <Avatar className="message__avatar" src={userURL} alt={userName} />
            <section className="message__right">
                <div className="message__user">
                    <h4> {userName} </h4>
                    <small> {moment(timeStamp * 1000).format('MMMM Do YYYY, h:mm:ss a')} </small>
                </div>
                <div className="message__msg">
                    <p> {msg} </p>
                </div>
            </section>
        </div>
    )
}

export default Message;
