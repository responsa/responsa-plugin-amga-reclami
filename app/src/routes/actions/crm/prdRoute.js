require('../../../models/podpdr')
const zoho = require('../../../application/zoho')
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
  fastify.get('/pdr', { schema: pdrRouteSchema }, async (req, reply) => {
    try {
      const zohoResponse = await zoho.getData(`report/PODPDR_Report?criteria=(PODPDR=="${req.query.code}")`)
      if (zohoResponse.status === 200) {
        if (zohoResponse.data && zohoResponse.data.data && zohoResponse.data.data.length > 0) {
          const data = zohoResponse.data.data[0]
          reply.code(200).send({
            streetName: data.Nome_della_strada,
            streetNumber: data.Numero_civico,
            city: data.Nome_ISTAT_della_provincia
          })
        } else {
          throw new ContractNotFoundError(`No contract found with PDR ${req.query.code}`)
        }
      } else if (zohoResponse.status === 404) {
        throw new ContractNotFoundError(`No contract found with PDR ${req.query.code}`)
      }
    } catch (e) {
      throw new ContractNotFoundError(`No contract found with PDR ${req.query.code}`)
    }
  })
}
