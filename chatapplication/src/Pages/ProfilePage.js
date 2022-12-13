import "./ProfilePage.css";
import React from "react";
import { Button } from "../components/Button";
import { UserAvatar } from "../components/UserAvatar";
import avartarImg from "../images/main-avatar-image.png";
import { AcademicSkill } from '../components/AcademicSkill';
import { useContext ,createContext,useState, useEffect} from "react";
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

  const [studentData, fetchData] = useState({fname:"", lastname:"",email:"",bio:"",age:"",image:""});
  const [studyinfo, fetchStudyInfo]=useState({HomeUniversity:"", StudyProgram:"",ITUcourse:""})
  const [skillData, fetchSkillData]=useState({Front_end_development:"",Business_analytics:"",CloudArchitecture:"",InformationSecurity:"",Backend_development:"",ProductManagement:"",Research:"",python:"",ScrumMaster:"",Design:"",})

  const navigate=useNavigate();

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
  const studentid=await query.get(currentuser.id);
  // Fetching data from User class
  const studentFirstname=studentid.get("firstName");
  const studentLastname=studentid.get("lastName");
  const studentEmail=studentid.get("email");
  const studentBiodata=studentid.get("bio");
  const studentAge=studentid.get("Age");
  const studentImage=studentid.get("Image")._url; // not working yet
  fetchData({fname:studentFirstname,lastname:studentLastname,email:studentEmail,bio:studentBiodata,age:studentAge,image:studentImage});
  // Fetching data from Course class
  
  courseQuery.equalTo("User_ID", studentid.toPointer());
  const course = await courseQuery.first();
  // fetchStudyInfo(studyinfo);
  // console.log(course.get("Home_university"));
  const studentHomeUniversity=course.get("Home_university");
  const studentStudyProgram=course.get("Home_university_degree");
  const studentGuestUniCourse=course.get("Guest_uni_course");
  fetchStudyInfo({HomeUniversity:studentHomeUniversity,StudyProgram:studentStudyProgram,ITUcourse:studentGuestUniCourse});

  // Fetching data from Skills class
  skillQuery.equalTo("User_ID", studentid.toPointer());
  const skill = await skillQuery.first();
  const studentFront=skill.get("Front_end_development");
  fetchSkillData({Front_end_development:studentFront});
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
      </div>
      <div classname="profile--rightcontainer">
          <div className="profile--rightcontainer--studyinformation">
            <h1>Study Information 🎓</h1>
            <p>Home University: {studyinfo.HomeUniversity}</p>
            <p>Study Program: {studyinfo.StudyProgram}</p>
            <p>Course at ITU: {studyinfo.ITUcourse}</p>
          </div>

          <div className="profile--rightcontainer--personalinformation">
            <h1>Skills 🧩</h1>
            {/* <p>Name : {`${studentData.fname} ${studentData.lastname}`}</p> */}
            {/* <p>Age : {studentData.age}</p> */}
            {/* <h5>Skills</h5> */}
            <div className="skill--section">
              <AcademicSkill skillName="Programming" skillRating={skillData.Front_end_development}></AcademicSkill>
              <AcademicSkill skillName="Graphic Design" skillRating="4"></AcademicSkill>
              <AcademicSkill skillName="Project Management" skillRating="3"></AcademicSkill>
            </div>
          </div>
      </div>
    </div>
    );
}
