module.exports.readPrivacy = {
  type: 'object',
  properties: {
    result: {
      type: 'boolean',
      description: 'Flag indicating the existence of privacy acceptance',
      nullable: false
    }
  }
}

module.exports.readPrivacy200 = {
  type: 'object',
  description: 'Privacy acceptance read successfully',
  $ref: 'readPrivacy#'
}

module.exports.readPrivacy400 = {
  type: 'object',
  description: 'Bad request',
  $ref: 'Error#'
}

module.exports.readPrivacy500 = {
  type: 'object',
  description: 'Internal error',
  $ref: 'Error#'
}

module.exports.addSchemas = (fastifyInstance) => {
  fastifyInstance.addSchema({ $id: 'readPrivacy', ...this.readPrivacy })
  fastifyInstance.addSchema({ $id: 'readPrivacy200', ...this.readPrivacy200 })
  fastifyInstance.addSchema({ $id: 'readPrivacy400', ...this.readPrivacy400 })
  fastifyInstance.addSchema({ $id: 'readPrivacy500', ...this.readPrivacy500 })
}
