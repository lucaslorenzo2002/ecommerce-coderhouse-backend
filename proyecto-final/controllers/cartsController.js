const asyncHandler = require('express-async-handler');
const sendEmail = require('../utils/enviarEmail');
const sendWpp = require('../utils/enviarWpp');

//CONEXION MONGOOSE
const connection = require('../config/mongooseConfig')

//REQUIRE A CLASES DE MONGOOSE
const CartsCrud  = require('../container/cartsContainer');

//CONTENEDOR DE MONGOOSE
const cartsContainer = new CartsCrud(connection);

const agregarProductoAlCarrito = asyncHandler(async (req, res) => {
     
    await cartsContainer.agregarProducto(req.user._id, req.params.id)

    res.redirect('/api/productos') 

})

const getCart = asyncHandler(async (req, res) => {

    const cartUsuario = await cartsContainer.getCart(req.user._id)

    const productosCarrito = cartUsuario[0].productos;

    let productosEnCarrito = false;

    if(productosCarrito.length > 0){
        productosEnCarrito = true
    }else{
        false
    }

    res.render('carrito', {productosCarrito, productosEnCarrito})
    
});


const eliminarProductoDelCarrito = asyncHandler(async (req, res) => {
    
    await cartsContainer.eliminarProducto(req.user._id, req.params.id)
    res.redirect('/api/carrito')
})

const vaciarCarrito = asyncHandler(async (req, res) => {
    

})

const confirmarCompra = asyncHandler(async (req, res) => {
    
    const carritoUsuario = await cartsContainer.getCart(req.user._id)

    //ENVIAR WHATSAPP
    let mensajeWpp = `
    Nuevo pedido de  ${req.user.username}, ${req.user.email}
    pedido: ${carritoUsuario[0].productos}
    `
    

    //ENVIAR MAIL
    let from = process.env.EMAIL_USER;
    let to = process.env.ADMIN_EMAIL;
    let subject = `<p>Nuevo pedido de ${req.user.username}, ${req.user.email}</p>`;
    let mensajeEmail = `
    <div>
    <h4>Productos:</h4>
    <li>${carritoUsuario[0].productos}</li>
    </div>
    `

    try {
        await sendWpp(mensajeWpp)
        await sendEmail(from, to, subject, mensajeEmail)
        res.json({msg: 'compra confirmada'})
    } catch (error) {
        throw new Error ('mail no enviado' + error)
    } 
})

module.exports = {agregarProductoAlCarrito, getCart, eliminarProductoDelCarrito, confirmarCompra}