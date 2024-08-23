import nodemailer from 'nodemailer';
import dotenv from 'dotenv';

dotenv.config({path:'./config/config.env'}); 
//email

const transporter=nodemailer.createTransport(
{
    host:'smtp.gmail.com',
    port:465,
    secure:true,
    auth:{
        user:"wajd3732@gmail.com",
        pass:process.env.MAIL_PASSWORD
    },
})
console.log("The pass is",process.env.MAIL_PASSWORD)
export const sendMail=async({to,subject,text,html})=>{
  const info =await transporter.sendMail({
    from:"Foodies <wajd3732@gmail.com>",
    to,
    subject,
    text,
    html
  })
  return info;
}
