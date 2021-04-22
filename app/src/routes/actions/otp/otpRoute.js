require('../../../models/otp')
const smsService = require('../../../application/smsService')

const routeSchema = {
  tags: ['OTP Service'],
  summary: 'Send OTP code via SMS',
  description: 'Sends OTP code via SMS with default text and returns the OTP itself',
  security: [{ ApiKeyAuth: [] }],
  body: {
    type: 'object',
    required: ['phone'],
    properties: {
      phone: {
        type: 'string',
        nullable: false,
        pattern: '^^\\+\\d{7,15}$',
        description: 'The telephone number preceeded by the international prefix on which to send SMS'
      }
    }
  },
  response: {
    200: {
      $ref: 'otp200#'
    },
    400: {
      $ref: 'otp400#'
    },
    401: {
      $ref: 'otp401#'
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
