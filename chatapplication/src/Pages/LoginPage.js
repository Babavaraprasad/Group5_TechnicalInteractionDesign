import "./LoginPage.css";
import { Button } from "../components/Button";
import { DefaultInputField } from "../components/DefaultInputField";
import { Link } from "react-router-dom";
import React, { useState } from "react";
import Parse from "parse/dist/parse.min.js";
import {useNavigate} from "react-router-dom";

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
   const usernameValue = totaldata.emailText;;
  const passwordValue = totaldata.password;
  try {
    const loggedInUser = await Parse.User.logIn(usernameValue, passwordValue);
    alert(`Success! User ${loggedInUser.get('username')} has successfully signed in!`);
    navigate("/profile");
    const currentUser = await Parse.User.current();
    console.log(loggedInUser === currentUser);
    setFormState({...formState,emailText:""});
    setFormState({...formState,password:""});
    getCurrentUser();
    return true;
  } catch (error) {
    alert(`Error! ${error.message}`);
    return false;
  }
}

  let StaticTextNewhere =
    "Guest Student chatroom is a place where new and previous guest students create and maintain relationships.";
  let SignupContent = "Sign up to find out more!";

  return (
    <div className="card">
      <form className="card--column" onSubmit={onSubmitHandler}>
        <h1 className="title">Welcome back!</h1>
        <DefaultInputField
          onChange={handleEmailChange}
          labelText={"Email"}
          placeholder={"Email"}
          error={formState.emailError}
        ></DefaultInputField>
        <DefaultInputField
          onChange={handlePasswordChange}
          type={"Password"}
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
        <h1 className="title">New here?</h1>
        <p>{StaticTextNewhere}</p>
        <p>{SignupContent}</p>
        <Link to="/registration">
          <Button
            type="button"
            buttonSize="btn--width140--height40"
            buttonStyle={"btn--white"}
          >
            Register
          </Button>
        </Link>
      </div>
    </div>
  );
}

export default LoginPage;
