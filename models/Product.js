//require mongoose
const mongoose =require ("mongoose")
const productschema= new mongoose.Schema({
name:{
    type : String,
    required : true,

},
price:{
    type:Number,
    required: true,

    
},
stock:{
    type: Number,
    required:true,
    min :1,

}
},{timestamps:true})

const Product= mongoose.model("Product", productschema)
module.exports=Product