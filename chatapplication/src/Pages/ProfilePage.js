import "./ProfilePage.css";
import React from "react";
import { Button } from "../components/Button";
import { UserAvatar } from "../components/UserAvatar";
import avartarImg from "../images/main-avatar-image.png";
import { AcademicSkill } from '../components/AcademicSkill';
import { useContext ,createContext,useState, useEffect} from "react";
import { useLocation } from "react-router-dom";
import Parse from "parse";
import { useNavigate } from "react-router-dom";

export default function ProfilePage() {

  const [studentdata, setStudentdata]=useState({firstname:"",
   lastname:"",
})
//const user=useContext(usernameContext);
const location=useLocation();
const useriddata=location.state.data.currentUser2;
const navigate = useNavigate();

/*async function getStudentdata(useriddata)
{
  const ParseQuery= Parse.Query("User");
  let todo= await ParseQuery.find(useriddata);
  if(todo !==null)
  {
  try
  {
  const name =ParseQuery.get("firstName");
  const lastname=ParseQuery.get("lastName");
  setStudentdata({...studentdata,firstname:name,lastname:lastname});
  }
  catch(error)
  {alert(`error message: ${error.message}`)}
}else
  {alert("There are no records with given email")}
}

console.log(useriddata);
*/

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
          <h4>{useriddata}</h4>
          <p>Bio</p>
          
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
              console.log("You clicked on me!");
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
            <h5 >Name</h5>
            <h5>Age</h5>
            <h5>Academic Skills</h5>
            <div className="skill--section">
              <AcademicSkill skillName="Programming" skillRating="4"></AcademicSkill>
              <AcademicSkill skillName="Graphic Design" skillRating="4"></AcademicSkill>
              <AcademicSkill skillName="Project Management" skillRating="3"></AcademicSkill>
            </div>
            <div className="profile--controls">
                    <Button
            onClick={() => {
              console.log("You clicked on me!");
            }}
            type="button"
            buttonSize="btn--width120--height50"
          >
            Edit
          </Button>
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
              console.log("You clicked on me!");
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
