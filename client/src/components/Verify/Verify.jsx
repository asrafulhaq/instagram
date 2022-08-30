import React from 'react';
import axios from 'axios';
import { useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { createToast } from '../../utility/toast';

const Verify = () => {

  const params = useParams();
  const navigate = useNavigate();

  useEffect(() => {

      axios.post('http://localhost:4000/api/user/verify', params)
      .then(res => {
        
        createToast('Account activation successful');
        navigate('/login');
        
      })
      .catch( error =>  {
        createToast('Account activation Failed');


      });


  });
  

  return (
    <div><h1>Verify your account </h1></div>
  )
};

export default Verify;