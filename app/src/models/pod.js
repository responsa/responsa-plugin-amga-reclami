module.exports.pod = {
  type: 'object',
  properties: {
    streetName: {
      type: 'string',
      description: 'Street name',
      nullable: true
    },
    streetNumber: {
      type: 'string',
      description: 'Street number',
      nullable: true
    },
    city: {
      type: 'string',
      description: 'City',
      nullable: true
    }
  }
}

module.exports.pod200 = {
  type: 'object',
  description: 'Contract address info retrieved successfully',
  $ref: 'pod#'
}

module.exports.pod400 = {
  type: 'object',
  description: 'Bad request',
  $ref: 'Error#'
}

module.exports.pod404 = {
  type: 'object',
  description: 'Not found',
  $ref: 'Error#'
}

module.exports.pod500 = {
  type: 'object',
  description: 'Internal error',
  $ref: 'Error#'
}

module.exports.addSchemas = (fastifyInstance) => {
  fastifyInstance.addSchema({ $id: 'pod', ...this.pod })
  fastifyInstance.addSchema({ $id: 'pod200', ...this.pod200 })
  fastifyInstance.addSchema({ $id: 'pod400', ...this.pod400 })
  fastifyInstance.addSchema({ $id: 'pod404', ...this.pod404 })
  fastifyInstance.addSchema({ $id: 'pod500', ...this.pod500 })
}
