import "./UserChatProfile.css";
import ProfilePicture from "../Graphics/profilePicture.png";

function UserName(props) {
  return <h1>{props.name}</h1>;
}

function UserSchool(props) {
  /*
  // get user info from the database or API
    let firstName = "Baba",
    school = "ITU",
    skill = "Front-End Developer"
    ;

  // return values - make it work
  return {
    firstName: firstName,
    lastName: lastName,
  };
  */

  return <h2>{props.school}</h2>;
}

export function UserChatProfile() {
  return (
    <div className="user-info">
      <img src={ProfilePicture} id="profile-picture" />

      <div className="user-name">
        <UserName name="Baba" />
        <UserSchool school="ITU, Front-End Developer" />
      </div>
    </div>
  );
}
