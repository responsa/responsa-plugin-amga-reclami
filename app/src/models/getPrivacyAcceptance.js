module.exports.getPrivacyAcceptance = {
  type: 'object',
  properties: {
    result: {
      type: 'boolean',
      description: 'Flag indicating the existence of privacy acceptance',
      nullable: true
    }
  }
}

module.exports.getPrivacyAcceptance200 = {
  type: 'object',
  description: 'Privacy acceptance read succesfully',
  $ref: 'getPrivacyAcceptance#'
}

module.exports.getPrivacyAcceptance400 = {
  type: 'object',
  description: 'Bad request',
  $ref: 'Error#'
}

module.exports.getPrivacyAcceptance500 = {
  type: 'object',
  description: 'Internal error',
  $ref: 'Error#'
}

module.exports.addSchemas = (fastifyInstance) => {
  fastifyInstance.addSchema({ $id: 'getPrivacyAcceptance', ...this.getPrivacyAcceptance })
  fastifyInstance.addSchema({ $id: 'getPrivacyAcceptance200', ...this.getPrivacyAcceptance200 })
  fastifyInstance.addSchema({ $id: 'getPrivacyAcceptance400', ...this.getPrivacyAcceptance400 })
  fastifyInstance.addSchema({ $id: 'getPrivacyAcceptance500', ...this.getPrivacyAcceptance500 })
}
