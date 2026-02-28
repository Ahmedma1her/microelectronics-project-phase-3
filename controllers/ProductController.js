const Product =require ("../models/Product")
const User=require("../models/User")
const { search } = require("../routes/authRoutes")

const addProduct= async(req,res)=>{
    try {
        //get data from req.body
        const {name, price , stock,userId}=req.body
        //validation
        if (!name||!price||!stock)return res.status(404).json({
            msg: "missing data"
        })
        //check admin role
const checkAdmin=await User.findById(userId)
if (!checkAdmin)return res.status(404).json({msg:"user not found"})
 //check role
if(checkAdmin.role!==admin)return res.json({msg: "access denied"})
    
    //create new product

const product=await product.create({
    name,price,stock
})    //response 
res.status(200).json({
    success: true,
    msg:"user created",
    data:product
})
    } catch (error) {
        res.status(500).json({
    success: false,
    msg:"server error",
    
    })
    }}





const 
getAllProducts= async(req,res)=>{
    try {
        
    } catch (error) {
        
    }
}






const 
searchProducts= async(req,res)=>{
    try {
        
    } catch (error) {
        
    }
}


module.exports={
    addProduct, getAllProducts,searchProducts
}