import RegisterForm from "../components/RegisterForm";
import Parse from "parse/dist/parse.min.js";
import { useState } from "react";
import {useNavigate} from "react-router-dom";


export default function Registration(props) {

  const[signupsuccess, setSignupSuccess]=useState(false);
  const navigate=useNavigate();

  const registerDataToBackendFunc = async (userData, setError) => {
   
    try {
      const user = new Parse.User();
    user.set("username", userData.email);
    user.set("email", userData.email);
    user.set("password", userData.password);
    user.set("firstName", userData.firstName);
    user.set("lastName", userData.lastName);
    await user.signUp();
    navigate("/registration/popup", {state:{name:userData.firstName}});
    }
    catch(error)
    {
     alert(
      `error ! ${error}`
     );
     setSignupSuccess(false);
    }

  };

  const successStatus=signupsuccess;

  return <RegisterForm registerFunction={registerDataToBackendFunc} success={successStatus}/>;
}
