import React from "react";
import "./ChatInboxCard.css";
import { UserAvatar } from "./UserAvatar";

const MESSAGESTATUS = ["read", "unread"];

export const ChatInboxCard = ({
  avatar,
  name,
  lastMessage,
  time,
  onClick,
  status,
}) => {
  const checkStatus = MESSAGESTATUS.includes(status)
    ? status
    : MESSAGESTATUS[1];

  return (
    <div className={"inbox--card"} onClick={onClick} avatar={avatar}>
      <UserAvatar
        onClick={() => {
          console.log("You clicked on me!");
        }}
        avatarSize="size48"
        statusIcon="icon--for--size48"
        imgUrl={avatar}
      ></UserAvatar>
      
      <div className="inbox--card--content">
        <div className={`inbox--card--name--message ${checkStatus}`}>
          <p>{name}</p>
          <p>{lastMessage}</p>
        </div>
        <p className="inbox--card--time">{time}</p>
      </div>
    </div>
  );
};

/*
//COMPONENT IN JSX! DON'T FORGET TO IMPORT THE COMPONENT!

import { ChatInboxCard } from "../components/ChatInboxCard";
import avartarImg from "../images/ida-avatar.png";
    <div>
        <ChatInboxCard
        onClick={() => {
          console.log("You clicked on me!");
        }}
        avatar={avartarImg}
        name="Ida"
        lastMessage="Message content here"
        time="19:23"
      ></ChatInboxCard>
    </div>
*/
