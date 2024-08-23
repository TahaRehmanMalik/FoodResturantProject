import express from 'express';
import {createReservation,getReserveData} from '../controller/reservation.js'
const router=express.Router();
router.post('/send',createReservation);
router.get('/',getReserveData);
export default router;