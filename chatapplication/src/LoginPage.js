import './LoginPage.css';
import {Button} from "./components/Button"
import {DefaultInputFields} from "./components/DefaultInputFields"
import {PopUp} from "./components/PopUp"


function LoginPage() {
    return (
      <div className="card">
        <div className="card-column">
          <h1>Welcome back!</h1>
          <DefaultInputFields labelText={'Email'} placeholder={'Email'}></DefaultInputFields>
          <DefaultInputFields labelText={'Password'} placeholder={'Password'}></DefaultInputFields>
          <a>forgot your password?</a>
          <Button onClick={() => {console.log("You clicked on me!")}}
            type="button"
            buttonSize="btn--width120--height50">Login</Button>
        </div>

        <div className="vertical-line"></div>

        <div className="card-column">
          <h1>New here</h1>
          <p>Guest Student chatroom is a 
          place where new and previous 
          guest students create and 
          maintain relationships.

          Sign up to find out more!

          </p>
          <Button onClick={toggleModal}
            type="button"
            buttonSize="btn--width120--height50">Register</Button>
        </div>
      </div>
    );
  }

  export default LoginPage;