require('jest-extended')
const helper = require('../../../helper')
const responses = require('./getPrivacyAcceptanceResponses')

describe('Privacy Acceptance', () => {
  it('Privacy Acceptance - answers correctly', async () => {
    helper.checkResponses('/actions/privacy', responses)
  })
  it('Privacy Acceptance - Get user\'s acceptance', async () => {
    const sut = await helper.setupTestEnvironment()
    const response = await helper.doGet(
      sut,
      'actions/privacy?email=sergio.79@libero.it',
      helper.requiredHeaders
    )
    expect(response.statusCode).toEqual(200)
  })
  it('Privacy Acceptance - No record found with inexistent mail address', async () => {
    const sut = await helper.setupTestEnvironment()
    const response = await helper.doGet(
      sut,
      'actions/privacy?email=abc@mail.it',
      helper.requiredHeaders
    )
    expect(response.statusCode).toEqual(404)
  })
  it('Privacy Acceptance - Bad request with invalid query string', async () => {
    const sut = await helper.setupTestEnvironment()
    const response = await helper.doGet(
      sut,
      'actions/privacy?invalid=sergio.79@libero.it',
      helper.requiredHeaders
    )
    expect(response.statusCode).toEqual(400)
  })
  it('Privacy Acceptance - Bad request without query string', async () => {
    const sut = await helper.setupTestEnvironment()
    const response = await helper.doGet(
      sut,
      'actions/privacy',
      helper.requiredHeaders
    )
    expect(response.statusCode).toEqual(400)
  })
})
