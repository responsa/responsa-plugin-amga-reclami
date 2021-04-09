module.exports.SmsService = {
  type: 'object',
  properties: {
    verificationCode: {
      type: 'number',
      description: 'Il codice di verifica',
      nullable: true
    }
  }
}

module.exports.SmsService200 = {
  type: 'object',
  description: 'Il codice di verifica 200',
  $ref: 'SmsService#'
}

module.exports.SmsService500 = {
  type: 'object',
  description: 'Errore interno',
  $ref: 'Error#'
}

module.exports.addSchemas = (fastifyInstance) => {
  fastifyInstance.addSchema({ $id: 'SmsService', ...this.SmsService })
  fastifyInstance.addSchema({ $id: 'SmsService200', ...this.SmsService200 })
  fastifyInstance.addSchema({ $id: 'SmsService500', ...this.SmsService500 })
}
