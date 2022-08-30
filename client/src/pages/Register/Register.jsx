import React from 'react';
import axios from 'axios';
import { GrFacebook } from "react-icons/gr";
import '../Login/Login.scss';
import { Link } from 'react-router-dom';
import './Register.scss';
import AuthFooter from '../../components/AuthFooter/AuthFooter';
import { useState } from 'react';
import swal from 'sweetalert';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Register = () => {

  // create a toast 
  const createToast = (msg) => {
    return toast.error(msg);
  }


  // state for form fields 
  const [ input, setInput ] = useState({
        name : '',
        email : '',
        username : '',
        password : ''
  });

  // handle input 
  const handleInput = (e) => {
    setInput((prev) => ({ ...prev, [e.target.name] : e.target.value }));
  }


  // handle  user  registration 
  const handleUserRegister = async (e) => {

    e.preventDefault();

    try {

      if( !input.name || !input.email || !input.username || !input.password ){
        swal("Danger!", "All fields are required!", "error");
        // createToast('All fields are required');
      }else {

       await axios.post('http://localhost:4000/api/user/register', input)
       .then( res =>  {

          setInput((prev) => ({
              name : '',
              email : '',
              username : '',
              password : ''
          }));

          swal("Success!", "Your account created successfully !", "success");

       });
        
      }
      
    } catch (error) {
        console.log(error);
    }



  }
  
  


  return (
    <div className='login-container'>
      <ToastContainer
        position="top-center"
        autoClose={2000}
        hideProgressBar={true}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        />

      <div className="login-wraper">
        <a className='login-logo-link' href="#"><img className='login-logo' src="https://www.instagram.com/static/images/web/logged_out_wordmark.png/7a252de00b20.png" alt="" /></a>
        <span className="reg-text">Sign up to see photos and videos from your friends.</span>
        <a className='login-with-fb-register' href="#"> <GrFacebook /> Login with Facebook </a>
        <div className="divider">
          OR
        </div>
        <form onSubmit={ handleUserRegister } className="login-form">

          <input name='email' onChange={ handleInput } type="text" className="login-input" value={ input.email }  placeholder='Mobile number or Email'/>
          <input name='name' onChange={ handleInput } type="text" className="login-input" value={ input.name }  placeholder='Full Name'/>
          <input name='username' onChange={ handleInput } type="text" className="login-input" value={ input.username }  placeholder='Username'/>
          <input name='password' onChange={ handleInput } type="password" className="login-input" value={ input.password }  placeholder='Password'/>

          <p className="reg-form-text">People who use our service may have uploaded your contact information to Instagram. <a href="#">Learn More</a></p>
          <p className="reg-form-text">By signing up, you agree to our <a href="#">Terms</a> , <a href="#">Privacy Policy</a> and <a href="#">Cookies Policy</a> .</p>

          <button type='submit' className='login-submit'>Sign Up</button>
        </form>




  

      </div>
      <div className="signup-wraper">
        <span className="signup-text">Have an account? <Link to="/login" className="sign-up-link">Log In</Link></span>
      </div>
      <div className="get-app">
        <span className="app-text">Get the app.</span>
        <div className="app-logo">
          <img src="https://www.instagram.com/static/images/appstore-install-badges/badge_ios_english-en.png/180ae7a0bcf7.png" alt="" />
          <img src="https://www.instagram.com/static/images/appstore-install-badges/badge_android_english-en.png/e9cd846dc748.png" alt="" />
        </div>
      </div>

      <AuthFooter />

  </div>
  )
};
 
export default Register;