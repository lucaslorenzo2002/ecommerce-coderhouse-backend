const Cart  = require('../schemas/cartModel');
 require('../schemas/userModel');
const logger = require('../utils/logger');

class cartsCRUD{
    constructor(model){
        this.model = model
    }
    
    async nuevoCarrito(user){
        try {
            const carrito = Cart.create({usuario: user});
            return carrito
        } catch (error) {
            logger.info(error)
        }
    }
    
    async getCart(id){
        try {
            const cart = await Cart.find({usuario: {_id: id}}).populate('usuario').populate('productos').lean();
            return cart
        } catch (error) {
            logger.info(error)
        }
    }

    async agregarProducto(id, prodId){
        try {
            const addProd = await Cart.updateOne({usuario: {_id: id}}, {$push: {productos: prodId}});
            return addProd
        } catch (error) {
            logger.info(error);
        }
    }

    async eliminarProducto(id, prodId){
        try {
            const delProd = await Cart.updateOne({usuario: { _id: id }}, {$pull: {productos: prodId}} );
            return delProd
        } catch (error) {
            console.log(error);
        }
    }
}

module.exports = cartsCRUD