require('jest-extended')
const helper = require('../../../../helper')
const responses = require('./readPrivacyResponses')

describe('Privacy Acceptance', () => {
  it('Privacy Acceptance - answers correctly', async () => {
    helper.checkResponses('/actions/privacy/read', responses)
  })
  it('Privacy Acceptance - Get user\'s acceptance', async () => {
    const sut = await helper.setupTestEnvironment()
    const response = await helper.doGet(
      sut,
      'actions/privacy/read?email=sergio.79@libero.it',
      helper.requiredHeaders
    )
    expect(response.statusCode).toEqual(200)
  })
  it('Privacy Acceptance - Get user\'s acceptance - No row found', async () => {
    const sut = await helper.setupTestEnvironment()
    const response = await helper.doGet(
      sut,
      'actions/privacy/read?email=_dsfsdfsdfdsf_@rwererw.com',
      helper.requiredHeaders
    )
    expect(response.statusCode).toEqual(200)
  })
  it('Privacy Acceptance - Bad request with invalid query string', async () => {
    const sut = await helper.setupTestEnvironment()
    const response = await helper.doGet(
      sut,
      'actions/privacy/read?invalid=sergio.79@libero.it',
      helper.requiredHeaders
    )
    expect(response.statusCode).toEqual(400)
  })
  it('Privacy Acceptance - Bad request without query string', async () => {
    const sut = await helper.setupTestEnvironment()
    const response = await helper.doGet(
      sut,
      'actions/privacy/read',
      helper.requiredHeaders
    )
    expect(response.statusCode).toEqual(400)
  })
  it('Privacy Acceptance - Validation bad mail address', async () => {
    const sut = await helper.setupTestEnvironment()
    const url = 'actions/privacy/read?email='
    const badMail = ['bad@mail', 'a.mail.it', 'a@x@y.com', 'a.b.c@mail.it.eu.com.', 'bad@mail.']
    for (let i = 0; i < badMail.length; i++) {
      const response = await helper.doGet(sut, `${url}${badMail[i]}`, helper.requiredHeaders)
      expect(response.statusCode).toEqual(400)
    }
  })
  it('Privacy Acceptance - Validation well format mail address', async () => {
    const sut = await helper.setupTestEnvironment()
    const url = 'actions/privacy/read?email='
    const goodMail = ['ok@mail.it', 'a.b.c@mail.com', 'a.b.c@mail.other.com']
    for (let i = 0; i < goodMail.length; i++) {
      const response = await helper.doGet(sut, `${url}${goodMail[i]}`, helper.requiredHeaders)
      expect(response.statusCode).toEqual(200)
    }
  })
})
