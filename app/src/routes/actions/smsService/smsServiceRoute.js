require('../../../models/smsService')
const smsService = require('../../../application/smsService')

const routeSchema = {
  tags: ['SmsService'],
  summary: 'Invio SMS',
  description: 'Esegue l\'invio di SMS con testo predefinito e ritorna il codice di verifica',
  body: {
    type: 'object',
    properties: {
      phone: { type: 'string', description: 'Il numero di telefono preceduto dal prefisso internazionale su cui inviare SMS' }
    },
    required: ['phone']
  },
  response: {
    200: {
      $ref: 'SmsService200#'
    },
    500: {
      $ref: 'SmsService500#'
    }
  }
}

module.exports = async function (fastify) {
  fastify.post('/', { schema: routeSchema }, async (req, reply) => {
    const sms = await smsService.sendSms(req.body.phone)
    reply.code(200).send({
      verificationCode: sms.verificationCode
    })
  })
}
