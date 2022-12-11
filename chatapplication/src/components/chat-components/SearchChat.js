import React, { useEffect, useState } from "react";
import "./SearchChat.css";
import { Searcharea } from "../Searcharea";
import Parse from "parse/dist/parse.min.js";

export const SearchChat = ({ loggedInUser, newChatCallback, selectChatCallback, contactInfoCallback }) => {
  const [search, setSearch] = useState(null);
  const [course, setCourse] = useState(null);
  //console.log(course);

  useEffect(() => {
    const findCourseList = async function () {
      const courseQuery = new Parse.Query("Course");
      courseQuery.includeAll();

      try {
        let courseList = await courseQuery.find();
        setCourse(courseList);
        return true;
      } catch (error) {
        alert(`Error!${error.message}`);
        return false;
      }
    };
    findCourseList();
  }, []);

  const findUserInCourse = (data) => {
    return data
      .filter((item) =>
        //also get rid of logged in user here!
        item.get("Guest_uni_course").toLowerCase().includes(search)
      )
      .map((item, index) => (
        <li key={`${index}`} className="list-item" onClick={() => {
          //startNewChat(item.get("User_ID"));
          newChatCallback(item.get("User_ID")); // deliver a user object
          contactInfoCallback(item.get("User_ID"));
          setSearch(null);
          }}>
          {item.get("User_ID").id !== loggedInUser &&
          `${item.get("User_ID").get("firstName")} 
            ${item.get("User_ID").get("lastName")}:
            ${item.get("Guest_uni_course")}`}
        </li>
      ));
  };

  return (
    <div className="container">
      <Searcharea onChange={(e) => setSearch(e.target.value)}></Searcharea>
      {search &&
      <div className="result-container">
        <ul className="result-list">
          {course !== null && findUserInCourse(course)}
        </ul>
      </div>}
    </div>
  );
};
