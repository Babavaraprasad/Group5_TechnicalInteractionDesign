import "./LoginPage.css";
import { Button } from "../components/Button";
import { DefaultInputField } from "../components/DefaultInputField";
import { Link } from "react-router-dom";
import React, { useState } from "react";
import Parse, { User } from "parse";
import ProfilePage from "./ProfilePage" ;
import { ChatWindow } from "../components/chat-components/ChatWindow";
import { Logo } from "../components/Logo";
import { Slogan } from "../components/Slogan";
import { ClipArt } from "../components/ClipArt"

//used some code from https://reactjs.org/docs/forms.html for validation handling
function LoginPage() {
  const [formState, setFormState] = useState({
    emailText: "",
    password: "",
    emailError: "",
    passwordError: "",
  });
  const navigate=useNavigate();
  const [currentUser, setCurrentUser] = useState(null);
  const getCurrentUser = async function () {
    const currentUser = await Parse.User.current();
    // Update state variable holding current user
    setCurrentUser(currentUser);
    return currentUser;
  };
  function handleEmailChange(event) {
    setFormState({
      ...formState,
      emailText: event.target.value,
      emailError: "",
    });
  }

  function handlePasswordChange(event) {
    setFormState({
      ...formState,
      password: event.target.value,
      passwordError: "",
    });
  }

  function validate() {
    const emailText = formState.emailText;
    const password = formState.password;

    let emailError = "";
    let passwordError = "";

    if (emailText.length === 0) {
      emailError = "Email field must not be empty!";
      setFormState({ ...formState, emailError: emailError });
    } else if (password.length === 0) {
      passwordError = "Password field must not be empty!";
      setFormState({ ...formState, passwordError: passwordError });
    }
    //return emailError === "" && passwordError === "";
  }

  function onSubmitHandler(event) {
    event.preventDefault();
    if (!validate()) {
      const totaldata = {
        emailText: formState.emailText,
        password: formState.password,
      };
      loginverfify(totaldata);
      console.log(formState.emailText);
      console.log(formState.password);
    } else {
      console.log("cannot validate");
    }
  }

  async function loginverfify(totaldata) {
    const parseQuery = new Parse.Query("NewCandidate");
    try {
      parseQuery.equalTo("Email", totaldata.emailText);
      const Person = await parseQuery.first();
      console.log(Person);

      console.log("Email: ", Person.get("Email"));
      console.log("password: ", Person.get("Password"));
      const fetchemail=Person.get("Email");
      const fetchpassword= Person.get("Password");
      const variable =
        ( formState.emailText===fetchemail && formState.password === fetchpassword)
          ? "hurray logged in"
          : "Cannot Login, Email or Password is incorrect!!";
      console.log(variable);
    } catch (error) {
      //alert(`Error! ${"email and password doesnot match"}`);
    }
  }
}

  let StaticTextNewhere =
    "Guest Student chatroom is a place where new and previous guest students create and maintain relationships.";
  let SignupContent = "Sign up to find out more!";

  return (
    <div className="main-container">
      <Logo></Logo>
      <Slogan></Slogan>
    
    <div className="clipart-and-card">
    
      <ClipArt className="clipart-1" imgUrl={"clipart1.png"}></ClipArt>
     
   <div>
    <div className="card-container">
    <div className="card">
        <form className="card--column" onSubmit={onSubmitHandler}>
          <div className="title">Welcome back!</div>
          <DefaultInputField
            onChange={handleEmailChange}
            labelText={"Email"}
            placeholder={"Email"}
            error={formState.emailError}
          ></DefaultInputField>
          <DefaultInputField
            onChange={handlePasswordChange}
            type={"password"}
            labelText={"Password"}
            placeholder={"Password"}
            error={formState.passwordError}
          ></DefaultInputField>
          <a>Forgot your password?</a>
          <Button type="submit" buttonSize="btn--width140--height40">
            Login
          </Button>
        </form>

        <div className="vertical-line"></div>

        <div className="card--column">
          <div className="title">New here?</div>
          <p>{StaticTextNewhere}</p>
          <p>{SignupContent}</p>
          <Link to="/registration">
            <Button
              id="button-id"
              type="button"
              buttonSize="btn--width140--height40"
              buttonStyle={"btn--white"}
            >
              Register
            </Button>
          </Link>
        </div>
      </div>
    </div>
    </div>

        <ClipArt className="clipart-2" imgUrl={"clipart3.png"}></ClipArt>
    
        
    </div>

      <div className="clipart-3-container">
        <ClipArt className="clipart-3" imgUrl={"clipart2.jpg"}></ClipArt>
      </div>

  </div>


  /*<ChatWindow chatId={"SNAj1SfBTE"} loggedInUserId={"SS"}></ChatWindow>*/
  );

export default LoginPage;

/*<ClipArt className="clipart-1" imgUrl={"clipart2.jpg"}></ClipArt>
          <ClipArt className="clipart-2" imgUrl={"clipart3.png"}></ClipArt>*/