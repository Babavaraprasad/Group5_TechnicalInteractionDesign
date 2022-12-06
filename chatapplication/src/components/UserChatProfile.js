import "./UserChatProfile.css";
import ProfilePicture from "../images/daniel-avatar.png";
import Parse from "parse/dist/parse.min.js";
import React, { useState } from "react";
import { User } from "parse";
import { UserAvatar } from "../components/UserAvatar";

const Parse_application_id = "IBqvSrnvlyfIBLTKOD9wyPdva1DVFg2uBq742IHh";
const Parse_host_URL = "https://parseapi.back4app.com";
const Parse_Javascript_key = "D6vNSmMupgdE0RoG1RdAABCMTygugjgxAUeC7Hjs";

Parse.initialize(Parse_application_id, Parse_Javascript_key);
Parse.serverURL = Parse_host_URL;

export const UserChatProfile = () => {
  // State variables
  const [person, setPerson] = useState(null);
  const [school, SetSchool] = useState(null);

  var personImage;
  async function fetchPerson() {
    // create your Parse Query using the Person Class you've created
    const query = new Parse.Query("User"); // user name
    const schoolQuery = new Parse.Query("Course"); // user school

    // use the equalTo filter to look for user with this id.
    query.equalTo("objectId", "mzNz8bWAbC");
    schoolQuery.equalTo("objectId", "dFcXARy2gS");

    // run the query
    const Person = await query.first();
    const School = await schoolQuery.first();

    // Get User Image and save it to global variable
    const personPicture = Person.get("Image")._url;
    personImage = personPicture;

    // access the Parse Object attributes
    console.log("person name: ", Person.get("lastName"));
    console.log("person SCHOOLL: ", School.get("Home_university"));

    setPerson(Person);
    SetSchool(School);
  }

  return (
    <div>
      <button onClick={fetchPerson}>Fetch Person</button>
      {person !== null && (
        <div className="user-info">
          <div>
            <UserAvatar
              avatarSize="size52"
              statusIcon="icon--off"
              imgUrl={`${person.get("Image")._url}`}
            ></UserAvatar>
          </div>

          <div className="user-sort-info">
            <p>{`${person.get("lastName")}`}</p>
            <p>{`${school.get("Home_university")}`}</p>
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
