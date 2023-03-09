const Product  = require('../schemas/productModel');
const logger = require('../utils/logger');


class productsCRUD{
    constructor(connection){
        this.connection = connection
    }

    async createProduct(prod){
        try{
            const data = await Product.create(prod);
            logger.info('producto creado')
            logger.info(data)            
        }catch(err){
            logger.info(err)
        }
    } 

    async readAll(){
        try{
            const find = await Product.find().lean()
            return find
        }catch(err){
            logger.info(err)
        }
    }

    async readById(id){
        try{
            const findId = await Product.findById({_id: id}).lean();
            return findId
        }catch(err){
            logger.info(err)
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
            return del
        }catch(err){
            logger.info(err)
        }
    }
}

module.exports = productsCRUD