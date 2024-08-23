import express from "express";
import { createUser,loginUser,checkAuth,logoutUser,resetPasswordRequest,resetPassword} from "../controller/auth.js";
import {authenticationToken} from '../authmiddleware/cookiejwtAuth.js'
const router=express.Router();
router.post('/create',createUser);
router.post('/login',loginUser);
router.get('/check',authenticationToken,checkAuth)
router.get('/logout',logoutUser);
router.post('/reset-password-request',resetPasswordRequest);
router.post('/reset-password',resetPassword);
export  default router