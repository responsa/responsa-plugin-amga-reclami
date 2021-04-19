require('../../../models/podpdr')
const zoho = require('../../../application/zoho/zoho')
const podpdr = require('../../../models/podpdr')
const createError = require('fastify-error')

const ContractNotFoundError = createError('CONTRACT_NOT_FOUND', '%s', 404)

const pdrRouteSchema = {
  tags: ['CRM PDR Service'],
  summary: 'Search for contracts by PDR code',
  description: 'Searches for the contract related to the incoming PDR code and returns info on the associated address',
  querystring: {
    type: 'object',
    required: ['code'],
    properties: {
      code: {
        type: 'string',
        nullable: false,
        pattern: '^\\d{14}$',
        description: 'The PDR code to search for contract info'
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
  fastify.get('/', { schema: pdrRouteSchema }, async (req, reply) => {
    const zohoRes = await zoho.podpdr.getByCode(req.query.code)
    const res = podpdr.parseZohoResponse(zohoRes)
    if (res) {
      reply.code(200).send(res)
    } else {
      throw new ContractNotFoundError(`No contract found with PDR ${req.query.code}`)
    }
  })
}
