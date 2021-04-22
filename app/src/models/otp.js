const genericErrors = require('./genericErrors')

module.exports.otp = {
  type: 'object',
  addToSwagger: true,
  title: 'OTPResponse',
  description: 'The data returned after requesting an OTP code to be sent to the phone number specified in the request',
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
module.exports.otp401 = genericErrors.generic401
module.exports.otp500 = genericErrors.generic500

module.exports.addSchemas = (fastifyInstance) => {
  fastifyInstance.addSchema({ $id: 'otp', ...this.otp })
  fastifyInstance.addSchema({ $id: 'otp200', ...this.otp200 })
  fastifyInstance.addSchema({ $id: 'otp400', ...this.otp400 })
  fastifyInstance.addSchema({ $id: 'otp401', ...this.otp401 })
  fastifyInstance.addSchema({ $id: 'otp500', ...this.otp500 })
}
