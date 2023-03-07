//CONEXION MONGOOSE
const connection = require('../config/mongooseConfig')

//REQUIRE A CLASES DE MONGOOSE
const AuthCrud  = require('../container/authContainer');

//CONTENEDOR DE MONGOOSE
const authContainer = new AuthCrud(connection);

const requireAuthentication = (req, res, next) => {
    if(req.isAuthenticated()){
        
        next()
    }else{
        res.redirect('/api/auth/login')
    }
}

const isAdmin = async(req, res, next) => {
    const usuario = await authContainer.readUser(req.user.username)
    if(usuario.rol === 'admin'){
        next()
    }else{
        res.json({error: 'acceso denegado'})
    }
}

module.exports = {requireAuthentication, isAdmin}