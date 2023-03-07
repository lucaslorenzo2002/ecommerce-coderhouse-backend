const Product  = require('../schemas/productModel');

class productsCRUD{
    constructor(connection){
        this.connection = connection
    }

    async createProduct(prod){
        try{
            const data = await Product.create(prod);
            console.log('producto creado')
            console.log(data)            
        }catch(err){
            console.log(err)
        }
    } 

    async readAll(){
        try{
            const find = await Product.find().lean()
            return find
        }catch(err){
            console.log(err)
        }
    }

    async readById(id){
        try{
            const findId = await Product.findById({_id: id}).lean();
            return findId
        }catch(err){
            console.log(err)
        }       
    }           

    async update(id, newValue1, newValue2){
        try{
            const upd = await Product.findByIdAndUpdate(id, {newValue1, newValue2}).lean()
            return upd
        }catch(err){
            console.log(err)
        }
    }

    async deleteOne(id){
        try{
            const del = await Product.deleteOne({_id: id});
            console.log('producto eliminado con exito')
            return del
        }catch(err){
            console.log(err)
        }
    }
}

module.exports = productsCRUD