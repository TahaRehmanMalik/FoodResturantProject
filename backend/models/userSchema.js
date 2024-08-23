import mongoose from "mongoose";
const userSchema=new mongoose.Schema({
    googleId:{type:String},
    displayName:{type:String},
    email:{type:String},
    image:{type:String}
},{timestamps:true})
export const userdb= mongoose.model('users',userSchema);