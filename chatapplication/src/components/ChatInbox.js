import React, { useEffect, useState } from "react";
import Parse from "parse/dist/parse.min.js";
import "./ChatInbox.css";
import { ChatInboxCard } from "../components/ChatInboxCard";

export const ChatInbox = ({ loggedInUserId, selectChatCallback }) => {
  const [queryChat, setqueryChat] = useState();
  const [toggleState, setToggleState] = useState();

  useEffect(() => {
    const createInbox = async function () {
      //find the current user object in the User class
      const currentUser = new Parse.Query("User");
      currentUser.equalTo("objectId", loggedInUserId);
      const userChat = await currentUser.find();

      //query the Chat class to find ones include the current user
      const currentUserChat = new Parse.Query("Chat");
      if (currentUser !== "") {
        currentUserChat.containedIn("user_id", userChat);
      }
      currentUserChat.descending("updatedAt");
      currentUserChat.includeAll();

      try {
        let chatOrder = await currentUserChat.find();
        for (let chat of chatOrder) {
          let chatUsersRelation = chat.relation("user_id");
          chat.UsersObjects = await chatUsersRelation.query().find();
        }
        setqueryChat(chatOrder);
        //console.log(chatOrder);
        return true;
      } catch (error) {
        alert(`Error!${error.message}`);
        return false;
      }
    };
    createInbox();
  }, []);

  const toggleChat = (index) => {
    setToggleState(index);
  };

  return (
    <div>
      {queryChat !== undefined &&
        queryChat
          .sort(
            (a, b) =>
              b.get("last_message").get("timestamp") -
              a.get("last_message").get("timestamp")
          )
          .map((data, index) => (
            <div key={`${index}`}>
              <ChatInboxCard
                onClick={() => {
                  toggleChat(index);
                  selectChatCallback(data);
                }}
                avatar={`${data.UsersObjects.map((user) => {
                  if (user.id !== loggedInUserId) {
                    return `${user.get("Image")._url}`;
                  }
                }).join("")}`}
                name={`${data.UsersObjects.map((user) => {
                  if (user.id !== loggedInUserId) {
                    //hard coded now! To be changed!
                    return `${user.get("firstName")} ${user.get("lastName")}`;
                  }
                }).join("")}`}
                lastMessage={`${data.get("last_message").get("content")}`}
                time={`${data.get("last_message").get("timestamp")}`}
                status={toggleState === index ? "reading" : "unread"}
              ></ChatInboxCard>
            </div>
          ))}
      {queryChat !== undefined && queryChat.length <= 0 ? (
        <p>{"No results here!"}</p>
      ) : null}
    </div>
  );
};

/*
Currently query user relations in Chat class twice for name and avatar separately, 
how to save the picked user as a varaible/state and use it in the return?
1. use liveQuery?
2. select chat, set read status (learn from "home" in back4app slack clone)
3. how about group chat? no name/avatar for groups yet
*/
