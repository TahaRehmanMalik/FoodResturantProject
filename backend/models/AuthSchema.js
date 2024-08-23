import mongoose from "mongoose";
const authSchema=new mongoose.Schema({
    name:{
        type:String,
        required:true,
        unique:true
    },
    email:{
        type:String,
        required:true,  
        unique:true
    },
    password:{
        type:String,
        required:true,
    },
    resetPasswordToken:{
        type:String,
        default:''
    }
})
export const Auth=mongoose.model("Auth",authSchema);