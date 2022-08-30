import React from 'react';
import './AuthFooter.scss';

const AuthFooter = () => {
  return (
    <div className="auth-footer">
        <ul>
        <li><a href="#">Meta</a></li>
        <li><a href="#">About</a></li>
        <li><a href="#">Blog</a></li>
        <li><a href="#">Jobs</a></li>
        <li><a href="#">Helps</a></li>
        <li><a href="#">API</a></li>
        <li><a href="#">Privacy</a></li>
        <li><a href="#">Terms</a></li>
        <li><a href="#">Top Accounts</a></li>
        <li><a href="#">Hashtags</a></li>
        <li><a href="#">Locations</a></li>
        <li><a href="#">Instagram Lite</a></li>
        <li><a href="#">Contact Uploading & Non-Users</a></li>
        </ul>
        <div className="copy-right-area">
        <select name="" id="">
            <option value="">English</option>
            <option value="">Bangla</option>
            <option value="">Hindi</option>
            <option value="">Aribic</option>
        </select>
        <span className='copy-right-area'>© 2022 Instagram from Meta</span>
        </div>
    </div>
  )
}

export default AuthFooter