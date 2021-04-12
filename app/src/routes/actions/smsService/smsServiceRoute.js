require('../../../models/smsService')
const smsService = require('../../../application/smsService')

const routeSchema = {
  tags: ['SmsService'],
  summary: 'Send SMS',
  description: 'Send SMS message with default text and return the verification code',
  body: {
    type: 'object',
    properties: {
      phone: { type: 'string', description: 'The telephone number preceded by the international prefix on which to send SMS' }
    },
    required: ['phone']
  },
  response: {
    200: {
      $ref: 'SmsService200#'
    },
    400: {
      $ref: 'SmsService400#'
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
