require('../../../models/podpdr')
const zoho = require('../../../application/zoho/zoho')
const podpdr = require('../../../models/podpdr')

const podRouteSchema = {
  tags: ['CRM POD Service'],
  summary: 'Search for contracts by POD code',
  description: 'Searches for the contract related to the incoming POD code and returns info on the associated address',
  querystring: {
    type: 'object',
    required: ['code'],
    properties: {
      code: {
        type: 'string',
        nullable: false,
        pattern: '^IT\\d{3}E\\d{8}$',
        description: 'The POD code to search for contract info'
      }
    }
  },
  response: {
    200: {
      $ref: 'podpdr200#'
    },
    400: {
      $ref: 'podpdr400#'
    },
    404: {
      $ref: 'podpdr404#'
    },
    500: {
      $ref: 'podpdr500#'
    }
  }
}

module.exports = async function (fastify) {
  fastify.get('/', { schema: podRouteSchema }, async (req, reply) => {
    const zohoRes = await zoho.podpdr.getByCode(req.query.code)
    const res = podpdr.parseZohoResponse(zohoRes)
    reply.code(200).send(res)
  })
}
