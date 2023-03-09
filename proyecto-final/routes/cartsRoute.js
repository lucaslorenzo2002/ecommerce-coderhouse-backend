const {getCart, agregarProductoAlCarrito, eliminarProductoDelCarrito, confirmarCompra} = require("../controllers/cartsController");
const cartRouter = require('./router')
const {requireAuthentication }= require('../middlewares/authMiddlewares');


//POST
cartRouter.post('/agregaralcarrito/:id', requireAuthentication, agregarProductoAlCarrito)

//GET
cartRouter.get('/carrito', requireAuthentication, getCart)

//DELETE
cartRouter.post('/eliminardelcarrito/:id', requireAuthentication, eliminarProductoDelCarrito)

//CONFIRMAR COMPRA
cartRouter.post('/confirmarcompra', requireAuthentication, confirmarCompra)


module.exports = cartRouter