module.exports.privacyAcceptance = {
  type: 'object',
  properties: {
  }
}

module.exports.privacyAcceptance200 = {
  type: 'object',
  description: 'Privacy acceptance generated successfully',
  $ref: 'privacyAcceptance#'
}

module.exports.privacyAcceptance400 = {
  type: 'object',
  description: 'Bad request',
  $ref: 'Error#'
}

module.exports.privacyAcceptance500 = {
  type: 'object',
  description: 'Internal error',
  $ref: 'Error#'
}

module.exports.addSchemas = (fastifyInstance) => {
  fastifyInstance.addSchema({ $id: 'privacyAcceptance', ...this.privacyAcceptance })
  fastifyInstance.addSchema({ $id: 'privacyAcceptance200', ...this.privacyAcceptance200 })
  fastifyInstance.addSchema({ $id: 'privacyAcceptance400', ...this.privacyAcceptance400 })
  fastifyInstance.addSchema({ $id: 'privacyAcceptance500', ...this.privacyAcceptance500 })
}
