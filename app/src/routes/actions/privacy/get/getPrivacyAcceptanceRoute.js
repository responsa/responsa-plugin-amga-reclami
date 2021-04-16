const zohoService = require('../../../../application/zoho')

const routeSchema = {
  tags: ['Read Privacy Acceptance'],
  summary: 'Read acceptance of the user\'s privacy',
  description: 'Execute a get to aquire acceptance of the user\'s privacy',
  querystring: {
    type: 'object',
    required: ['email'],
    properties: {
      email: { type: 'string', description: 'The user\'s email address' }
    }
  },
  response: {
    200: {
      $ref: 'getPrivacyAcceptance200#'
    },
    400: {
      $ref: 'getPrivacyAcceptance400#'
    },
    500: {
      $ref: 'getPrivacyAcceptance500#'
    }
  }
}

module.exports = async function (fastify) {
  fastify.get('/', { schema: routeSchema }, async (req, reply) => {
    const result = await zohoService.getData(`/report/Privacy_Report?criteria=(Cliente_email=="${req.query.email}")`)
    let found = false
    if (result.data.code === 3000) {
      found = result.data.data.sort((a, b) => b.Modified_Time - a.Modified_Time)[0].Consenso === 'SI'
      reply.code(200).send({
        result: found
      })
    } else if (result.data.code === 3100) {
      return found
    } else {
      reply.code(400)
    }
  })
}
