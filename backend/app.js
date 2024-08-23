import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import cookieParser from 'cookie-parser';
import {dbConnection}from './database/dbConnection.js';
import { errorMiddleware } from './error/error.js';
import reserveRouter from './route/reserveRoute.js';
import dishRouter from './route/dishesRoute.js';
import authRouter from './route/authRoute.js';
import {authenticationToken} from './authmiddleware/cookiejwtAuth.js'
import './authmiddleware/googleAuthenticate.js'
import passport from 'passport';
import session from 'express-session';

const app=express();
dotenv.config();
app.use(cors({
    origin:[process.env.FRONTEND_URL],
    methods:["POST","GET","UPDATE"],
    credentials:true

}));
//setup session
app.use(session({secret:'12345ijklmnop',
    resave:false,
    saveUninitialized:true

}));
// passport initialize
app.use(passport.initialize());
app.use(passport.session());

app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.use(cookieParser())

app.use('/dish',authenticationToken,dishRouter);
app.use('/user',authRouter);
app.use('/api',authenticationToken,reserveRouter);


//initial google oauth login
app.get('/auth/google',
    passport.authenticate('google', { scope:
        [ 'email', 'profile' ] }
  ));
  
  app.get('/google/callback',
      passport.authenticate( 'google', {
          successRedirect: '/protected',
          failureRedirect: '/auth/failure'
  }));
app.get('/auth/failure',(req,res)=>{
    res.send("Something went wrong")
});
app.get('/protected',(req,res)=>{
    res.send("hello world")
})

dbConnection();
app.use(errorMiddleware);
export default app;
