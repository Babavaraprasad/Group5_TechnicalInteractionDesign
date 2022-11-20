import './LoginPage.css';
import {Button} from "./components/Button"
import {DefaultInputFields} from "./components/DefaultInputFields"
import PopUp from "./components/PopUp"
import {UserChatProfile} from "./UserChatProfile"


function LoginPage() {
    return (
      
      <div className="card">
        <div className="card-column">
          <h1>Welcome back!</h1>
          <UserChatProfile/>
          <DefaultInputFields labelText={'Email'} placeholder={'Email'}></DefaultInputFields>
          <DefaultInputFields labelText={'Password'} placeholder={'Password'}></DefaultInputFields>
          <a>forgot your password?</a>
          <Button onClick={() => {console.log("You clicked on me!")}}
            type="button"
            buttonSize="btn--width120--height50">Login</Button>
        </div>

        <div className="vertical-line"></div>

        <div className="card-column">
          <h1>Sign Up</h1>
          <p>Guest Student chatroom is a 
          place where new and previous 
          guest students create and 
          maintain relationships. <br />

          <h3>Register find out more!</h3>

          </p>
          <PopUp/>

        </div>
        </div>
        );
      }

  export default LoginPage;