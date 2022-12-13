import "./ProfilePage.css";
import React from "react";
import { Button } from "../components/Button";
import { UserAvatar } from "../components/UserAvatar";
import avartarImg from "../images/main-avatar-image.png";
import { AcademicSkill } from "../components/AcademicSkill";
import { useContext, createContext, useState, useEffect } from "react";
import usernameContext from "../components/UsernameContext";
import { useLocation, useNavigate, useParams } from "react-router-dom";
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
  const userId = useParams().userId;
  const [isCurrentUser, setIsCurrentUser] = useState(false);
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
  const [skill, setSkill] = useState(null);
  const navigate=useNavigate();
  const [studentData, fetchData] = useState({fname:"", lastname:"",email:"",bio:"",age:"",image:""});
  const [studyinfo, fetchStudyInfo]=useState({HomeUniversity:"", StudyProgram:"",ITUcourse:""})
  //const [skillData, fetchSkillData]=useState({Front_end_development:"",Business_analytics:"",CloudArchitecture:"",InformationSecurity:"",Backend_development:"",ProductManagement:"",Research:"",python:"",ScrumMaster:"",Design:"",})

  // const location=useLocation();
  // const useriddata2=location.state.data.currentUser2;
  // console.log(useriddata2);

  
useEffect(()=>{
  async function fetchuserdata()
  {
  // Creating the Parse query
   const query = new Parse.Query("User");
   const courseQuery = new Parse.Query("Course");
   const skillQuery = new Parse.Query("Skills");

   const currentuser= await Parse.User.current();
  //  const studentid = await query.get(currentuser.id);
  //  console.log(studentid);

   try{
  //const studentid=await query.get(currentuser.id);
  let student;
  if(userId === currentuser.id || userId === undefined){
    setIsCurrentUser(true);
    student=await query.get(currentuser.id);
  } else {
    student=await query.get(userId);
  }

  // Fetching data from User class
  const studentFirstname=student.get("firstName");
  const studentLastname=student.get("lastName");
  const studentEmail=student.get("email");
  const studentBiodata=student.get("bio");
  const studentAge=student.get("Age");
  let studentImage = '';
  if (student.get("Image")){
     studentImage=student.get("Image")._url} else{
      studentImage = avartarImg;
    };
  fetchData({fname:studentFirstname,lastname:studentLastname,email:studentEmail,bio:studentBiodata,age:studentAge,image:studentImage});
  // Fetching data from Course class
  
  courseQuery.equalTo("User_ID", student.toPointer());
  const course = await courseQuery.first();
  // fetchStudyInfo(studyinfo);
  // console.log(course.get("Home_university"));
  const studentHomeUniversity=course.get("Home_university");
  const studentStudyProgram=course.get("Home_university_degree");
  const studentGuestUniCourse=course.get("Guest_uni_course");
  fetchStudyInfo({HomeUniversity:studentHomeUniversity,StudyProgram:studentStudyProgram,ITUcourse:studentGuestUniCourse});

  // Fetching data from Skills class
  //const skillQuery = new Parse.Query("Skills");
  skillQuery.equalTo("User_ID", student.toPointer());
  const userSkill = await skillQuery.first();
  //console.log(skill);
  userSkill && setSkill([
    userSkill.get("Front_end_development")
      ? userSkill.get("Front_end_development")
      : "0",
    userSkill.get("Backend_development")
      ? userSkill.get("Backend_development")
      : "0",
    userSkill.get("python") ? userSkill.get("python") : "0",
    userSkill.get("Design") ? userSkill.get("Design") : "0",
    userSkill.get("Business_Analytics")
      ? userSkill.get("Business_Analytics")
      : "0",
    userSkill.get("CloudArchitecture") ? userSkill.get("CloudArchitecture") : "0",
    userSkill.get("ProductManagement") ? userSkill.get("ProductManagement") : "0",
    userSkill.get("ScrumMaster") ? userSkill.get("ScrumMaster") : "0",
    userSkill.get("InformationSecurity")
      ? userSkill.get("InformationSecurity")
      : "0",
    userSkill.get("Research") ? userSkill.get("Research") : "0",
  ]);

  //skillQuery.equalTo("User_ID", studentid.toPointer());
  //const skill = await skillQuery.first();
  //const studentFront=skill.get("Front_end_development");
  //fetchSkillData({Front_end_development:studentFront});
}
  catch(error)
  {alert(`Failed to retrieve the object, with error code: ${error.message}`);}
  };
 fetchuserdata();
},[]);

  return (
    <div className="profile--main--container">
      <div className="profile--leftcontainer">
        <div className="profile--leftcontainer--userinformation">
          <UserAvatar
            onClick={() => {
              console.log("You clicked on me!");
            }}
            avatarSize="size250"
            statusIcon="icon--for--size250"
            imgUrl={studentData.image}
          ></UserAvatar>
          <p><b>{studentData.fname} {studentData.lastname}</b></p>
          <p><b>{studyinfo.ITUcourse}</b></p>
          <p>{studentData.bio}</p>
          
          <div className="profile--leftcontainer--pagecontrols">
          <Button
            onClick={() => {
              navigate("/chat");
            }}
            type="button"
            buttonSize="btn--width250--height50"
          >
            To Chatroom
          </Button>

            {isCurrentUser &&
            <Button
              onClick={() => {
                navigate("/profile/edit");
              }}
              type="button"
              buttonStyle="btn--white"
              buttonSize="btn--width250--height50"
            >
              Edit Profile
            </Button>}

            {isCurrentUser &&
            <Button
              onClick={() => {
                navigate("/");
              }}
              type="button"
              buttonSize="btn--width250--height50"
              buttonStyle="btn--red"
            >
              Logout
            </Button>}
          </div>
        </div>
      </div>
      <div className="profile--rightcontainer">
          <div className="profile--rightcontainer--studyinformation">
            <h1>Study Information 🎓</h1>
            <p>Home University: {studyinfo.HomeUniversity}</p>
            <p>Study Program: {studyinfo.StudyProgram}</p>
            <p>Course at ITU: {studyinfo.ITUcourse}</p>
          </div>

          <div className="profile--rightcontainer--skills">
            <h1>Skills 🧩</h1>
            {/* <p>Name : {`${studentData.fname} ${studentData.lastname}`}</p> */}
            {/* <p>Age : {studentData.age}</p> */}
            {/* <h5>Skills</h5> */}
            <div className="skill--section">
            {skill !== null &&
                skill.map((data, index) => {
                  if (data !== "0") {
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
      </div>
    </div>
    );
}
/*

              */
