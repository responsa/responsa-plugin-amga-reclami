const zohoService = require('../../../application/zoho')

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
    500: {
      $ref: 'readPrivacy500#'
    }
  }
}

module.exports = async function (fastify) {
  fastify.post('/', { schema: postRouteSchema }, async (req, reply) => {
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
    reply.code(result.data.code !== 3000 ? 400 : 200).send()
  })
  fastify.get('/', { schema: getRouteSchema }, async (req, reply) => {
    try {
      const result = await zohoService.getData(`/report/Privacy_Report?criteria=(Cliente_email=="${req.query.email}")`)
      let found = false
      found = result.data.data.sort((a, b) => b.Modified_Time - a.Modified_Time)[0].Consenso === 'SI'
      reply.code(200).send({
        result: found
      })
    } catch (err) {
      if (err.message === 'Error: Request failed with status code 404') {
        reply.code(200).send({
          result: false
        })
      } else {
        throw err
      }
    }
  })
}
