const asyncHandler = require('express-async-handler')
const passport = require('passport')

const getRegistro = asyncHandler(async(req, res) => {

    res.render('registro')
})

const postRegistro = passport.authenticate('register', {failureRedirect: '/api/auth/registrarse', successRedirect: '/api/productos'})

const getLogin = asyncHandler(async(req, res) => {

    res.render('login')
})

const postLogin = passport.authenticate('login', {failureRedirect: '/api/auth/login', successRedirect: '/api/productos'})

const getLogout = asyncHandler(async(req, res) => {
    req.logout(err => {
        err ? console.log(err) : res.redirect('/api/auth/login')
    })
})

module.exports = {
    getRegistro,
    postRegistro,
    getLogin,
    postLogin,
    getLogout
}