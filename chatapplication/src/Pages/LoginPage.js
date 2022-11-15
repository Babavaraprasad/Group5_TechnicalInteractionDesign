import './LoginPage.css';
import {Button} from '../components/Button'
import {DefaultInputFields} from '../components/DefaultInputFields'
import {Link} from 'react-router-dom';


function LoginPage() {
    return (
      <div className="card">
        <div className="card--column">
          <h1 className="title">Welcome back!</h1>
          <DefaultInputFields labelText={'Email'} placeholder={'Email'}></DefaultInputFields>
          <DefaultInputFields labelText={'Password'} placeholder={'Password'}></DefaultInputFields>
          <a>forgot your password?</a>         
          <Button onClick={() => {console.log("You clicked on me!")}}
            type="button" buttonSize="btn--width140--height40">
                Login
           </Button>
          
        </div>

        <div className="vertical-line"></div>

        <div className="card--column">
          <h1 className="title">New here</h1>
          <p>Guest Student chatroom is a 
          place where new and previous 
          guest students create and 
          maintain relationships.
          </p>
          <p>
          Sign up to find out more!
          </p>
          <Link to="/registration">
            <Button onClick={() => {console.log("You clicked on me!")}}
              type="button" buttonSize="btn--width140--height40">
                Register
            </Button>
          </Link>
        </div>
      </div>
    );
  }

  export default LoginPage;