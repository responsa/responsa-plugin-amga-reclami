module.exports.acceptPrivacy = {
  type: 'object',
  properties: {
  }
}

module.exports.acceptPrivacy200 = {
  type: 'object',
  description: 'Privacy acceptance generated successfully',
  $ref: 'acceptPrivacy#'
}

module.exports.acceptPrivacy400 = {
  type: 'object',
  description: 'Bad request',
  $ref: 'Error#'
}

module.exports.acceptPrivacy500 = {
  type: 'object',
  description: 'Internal error',
  $ref: 'Error#'
}

module.exports.addSchemas = (fastifyInstance) => {
  fastifyInstance.addSchema({ $id: 'acceptPrivacy', ...this.acceptPrivacy })
  fastifyInstance.addSchema({ $id: 'acceptPrivacy200', ...this.acceptPrivacy200 })
  fastifyInstance.addSchema({ $id: 'acceptPrivacy400', ...this.acceptPrivacy400 })
  fastifyInstance.addSchema({ $id: 'acceptPrivacy500', ...this.acceptPrivacy500 })
}
