import React from "react";
import "./chat-layout.css";
import { ChatBubble } from "./ChatBubble";
import { useEffect, useRef } from "react";
import { useState } from "react";
import { GetChatMessages, GetChatSubscription } from "./MessageClient";

function CreateChatRow(message, loggedInUserId) {
    const messageUserID = message.userId;
    const isReceiver =  loggedInUserId === messageUserID;
    const bubbleStyle = isReceiver ? "chat--bubble--receiver" : "chat--bubble--sender";
    const rowStyle = isReceiver ? "chat-row-receiver" : "chat-row-sender";
   
    return (
            <div className={rowStyle}>
                <ChatBubble bubbleStyle={bubbleStyle} seen={message.seen} time={message.date}>{message.content}</ChatBubble>
            </div>
    );
}

export const ChatLayout = ({
  chatId,
  loggedInUserId
}) => {
        const divRef = useRef(null);
        const [messages, setMessages] = useState([]);
        const [firstLoad, setFirstLoad] = useState(false);
        const [newMessageSubscription, setNewMessageSubscription] = useState(undefined);

        useEffect( () => {
            async function fetchOldMessages() {
                // You can await here
                if (!firstLoad){ //firstLoad is a boolean var which will be true after the first load. 
                    setFirstLoad(true); // don't run GetChatMessages more than 1 times | setFirstLoad makes the firstLoad true | Since it's trues, other renders won't run this code. Only the first one will fetch old messages
                    setMessages(await GetChatMessages(chatId, 1000)); //whent fetching old messages is done, scroll
                    divRef.current.scrollIntoView({ behavior: 'instant' }); //code and use of useEffect and useRef hook is inspired and taken by stackoverflow https://stackoverflow.com/questions/37620694/how-to-scroll-to-bottom-in-react
                    
                    const Subscription = GetChatSubscription(chatId);

                    Subscription.on('create', message => { //step 3.1 create event code taken from: https://www.back4app.com/docs/platform/parse-server-live-query-example
                        messages.push(message);
                        setMessages(messages); //the variable messages is an array and we add the element message to it. But we are not able to display those changes. setMessages helps us to see these changes
                    });

                    setNewMessageSubscription(Subscription);
                }
              }

              if (!firstLoad){
                fetchOldMessages();
              }
        });

    return (
         <div className={"layout"}>
        <div className="chat--bubble--box">
            {
                messages.map(message => CreateChatRow(message, loggedInUserId)) //takes array named messages
            }
            <div ref={divRef}/> 
        </div>
     </div>
  );
};
