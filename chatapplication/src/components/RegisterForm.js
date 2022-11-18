import "./RegisterForm.css";
import Layout from "./Layout";
import { DefaultInputField } from "./DefaultInputField";
import { Button } from "./Button";
import { Link } from "react-router-dom";

function RegisterForm() {
  return (
    <Layout>
      <div>
        <h2 className="Page-title">Register New Account</h2>
      </div>
      <form className="registration-form">
        <DefaultInputField
          labelText={"First Name*"}
          placeholder={"Please type your First Name"}
        ></DefaultInputField>

        <DefaultInputField
          labelText={"Last Name*"}
          placeholder={"Please type your Last Name"}
        ></DefaultInputField>

        <DefaultInputField
          labelText={"Email"}
          placeholder={"Please type your Email"}
        ></DefaultInputField>

        <DefaultInputField
          labelText={"Password"}
          placeholder={"Choose your Password"}
          type={"password"}
        ></DefaultInputField>

        <DefaultInputField
          labelText={"Confirm Password *"}
          placeholder={"Confirm your Password"}
          type={"password"}
        ></DefaultInputField>

        <div className="route-content-loginpage">
          Already registered? Go to <Link to="/">Login</Link>
        </div>

        <Button type="button" buttonSize="btn--width140--height40">
          Register
        </Button>
      </form>
    </Layout>
  );
}
export default RegisterForm;
