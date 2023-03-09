const mongoose = require('mongoose');

const cartCollection = "carts";

const cartSchema = new mongoose.Schema({
    productos: [{
            type: mongoose.Schema.Types.ObjectId,
            ref: 'productos'
    }],
    usuario:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'usuarios'
    }
})

const Cart = mongoose.model(cartCollection, cartSchema);
module.exports = Cart