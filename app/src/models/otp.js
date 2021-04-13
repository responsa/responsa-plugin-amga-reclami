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

module.exports.otp400 = {
  type: 'object',
  description: 'Bad request',
  $ref: 'Error#'
}

module.exports.otp500 = {
  type: 'object',
  description: 'Internal error',
  $ref: 'Error#'
}

module.exports.addSchemas = (fastifyInstance) => {
  fastifyInstance.addSchema({ $id: 'otp', ...this.otp })
  fastifyInstance.addSchema({ $id: 'otp200', ...this.otp200 })
  fastifyInstance.addSchema({ $id: 'otp400', ...this.otp400 })
  fastifyInstance.addSchema({ $id: 'otp500', ...this.otp500 })
}
