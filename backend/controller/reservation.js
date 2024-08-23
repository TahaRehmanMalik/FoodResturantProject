import { Reservation } from "../models/reserveSchema.js";
import ErrorHandler from "../error/error.js";

export const createReservation=async(req,res,next)=>{
    const {firstName,lastName,email,phone,time,date}=req.body;
    console.log("The req.body is",req.body);
    if(!firstName||!lastName||!email||!phone||!time||!date)
    {
        return next(new ErrorHandler("Please fill Full reservation form"),400);
    }
    try {
        await Reservation.create({firstName,lastName,email,phone,time,date});
        res.status(200).
        json({
            success:true,
            message:"Reservation Sent successfully",
        });
    } catch (error) {
        if(error.name==='ValidationError')
        {
            const validationErrors=Object.values(error.errors).map((err)=>{
                return err.message;
            });
            return next(new ErrorHandler(validationErrors.join(","),400))
        }
        return next(error);
    }
}
export const getReserveData=async(req,res)=>{
    try {
        const response=await  Reservation.find();
        return res.status(200).json(response);
    } catch (error) {
        res.status(400).json(error);
    }

}