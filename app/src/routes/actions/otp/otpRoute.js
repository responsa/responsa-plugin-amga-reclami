require('../../../models/otp')
const smsService = require('../../../application/smsService')

const routeSchema = {
  tags: ['OTP Service'],
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
      $ref: 'otp200#'
    },
    400: {
      $ref: 'otp400#'
    },
    500: {
      $ref: 'otp500#'
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
