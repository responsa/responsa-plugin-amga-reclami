const genericErrors = require('./genericErrors')

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

module.exports.readPrivacy400 = genericErrors.generic400
module.exports.readPrivacy404 = genericErrors.generic404('Read privacy not found')
module.exports.readPrivacy500 = genericErrors.generic500

module.exports.addSchemas = (fastifyInstance) => {
  fastifyInstance.addSchema({ $id: 'readPrivacy', ...this.readPrivacy })
  fastifyInstance.addSchema({ $id: 'readPrivacy200', ...this.readPrivacy200 })
  fastifyInstance.addSchema({ $id: 'readPrivacy400', ...this.readPrivacy400 })
  fastifyInstance.addSchema({ $id: 'readPrivacy404', ...this.readPrivacy404 })
  fastifyInstance.addSchema({ $id: 'readPrivacy500', ...this.readPrivacy500 })
}
