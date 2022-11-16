import './App.css';
import Registration from './Pages/Registration';
import PopUp from "./components/PopUp";
import Parse from "parse/dist/parse.min.js";
/*
const Parse_application_id='IBqvSrnvlyfIBLTKOD9wyPdva1DVFg2uBq742IHh';
const Parse_host_URL='https://parseapi.back4app.com';
const Parse_Javascript_key='D6vNSmMupgdE0RoG1RdAABCMTygugjgxAUeC7Hjs';
*/
const Parse_application_id = "55MvQ5M32fBPBnwFX6ibPi68dfhzaTC7s30fqyIn";
const Parse_host_URL = "https://parseapi.back4app.com";
const Parse_Javascript_key = "N03B5p7O2SK96I653bAOZDzGgIQEq4Tw9VhMPqB9";

Parse.initialize(Parse_application_id, Parse_Javascript_key);
Parse.serverURL = Parse_host_URL;

function App() {
  return (
    <div>
      <PopUp />
    </div>
  );
}
export default App;
