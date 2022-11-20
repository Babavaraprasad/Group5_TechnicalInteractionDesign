import './App.css';
import Registration from './Pages/Registration';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import LoginPage from './Pages/LoginPage';
import ProfilePage from './Pages/ProfilePage';
import Parse from "parse/dist/parse.min.js";

const Parse_application_id='IBqvSrnvlyfIBLTKOD9wyPdva1DVFg2uBq742IHh';
const Parse_host_URL='https://parseapi.back4app.com';
const Parse_Javascript_key='D6vNSmMupgdE0RoG1RdAABCMTygugjgxAUeC7Hjs';


Parse.initialize(Parse_application_id, Parse_Javascript_key);
Parse.serverURL = Parse_host_URL;

function App() {
  return (
    <BrowserRouter>
    <Routes>
      <Route exact path="/" element={<LoginPage />} />
      <Route exact path="/registration" element={<Registration />} />
      <Route exact path="/profile" element={<ProfilePage />} />
    </Routes>
  </BrowserRouter>
  );
}
export default App;
