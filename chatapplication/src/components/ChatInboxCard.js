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

  const messageTime = new Date(time);
  const hour = messageTime.getHours();
  const minute = messageTime.getMinutes();
  const dayOfWeek = messageTime.toLocaleString("default", { weekday: "long" });
  const dayOfMonth = messageTime.toLocaleDateString("default", {
    month: "numeric",
    day: "numeric",
  });
  const dayOfYear = messageTime.toLocaleDateString("default", {
    month: "numeric",
    day: "numeric",
    year: "numeric",
  });

  const currentTime = new Date();
  const today = currentTime.setHours(0, 0, 0, 0);
  const yesterday = new Date(currentTime.getTime() - 24 * 60 * 60 * 1000);
  const lastWeek = new Date(currentTime.getTime() - 7 * 24 * 60 * 60 * 1000);
  const lastMonth = new Date(currentTime.getTime() - 30 * 24 * 60 * 60 * 1000);
  const displayTime =
    messageTime < lastMonth
      ? `${dayOfYear}`
      : messageTime < lastWeek
      ? `${dayOfMonth}`
      : messageTime < yesterday
      ? `${dayOfWeek}`
      : messageTime < today
      ? `Yesterday`
      : `${hour}:${minute}`;

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
        <div className={`inbox--card--name--time ${checkStatus}`}>
          <p>{name}</p>
          <p className="inbox--card--time">{displayTime}</p>
        </div>
        <p className={`inbox--card--message ${checkStatus}`}>{lastMessage}</p>
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
