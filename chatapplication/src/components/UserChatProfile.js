import "./UserChatProfile.css";
import Parse from "parse/dist/parse.min.js";
import React, { useState, useEffect } from "react";
import { UserAvatar } from "../components/UserAvatar";

export const UserChatProfile = ({ userId, onClick }) => {
  // State variables
  const [person, setPerson] = useState(null);
  const [school, SetSchool] = useState(null);
  const [group, setGroup] = useState(null);

  useEffect(() => {
    async function fetchPerson() {
      // create your Parse Query using the Person Class you've created
      const query = new Parse.Query("User"); // user name
      const chatQuery = new Parse.Query("Chat");
      const schoolQuery = new Parse.Query("Course"); // user school

      // run the query
      // use the equalTo filter to look for user with this id.
      query.equalTo("objectId", userId);
      const Person = await query.first();

      if (Person === undefined) {
        chatQuery.equalTo("objectId", userId);
        const Group = await chatQuery.first();
        setPerson(null);
        setGroup(Group);
      } else {
        schoolQuery.equalTo("User_ID", Person.toPointer());
        const School = await schoolQuery.first();
        setGroup(null);
        setPerson(Person);
        SetSchool(School);
      }
    }

    fetchPerson();
  }, [userId]);

  return (
    <div onClick={onClick}>
      {person !== null && person !== undefined && (
        <div className="user-info">
          <UserAvatar
            avatarSize="size52"
            statusIcon="icon--off"
            imgUrl={`${person.get("Image")._url}`}
          ></UserAvatar>

          <div className="user-sort-info">
            <p className="user-name">{`${person.get("firstName")} ${person.get(
              "lastName"
            )}`}</p>
            <p>{`${school.get("Home_university")} ${school.get(
              "Home_university_degree"
            )}`}</p>
          </div>
        </div>
      )}

      {group !== null && group !== undefined && (
        <div className="user-info">
          <UserAvatar
            avatarSize="size52"
            statusIcon="icon--off"
            imgUrl={`${group.get("group_image")._url}`}
          ></UserAvatar>

          <div className="user-sort-info">
            <p className="user-name">{`${group.get("group_name")}`}</p>
          </div>
        </div>
      )}
    </div>
  );
};

/*
export function UserChatProfile() {
  retrieveUser();

  return (
      <div className={"user-name"}>
      </div>
        <UserName name={userName}/>
        <UserSchool school="ITU, Front-End Developer" />
  );
}
*/
