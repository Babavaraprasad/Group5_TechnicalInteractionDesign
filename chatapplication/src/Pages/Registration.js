import RegisterForm from "../components/RegisterForm";
import Parse from "parse/dist/parse.min.js";

export default function Registration(props) {
  const registerDataToBackendFunc = async (userData, setError) => {
    const user = new Parse.User();
    user.set("username", userData.email);
    user.set("email", userData.email);
    user.set("password", userData.password);
    user.set("firstName", userData.firstName);
    user.set("lastName", userData.lastName);

    await user.signUp();
  };

  return <RegisterForm registerFunction={registerDataToBackendFunc} />;
}
