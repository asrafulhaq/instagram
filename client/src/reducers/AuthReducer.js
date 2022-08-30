

// create a reducer 
const AuthReducer = ( state, { type, payload } ) =>  {

    switch (type) {
        case 'LOGIN_USER_SUCCESS':
            return {
                isUserLoggedIn : true,
                user : payload,
            }

        case 'USER_LOGOUT':
            return {
                isUserLoggedIn : false,
                user : { },
            }
           
    
        default:
            return state;
            
    }

}



// export reducer 
export default AuthReducer;