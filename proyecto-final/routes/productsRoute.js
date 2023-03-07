const { getCrearProducto, postCrearProducto, getProductos, getActualizarProductos, postActualizarProductos, eliminarProducto, getInicioAdmin } = require('../controllers/productsController');
const {requireAuthentication, isAdmin }= require('../middlewares/authMiddlewares');

const productRouter = require('./router')

productRouter.get('/inicioadmin', requireAuthentication, isAdmin, getInicioAdmin)

productRouter.get('/crearproducto', requireAuthentication, isAdmin, getCrearProducto)
productRouter.post('/crearproducto', requireAuthentication, isAdmin, postCrearProducto)

productRouter.get('/productos', requireAuthentication, getProductos)

productRouter.get('/actualizarproducto/:id', requireAuthentication, isAdmin, getActualizarProductos)
productRouter.put('/actualizarproducto/:id', requireAuthentication, isAdmin, postActualizarProductos)


productRouter.delete('/eliminarproducto/:id', requireAuthentication, isAdmin, eliminarProducto)

module.exports = productRouter

