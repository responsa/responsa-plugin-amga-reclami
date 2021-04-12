require('jest-extended')
const helper = require('../../../helper')
const responses = require('./responses')

describe('SmsService - Swagger OpenApi tests', () => {
  it('Example - loads correctly', async () => {
    helper.checkResponses('/actions/smsService', responses)
  })
})

describe('SmsService', () => {
  it('SmsService - answers 200 with correct body', async () => {
    const sut = await helper.setupTestEnvironment()

    const response = await helper.doPost(
      sut,
      'actions/smsService',
      { phone: '+390000000000' },
      helper.requiredHeaders
    )
    expect(response.statusCode).toEqual(200)
  })
  it('SmsService - answers 400 with missing body', async () => {
    const sut = await helper.setupTestEnvironment()

    const response = await helper.doPost(
      sut,
      'actions/smsService',
      null,
      helper.requiredHeaders
    )
    expect(response.statusCode).toEqual(400)
  })
})
