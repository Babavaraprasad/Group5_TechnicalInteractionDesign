import React, { useEffect, useState } from "react";
import Parse from "parse/dist/parse.min.js";
import "./ChatInbox.css";
import { ChatInboxCard } from "./ChatInboxCard";

export const ChatInbox = ({
  loggedInUserId,
  selectChatCallback,
  contactInfoCallback,
}) => {
  const [queryChat, setqueryChat] = useState(null);
  const [toggleState, setToggleState] = useState();
  //console.log(queryChat);
  
  function toUserObject(user) {
    return {
      firstName: user.get("firstName"),
      lastName: user.get("lastName"),
      userId: user.id,
      userImage: user.get("Image")?._url,
    };
  }

  function toChatObject(chat) {
    return {
      updatedAt: chat.get("updatedAt"),
      groupName: chat.get("group_name"),
      groupImage: chat.get("group_image")?._url,
      lastMessageTimestamp: chat.get("last_message").get("timestamp"),
      lastMessageContent: chat.get("last_message").get("content"),
      users: chat.UsersObjects.map(toUserObject),
      id: chat.id,
    };
  }

  async function getChatSub(loggedInUserId, limit) {
    const parseApplicationId = "MVy8szIW1fArDFhiZuo8qcwBzN4JF1vqrxSOEaTB";
    const serverUrl = "wss://nansenditgroup5.b4a.io";
    const parseJsKey = "SWeoiB6okRNA8gMrG3CbbIqlGbnqRRmoFj7BwXZa";

    const client = new Parse.LiveQueryClient({
      applicationId: parseApplicationId,
      serverURL: serverUrl,
      javascriptKey: parseJsKey,
    });

    let chats = [];

    client.open();

    //query the Chat class to find ones include the current user
    const currentUserChat = new Parse.Query("Chat");
    //currentUserChat.lessThanOrEqualTo("updatedAt", new Date());
    currentUserChat.containedIn("user_id", [new Parse.User({ id: loggedInUserId }).toPointer()]);
    currentUserChat.limit(limit).descending("updatedAt").includeAll();

    const subscription = await client.subscribe(currentUserChat);
    console.log("subscribed!");

    subscription.on("open", async (chat) => {
      const chatOrder = await currentUserChat.find();
      console.log(chatOrder);

    for (let chat of chatOrder) {
      let chatUsersRelation = chat.relation("user_id");
      chat.UsersObjects = await chatUsersRelation.query().find();
      console.log(toChatObject(chat));
      chats.push(toChatObject(chat));
    }
      setqueryChat(chats);
    });

    //everytime a new chat is created in b4app, subscription.on() will be called
    subscription.on("create", (chat) => {
      const newChat = toChatObject(chat);
      //setqueryChat((previousChats) => [...previousChats, newChat]);
    });

    subscription.on("update", (chat) => {
      console.log("updated!");
      const newChat = toChatObject(chat);
      console.log(newChat);
      /*
      let updateChats;
      for (let chat of chats){
        if (newChat.id === chat.id){
          console.log(chat);
          //const updateChats = {...chat, desc: newChat};
        }
      };
      */
      //setqueryChat((previousChats) => [...previousChats, updateChats]);
    });
  }

  useEffect(() => {
    const createInbox = async function () {
      //const oldChats = await getPreviousChat(loggedInUserId, 50);
      

      const subscription = getChatSub(loggedInUserId, 50);
    };

    createInbox();
  }, [loggedInUserId]); //this array was empty and this was maybe what caused the problem with the numerous requests. Using the loggedInUseId, this code will run only when this component is created from the beginning or when the user is changed.

  const toggleChat = (index) => {
    setToggleState(index);
  };

  let displayName;

  const displayAvatar = (data) => {
    if (data.groupName !== undefined) {
      displayName = `${data.groupName}`;
      return `${data.groupImage}`;
    } else {
      let userInfo;
      data.users.map((user) => {
        if (user.userId !== loggedInUserId) {
          userInfo = `${user.userImage}`;
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
      data.UsersObjects.map((user) => {
        if (user.userId !== loggedInUserId) {
          userInfo = user.id;
        }
      });
      return userInfo;
    }
  };

  const sortingFunction = (a, b) => {
    const difference = b.lastMessageTimestamp - a.lastMessageTimestamp;
    return difference;
  };

  return (
    <div>
      {queryChat !== null &&
        queryChat.sort(sortingFunction).map((data, index) => (
          <div key={`${index}`}>
            <ChatInboxCard
              onClick={() => {
                toggleChat(index);
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
      {queryChat !== null && queryChat.length <= 0 ? (
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
