const express = require('express');
const path = require('path');
const cluster = require('os');
const session = require('express-session');
const passport = require('passport');
const methodOverride = require('method-override');
const logger = require('./utils/logger');
const parseArg = require('minimist');
const os = require('os');

const app = express();

const options = {
    alias:{
        p:'port',
        m:'mode',
        d:'debug'
    },
    default:{
        port:8080,
        mode:'FORK',
        debug: true
    }
}

const args = parseArg(process.argv.slice(2), options);

//NUMERO DE PROCESADORES
const numCpus = os.cpus().length;

if(args.mode === 'FORK' && cluster.isPrimary){
    logger.info(numCpus);
    logger.info(process.pid);
    for(let i = 0; i < numCpus; i++){
        cluster.fork()
    }
    
    cluster.on('exit', worker => {
        console.log(worker.process.pid);
        cluster.fork()
    })
}else{

require('dotenv').config()
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
    logger.info(`escuchando en: ${PORT}`)
})

server.on('error', err => logger.info(err))
}
