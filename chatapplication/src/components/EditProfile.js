import "./EditProfile.css";
import React, { useState, useEffect } from "react";
import Parse from "parse/dist/parse.min.js";
import Layout from "./Layout";
import { DefaultInputField } from "./DefaultInputField";
import { LargeInputField } from "./LargeInputField";
import { Button } from "./Button";
import { useNavigate } from "react-router-dom";

function EditProfile() {
  const [currentCourseId, setCurrentCourseId] = useState(null);
  const [currentUserId, setCurrentUserId] = useState(null);
  const [userInfo, setUserInfo] = useState({
    firstName: "",
    lastName: "",
    email: "",
    bio: "",
    image: "",
  });
  const [studyinfo, setStudyInfo] = useState({
    HomeUniversity: "",
    StudyProgram: "",
    ITUcourse: "",
  });

  const navigate = useNavigate();

  useEffect(() => {
    const checkCurrentUser = async () => {
      try {
        const user = await Parse.User.current();
        if (user.id === null || user.id === undefined) {
          console.log("no user logged in yet!");
        } else {
          if (currentUserId === null) {
            setCurrentUserId(user.id);

            const courseQuery = new Parse.Query("Course");
            courseQuery.equalTo("User_ID", user.toPointer());
            const course = await courseQuery.first();
            setCurrentCourseId(course.id);
          }
        }
        return true;
      } catch (_error) {}
      return false;
    };
    checkCurrentUser();
  }, []);

  function handleFirstName(e) {
    setUserInfo({
      ...userInfo,
      firstName: e.target.value,
    });
  }

  function handleLastName(e) {
    setUserInfo({
      ...userInfo,
      lastName: e.target.value,
    });
  }

  function handleHomeUni(e) {
    setStudyInfo({
      ...studyinfo,
      HomeUniversity: e.target.value,
    });
  }

  function handleMajor(e) {
    setStudyInfo({
      ...studyinfo,
      StudyProgram: e.target.value,
    });
  }

  function handleCourse(e) {
    setStudyInfo({
      ...studyinfo,
      ITUcourse: e.target.value,
    });
  }

  function handleBio(e) {
    setUserInfo({
      ...userInfo,
      bio: e.target.value,
    });
  }

  async function saveChanges() {
    const updateUser = new Parse.User();
    updateUser.set("objectId", currentUserId);
    userInfo.firstName.trim() !== "" &&
      updateUser.set("firstName", userInfo.firstName);
    userInfo.lastName.trim() !== "" &&
      updateUser.set("lastName", userInfo.lastName);
    userInfo.bio.trim() !== "" && updateUser.set("bio", userInfo.bio);
    console.log(userInfo.bio);

    const updateCourse = new Parse.Object("Course");
    updateCourse.set("objectId", currentCourseId);
    studyinfo.HomeUniversity.trim() !== "" &&
      updateCourse.set("Home_university", studyinfo.HomeUniversity);
    studyinfo.StudyProgram.trim() !== "" &&
      updateCourse.set("Home_university_degree", studyinfo.StudyProgram);
    studyinfo.ITUcourse.trim() !== "" &&
      updateCourse.set("Guest_uni_course", studyinfo.ITUcourse);

    try {
      await updateUser.save();
      await updateCourse.save();
      console.log("success!");
    } catch (error) {
      alert(`Error!${error.message}`);
      return false;
    }
  }

  return (
    <div className="Edit-profile-background">
      <div>
        <h2 className="Page-title">Edit Profile</h2>
      </div>
      <form className="edit-form">
        <DefaultInputField
          labelText={"First Name"}
          placeholder={"Modify your First Name"}
          onChange={handleFirstName}
          error={Error.firstnameError}
        ></DefaultInputField>

        <DefaultInputField
          labelText={"Last Name"}
          placeholder={"Modify your Last Name"}
          onChange={handleLastName}
          error={Error.lastnameError}
        ></DefaultInputField>

        <DefaultInputField
          labelText={"Home University"}
          placeholder={"Enter your current uni name here"}
          onChange={handleHomeUni}
          error={Error.emailError}
        ></DefaultInputField>
        <DefaultInputField
          labelText={"Study program"}
          placeholder={"study program(eg,masters, bachelors etc)"}
          onChange={handleMajor}
          error={Error.emailError}
        ></DefaultInputField>

        <DefaultInputField
          labelText={"Course at ITU"}
          placeholder={"course enrolled at ITU"}
          onChange={handleCourse}
          error={Error.emailError}
        ></DefaultInputField>

        <DefaultInputField
          labelText={"Academic skill"}
          placeholder={"Enter skill(among drop down"}
          //onChange={onchangeEmail}
          error={Error.emailError}
        ></DefaultInputField>
        <DefaultInputField
          labelText={"skill Rating"}
          placeholder={"Rate your skill(1-5)"}
          //onChange={onchangeEmail}
          error={Error.emailError}
        ></DefaultInputField>

        <LargeInputField
          type={"text"}
          labelText={"Describe yourself in few Words"}
          placeholder={"Add your bio"}
          onChange={handleBio}
        ></LargeInputField>

        <Button
          type="button"
          buttonSize="btn--width140--height40"
          onClick={() => {
            saveChanges();
            navigate("/profile");
          }}
        >
          save
        </Button>
      </form>
    </div>
  );
}
export default EditProfile;
