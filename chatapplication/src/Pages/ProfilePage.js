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

  const [studentData, fetchData] = useState({fname:"", lastname:"",email:"",bio:"",age:""});
  const [studyinfo, fetchStudyInfo]=useState({HomeUniversity:"", StudyProgram:"",ITUcourse:""})

  const location=useLocation();
  const useriddata2=location.state.data.currentUser2;
  console.log(useriddata2);

  const navigate=useNavigate();

useEffect(()=>{
  async function fetchusername()
  {
    //const currentname = new Parse.User({ id: useriddata2 });
   // const parsequery=new Parse.Query("User");
    //parsequery.get("objectId", useriddata2);
    //let done=await currentname.find();
   // const firstname=currentname.get("firstName",currentname.firstName);
   const currentuser= await Parse.User.current();
   const query = new Parse.Query("User");
   try{//const student=await query.equalTo("objectId", currentuser.id);
  //console.log(student);
  const student=await query.get(currentuser.id);
  const studentFirstname=student.get("firstName");
  const studentLastname=student.get("lastName");
  const studentEmail=student.get("email");
  const studentBiodata=student.get("bio");
  const studentAge=student.get("Age");
  fetchData({fname:studentFirstname,lastname:studentLastname,email:studentEmail,bio:studentBiodata,age:studentAge});
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
}
  catch(error)
  {alert(`Failed to retrieve the object, with error code: ${error.message}`);}
  };
 fetchusername();
},[]);
  
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
          {/* <h4>{useriddata2}</h4> */}
          <p>{`${studentData.fname} ${studentData.lastname}`}</p>

          {useriddata2 !== null && (
            <div>
              <p>{`${studentData.email}`}</p>
            </div>
            )}
          <p>{studentData.bio}</p>
          
          <div className="profile--controls">
          <Button
            onClick={() => {
              navigate("/chat");
            }}
            type="button"
            buttonSize="btn--width120--height50"
          >
            Back to Chat
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
            <h3>Personal Information</h3>
            <h5 >Name : {`${studentData.fname} ${studentData.lastname}`}</h5>
            <h5>Age : {studentData.age}</h5>
            <h5>Academic Skills</h5>
            <div className="skill--section">
              <AcademicSkill skillName="Programming" skillRating="4"></AcademicSkill>
              <AcademicSkill skillName="Graphic Design" skillRating="4"></AcademicSkill>
              <AcademicSkill skillName="Project Management" skillRating="3"></AcademicSkill>
            </div>
          </div>

          <div className="study--info">
            <h3>Study Information</h3>
            <h5>Home University</h5>
            <h5>Study Program</h5>
            <h5>Course at ITU</h5>

          <div className="profile--controls">
                    <Button
            onClick={() => {
              navigate("/profile/edit");
            }}
            type="button"
            buttonSize="btn--width120--height50"
          >
            Edit
          </Button>
          </div>
          </div>
        </div>
      </div>
    </div>
  );
}
