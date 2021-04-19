const zoho = require('../../../application/zoho/zoho')
const ticket = require('../../../models/ticket')

const getRouteSchema = {
  tags: ['Ticket'],
  summary: 'Gets ticket infos',
  description: 'Reads ticket informations in basic or extended formats',
  querystring: {
    type: 'object',
    properties: {
      id: {
        type: 'number',
        pattern: '^[0-9]+$',
        description: 'Ticket number'
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
      $ref: 'ticket200#'
    },
    400: {
      $ref: 'ticket400#'
    },
    404: {
      $ref: 'ticket404#'
    },
    500: {
      $ref: 'ticket500#'
    }
  }
}

module.exports = async function (fastify) {
  fastify.get('/', { schema: getRouteSchema }, async (req, reply) => {
    const foundTicket = await zoho.tickets.byIdRichiesta(req.query.id)
    const response = ticket.infos(foundTicket, req.query.extended)
    reply.code(200).send({ ...response })
  })
}
