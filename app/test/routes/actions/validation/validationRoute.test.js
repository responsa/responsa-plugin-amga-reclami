require('jest-extended')
const helper = require('../../../helper')
const responses = require('./responses')

describe('Fields validator', () => {
  it('Fields Validator - answers correctly', async () => {
    helper.checkResponses('/actions/validation', responses, 'get')
  })

  it('Field Validator - quotationCode answers 200 with right validation', async () => {
    const sut = await helper.setupTestEnvironment()

    const response = await helper.doGet(
      sut,
      'actions/validation?fieldName=quotationCode&fieldValue=25111111',
      helper.requiredHeaders
    )

    expect(response.statusCode).toEqual(200)
  })
  it('Field Validator - quotationCode answers 400 with bad validation', async () => {
    const sut = await helper.setupTestEnvironment()

    const response = await helper.doGet(
      sut,
      'actions/validation?fieldName=quotationCode&fieldValue=25111111-x',
      helper.requiredHeaders
    )

    expect(response.statusCode).toEqual(400)
  })

  it('Field Validator - quotationCode answers 404 with field name not found', async () => {
    const sut = await helper.setupTestEnvironment()

    const response = await helper.doGet(
      sut,
      'actions/validation?fieldName=inexisting&fieldValue=25111111',
      helper.requiredHeaders
    )

    expect(response.statusCode).toEqual(404)
  })
})
