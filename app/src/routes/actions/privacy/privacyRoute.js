const acceptPrivacy = require('../../../models/acceptPrivacy')
const zohoService = require('../../../application/zoho/zoho')

const postRouteSchema = {
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
        description: 'User mail address',
        pattern: '^\\w+([-+.\']\\w+)*@\\w+([-.]\\w+)*\\.\\w+([-.]\\w+)*$'
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
    401: {
      $ref: 'acceptPrivacy401#'
    },
    500: {
      $ref: 'acceptPrivacy500#'
    },
    503: {
      $ref: 'acceptPrivacy503#'
    }
  }
}

const getRouteSchema = {
  tags: ['Read Privacy Acceptance'],
  summary: 'Read acceptance of the user\'s privacy',
  description: 'Execute a get to aquire acceptance of the user\'s privacy',
  querystring: {
    type: 'object',
    required: ['email'],
    properties: {
      email: { type: 'string', description: 'The user\'s email address', pattern: '^\\w+([-+.\']\\w+)*@\\w+([-.]\\w+)*\\.\\w+([-.]\\w+)*$' }
    }
  },
  response: {
    200: {
      $ref: 'readPrivacy200#'
    },
    400: {
      $ref: 'readPrivacy400#'
    },
    401: {
      $ref: 'readPrivacy401#'
    },
    500: {
      $ref: 'readPrivacy500#'
    },
    503: {
      $ref: 'readPrivacy503#'
    }
  }
}

module.exports = async function (fastify) {
  fastify.post('/', { schema: postRouteSchema }, async (req, reply) => {
    await zohoService.privacy.accept(acceptPrivacy.buildRequest(req.body.email, req.body.accepted))
    reply.code(200).send()
  })

  fastify.get('/', { schema: getRouteSchema }, async (req, reply) => {
    const result = await zohoService.privacy.get(req.query.email)
    const found = result.sort((a, b) => b.Modified_Time - a.Modified_Time)[0].Consenso === 'SI'
    reply.code(200).send({
      result: found
    })
  })
}
