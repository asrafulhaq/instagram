import React from 'react';
import { useState } from 'react';
import {  useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { createToast } from '../../utility/toast';

const ResetPassword = () => {

    // get params 
    const { token } = useParams();
    const navigate = useNavigate();

    // email state 
    const [password, setPassword] = useState('');
    const [cpassword, setCPassword] = useState('');
    const [msg, setMsg] = useState({
        type : '',
        msg : '',
        status : false
    });


    const handlePasswordReset =  async (e) => {
        e.preventDefault();

        try {

            // check poasswod
        if ( !password ) {
            setMsg({
                type : 'danger',
                msg : 'Please set a password',
                status : true
            });
        }else if( password !== cpassword ){
            setMsg({
                type : 'warning',
                msg : 'Password not match',
                status : true
            });
        } else {


            await axios.post('http://localhost:4000/api/user/reset-password', { token, password })
            .then( res =>  {
                setMsg({
                    type : '',
                    msg : '',
                    status : false
                });
                createToast('Your password changed');
                navigate('/login');
            })
            .catch( error =>   {
                
                createToast('Time Out, Please try again');

            });


            

        }

            
        } catch (error) {
            createToast('Try again');
        }

    }
    



  return (
    <div className='forgot-password'>
        <div className="container my-5">
            <div className="row justify-content-center">
                <div className="col-md-5">
                    <div className="card">
                        <div className="card-header">
                            <h2 className="card-title">Reset your Password</h2>
                        </div>
                        <div className="card-body">
                            { msg.status && <p className={ `alert alert-${msg.type}` }> { msg.msg } </p> }
                        <form onSubmit={ handlePasswordReset } method='POST'>
                            <div className="my-3">
                                <input type="password" name='password' value={ password }  onChange={ e => setPassword(e.target.value) } className='form-control' placeholder=" New Password"/>
                            </div>
                            <div className="my-3">
                                <input type="password" name='confirm_password' value={ cpassword }  onChange={ e => setCPassword(e.target.value) } className='form-control' placeholder="Confirm New Password"/>
                            </div>
                            <div className="my-3">
                               <button className='btn btn-primary' type='submit'>Change Password</button>
                            </div>
                        </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
  )
};

export default ResetPassword;