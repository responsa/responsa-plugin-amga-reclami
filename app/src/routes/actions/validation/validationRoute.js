require('../../../models/validation')
const validation = require('../../../models/validation')

const schema = {
  tags: ['Fields Validator Service'],
  summary: 'Validate a fields',
  description: 'Validate a predeterminated field base on related regex',
  security: [{ ApiKeyAuth: [] }],
  querystring: {
    type: 'object',
    required: ['fieldName', 'fieldValue'],
    properties: {
      fieldName: { type: 'string', description: 'The field name to validate' },
      fieldValue: { type: 'string', description: 'The field value to validate' }
    }
  },
  response: {
    200: {
      $ref: 'validation200#'
    },
    400: {
      $ref: 'validation400#'
    },
    404: {
      $ref: 'validation404#'
    },
    401: {
      $ref: 'validation401#'
    },
    500: {
      $ref: 'validation500#'
    }
  }
}

module.exports = async function (fastify) {
  fastify.get('/', { schema: schema }, async (req, reply) => {
    const isValidated = validation.validate(req.query.fieldName, req.query.fieldValue)

    if (isValidated === null) {
      reply.code(404).send({
      })
    }

    reply.code(isValidated ? 200 : 400).send({})
  })
}
