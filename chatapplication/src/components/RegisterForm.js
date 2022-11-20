import "./RegisterForm.css";
import Layout from "./Layout";
import { DefaultInputField } from "./DefaultInputField";
import { Button } from "./Button";
import { Link } from "react-router-dom";
import { useState } from "react";

function RegisterForm(props) {
  const [firstname, setFirstname] = useState("");
  const [lastname, setLastname] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");

  const [Error, setError] = useState({
    firstnameError: "",
    lastnameError: "",
    emailError: "",
    passwordError: "",
    confirmPasswordError: "",
  });

  function onchangefirstname(e) {
    setFirstname(e.target.value);
    setError({ ...Error, firstnameError: "" });
  }

  function onchangeLastname(e) {
    setLastname(e.target.value);
    setError({ ...Error, lastnameError: "" });
  }

  function onchangeEmail(e) {
    setEmail(e.target.value);
    setError({ ...Error, emailError: "" });
  }

  function onchangePassword(e) {
    setPassword(e.target.value);
    setError({ ...Error, passwordError: "" });
  }

  function onchangeConfirmPassword(e) {
    setConfirm(e.target.value);
    setError({ ...Error, confirmPasswordError: "" });
  }

  console.log(firstname);

  async function submitRegistration(event) {
    event.preventDefault();

    let firstnameError = "";
    let lastnameError = "";
    let emailError = "";
    let passwordError = "";
    let confirmPasswordError = "";

    let hasError = false;

    if (firstname.length === 0) {
      firstnameError = "First name field cannot not be empty!";
      setError({ ...Error, firstnameError: firstnameError });
      hasError = true;
    }

    if (lastname.trim() === "") {
      lastnameError = "Last name field cannot not be empty!";
      setError({ ...Error, lastnameError: lastnameError });
      hasError = true;
    }

    if (email.trim() === "") {
      emailError = "Email field cannot be empty!";
      setError({ ...Error, emailError: emailError });
      hasError = true;
    }

    if (password.trim() === "") {
      passwordError = "Password field cannot be empty!";
      setError({ ...Error, passwordError: passwordError });
      hasError = true;
    }

    if (confirm.trim() === "") {
      confirmPasswordError = "Confirm password field cannot be empty!";
      setError({ ...Error, confirmPasswordError: confirmPasswordError });
      hasError = true;
    }

    if (password !== confirm) {
      confirmPasswordError = "Password does not match!";
      setError({ ...Error, confirmPasswordError: confirmPasswordError });
      hasError = true;
    }

    if (!hasError) {
      const registrationData = {
        firstName: firstname,
        lastName: lastname,
        email: email,
        password: password,
      };

      console.log(registrationData);

      //put the logic of what happens after registration inside try
      try {
        await props.registerFunction(registrationData);
      } catch (error) {
        setError({ ...Error, confirmPasswordError: error.message });
      }
    }
  }

  return (
    <Layout>
      <div>
        <h2 className="Page-title">REGISTRATION PAGE</h2>
      </div>
      <h4 className="Header-title">Personal Information</h4>
      <form>
        <div>
          <DefaultInputField
            labelText={"First Name*"}
            placeholder={"please type your firstname"}
            onChange={onchangefirstname}
            error={Error.firstnameError}
          ></DefaultInputField>
        </div>
        <div>
          <DefaultInputField
            labelText={"Last Name*"}
            placeholder={"please type your lastname"}
            onChange={onchangeLastname}
            error={Error.lastnameError}
          ></DefaultInputField>
        </div>
        <div>
          <DefaultInputField
            labelText={"Email"}
            placeholder={"please type your email"}
            onChange={onchangeEmail}
            error={Error.emailError}
          ></DefaultInputField>
        </div>
        <div>
          <DefaultInputField
            labelText={"Password"}
            placeholder={"choose your password"}
            onChange={onchangePassword}
            error={Error.passwordError}
          ></DefaultInputField>
        </div>
        <div>
          <DefaultInputField
            labelText={"Confirm Password *"}
            placeholder={"confirm your password"}
            onChange={onchangeConfirmPassword}
            error={Error.confirmPasswordError}
          ></DefaultInputField>
        </div>
        <div className="route-content-loginpage">
          Already registered? Go to <Link to="/">Login</Link>
        </div>
        <div>
          <Button
            type="button"
            onClick={submitRegistration}
            buttonSize="btn--width140--height40"
          >
            Register
          </Button>
        </div>
      </form>
    </Layout>
  );
}
export default RegisterForm;
