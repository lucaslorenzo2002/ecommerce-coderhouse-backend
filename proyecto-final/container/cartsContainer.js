const Cart  = require('../schemas/cartModel');

class cartsCRUD{
    constructor(model){
        this.model = model
    }
    
    async postProdIntoCart(id, prodId){
        try{
            const prodFound = await Product.findOne({_id: prodId})
            await Cart.updateOne({_id: id}, {$push: {productos: prodFound}})
            console.log(`carrito ${id}, actualizado con exito`);
        }catch(err){
            console.log(err)
        }
    }
    
    async deleteOneProductFromCart(id, prodId){
        try{
            const prodFound = await Product.findOne({_id: prodId})
            await Cart.updateOne({_id: id}, {$pull: {productos: prodFound}})
            console.log('producto eliminado correctamente del carrito');
        }catch(err){
            console.log(err)
        }
    }
    
}

module.exports = cartsCRUD