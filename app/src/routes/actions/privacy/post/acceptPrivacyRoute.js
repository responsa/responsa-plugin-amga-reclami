const zohoService = require('../../../../application/zoho')

const routeSchema = {
  tags: ['Privacy Acceptance'],
  summary: 'Acceptance of the user\'s privacy',
  description: 'Execute a post to send acceptance of the user\'s privacy',
  body: {
    type: 'object',
    required: ['email', 'accepted'],
    properties: {
      email: {
        type: 'string',
        nullable: false,
        description: 'User mail address'
      },
      accepted: {
        type: 'boolean',
        nullable: false,
        description: 'Flag to indicate whether the user has accepted or not'
      }
    }
  },
  response: {
    200: {
      $ref: 'acceptPrivacy200#'
    },
    400: {
      $ref: 'acceptPrivacy400#'
    },
    500: {
      $ref: 'acceptPrivacy500#'
    }
  }
}

module.exports = async function (fastify) {
  fastify.post('/', { schema: routeSchema }, async (req, reply) => {
    const result = await zohoService.postData(
      '/form/Privacy',
      {
        data: {
          Cliente_email: req.body.email,
          Consenso: req.body.accepted ? 'SI' : 'NO',
          added_Time: Date.now(),
          modified_Time: Date.now()
        }
      })
    reply.code(result.data.code === 3000 ? 200 : 400).send({
    })
  })
}
