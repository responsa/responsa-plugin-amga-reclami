require('jest-extended')
const helper = require('../../../helper')
const responses = require('./responses')

describe('OTP', () => {
  it('OTP - answers correctly', async () => {
    helper.checkResponses('/actions/otp', responses)
  })

  it('OTP - answers 200 with correct body', async () => {
    const sut = await helper.setupTestEnvironment()

    const response = await helper.doPost(
      sut,
      'actions/otp',
      { phone: '+390000000000' },
      helper.requiredHeaders
    )
    expect(response.statusCode).toEqual(200)
  })

  it('OTP - answers 400 with missing body', async () => {
    const sut = await helper.setupTestEnvironment()

    const response = await helper.doPost(
      sut,
      'actions/otp',
      null,
      helper.requiredHeaders
    )
    expect(response.statusCode).toEqual(400)
  })
})
