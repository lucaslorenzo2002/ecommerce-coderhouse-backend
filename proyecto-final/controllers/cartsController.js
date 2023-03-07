const asyncHandler = require('express-async-handler');

//CONEXION MONGOOSE
const connection = require('../config/mongooseConfig')

//REQUIRE A CLASES DE MONGOOSE
const CartsCrud  = require('../container/cartsContainer');

//CONTENEDOR DE MONGOOSE
const cartsContainer = new CartsCrud(connection);

const postProdIntoCart = asyncHandler(async (req, res) => {
    
    cartsContainer.postProdIntoCart(cartId, prodId)

    res.redirect('/carrito')
})


const getCart = asyncHandler(async (req, res) => {
   /*  const id = parseInt(req.params.id);

    cartsContainer.readById(id)

    res.json(cartFound) */
    res.render('carrito')
});


const deleteOneProductFromCart = asyncHandler(async (req, res) => {
    const cartId = parseInt(req.params.id);
    const prodId = parseInt(req.params.id_prod);

    cartsContainer.deleteOneProductFromCart(cartId, prodId)
    res.json('producto eliminado del carrito')
})

module.exports = {postProdIntoCart, getCart, deleteOneProductFromCart}