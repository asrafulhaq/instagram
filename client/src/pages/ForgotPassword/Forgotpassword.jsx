import React from 'react';
import { useEffect } from 'react';
import { useState } from 'react';
import axios from 'axios';

const Forgotpassword = () => {

    // email state 
    const [email, setEmail] = useState('');
    const [msg, setMsg] = useState({
        type : '',
        msg : '',
        status : false
    });



   // submit 
   const handlePasswordRecover = async (e) => {
        e.preventDefault();

        await axios.post('http://localhost:4000/api/user/recover-password', { email })
        .then( res  => {

            setMsg({
                type : 'success',
                msg : 'A password recovery link sent ',
                status : true
            });

        })
        .catch( error =>  {
            
            setMsg({
                type : 'danger',
                msg : 'Invalid Email or not exixts',
                status : true
            });

        });

   }



  return (
    <div className='forgot-password'>
        <div className="container my-5">
            <div className="row justify-content-center">
                <div className="col-md-5">
                    <div className="card">
                        <div className="card-header">
                            <h2 className="card-title">Forgot your password</h2>
                        </div>
                        <div className="card-body">
                            { msg.status && <p className={ `alert alert-${msg.type}` }> { msg.msg } </p> }
                        <form onSubmit={ handlePasswordRecover } method='POST'>
                            <div className="my-3">
                                <input type="text" name='email' value={ email }  onChange={ e => setEmail(e.target.value) } className='form-control' placeholder=" Your Email"/>
                            </div>
                            <div className="my-3">
                               <button className='btn btn-primary' type='submit'>Send link</button>
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

export default Forgotpassword;