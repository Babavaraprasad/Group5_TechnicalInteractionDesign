import "./LoginPage.css";
import { Button } from "../components/Button";
import { DefaultInputField } from "../components/DefaultInputField";
import { Link } from "react-router-dom";
import React, { useState } from "react";

//used some code from https://reactjs.org/docs/forms.html for validation handling
function LoginPage() {
  const [formState, setFormState] = useState({
    emailText: "",
    password: "",
    emailError: "",
    passwordError: "",
  });

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
    }

    if (password.length === 0) {
      passwordError = "Password field must not be empty!";
      setFormState({ ...formState, passwordError: passwordError });
    }

    return emailError === "" && passwordError === "";
  }

  function onSubmitHandler(event) {
    if (!validate()) {
    }
    event.preventDefault();
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
