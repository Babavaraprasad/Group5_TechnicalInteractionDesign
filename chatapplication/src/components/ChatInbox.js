import React, { useEffect, useState } from "react";
import Parse from "parse/dist/parse.min.js";
import "./ChatInbox.css";
import { ChatInboxCard } from "./ChatInboxCard";

export const ChatInbox = ({ loggedInUserId, selectChatCallback, contactInfoCallback }) => {
  const [queryChat, setqueryChat] = useState();
  const [toggleState, setToggleState] = useState();

  useEffect(() => {
    const createInbox = async function () {
      //find the current user object in the User class
      //removed previous piece code for taking the user because user was already in the if statement using this piece of code: currentUserChat.containedIn("user_id", currentUser);
      //after this change, the requests were reduced
      const currentUser = new Parse.User({ id: loggedInUserId });

      //query the Chat class to find ones include the current user
      const currentUserChat = new Parse.Query("Chat");
      if (currentUser !== "") {
        currentUserChat.containedIn("user_id", [currentUser.toPointer()]);
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
  }, [loggedInUserId]); //this array was empty and this was maybe what caused the problem with the numerous requests. Using the loggedInUseId, this code will run only when this component is created from the beginning or when the user is changed.

  const toggleChat = (index) => {
    setToggleState(index);
  };

  let displayName;

  const displayAvatar = (data) => {
    if (data.get("group_name") !== undefined) {
      displayName = `${data.get("group_name")}`
      return `${data.get("group_image")._url}`;
    } else {
      let userInfo;
      data.UsersObjects.map((user) => {
        if (user.id !== loggedInUserId) {
          userInfo = `${user.get("Image")._url}`
          console.log(userInfo);
          displayName = `${user.get("firstName")} ${user.get("lastName")}`;
        }
      });
      return userInfo;
    }
  };

  
  const checkUser = (data) => {
    if (data.get("group_name") !== undefined) {
      return data.id;
    } else {
      let userInfo;
      data.UsersObjects.map((user) => {
        if (user.id !== loggedInUserId) {
          userInfo = user.id
        }
      });
      return userInfo;
    }
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
                  contactInfoCallback(checkUser(data))
                }}
                avatar={displayAvatar(data)}
                name={displayName}
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
*/
