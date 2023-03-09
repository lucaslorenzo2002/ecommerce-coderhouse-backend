const client = require('twilio')(process.env.TWILIO_ID, process.env.TWILIO_AUTH_TOKEN);
const logger = require('../utils/logger');


const mensajeTwilio = async(body) => {
    client.messages
    .create({
        from: 'whatsapp:+14155238886',
        body: body,
        to: process.env.ADMIN_TELEFONO
    })
    .then(message => logger.info(message.sid + ' mensaje enviado'))
    .catch(err => logger.info(err))
}

module.exports = mensajeTwilio
