const helper = require('../../../helper')
const responses = require('./responses')
require('jest-extended')

describe('PDR', () => {
  it('PDR - answers correctly', async () => {
    await helper.checkResponses('/actions/pdr', responses)
  })

  it('PDR - answers 200 with correct querystring', async () => {
    const sut = await helper.setupTestEnvironment()

    const response = await helper.doGet(
      sut,
      'actions/pdr?code=11825000002472',
      helper.requiredHeaders
    )

    expect(response.statusCode).toEqual(200)
    const addrInfo = JSON.parse(response.body)
    expect(addrInfo.streetName).toEqual('PIAZZA INSURREZIONE')
    expect(addrInfo.streetNumber).toEqual('10')
    expect(addrInfo.city).toEqual('PADOVA')
  })

  it('PDR - answers 400 without code query param', async () => {
    const sut = await helper.setupTestEnvironment()

    const response = await helper.doGet(
      sut,
      'actions/pdr',
      helper.requiredHeaders
    )

    expect(response.statusCode).toEqual(400)
  })

  it('PDR - answers 400 with code query param set to null', async () => {
    const sut = await helper.setupTestEnvironment()

    const response = await helper.doGet(
      sut,
      'actions/pdr?code=',
      helper.requiredHeaders
    )

    expect(response.statusCode).toEqual(400)
  })

  it('PDR - answers 400 with invalid code query param', async () => {
    const sut = await helper.setupTestEnvironment()

    const response = await helper.doGet(
      sut,
      'actions/pdr?code=IT1234123412341234',
      helper.requiredHeaders
    )

    expect(response.statusCode).toEqual(400)
  })

  it('PDR - answers 400 with bool code query param', async () => {
    const sut = await helper.setupTestEnvironment()

    const response = await helper.doGet(
      sut,
      'actions/pdr?code=true',
      helper.requiredHeaders
    )

    expect(response.statusCode).toEqual(400)
  })

  it('PDR - answers 404 with not existing PDR code', async () => {
    const sut = await helper.setupTestEnvironment()

    const response = await helper.doGet(
      sut,
      'actions/pdr?code=11825000000000',
      helper.requiredHeaders
    )

    expect(response.statusCode).toEqual(404)
  })
})
