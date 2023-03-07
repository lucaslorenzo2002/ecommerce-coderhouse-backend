const express = require('express');
const path = require('path');
const session = require('express-session');
const passport = require('passport');
const methodOverride = require('method-override')

const app = express();
require('dotenv').config
require('./config/passport')

//CONEXION A BD
const connection = require('./config/mongooseConfig')

connection
.then(() => console.log('mongoose conectado'))
.catch((err) => console.log(err))

//IMPORTAR CLASES DE LAS BD

//CONTAINERS DE LAS BD

//HANDLEBARS
const exphbs = require('express-handlebars');
app.engine('handlebars', exphbs.engine())
app.set('view engine', 'handlebars')

//MIDDLEWARES
app.use(express.static(path.join(__dirname, 'public')))
app.use(express.urlencoded({extended: true}))
app.use(methodOverride('_method'))
app.use(express.json())
app.use(session({
    secret: 'secret',
    resave: true,
    saveUninitialized: true
}))
app.use(passport.initialize())
app.use(passport.session())

//RUTAS
const  productRouter  = require('./routes/productsRoute');
const  cartRouter  = require('./routes/cartsRoute');
const  authRouter  = require('./routes/authRoute');
const  userRouter  = require('./routes/userRoute');

app.use('/api', productRouter)
app.use('/api', cartRouter)
app.use('/api', userRouter)
app.use('/api/auth', authRouter)

//CONEXION AL PUERTO
const PORT = process.env.PORT || 8080;

const server = app.listen(PORT, () => {
    console.log(`escuchando en: ${PORT}`)
})

server.on('error', err => console.log(err))

