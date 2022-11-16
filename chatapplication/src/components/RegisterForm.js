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
  confirmPasswordError:""
});


  function onchangefirstname(e) {
    setFirstname(e.target.value);
    setError({...Error,  firstnameError:""});
    
  }
  function onchangeLastname(e) {
    setLastname(e.target.value);
    setError({...Error,  lastnameError:""});
  }
  function onchangeEmail(e) {
    setEmail(e.target.value);
    setError({...Error,  emailError:""});
  }
  function onchangePassword(e) {
    setPassword(e.target.value);
    setError({...Error,passwordError:""});
  }
  function onchangeConfirmPassword(e) {
    setConfirm(e.target.value);
    setError({...Error,confirmPasswordError:""});
  }
console.log(firstname);
 
  function submitRegistration(event) {
    event.preventDefault();

let firstnameError="";
let lastnameError="";
let emailError="";
let passwordError="";
let confirmPasswordError="";

    if(firstname.length===0)
    {firstnameError="First name field cannot not be empty!!";

    setError({...Error, firstnameError: firstnameError});
  }
    else if(lastname.trim()==="")
    {
      lastnameError="Last name field cannot not be empty!!";
      setError({...Error, lastnameError: lastnameError});
    }
    else if(email.trim()==="")
    {
      emailError="Email field cannot be empty!!";
      setError({...Error, emailError:emailError});
    }
    else if(password.trim()==="")
    {
      passwordError="Password field cannot be empty!!";
      setError({...Error, passwordError:passwordError});
    }
    else if(confirm.trim()==="")
    {
      confirmPasswordError="Confirm password field cannot be empty!!";
      setError({...Error, confirmPasswordError:confirmPasswordError});
    }
    else {
      const totaldata = {
        Firstname: firstname,
        lastname: lastname,
        Email: email,
        Password: password,
        ConfirmPassword: confirm,
      };
      console.log(totaldata);
      props.data(totaldata);
    }
  }

  return (
    <Layout>
      <div>
        <h2 className="Page-title">REGISTRATION PAGE</h2>
      </div>
      <h4 className="Header-title">Personal Information</h4>
      <form onSubmit={submitRegistration}>
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
            onClick={submitRegistration}
            type="button"
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
