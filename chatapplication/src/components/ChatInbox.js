import React, { useEffect, useState } from "react";
import Parse from "parse/dist/parse.min.js";
import "./ChatInbox.css";
import { ChatInboxCard } from "./ChatInboxCard";

export const ChatInbox = ({
  loggedInUserId,
  selectChatCallback,
  contactInfoCallback,
  newChatwith,
}) => {
  const [queryChat, setqueryChat] = useState();
  const [toggleState, setToggleState] = useState();
  const [newChat, setNewChat] = useState(null);
  const [loggedInUser, setloggedInUser] = useState(null);
  console.log(newChatwith + "2");

  useEffect(() => {
    const createInbox = async function () {
      //find the current user object in the User class
      //removed previous piece code for taking the user because user was already in the if statement using this piece of code: currentUserChat.containedIn("user_id", currentUser);
      //after this change, the requests were reduced
      const currentUser = new Parse.User({ id: loggedInUserId });
      setloggedInUser(currentUser);

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
  }, [loggedInUserId, newChat]); //this array was empty and this was maybe what caused the problem with the numerous requests. Using the loggedInUseId, this code will run only when this component is created from the beginning or when the user is changed.

  useEffect(() => {
    //only for individual chats
    const startNewChat = (contactUser) => {
      const theNewChat = new Parse.Object("Chat");
      queryChat.map((data) => {
        data.UsersObjects.map((user) => {
          //check if chat exists
          if (user.id === contactUser.id) {
            console.log("chat exists!");
            //jump to that chat directly
          } else {
            //start new chat
            let usersInChat = theNewChat.relation("user_id");
            usersInChat.add(contactUser);
            usersInChat.add(loggedInUser);
          }
        });
      });
      try {
        theNewChat.save();
        setNewChat(theNewChat);
        return true;
      } catch (error) {
        alert(`Error!${error.message}`);
        return false;
      }
    };

    newChatwith !== null
      ? startNewChat(newChatwith)
      : console.log("no new chat!");
  }, [newChatwith]);

  const toggleChat = (index) => {
    setToggleState(index);
  };

  let displayName;

  const displayAvatar = (data) => {
    if (data.get("group_name") !== undefined) {
      displayName = `${data.get("group_name")}`;
      return `${data.get("group_image")._url}`;
    } else {
      let userInfo;
      data.UsersObjects.map((user) => {
        if (user.id !== loggedInUserId) {
          userInfo = `${user.get("Image")._url}`;
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
          userInfo = user.id;
        }
      });
      return userInfo;
    }
  };

  return (
    <div>
      {newChat !== null && (
          <div key={`${newChat.id}`}>
            <ChatInboxCard
              onClick={() => {
                toggleChat(newChat.id);
                selectChatCallback(newChat);
                contactInfoCallback(checkUser(newChat));
                console.log(newChat + "3");
              }}
              avatar={displayAvatar(newChat)}
              name={displayName}
              lastMessage={
                newChat.get("last_message") !== undefined
                  ? `${newChat.get("last_message").get("content")}`
                  : " "
              }
              time={`${newChat.get("updatedAt")}`}
              status={toggleState === newChat.id ? "reading" : "unread"}
            ></ChatInboxCard>
          </div>
        ) &&
        setToggleState(newChat.id) &&
        setNewChat(null)}
      {queryChat !== undefined &&
        queryChat
          .sort((a, b) => b.get("updatedAt") - a.get("updatedAt"))
          .map((data) => (
            <div key={`${data.id}`}>
              <ChatInboxCard
                onClick={() => {
                  toggleChat(data.id);
                  selectChatCallback(data);
                  contactInfoCallback(checkUser(data));
                }}
                avatar={displayAvatar(data)}
                name={displayName}
                lastMessage={
                  data.get("last_message") !== undefined
                    ? `${data.get("last_message").get("content")}`
                    : " "
                }
                time={`${data.get("updatedAt")}`}
                status={toggleState === data.id ? "reading" : "unread"}
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

      */
