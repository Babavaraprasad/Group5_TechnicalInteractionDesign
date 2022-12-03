import './App.css';
import Registration from './Pages/Registration';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import LoginPage from './Pages/LoginPage';
import ProfilePage from './Pages/ProfilePage';
import Parse from "parse/dist/parse.min.js";
import { ChatPageLayout } from './Pages/ChatPageLayout';

const Parse_application_id='iGGclABDkQ4dkphbfmHIFyDQAymrHtm5hzYGqEoy';
const Parse_host_URL='https://parseapi.back4app.com';
const Parse_Javascript_key='UJL0HBwieX5r4RoYvesJHG5MMxUIZCFCtQVL17dI';

Parse.initialize(Parse_application_id, Parse_Javascript_key);
Parse.serverURL = Parse_host_URL;

function App() {
  return (
    <BrowserRouter>
    <Routes>
      <Route exact path="/" element={<LoginPage />} />
      <Route exact path="/registration" element={<Registration />} />
      <Route exact path="/profile" element={<ProfilePage />} />
      <Route exact path="/chat" element={<ChatPageLayout />} />
    </Routes>
  </BrowserRouter>
  );
}
export default App;
