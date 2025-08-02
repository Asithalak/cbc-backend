import mongoose from "mongoose";

const productSchema = mongoose.Schema({
    productId: {
    type :String,
    required: true,
    unique: true,
   },
    name: {
        type: String,
        required: true,
    },
    altNames : [{
        type: String,
        required: true,
    }],
    description :{
        type: String,
        required: true,
    },
    images : [{
        type: String,
        required: true,
    }],
    labelledPrice: {
        type: Number,
        required: true,
    },
    price: {
        type: Number,
        required: true,
    },
    stock : {
        type: Number,
        required: true,
    },
    isAvailable : {
        type: Boolean,
        default: true,
    }  


});

const Product = mongoose.model("Products", productSchema);

export default Product;