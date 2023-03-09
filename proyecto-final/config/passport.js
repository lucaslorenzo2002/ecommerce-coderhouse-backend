const passport = require('passport');
const localStrategy = require('passport-local').Strategy;
const bcrypt = require('bcrypt');
const sendEmail = require('../utils/enviarEmail');

//CONEXION MONGOOSE
const connection = require('../config/mongooseConfig')

//REQUIRE A CLASES DE MONGOOSE
const AuthCrud = require('../container/authContainer');
const CartCrud = require('../container/cartsContainer');

//CONTENEDOR DE MONGOOSE
const authContainer = new AuthCrud(connection);
const cartContainer = new CartCrud(connection);

const hashPassword = (password) => {
    return bcrypt.hashSync(password, bcrypt.genSaltSync(10), null)
}

//ESTRATEGIA REGISTRO

passport.use('register', new localStrategy({
    passReqToCallback: true
}, async(req, username, password, done) => {
    const { email, telefono, edad, avatar, direccion, rol } = req.body

    if( !username || !email || !password || !telefono || !edad || !direccion || !rol ){
        console.log('completa todos los campos');
        return done(null, false)
    }

    const usuario = await authContainer.readUser(username)
    if(usuario){
        return done('usuario en uso')
    } 

    if(password.length < 8){
        console.log('la contrasenia debe tener al menos 8 caracteres');
        return done(null, false)
    }

    const nuevoUsuario = {
        username,
        email,
        password: hashPassword(password),
        telefono, 
        edad, 
        avatar,
        direccion,
        rol
    }

    const nuevoUsuarioMongoose  = await authContainer.createUser(nuevoUsuario)
    
    let mensaje = `
    <div>
    <p>username:${nuevoUsuario.username}</p>
    <p>email:${nuevoUsuario.email}</p>
    <p>rol:${nuevoUsuario.rol}</p>
    <p>edad:${nuevoUsuario.edad}</p>
    <p>direccion:${nuevoUsuario.direccion}</p>
    <p>telefono:${nuevoUsuario.telefono}</p>
    </div>
    `
    let from = process.env.EMAIL_USER;

    let to = process.env.ADMIN_EMAIL;

    let subject = `<p>Nuevo usuario registrado</p>`;

    try {
        await sendEmail(from, to, subject, mensaje)
    } catch (error) {
        throw new Error ('mail no enviado')
    } 

    const usuarioId = nuevoUsuarioMongoose._id;

    await cartContainer.nuevoCarrito(usuarioId)

    done(null, nuevoUsuario)}
))

//ESTRATEGIA LOGIN

passport.use('login', new localStrategy(
    async(username, password, done) => {

        if(!username || !password){
            return done('por favor complete todos los campos')
        }

        const usuario = await authContainer.readUser(username);
        
        const correctPassword = await bcrypt.compare(password, usuario.password)

        if (!usuario || !correctPassword){
            return done('usuario o contrasenia incorrectos')
        } 

        return done(null, usuario)
    }
))

passport.serializeUser((user, done) => {
    done(null, user.username)
})

passport.deserializeUser(async(username, done) => {
    const usuario = await authContainer.readUser(username)
    done(null, usuario)
})