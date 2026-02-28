const Cart= require("../models/cart")
const Product = require("../models/Product");



const addToCart = async (req, res) => {
    try {
    //validation
         const { userId, productId, quantity } = req.body;
           if (!userId || !productId || !quantity)
      return res.status(400).json({ msg: "Missing data" });
    //get product
 const product = await Product.findById(productId);
    if (!product) return res.status(404).json({ msg: "Product not found" });
    if (quantity > product.stock)
      return res.status(400).json({ msg: "Quantity exceeds stock" });
    //check if user got a cart 
     let cart = await Cart.findOne({ user: userId });

    if (!cart) {
    // Create new cart
      cart = new Cart({
        user: userId,
        products: [{ product: productId, quantity, price: product.price }],
        totalPrice: product.price * quantity
      });
    } else {
    // Check if product already in cart
      const itemIndex = cart.products.findIndex(p => p.product.toString() === productId);
 if (itemIndex > -1) {
    // Update quantity
        const newQuantity = cart.products[itemIndex].quantity + quantity;
        if (newQuantity > product.stock)
          return res.status(400).json({ msg: "Quantity exceeds stock" });

        cart.products[itemIndex].quantity = newQuantity;
        cart.products[itemIndex].price = product.price;
      } else {
    // Add new product to cart
        cart.products.push({ product: productId, quantity, price: product.price });
      }

    // Recalculate totalPrice
      cart.totalPrice = cart.products.reduce(
        (acc, item) => acc + item.quantity * item.price,
        0
      );
    }

    await cart.save();

    res.status(200).json({ success: true, cart });
  } catch (error) {
    console.log(error);
    res.status(500).json({ success: false, msg: "Server error" });
  }
};