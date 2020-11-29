import React from 'react';
import "./TextBox.css";

// Material-ui icons
import FormatBoldOutlinedIcon from '@material-ui/icons/FormatBoldOutlined';
import FormatItalicOutlinedIcon from '@material-ui/icons/FormatItalicOutlined';
import CodeOutlinedIcon from '@material-ui/icons/CodeOutlined';
import LinkOutlinedIcon from '@material-ui/icons/LinkOutlined';
import FormatListNumberedOutlinedIcon from '@material-ui/icons/FormatListNumberedOutlined';
import ListOutlinedIcon from '@material-ui/icons/ListOutlined';
import FormatAlignLeftOutlinedIcon from '@material-ui/icons/FormatAlignLeftOutlined';
import AlternateEmailIcon from "@material-ui/icons/AlternateEmail";
import SentimentSatisfiedOutlinedIcon from '@material-ui/icons/SentimentSatisfiedOutlined';
import AttachFileOutlinedIcon from '@material-ui/icons/AttachFileOutlined';
import SendOutlinedIcon from '@material-ui/icons/SendOutlined';

function TextBox() {
    return (
        <div className="textBox">
            <form className="textBox__form">
                <input placeholder="Message #demo" />
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
                        <SendOutlinedIcon />
                    </div>
                </div>
            </form>
        </div>
    )
}

export default TextBox;
