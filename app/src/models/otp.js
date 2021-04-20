const genericErrors = require('./genericErrors')

module.exports.otp = {
  type: 'object',
  properties: {
    verificationCode: {
      type: 'number',
      description: 'Verification code',
      nullable: true
    }
  }
}

module.exports.otp200 = {
  type: 'object',
  description: 'Verification code generated successfully',
  $ref: 'otp#'
}

module.exports.otp400 = genericErrors.generic400
module.exports.otp500 = genericErrors.generic500

module.exports.addSchemas = (fastifyInstance) => {
  fastifyInstance.addSchema({ $id: 'otp', ...this.otp })
  fastifyInstance.addSchema({ $id: 'otp200', ...this.otp200 })
  fastifyInstance.addSchema({ $id: 'otp400', ...this.otp400 })
  fastifyInstance.addSchema({ $id: 'otp500', ...this.otp500 })
}
