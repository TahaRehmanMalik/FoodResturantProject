import mongoose from "mongoose";
export const dbConnection=()=>{
    mongoose.connect(process.env.MONGO_URL,{
        dbName:'FOODRESTURANT'
    }).then(()=>{
        console.log("Data Base is connected successfully!")
    }).catch((err)=>{
        console.log("Some error is occured while connectng database",err);
    })
}