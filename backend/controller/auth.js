import { Auth } from "../models/AuthSchema.js";
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import crypto from 'crypto';
import { sendMail } from "../services/common.js";
export const createUser=(req,res)=>{
    console.log("The User Data is",req.body)
    const{name,email,password}=req.body;
    bcrypt.genSalt(10,(err,salt)=>{
       bcrypt.hash(password,salt,async(err,hash)=>{
 
        if(!name||!email||!password)
    {
        return (res.status(400).json({message:"Please fill full Create User form"}))
    }
    try {
        const user=await Auth.create({
            name,
            email,
            password:hash
        })
        let token=jwt.sign({email},'shhhhhhhhhh');
        res.cookie('token',token,{
            expires:new Date(Date.now()+7200000),
            httpOnly:true,
        });
        return (
            res.status(200).json({email:user.email}))

    } catch (error) {
        res.status(500).send(error);
    }
       })
    })
    
}
export const loginUser=async(req,res)=>{
    try {
      const user=await Auth.findOne({email:req.body.email});
      console.log("The user is ",user);
      if(!user)
        {
            res.status(400).send({message:"someThing went wrong"})
        }  
        bcrypt.compare(req.body.password,user.password,(error,result)=>{
            if(result)
            {
                let token=jwt.sign({email:user.email},'shhhhhhhhhh');
                res.cookie('token',token,{
                    expires:new Date(Date.now()+7200000),
                    httpOnly:true,
                });
                res.status(200).json({email:user.email})
            }
            else{
                res.status(500).send({message:"someThing went wrong"})
            }
        });
    } catch (error) {
        res.status(500).send({message:error})
    }
}
export const checkAuth=(req,res)=>{
    
    if(req.user)
    {
        res.send(req.user);
    }
    else{
        res.sendStatus(401)
    }
}
export const logoutUser=(req,res)=>{
res.cookie('token',null,{expires:new Date(Date.now()),httpOnly:true})
res.sendStatus(200).send({message:"your are logout"})
}
export const resetPasswordRequest=async(req,res)=>{
    console.log("The reset password Email",req.body.email);
    const email=req.body.email;
    const user=await Auth.findOne({email:email});
    if(user)
    {
        const token= crypto.randomBytes(48).toString('hex');
     user.resetPasswordToken=token;
        await user.save();
        const resetPageLink='http://localhost:5173/reset-password?token='+token+'&email='+email;
        const subject="reset password for Foodies";
        const html=`<p>Click<a href='${resetPageLink}'>Here<a/> to reset Password</p>`
        if(email)
        {
            const response=await sendMail({to:email,subject,html});
            res.json(response);
        }
        else{
            res.status(404);
        }
    }
    else{
        res.status(404);
    }

}
export const resetPassword=async(req,res)=>{
    console.log("The Token and email is",req.body.token,' ',req.body.email)
    const {email,token}=req.body;

    const user=await Auth.findOne({email:email,resetPasswordToken:token});
    
    if(user)
    {
        bcrypt.genSalt(10,(err,salt)=>{
            bcrypt.hash(req.body.password,salt,async(err,hash)=>{
              user.password=hash;
              await user.save();
              const subject="Successfully reset password for Foodies";
              const html=`<p>Successfully Reset Password</p>`;
              if(email)
              {
                const response=await sendMail({to:email,subject,html});
                res.json(response);
              }
              else{
                res.sendStatus(404);
              }
            })
        })
    }
    else{
        res.sendStatus(404);
    }

}