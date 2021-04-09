module.exports.code200 = {
  content: {
    'application/json': {
      schema: {
        type: 'object',
        description: 'Il codice di verifica 200',
        properties: {
          verificationCode: {
            type: 'number',
            description: 'Il codice di verifica',
            nullable: true
          }
        }
      }
    }
  },
  description: 'Il codice di verifica 200'
}
