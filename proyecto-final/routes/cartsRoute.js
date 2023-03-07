const {postProdIntoCart, getCart} = require("../controllers/cartsController");
const cartRouter = require('./router')

//POST
cartRouter.post('/carrito/:id/productos/:id_prod', postProdIntoCart)

//GET
cartRouter.get('/carrito', getCart)

module.exports = cartRouter