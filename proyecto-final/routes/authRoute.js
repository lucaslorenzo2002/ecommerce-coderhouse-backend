const { getRegistro, postRegistro, getLogin, postLogin, getLogout } = require('../controllers/authController')
const authRouter = require('./router')

authRouter.get('/registrarse', getRegistro)
authRouter.post('/registrarse', postRegistro)

authRouter.get('/login', getLogin)
authRouter.post('/login', postLogin)

authRouter.get('/logout', getLogout)

module.exports = authRouter