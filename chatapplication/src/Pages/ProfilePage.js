import "./ProfilePage.css";
import React from "react";
import { Button } from "../components/Button";
import { UserAvatar } from "../components/UserAvatar";
import avartarImg from "../images/main-avatar-image.png";
import { AcademicSkill } from "../components/AcademicSkill";
import { useContext, createContext, useState, useEffect } from "react";
import usernameContext from "../components/UsernameContext";
import { useLocation, useNavigate } from "react-router-dom";
//import Parse, { User } from "parse";
import Parse from "parse/dist/parse.min.js";

// Validation handling to prevent not logged in people from accessing Profile page
// useEffect(() => {
//   async function checkUser() {
//     const currentUser = await Parse.User.currentAsync();
//     if (!currentUser) {
//       alert('You need to be logged in to access this page');
//       // history.push("/auth");
//     }
//   }
//   checkUser();
// }, []);

// https://blog.back4app.com/building-a-real-time-react-application-with-parse/

export default function ProfilePage() {
  const skillSet = [
    "Front-end Development",
    "Back-end Development",
    "Python",
    "Design",
    "Business Analytics",
    "Cloud Architecture",
    "Product Management",
    "Scrum Master",
    "Information Security",
    "Research",
  ];
  const [studentData, fetchData] = useState({
    fname: "",
    lastname: "",
    email: "",
    bio: "",
    age: "",
    image: "",
  });
  const [studyinfo, fetchStudyInfo] = useState({
    HomeUniversity: "",
    StudyProgram: "",
    ITUcourse: "",
  });
  const [skill, setSkill] = useState(null);
  console.log(skill);

  // const location=useLocation();
  // const useriddata2=location.state.data.currentUser2;
  // console.log(useriddata2);

  const navigate = useNavigate();

  useEffect(() => {
    async function fetchusername() {
      //const currentname = new Parse.User({ id: useriddata2 });
      // const parsequery=new Parse.Query("User");
      //parsequery.get("objectId", useriddata2);
      //let done=await currentname.find();
      // const firstname=currentname.get("firstName",currentname.firstName);
      const currentuser = await Parse.User.current();
      const query = new Parse.Query("User");
      try {
        //const student=await query.equalTo("objectId", currentuser.id);
        //console.log(student);
        const student = await query.get(currentuser.id);
        const studentFirstname = student.get("firstName");
        const studentLastname = student.get("lastName");
        const studentEmail = student.get("email");
        const studentBiodata = student.get("bio");
        const studentAge = student.get("Age");
        const studentImage = student.get("Image"); // not working yet
        fetchData({
          fname: studentFirstname,
          lastname: studentLastname,
          email: studentEmail,
          bio: studentBiodata,
          age: studentAge,
          image: studentImage,
        });
        /*const course= new Parse.Query("Course");
  const academicInfo=await course.equalTo("User_ID", currentuser.id);
  let isbdQueryResult = await academicInfo.first();
  console.log(isbdQueryResult);
  const studentHomeuniversity=academicInfo.get("Home_university");
  console.log(studentHomeuniversity);
  const studentHomeuniversityDegree=academicInfo.get("Home_university_degree");
  const studentGuestuniversityCourse=academicInfo.get("Guest_uni_course");
  fetchStudyInfo({HomeUniversity:studentHomeuniversity,StudyProgram:studentHomeuniversityDegree,ITUcourse:studentGuestuniversityCourse});
  */

        const skillQuery = new Parse.Query("Skills");
        skillQuery.equalTo("User_ID", currentuser.toPointer());
        const skill = await skillQuery.first();
        //console.log(skill);
        setSkill([
          skill.get("Front_end_development")
            ? skill.get("Front_end_development")
            : "0",
          skill.get("Backedn_development")
            ? skill.get("Backedn_development")
            : "0",
          skill.get("python") ? skill.get("python") : "0",
          skill.get("Design") ? skill.get("Design") : "0",
          skill.get("Business_Analytics")
            ? skill.get("Business_Analytics")
            : "0",
          skill.get("CloudArchitecture") ? skill.get("CloudArchitecture") : "0",
          skill.get("ProductManagement") ? skill.get("ProductManagement") : "0",
          skill.get("ScrumMaster") ? skill.get("ScrumMaster") : "0",
          skill.get("InformationSecurity")
            ? skill.get("InformationSecurity")
            : "0",
          skill.get("Research") ? skill.get("Research") : "0",
        ]);
      } catch (error) {
        alert(
          `Failed to retrieve the object, with error code: ${error.message}`
        );
      }
    }
    fetchusername();
  }, []);

  return (
    <div className="profile--page">
      <div className="profile--page--layout">
        <div className="profile--avatar--bio">
          <UserAvatar
            onClick={() => {
              console.log("You clicked on me!");
            }}
            avatarSize="size250"
            statusIcon="icon--for--size250"
            imgUrl={avartarImg}
          ></UserAvatar>
          <p>{`${studentData.fname} ${studentData.lastname}`}</p>
          <p>{studentData.bio}</p>

          <div className="profile--controls">
            <Button
              onClick={() => {
                navigate("/chat");
              }}
              type="button"
              buttonSize="btn--width120--height50"
            >
              To Chatroom
            </Button>

            <Button
              onClick={() => {
                navigate("/profile/edit");
              }}
              type="button"
              buttonSize="btn--width120--height50"
            >
              Edit Profile
            </Button>

            <Button
              onClick={() => {
                navigate("/");
              }}
              type="button"
              buttonSize="btn--width120--height50"
            >
              Logout
            </Button>
          </div>
        </div>

        <div className="profile--info">
          <div className="personal--info">
            <h1>Personal Information 🧑</h1>
            <h5>Name : {`${studentData.fname} ${studentData.lastname}`}</h5>
            <h5>Age : {studentData.age}</h5>
            <h5>Academic Skills</h5>
            <div className="skill--section">
              {skill !== null &&
                skill.map((data, index) => {
                  if (data !== 0) {
                    return (
                      <AcademicSkill
                        key={`${index}`}
                        skillName={skillSet[index]}
                        skillRating={data}
                      ></AcademicSkill>
                    );
                  }
                })}
            </div>
          </div>

          <div className="study--info">
            <h1>Study Information 🎓</h1>
            <h5>Home University</h5>
            <h5>Study Program</h5>
            <h5>Course at ITU</h5>
          </div>
        </div>
      </div>
    </div>
  );
}
/*

              */
