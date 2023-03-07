const mongoose = require('mongoose');

const cartCollection = "carts";

const itemSchema = new mongoose.Schema({
    product_id:{ 
        type:mongoose.Schema.Types.ObjectId,
        ref: 'Product'
    },
    quantity:{
        type: Number,
        required: true,
        min: [1, 'la cantidad no puede ser menos de 1']
    },
    price:{
        type: Number,
        required: true
    },
    total:{
        type: Number,
        required: true
    }
})

const cartSchema = new mongoose.Schema({
    items: [itemSchema],
    subTotal: {
        default: 0,
        type: Number
    }
})

const Cart = mongoose.model(cartCollection, cartSchema);
module.exports = Cart