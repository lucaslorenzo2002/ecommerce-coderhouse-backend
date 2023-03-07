const getDatos = require('../controllers/userController');
const {requireAuthentication}= require('../middlewares/authMiddlewares');

const userRouter = require('./router')

userRouter.get('/datos', requireAuthentication, getDatos)

module.exports = userRouter