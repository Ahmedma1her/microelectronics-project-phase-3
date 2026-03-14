const  express = require('express')
const router=express.Router
const authController= require("../controllers/authController")
const {addCart,getCart}= require("../controllers/cartController")



router.post("/cart",authController,addCart)
router.get("/cart",authController, getCart)
module.exports = router
