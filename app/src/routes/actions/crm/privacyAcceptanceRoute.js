require('../../../models/privacyAcceptance')
const zohoService = require('../../../application/zoho')

const routeSchema = {
  tags: ['Privacy Acceptance'],
  summary: 'Acceptance of the user\'s privacy',
  description: 'Execute a post to send acceptance of the user\'s privacy',
  body: {
    type: 'object',
    required: ['privacyAcceptanceData'],
    privacyAcceptanceData: {
      email: {
        type: 'string',
        nullable: false,
        description: 'User mail address'
      },
      accepted: {
        type: 'bool',
        nullable: false,
        description: 'Flag to indicate whether the user has accepted or not'
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
    // reply.code(200).send({
    // verificationCode: sms.verificationCode
    // })
  })
}
