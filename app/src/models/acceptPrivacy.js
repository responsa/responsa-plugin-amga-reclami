const genericErrors = require('./genericErrors')

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

module.exports.acceptPrivacy400 = genericErrors.generic400
module.exports.acceptPrivacy401 = genericErrors.generic401
module.exports.acceptPrivacy500 = genericErrors.generic500
module.exports.acceptPrivacy503 = genericErrors.generic503

module.exports.addSchemas = (fastifyInstance) => {
  fastifyInstance.addSchema({ $id: 'acceptPrivacy', ...this.acceptPrivacy })
  fastifyInstance.addSchema({ $id: 'acceptPrivacy200', ...this.acceptPrivacy200 })
  fastifyInstance.addSchema({ $id: 'acceptPrivacy400', ...this.acceptPrivacy400 })
  fastifyInstance.addSchema({ $id: 'acceptPrivacy401', ...this.acceptPrivacy401 })
  fastifyInstance.addSchema({ $id: 'acceptPrivacy500', ...this.acceptPrivacy500 })
  fastifyInstance.addSchema({ $id: 'acceptPrivacy503', ...this.acceptPrivacy503 })
}

module.exports.buildRequest = (email, accepted) => {
  return {
    data: {
      Cliente_email: email,
      Consenso: accepted ? 'SI' : 'NO',
      added_Time: Date.now(),
      modified_Time: Date.now()
    }
  }
}
