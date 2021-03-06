require('jest-extended')
const helper = require('../../../helper')
const responses = require('./responses')

describe('OTP', () => {
  it('OTP - answers correctly', async () => {
    helper.checkResponses('/actions/otp', responses, 'post')
  })

  it('OTP - answers 200 with correct body', async () => {
    const sut = await helper.setupTestEnvironment()

    const response = await helper.doPost(
      sut,
      'actions/otp',
      { phone: '+393930975687' },
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

    helper.test400(response, 'body should be object')
  })

  it('OTP - answers 400 with empty body', async () => {
    const sut = await helper.setupTestEnvironment()

    const response = await helper.doPost(
      sut,
      'actions/otp',
      {},
      helper.requiredHeaders
    )

    helper.test400(response, 'body should have required property \'phone\'')
  })

  it('OTP - answers 400 with boolean phone', async () => {
    const sut = await helper.setupTestEnvironment()

    const response = await helper.doPost(
      sut,
      'actions/otp',
      { phone: true },
      helper.requiredHeaders
    )

    helper.test400(response, 'body.phone should match pattern "^^\\+\\d{7,15}$"')
  })

  it('OTP - answers 400 with numeric phone', async () => {
    const sut = await helper.setupTestEnvironment()

    const response = await helper.doPost(
      sut,
      'actions/otp',
      { phone: 1 },
      helper.requiredHeaders
    )

    helper.test400(response, 'body.phone should match pattern "^^\\+\\d{7,15}$"')
  })

  it('OTP - answers 400 with null phone', async () => {
    const sut = await helper.setupTestEnvironment()

    const response = await helper.doPost(
      sut,
      'actions/otp',
      { phone: null },
      helper.requiredHeaders
    )

    helper.test400(response, 'body.phone should match pattern "^^\\+\\d{7,15}$"')
  })
})
