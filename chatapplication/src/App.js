import './App.css';
import Registration from './Pages/Registration';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import LoginPage from './Pages/LoginPage';
import ProfilePage from './Pages/ProfilePage';
import Parse from "parse/dist/parse.min.js";
import { UserChatProfile } from './components/UserChatProfile';
import { ChatPageLayout } from './Pages/ChatPageLayout';
import PopUp from "./components/PopUp";
import  { createContext } from "react";

const Parse_application_id='IBqvSrnvlyfIBLTKOD9wyPdva1DVFg2uBq742IHh';
const Parse_host_URL='https://parseapi.back4app.com';
const Parse_Javascript_key='D6vNSmMupgdE0RoG1RdAABCMTygugjgxAUeC7Hjs';

Parse.initialize(Parse_application_id, Parse_Javascript_key);
Parse.serverURL = Parse_host_URL;

// react context usage
export const UserContext = createContext();

function App() {
  return (
    <BrowserRouter>
    <Routes>
      <Route exact path="/" element={<UserChatProfile />} />
      <Route exact path="/" element={<LoginPage />} />
      <Route exact path="/registration" element={<Registration />} />
      <Route exact path="/profile" element={<ProfilePage />} />
      <Route exact path="/chat" element={<ChatPageLayout />} />
      <Route exact path="/registration/popup" element={<PopUp />} />
      
    </Routes>
  </BrowserRouter>
  );
}
export default App;
