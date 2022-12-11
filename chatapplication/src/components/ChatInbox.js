import React, { useEffect, useState } from "react";
import Parse from "parse/dist/parse.min.js";
import "./ChatInbox.css";
import { ChatInboxCard } from "./ChatInboxCard";
import avartarImg from '../images/main-avatar-image.png'

export const ChatInbox = ({
  loggedInUserId,
  selectChatCallback,
  contactInfoCallback,
  newChatwith,
}) => {
  const [queryChat, setqueryChat] = useState();
  const [toggleState, setToggleState] = useState();
  console.log(queryChat);

  function toUserObject(user) {
    return {
      firstName : user.get("firstName"),
      lastName : user.get("lastName"),
      userId : user.id,
      userImage : user.get("Image") ? user.get("Image")._url : avartarImg,
      }
  }

  function toChatObject(chat){
    return {
      updatedAt : chat.get("updatedAt"),
      groupName : chat.get("group_name"),
      groupImage : chat.get("group_image"),
      lastMessageTimestamp : chat.get("last_message") ? chat.get("last_message").get("timestamp") : new Date(),
      lastMessageContent : chat.get("last_message") ? chat.get("last_message").get("content") : "no contenet yet",
      users : chat.UsersObjects.map(toUserObject),
      id : chat.id
    }
  }

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
        const chatObjects = chatOrder.map(chat => {
          const newChat = toChatObject(chat);
          return newChat;
        })

        setqueryChat(chatObjects);

        let isExisting;
        //error provention for same user in the group with loggedInUser
        chatObjects !== null && chatObjects.map((data)=>{
          data.users.forEach((user) => {
            if (newChatwith !== null) {
              if (user.userId === newChatwith.id) {
                //jump to the existing chat
                toggleChat(data.id);
                selectChatCallback(data);
                contactInfoCallback(checkUser(data));
              return isExisting = true;
        }
      }});
        });

      //create new individual chat from searching
      const startNewChat = async (contactUser) => {
      const theNewChat = new Parse.Object("Chat");
           //start new chat
            let usersInChat = theNewChat.relation("user_id");
            usersInChat.add(contactUser);
            usersInChat.add(currentUser);
      try {
        await theNewChat.save();
        theNewChat.UsersObjects = await usersInChat.query().find();
        const theNewChatObject = toChatObject(theNewChat);
        setqueryChat([...queryChat, theNewChatObject]);
        //jump to the new chat directly
        toggleChat(theNewChatObject.id);
        selectChatCallback(theNewChatObject);
        contactInfoCallback(checkUser(theNewChatObject));
        //console.log(theNewChat);

        return true;
      } catch (error) {
        alert(`Error!${error.message}`);
        return false;
      }
    };

    isExisting !== null && isExisting !== true && newChatwith !== null && startNewChat(newChatwith);

      } catch (error) {
        alert(`Error!${error.message}`);
        return false;
      }
    };
    createInbox();
  }, [newChatwith, loggedInUserId]); //this array was empty and this was maybe what caused the problem with the numerous requests. Using the loggedInUseId, this code will run only when this component is created from the beginning or when the user is changed.

  const toggleChat = (index) => {
    setToggleState(index);
  };

  let displayName;

  const displayAvatar = (data) => {
    if (data.groupName !== undefined) {
      displayName = `${data.groupName}`
      return `${data.groupImage}`;
    } else {
      let userInfo;
      data.users.forEach((user) => {
        if (user.userId !== loggedInUserId) {
          userInfo = `${user.userImage}`
          displayName = `${user.firstName} ${user.lastName}`;
        }
      });
      return userInfo;
    }
  };

  const checkUser = (data) => {
    if (data.groupName !== undefined) {
      return data.id;
    } else {
      let userInfo;
      data.users.forEach((user) => {
        if (user.userId !== loggedInUserId) {
          userInfo = user.userId;
        }
      });
      return userInfo;
    }
  };

  const sortingFunction = (a, b) =>
  {
    const difference = b.lastMessageTimestamp - a.lastMessageTimestamp;
    return difference;
  };


  return (
    <div>
      {queryChat !== undefined &&
        queryChat
          .sort(
            sortingFunction
          )
          .map((data, index) => (
            <div key={`${index}`}>
              <ChatInboxCard
                onClick={() => {
                  toggleChat(data.id);
                  selectChatCallback(data);
                  contactInfoCallback(checkUser(data));
                }}
                avatar={displayAvatar(data)}
                name={displayName}
                lastMessage={`${data.lastMessageContent}`}
                time={`${data.lastMessageTimestamp}`}
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

      */
