require('jest-extended')
const helper = require('../../../helper')
const acceptResponses = require('./acceptResponses')
const readResponses = require('./readResponses')

describe('Privacy Acceptance - POST', () => {
  it('Privacy Acceptance - answers correctly', async () => {
    helper.checkResponses('/actions/privacy', acceptResponses, 'post')
    helper.checkResponses('/actions/privacy', readResponses)
  })
  it('Privacy Acceptance - Send user\'s acceptance', async () => {
    const sut = await helper.setupTestEnvironment()
    const response = await helper.doPost(
      sut,
      'actions/privacy',
      { email: 'mail@provider.com', accepted: true },
      helper.requiredHeaders
    )
    expect(response.statusCode).toEqual(200)
  })
  it('Privacy Acceptance - Bad request with invalid mail address', async () => {
    const sut = await helper.setupTestEnvironment()
    const response = await helper.doPost(
      sut,
      'actions/privacy',
      { email: 'mail.it', accepted: true },
      helper.requiredHeaders
    )
    expect(response.statusCode).toEqual(400)
  })
  it('Privacy Acceptance - Bad request with invalid parameter', async () => {
    const sut = await helper.setupTestEnvironment()
    const response = await helper.doPost(
      sut,
      'actions/privacy',
      { email: 'mail@mail.com', invalidParams: true },
      helper.requiredHeaders
    )
    expect(response.statusCode).toEqual(400)
  })
  it('Privacy Acceptance - Bad request without parameters', async () => {
    const sut = await helper.setupTestEnvironment()
    const response = await helper.doPost(
      sut,
      'actions/privacy',
      helper.requiredHeaders
    )
    expect(response.statusCode).toEqual(400)
  })
})

describe('Privacy Acceptance - GET', () => {
  it('Privacy Acceptance - Get user\'s acceptance', async () => {
    const sut = await helper.setupTestEnvironment()
    const response = await helper.doGet(
      sut,
      'actions/privacy?email=sergio.79@libero.it',
      helper.requiredHeaders
    )
    expect(response.statusCode).toEqual(200)
    expect(response.body).toEqual('{"result":true}')
  })
  it('Privacy Acceptance - Get user\'s acceptance - No row found', async () => {
    const sut = await helper.setupTestEnvironment()
    const response = await helper.doGet(
      sut,
      'actions/privacy?email=notexisting@mail.com',
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
  it('Privacy Acceptance - Validation bad mail address', async () => {
    const sut = await helper.setupTestEnvironment()
    const url = 'actions/privacy?email='
    const badMail = ['bad@mail', 'a.mail.it', 'a@x@y.com', 'a.b.c@mail.it.eu.com.', 'bad@mail.']
    for (let i = 0; i < badMail.length; i++) {
      const response = await helper.doGet(sut, `${url}${badMail[i]}`, helper.requiredHeaders)
      expect(response.statusCode).toEqual(400)
    }
  })
  it('Privacy Acceptance - Validation well format mail address', async () => {
    const sut = await helper.setupTestEnvironment()
    const url = 'actions/privacy?email='
    const goodMail = ['ok@mail.it', 'a.b.c@mail.com', 'a.b.c@mail.other.com']
    for (let i = 0; i < goodMail.length; i++) {
      const response = await helper.doGet(sut, `${url}${goodMail[i]}`, helper.requiredHeaders)
      expect(response.statusCode).not.toEqual(400)
    }
  })
})
