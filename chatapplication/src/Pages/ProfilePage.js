import "./ProfilePage.css";
import React from "react";
import { Button } from "../components/Button";
import { UserAvatar } from "../components/UserAvatar";
import avartarImg from "../images/main-avatar-image.png";
import { AcademicSkill } from '../components/AcademicSkill';
import { useContext ,createContext,useState, useEffect} from "react";
import usernameContext from "../components/UsernameContext";
import { useLocation, useNavigate } from "react-router-dom";
import Parse, { User } from "parse/dist/parse.min.js";

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
  const [user, setUser] = useState(null);

  const [firstName, setfirstName] = useState("Firstname");
  const [email, setEmail] = useState("Email");

  const location=useLocation();
  const useriddata2=location.state.data.currentUser2;
  console.log(useriddata2)

  async function fetchUser() {
    // creating Parse Query using User class
    const query = new Parse.Query('User');
    // this filter can be used in any data type
    query.equalTo('id', useriddata2); // useriddata2
    // run the query
    const User = await query.first();
    setfirstName(User).get("firstName");
    setEmail(User).get("email");
    // access the Parse Object attributes
    console.log('person name: ', User.get('firstName'));
    console.log('person email: ', User.get('email'));
    console.log('person id: ', User.id);

    setUser(User);
    // fetchPerson();
  }

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
          <p>useriddata2</p>

          <button onClick={fetchUser}>Fetch User</button>
          {user !== null && (
            <div>
              <p>{`Email: ${user.get("email")}`}</p>
            </div>
            )}
          <p>Bio</p>
          
          <div className="profile--controls">
          <Button
            onClick={() => {
              console.log("You clicked on me!");
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
