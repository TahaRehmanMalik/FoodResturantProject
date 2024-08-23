import mongoose from "mongoose";
const dishesSchema=new mongoose.Schema({
    id: {
        type: Number,
        unique: true,
        required: true
      },
    title:{
    type:String,
    required:true,
    },
    category:{
        type:String,
        required:true,
        },
        image:{
            type:String,
            required:true,
            }
})
export const Dish=mongoose.model('Dish',dishesSchema);