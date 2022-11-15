import RegisterForm from "../components/RegisterForm";
import Parse from "parse/dist/parse.min.js";
import PopUp from "../components/PopUp";

export default function Registration(props) {
  async function Registerdatatobackend(totaldata) {
    try {
      const parseQuery = new Parse.Object("NewCandidate");
      parseQuery.set("Firstname", totaldata.Firstname);
      parseQuery.set("LastName", totaldata.lastname);
      parseQuery.set("Email", totaldata.Email);
      parseQuery.set("Password", totaldata.Password);
      parseQuery.set("ConfirmPassword", totaldata.ConfirmPassword);
      await parseQuery.save();
      <PopUp message={"You have successfully registered"} />;
    } catch (error) {
      console.log("error in backend", error);
    }
  }
  return <RegisterForm data={Registerdatatobackend} />;
}
