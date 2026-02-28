const express = require('express')
const router= express.Router
const {addProduct,getAllProducts,searchProducts}=require("../controllers/ProductController")


router.post("product",addProduct);
router.get("/product",getAllProducts)
router.get("/product",searchProducts)
module.exports=router