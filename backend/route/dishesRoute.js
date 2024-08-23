
import express from 'express';
import { getDishesData } from "../controller/dishes.js";
const router=express.Router();
router.get('/',getDishesData);
export default router;

