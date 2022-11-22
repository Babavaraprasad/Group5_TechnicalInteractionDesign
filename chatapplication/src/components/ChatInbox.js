import React, { useState } from "react";
import Parse from "parse/dist/parse.min.js";
import "./ChatInbox.css";
import { ChatInboxCard } from "../components/ChatInboxCard";
import avartarImg from "../images/ida-avatar.png";

export const ChatInbox = ({}) => {
  const [queryResults, setQueryResults] = useState();

  const queryMessage = async function () {
    const LatestMessageQuery = new Parse.Query("Message");
    //list the message based on descending time
    LatestMessageQuery.descending("timestamp");

    try {
      let messageOrder = await LatestMessageQuery.find();
      setQueryResults(messageOrder);
      return true;
    } catch (error) {
      alert(`Error!${error.message}`);
      return false;
    }
  };

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
            avatar={avartarImg}
            name={`Chat Id: ${data}`}
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
1. find the chat_id with the message_id inside
2. get the user_id, (the one that is not "mine") -- where do we keep "my" user id?
3. map the list to get the name, avatar, and message itself

<p>{`Chat: ${content}`}</p>
            <p>{`Time: ${content.get("timestamp")}`}</p>
*/