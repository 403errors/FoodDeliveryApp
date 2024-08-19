const mongoose = require('mongoose');


const UserSchema = new  mongoose.Schema({
    username:{
        type:String,
        required:true,
    },
    password:{
        type:String,
        required:true
    },  
    email:{
        type:String,
        required:true
    },
    role:{
        type:String,
        roleType:["admin","customer"],
        required:true,
    }
},{timestamps:true})
const user= mongoose.model('users',UserSchema);

module.exports=user;