import { Dish } from "../models/dishes.js";

export const getDishesData=async(req,res)=>{
    console.log("request query",req.query);
    console.log("req.query",req.query.page);
    let page=(req.query.page)||1;
    const limit=10;
    let skip=(page-1)*limit;
    const category=req.query.category||null;
    console.log("The category is",category);
    // const query = {};
    //     if (category) {
    //         query.category = category; // Assuming `category` is a field in your `Dish` model
    //     }
    //     console.log("The query value is",query);
    let query=Dish.find();
    if(req.query.category)
    {
         query=query.find({category:{$in:req.query.category.split(',')}});
    }
    if(req.query.page)
    {
        query=query.skip(skip).limit(limit);
    }
    try {
        const totalLength= await  Dish.find().countDocuments();
        const response=await query.exec();
        console.log("Response Data",response,totalLength);
        res.status(200).json({dish:response,totalItems:totalLength});
    } catch (error) {
        res.status(500).json({message:error});
    }
}
