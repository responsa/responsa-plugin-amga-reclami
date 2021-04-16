require('jest-extended')
const helper = require('../../../../helper')
const responses = require('./acceptPrivacyResponses')

describe('Privacy Acceptance', () => {
  it('Privacy Acceptance - answers correctly', async () => {
    helper.checkResponses('/actions/privacy/accept', responses)
  })
  it('Privacy Acceptance - Send user\'s acceptance', async () => {
    const sut = await helper.setupTestEnvironment()
    const response = await helper.doPost(
      sut,
      'actions/privacy/accept',
      { email: 'mail@provider.com', accepted: true },
      helper.requiredHeaders
    )
    expect(response.statusCode).toEqual(200)
  })
  it('Privacy Acceptance - Bad request with invalid mail address', async () => {
    const sut = await helper.setupTestEnvironment()
    const response = await helper.doPost(
      sut,
      'actions/privacy/accept',
      { email: 'mail.it', accepted: true },
      helper.requiredHeaders
    )
    expect(response.statusCode).toEqual(400)
  })
  it('Privacy Acceptance - Bad request with invalid parameter', async () => {
    const sut = await helper.setupTestEnvironment()
    const response = await helper.doPost(
      sut,
      'actions/privacy/accept',
      { email: 'mail@mail.com', invalidParams: true },
      helper.requiredHeaders
    )
    expect(response.statusCode).toEqual(400)
  })
  it('Privacy Acceptance - Bad request without parameters', async () => {
    const sut = await helper.setupTestEnvironment()
    const response = await helper.doPost(
      sut,
      'actions/privacy/accept',
      helper.requiredHeaders
    )
    expect(response.statusCode).toEqual(400)
  })
})
