const asyncHandler = require('express-async-handler');

//CONEXION A MONGOOSE
const connection = require('../config/mongooseConfig')

//REQUIRE A CLASES DE MONGOOSE
const  AuthCrud  = require('../container/authContainer');


//CONTENEDOR DE MONGOOSE
const authContainer = new AuthCrud(connection);


const getDatos = asyncHandler(async (req, res) => {
    const username = req.user.username;
    const usuario = await authContainer.readUser(username);
    res.render('datos', {usuario})
})

module.exports = getDatos