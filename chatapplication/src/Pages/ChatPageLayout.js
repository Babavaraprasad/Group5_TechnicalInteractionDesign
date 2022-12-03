import React, { useState } from "react";
import { ChatWindow } from "../components/chat-components/ChatWindow";
import { ChatInbox } from "../components/ChatInbox";
import { Searcharea } from "../components/Searcharea";
import "./ChatPageLayout.css";

export const ChatPageLayout = () => {
  const [currentChat, setCurrentChat] = useState(null);

  //codes partially from https://github.com/templates-back4app/react-js-slack-clone/blob/main/src/Home.js
  const doSelectChat = (chat) => {
    setCurrentChat(null);
    setCurrentChat(chat);
  };

  return (
    <div className="main--container">
      <div className="left-container">
        <div className="user-card"> User Card </div>
        <Searcharea></Searcharea>
        <ChatInbox
          loggedInUserId="CSldIhjC2W"
          selectChatCallback={doSelectChat}
        />
      </div>

      <div className="right--container">
        <div className="sender-card">Sender</div>
        {currentChat !== null && (
          //console.log(currentChat.id),
          <ChatWindow
            chatId={currentChat.id}
            loggedInUserId="CSldIhjC2W"
          />
        )}

        <div className="text-input">Send a message</div>
      </div>
    </div>
  );
};
