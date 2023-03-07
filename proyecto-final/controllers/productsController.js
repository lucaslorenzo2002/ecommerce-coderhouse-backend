const asyncHandler = require('express-async-handler');

//CONEXION A MONGOOSE
const connection = require('../config/mongooseConfig')

//REQUIRE A CLASES DE MONGOOSE
const  ProductsCrud  = require('../container/productsContainer');
const Product = require('../schemas/productModel');

//CONTENEDOR DE MONGOOSE
const prodsContainer = new ProductsCrud(connection);


const getCrearProducto = asyncHandler(async (req, res) => {

    res.render('crearProducto')
})

const postCrearProducto = asyncHandler(async (req, res) => {

    const newProduct = req.body;

    await prodsContainer.createProduct(newProduct)
    
    res.redirect('productos')
})

const getInicioAdmin = asyncHandler(async (req, res) => {

    const productos = await prodsContainer.readAll()

    res.render('inicioAdmin', {productos})
});

const getProductos = asyncHandler(async (req, res) => {

     const productos = await prodsContainer.readAll()

    res.render('inicio', {productos})
});

const getActualizarProductos = asyncHandler(async (req, res) => {
    const producto = await prodsContainer.readById(req.params.id)
    res.render('actualizarProducto', {producto})
});

const postActualizarProductos = asyncHandler(async (req, res) => {
    const {nombre, precio} = req.body
    await Product.findByIdAndUpdate(req.params.id,{nombre, precio})

    res.redirect('/api/productos')
});

const eliminarProducto = asyncHandler(async (req, res) => {
   
    await Product.findByIdAndDelete(req.params.id)
    res.redirect('/api/productos')
});

module.exports = {
    getCrearProducto, 
    postCrearProducto,
    getActualizarProductos,
    postActualizarProductos,
    eliminarProducto,
    getProductos,
    getInicioAdmin
}