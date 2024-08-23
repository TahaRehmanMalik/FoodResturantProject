import mongoose from "mongoose";
import validator from "validator";
const reserveSchema=new mongoose.Schema({
    firstName:{
        type:String,
        required:true,
        minLength:[3,'first Name must contain atleast 3 characters'],
        maxLength:[30,'first Name cannot exceed 30 characters'],
    },
    lastName:{
        type:String,
        required:true,
        minLength:[3,'Last Name must contain atleast 3 characters'],
        maxLength:[30,'Last Name cannot exceed 30 characters'],
    },
    email:{
        type:String,
        required:true,
        validate:[validator.isEmail,"Provide a valid Email"]
      },
      phone:{
        type:String,
        required:true,
        minLength:[11,'Phone Number must contain only 11 digits'],      
    },
    time:{
        type:String,
        required:true,
    },
    date:{
        type:String,
        required:true,
    },

})
export const Reservation=mongoose.model('Reservation',reserveSchema);