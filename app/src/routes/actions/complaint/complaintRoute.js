const zoho = require('../../../application/zoho/zoho')
const complaint = require('../../../models/complaint')

const getRouteSchema = {
  tags: ['Complaint'],
  summary: 'Gets complaint infos',
  description: 'Reads complaint informations in basic or extended formats',
  querystring: {
    type: 'object',
    properties: {
      id: {
        type: 'number',
        pattern: '^[0-9]+$',
        description: 'Complaint number'
      },
      extended: {
        type: 'boolean',
        default: false,
        pattern: '^[true|false]$',
        description: 'Extended format required'
      }
    },
    required: ['id']
  },
  response: {
    200: {
      $ref: 'complaint200#'
    },
    400: {
      $ref: 'complaint400#'
    },
    401: {
      $ref: 'complaint401#'
    },
    404: {
      $ref: 'complaint404#'
    },
    500: {
      $ref: 'complaint500#'
    },
    503: {
      $ref: 'complaint503#'
    }
  }
}

module.exports = async function (fastify) {
  fastify.get('/', { schema: getRouteSchema }, async (req, reply) => {
    const foundComplaint = await zoho.complaints.byIdRichiesta(req.query.id)
    const response = complaint.infos(foundComplaint, req.query.extended)
    reply.code(200).send({ ...response })
  })
}
