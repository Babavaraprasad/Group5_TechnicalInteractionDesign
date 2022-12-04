import "./UserChatProfile.css";
import React, { useState } from "react";
import Parse from "parse/dist/parse.min.js";
import ProfilePicture from "../images/daniel-avatar.png";

export const UserChatProfile = () => {
  // State variables
  const [person, setPerson] = useState(null);

  const [name, setName] = useState("Name");
  const [school, setSchool] = useState("School");
  const [skill, setSkill] = useState("Skill");

  async function fetchPerson() {
    // create your Parse Query using the Person Class you've created
    const query = new Parse.Query("Person");
    // use the equalTo filter to look for user which the name is John. this filter can be used in any data type
    query.equalTo("name", "John");
 
    // run the query
    const Person = await query.first();
    setName(Person.get("name"));
    setSchool(Person.get("email"));
    setSkill("Programmer");

    // access the Parse Object attributes
    console.log("person name: ", Person.get("name"));
    console.log("person email: ", Person.get("email"));

    setPerson(Person);
  }

  return (
    <div>
      <img src={ProfilePicture} id="profile-picture" />
      <div className="user-info">
        <h1>Name: {name}</h1>
        <h2>School: {school}</h2>
        <h2>Skill: {skill}</h2>
      </div>

      <button onClick={fetchPerson}>Fetch Person</button>
      {person !== null && (
        <div>
          <p>{`Name: ${person.get("name")}`}</p>
          <p>{`Email: ${person.get("email")}`}</p>
          <p>{`ID: ${person.get(person.id)}`}</p>
        </div>
      )}
    </div>
  );
};
