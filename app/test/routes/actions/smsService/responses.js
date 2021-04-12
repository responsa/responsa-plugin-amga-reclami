module.exports.code200 = {
  content: {
    'application/json': {
      schema: {
        type: 'object',
        description: 'Verification code generated successfully',
        properties: {
          verificationCode: {
            type: 'number',
            description: 'Verification code',
            nullable: true
          }
        }
      }
    }
  },
  description: 'Verification code generated successfully'
}
