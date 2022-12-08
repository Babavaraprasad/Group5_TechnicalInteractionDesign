import "./EditProfile.css";
import Layout from "./Layout";
import { DefaultInputField } from "./DefaultInputField";
import { LargeInputField } from "./LargeInputField";
import { Button } from "./Button";

function EditProfile() {
  return (
    <div className="Edit-profile-background">
      <div>
        <h2 className="Page-title">Edit Profile</h2>
      </div>
      <form className="edit-form">
        <DefaultInputField
          labelText={"Name"}
          placeholder={"Modify your First Name"}
          // onChange={}
          error={Error.firstnameError}
        ></DefaultInputField>

        <DefaultInputField
          labelText={"Age"}
          placeholder={"Enter your age here"}
          //onChange={onchangeLastname}
          error={Error.lastnameError}
        ></DefaultInputField>

        <DefaultInputField
          labelText={"Home University"}
          placeholder={"Enter your current uni name here"}
          //onChange={onchangeEmail}
          error={Error.emailError}
        ></DefaultInputField>
        <DefaultInputField
          labelText={"Study program"}
          placeholder={"study program(eg,masters, bachelors etc)"}
          //onChange={onchangeEmail}
          error={Error.emailError}
        ></DefaultInputField>

        <DefaultInputField
          labelText={"Course at ITU"}
          placeholder={"course enrolled at ITU"}
          //onChange={onchangeEmail}
          error={Error.emailError}
        ></DefaultInputField>

<DefaultInputField
          labelText={"Academic skill"}
          placeholder={"Enter skill(among drop down"}
          //onChange={onchangeEmail}
          error={Error.emailError}
        ></DefaultInputField>
        <DefaultInputField
          labelText={"skill Rating"}
          placeholder={"Rate your skill(1-5)"}
          //onChange={onchangeEmail}
          error={Error.emailError}
        ></DefaultInputField>

        <LargeInputField
          type={"text"}
          labelText={"Describe yourself in few Words"}
          placeholder={"Add your bio"}
        ></LargeInputField>

        <Button
          type="button"
          buttonSize="btn--width140--height40"
          // onClick={submitRegistration}
        >
          save
        </Button>
      </form>
    </div>
  );
}
export default EditProfile;
