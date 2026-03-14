const Cart = require("../models/cart");
const Product = require("../models/Product");
const JWT=require ("jsonwebtoken")
const User =require("../models/User");
const e = require("express");
const { get } = require("mongoose");

const addToCart = async (req, res) => {
  try {
    const { productId, quantity } = req.body;

    // 1️ Validate input
    if ( !productId || !quantity)
      return res.status(400).json({ msg: "Missing data" });
      const userId=req.user.id


    // 2️ Get product and check stock
    const product = await Product.findById(productId);
    if (!product) return res.status(404).json({ msg: "Product not found" });
    if (quantity > product.stock)
      return res.status(400).json({ msg: "Quantity exceeds stock" });

    // 3️ Check if user already has a cart
    let cart = await Cart.findOne({ userId });

    if (!cart) {
      // Create new cart
      cart =await new Cart.create({
        user: userId,
        products: [{ product: productId, quantity }],
      });

    } else {
      // Check if product already exists in cart
      const itemIndex = cart.products.findIndex(
        item.product.equals(productId)
      );

      if (itemIndex > -1) {
        // Update quantity
        const newQuantity = cart.products[itemIndex].quantity += quantity;
        if (newQuantity > product.stock){
          return res.status(400).json({ msg: "Quantity exceeds stock" });

}

      } else {
        // Add new product to cart
        cart.products.push({ product: productId, quantity:quantity });
      }
    }

    await cart.save();
    product.stock-=quantity
    await product.save()

    // 4️ Calculate totalPrice dynamically
    let totalPrice = 0;
    for (let item of cart.products) {
      const prod = await Product.findById(item.product);
      totalPrice += prod.price * item.quantity;
    }

    // 5️ Return response
    res.status(200).json({
      success: true,
      cart: {
        id: cart._id,
        user: cart.user,
        products: cart.products,
        totalPrice,
      },
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ success: false, msg: "Server error" });
  }
};


const getCart= async (req,res) => {
  try {
   userid=req.user.id
   
    const cart=await Cart.findOne({user:userid}).populate("products.product")
res.json({
  data:cart
})
    
  } catch (error) {
    console.log(error);
    
  }
}


module.exports = { addToCart,getCart };