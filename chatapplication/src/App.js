import './App.css';
import Registration from './Pages/Registration';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import LoginPage from './Pages/LoginPage';
import ProfilePage from './Pages/ProfilePage';
import Parse from "parse/dist/parse.min.js";
import PopUp from "./components/PopUp";
import  { createContext } from "react";

const Parse_application_id='3mi9ZqXheK4giQrfbj1Lr0YMea1Xh8htrniG2Bs6';
const Parse_host_URL='https://parseapi.back4app.com';
const Parse_Javascript_key='6TfX9LutYmZlnSfyLvP0JAuguBwAMKg4NLpSQUtN';


Parse.initialize(Parse_application_id, Parse_Javascript_key);
Parse.serverURL = Parse_host_URL;

// react context usage
export const UserContext = createContext();

function App() {
  return (
    <BrowserRouter>
    <Routes>
      <Route exact path="/" element={<LoginPage />} />
      <Route exact path="/registration" element={<Registration />} />
      <Route exact path="/profile" element={<ProfilePage />} />
      <Route exact path="/registration/popup" element={<PopUp />} />
    </Routes>
  </BrowserRouter>
  );
}
export default App;
