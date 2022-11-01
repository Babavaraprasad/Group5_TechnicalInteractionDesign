import  './RegisterForm.css';
import Layout from './Layout';
import  {DefaultInputFields}  from './DefaultInputFields';
import {Button} from './Button';
import {Link} from 'react-router-dom';

  function RegisterForm()
{
    return(
       <Layout>
        <div className="title"><h3>REGISTRATION PAGE</h3></div>
        <h4>Personal Information</h4>
        <form> 
      <div><DefaultInputFields labelText={'First Name*'} placeholder={'type firstname here'}></DefaultInputFields></div>
      <div><DefaultInputFields labelText={'Last Name*'} placeholder={'type lastname here'}></DefaultInputFields></div>
      <div><DefaultInputFields labelText={'Email'} placeholder={'type email here'}></DefaultInputFields></div>
      <div><DefaultInputFields labelText={'Password'} placeholder={'Enter password'}></DefaultInputFields></div>
      <div><DefaultInputFields labelText={'Confirm Password *'} placeholder={'confirm the password'}></DefaultInputFields></div>
      <div><Button onClick={() => {console.log("You clicked on me!")}}type="button" buttonSize="btn--width140--height40">Button</Button></div>
      </form>
      </Layout>);
}
export default RegisterForm;