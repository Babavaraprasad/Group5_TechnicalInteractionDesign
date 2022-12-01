import React from "react";
import { ChatWindow } from "../components/chat-components/ChatWindow";
import { Searcharea } from "../components/Searcharea";
import "./ChatPageLayout.css";

export const ChatPageLayout = () => {
          
      return (
          
          <div className="main--container">
            
            <div className="left-container">
                <div className="user-card"> User Card </div>
                <Searcharea></Searcharea>
            </div>

            <div className="right--container">

                <div className="sender-card">Sender</div>
                <ChatWindow></ChatWindow>

                <div className="text-input">Send a message</div>

            </div>

          </div>
    
    );
  };
  