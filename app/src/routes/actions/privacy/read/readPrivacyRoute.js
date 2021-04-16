const zohoService = require('../../../../application/zoho')

const routeSchema = {
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
  fastify.get('/', { schema: routeSchema }, async (req, reply) => {
    let result = null
    try {
      result = await zohoService.getData(`/report/Privacy_Report?criteria=(Cliente_email=="${req.query.email}")`)
      let found = false
      found = result.data.data.sort((a, b) => b.Modified_Time - a.Modified_Time)[0].Consenso === 'SI'
      reply.code(200).send({
        result: found
      })
    } catch (error) {
      if (result.data.code === 3100) {
        return false
      } else {
        throw error
      }
    }
  })
}
