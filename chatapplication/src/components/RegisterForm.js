import  './RegisterForm.css';
import Layout from './Layout';
import  {DefaultInputFields}  from './DefaultInputFields';
import {Button} from './Button';
import {Link} from 'react-router-dom';

  function RegisterForm()
{
    return(
       <Layout>
        <div><h2>REGISTRATION PAGE</h2></div>
        <h4>Personal Information</h4>
        <form> 
      <div><DefaultInputFields labelText={'First Name*'} placeholder={'please type your firstname'}></DefaultInputFields></div>
      <div><DefaultInputFields labelText={'Last Name*'} placeholder={'please type your lastname'}></DefaultInputFields></div>
      <div><DefaultInputFields labelText={'Email'} placeholder={'please type your email'}></DefaultInputFields></div>
      <div><DefaultInputFields labelText={'Password'} placeholder={'choose your password'}></DefaultInputFields></div>
      <div><DefaultInputFields labelText={'Confirm Password *'} placeholder={'confirm your password'}></DefaultInputFields></div>
      <div className='routingContent'>Already registered? Go to <Link to ="/">Login</Link></div>
      <div><Button onClick={() => {console.log("You clicked on me!")}}type="button" buttonSize="btn--width140--height40">Register</Button></div>
    
      </form>
      </Layout>);
}
export default RegisterForm;