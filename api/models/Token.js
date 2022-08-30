import mongoose from "mongoose";


// create student schema
const tokenSchema = mongoose.Schema({

    userId : {
        type : mongoose.Schema.Types.ObjectId,
        ref : "User",
        required : true
    }, 
    token : {
        type : String, 
        required : true
    }


}, {
    timestamps : true
});




// export model 
export default mongoose.model('Token', tokenSchema);