import React, { useState } from "react";
import Parse from "parse/dist/parse.min.js";
import "./ChatInbox.css";
import { ChatInboxCard } from "../components/ChatInboxCard";

export const ChatInbox = ({}) => {
  const [queryResults, setQueryResults] = useState();

  const queryMessage = async function () {
    const LatestMessageQuery = new Parse.Query("Message");
    //list the message based on descending time
    LatestMessageQuery.descending("timestamp");
    LatestMessageQuery.includeAll();

    try {
      let messageOrder = await LatestMessageQuery.find();
      setQueryResults(messageOrder);
      return true;
    } catch (error) {
      alert(`Error!${error.message}`);
      return false;
    }
  };

  const getUserName = (message) => {
    try{
      return `${message.get("user").get("firstName")} ${message.get("user").get("lastName")}`;
    } catch (_error) {
      return "Some user";
    }
  }

  return (
    <div>
      <button onClick={() => queryMessage()}>Click</button>
      {queryResults !== undefined &&
        queryResults.map((data, index) => (
          <div key={`${index}`}>
            <ChatInboxCard
              onClick={() => {
                console.log("You clicked on me!");
              }}
              avatar={`${JSON.parse(JSON.stringify(data.get("user").get("Image"))).url}`}
              name={`${getUserName(data)}`}
              lastMessage={`${data.get("content")}`}
              time={`${data.get("timestamp")}`}
            ></ChatInboxCard>
          </div>
        ))}
      {queryResults !== undefined && queryResults.length <= 0 ? (
        <p>{"No results here!"}</p>
      ) : null}
    </div>
  );
};

/*
1. find the chat include the messages inside and list in message time descending order
2. select chat, set read status (learn from "home" in back4app slack clone)
*/
