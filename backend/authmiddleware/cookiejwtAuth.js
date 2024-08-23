import jwt from 'jsonwebtoken'
import express from 'express';
import cookieParser from 'cookie-parser';
const app=express();
app.use(cookieParser())
export const authenticationToken=(req,res,next)=>{
    console.log("cookie request",req.cookies.token);
    const token=req.cookies.token;
    if(!token)
    {
        return res.status(400).json({message:"unauthorized"})
    }
    jwt.verify(token,'shhhhhhhhhh',(err,user)=>{
        if(err)
        {
            return res.status(403).json({ message: "Forbidden" });
        }
        req.user=user;
        // console.log("The request user data is",req.user);
    next();
    })
}

