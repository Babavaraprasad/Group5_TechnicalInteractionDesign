import "./RegisterForm.css";
import Layout from "./Layout";
import { DefaultInputField } from "./DefaultInputField";
import { Button } from "./Button";
import { Link } from "react-router-dom";

function RegisterForm() {
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
          ></DefaultInputField>
        </div>
        <div>
          <DefaultInputField
            labelText={"Last Name*"}
            placeholder={"please type your lastname"}
          ></DefaultInputField>
        </div>
        <div>
          <DefaultInputField
            labelText={"Email"}
            placeholder={"please type your email"}
          ></DefaultInputField>
        </div>
        <div>
          <DefaultInputField
            labelText={"Password"}
            placeholder={"choose your password"}
          ></DefaultInputField>
        </div>
        <div>
          <DefaultInputField
            labelText={"Confirm Password *"}
            placeholder={"confirm your password"}
          ></DefaultInputField>
        </div>
        <div className="route-content-loginpage">
          Already registered? Go to <Link to="/">Login</Link>
        </div>
        <div>
          <Button
            onClick={() => {
              console.log("You clicked on me!");
            }}
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
