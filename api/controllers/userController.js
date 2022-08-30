import bcrypt from 'bcryptjs';
import User from '../models/User.js';
import Token from '../models/Token.js';
import createError from "./errorController.js";
import jwt from 'jsonwebtoken';
import { sendEmail } from '../utility/sendEmail.js';
import { sendSms } from '../utility/sendSms.js';
import { createToken } from '../utility/createToken.js';

 
/**
 * @access public 
 * @route /api/user
 * @method GET 
 */
export const getAllUser = async (req, res, next) => {
    
    try {

        const users = await User.find();
        res.status(200).json(users);

    } catch (error) {

        next(error);
        
    }
    
}



/**
 * @access public 
 * @route /api/user/:id
 * @method GET
 */
 export const getSingleUser = async (req, res, next) => {
    const { id } = req.params;
    try {        
        const user = await User.findById(id);

        if( !user ){
            return next(createError(404, "Single user not found"));
        }

        if(user){
            res.status(200).json(user);
        }

    } catch (error) {
        next(error);
    }
}


/**
 * @access public 
 * @route /api/user
 * @method POST
 */
 export const createUser = async (req, res, next) => {

    // make hash pass
    const salt = await bcrypt.genSalt(10);
    const hash_pass = await bcrypt.hash(req.body.password, salt);


    try {        
        const user = await User.create({ ...req.body, password : hash_pass });
        res.status(200).json(user);

    } catch (error) {
        next(error);
    }
}

 
/**
 * @access public 
 * @route /api/user/:id
 * @method PUT/PATCH
 */
 export const updateUser = async (req, res, next) => {
    const { id } = req.params;
    try {        
        const user = await User.findByIdAndUpdate(id, req.body, { new : true });
        res.status(200).json(user);

    } catch (error) {
        next(error);
    }
}



/**
 * @access public 
 * @route /api/user/:id
 * @method DELETE
 */
 export const deleteUser = async (req, res, next) => {
    const { id } = req.params;
    try {        
        const user = await User.findByIdAndDelete(id);
        res.status(200).json(user);

    } catch (error) {
        next(error);
    }
}




/**
 * @access public 
 * @route /api/user/login
 * @method POST
 */
 export const userLogin = async (req, res, next) => {
    // get body data 


    try {
        
        // find user 
        const login_user = await User.findOne({ email : req.body.email });

        // check user exists or not 
        if( !login_user ){
            return next(createError(404, "User not found"));
        }

        // check password
        const passwordCheck = await bcrypt.compare(req.body.password, login_user.password);

        // password handle 
        if( !passwordCheck ){
            return next(createError(404, "Wrong password"));
        }

        // create a token
        const token = jwt.sign({ id : login_user._id, isAdmin : login_user.isAdmin }, process.env.JWT_SECRET );

        // login user info 
        const { password, isAdmin,  ...login_info } = login_user._doc; 

        res.cookie("access_token", token).status(200).json({
            token :  token,
            user : login_info, 
        });

        

        
    } catch (error) {
        next(error)
    }
   
}




/**
 * @access public 
 * @route /api/user/register
 * @method POST
 */
 export const userRegister = async (req, res, next) => {

    // make hash pass
    const salt = await bcrypt.genSalt(10);
    const hash_pass = await bcrypt.hash(req.body.password, salt);


    try {    
        
        // user data send 
        const user = await User.create({ ...req.body, password : hash_pass });         

        // create a token
        const token = createToken({ id : user._id });

        // token update 
        await Token.create({ userId : user._id, token : token });

        // send activation email 
        const verify_link = `http://localhost:3000/user/${user._id}/verify/${token}`;        
        await sendEmail(user.email, 'verify Account', verify_link);        
        res.status(200).json(user); 

    } catch (error) {
        next(error);
    }
}


/**
 * @access public 
 * @route /api/me
 * @method GET
 */
export const getLoggedInUser = async (req, res, next) => {
    
    try {

        // get token 
        const bearer_token = req.headers.authorization;
        let token = '';

        if( bearer_token ){
            token = bearer_token.split(' ')[1]; 

            // get token user 
            const logged_in_user = jwt.verify(token, process.env.JWT_SECRET);

            // user check 
            if( !logged_in_user ) {
                next(createError(400, 'Invalid Token')); 
            }

            // user check 
            if( logged_in_user ) {

                const user = await User.findById(logged_in_user.id);
                res.status(200).json(user);
            }


            

        }

        // check token exists
        if( !bearer_token ){
            next(createError(404, 'Token Not Found'));
        }





    } catch (error) {
        next(error)
    }

}


// verify user account 
export const verifyUserAccount = async (req, res, next ) => {

    try {

        const { id, token  } = req.body;

        // check token 
        const verify = await Token.findOne({ id : id, token : token });
        console.log(verify);

        // check verify 
        if( ! verify ){
            next(createError(404, 'Invalid Verify url'));
        }

        if( verify ){
            await User.findByIdAndUpdate(id, {
                isVerified : true
            });
            res.status(200).json({ message : "User account verified successful" });
            verify.remove();            
        }

        
    } catch (error) {


        
    }

}

// password recover link generate 
export const recoverPassword = async (req, res, next ) => {

    try {

        // get email 
        const { email } = req.body;

        // check email 
        const recover_user = await User.findOne({ email });

        // check email exists 
        if( !recover_user ){
            res.status(404).json({
                message : "Email dosn't exixts "
            });
        }

        if( recover_user ){            
            const token = createToken({ id : recover_user._id }, '60s');
            const recovery_url = `http://localhost:4000/password-recover/${token}`;

            sendEmail(recover_user.email, 'Password Reset', recovery_url);

            res.status(200).json({
                message : "Password recover link sent"
            });

        }

        

        
    } catch (error) {
        next(createError(error));
    }



}


// reset user password 

export const resetPassword = async (req, res, next) => {
    
    try {

        // get form data 
        const { token, password } = req.body;
        
        // get user id 
        const { id } = jwt.verify(token, process.env.JWT_SECRET);

         // make hash pass
        const salt = await bcrypt.genSalt(10);
        const hash_pass = await bcrypt.hash(password, salt);

        // get user details 
        if( id ){

            const user_details = await User.findByIdAndUpdate(id , {
                password : hash_pass
            });
            res.send("password Changed successfull");
        }        
        
        
    } catch (error) {
        next( createError(401, 'Time out') );
    }


}