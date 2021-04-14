const helper = require('../../../helper')
const responses = require('./responses')
require('jest-extended')

describe('POD', () => {
  it('POD - answers correctly', async () => {
    await helper.checkResponses('/actions/crm/pod', responses)
  })

  it('POD - answers 200 with correct querystring', async () => {
    const sut = await helper.setupTestEnvironment()

    const response = await helper.doGet(
      sut,
      'actions/crm/pod?code=IT003E03008583',
      helper.requiredHeaders
    )

    expect(response.statusCode).toEqual(200)
    const addrInfo = JSON.parse(response.body)
    expect(addrInfo.streetName).toEqual('VIA DEL REFOSCO')
    expect(addrInfo.streetNumber).toEqual('17')
    expect(addrInfo.city).toEqual('TRIESTE')
  })

  it('POD - answers 400 without code query param', async () => {
    const sut = await helper.setupTestEnvironment()

    const response = await helper.doGet(
      sut,
      'actions/crm/pod',
      helper.requiredHeaders
    )

    expect(response.statusCode).toEqual(400)
  })

  it('POD - answers 400 with code query param set to null', async () => {
    const sut = await helper.setupTestEnvironment()

    const response = await helper.doGet(
      sut,
      'actions/crm/pod?code=',
      helper.requiredHeaders
    )

    expect(response.statusCode).toEqual(400)
  })

  it('POD - answers 400 with code query param > 14 char long', async () => {
    const sut = await helper.setupTestEnvironment()

    const response = await helper.doGet(
      sut,
      'actions/crm/pod?code=IT1234123412341234',
      helper.requiredHeaders
    )

    expect(response.statusCode).toEqual(400)
  })

  it('POD - answers 404 with not existing POD code', async () => {
    const sut = await helper.setupTestEnvironment()

    const response = await helper.doGet(
      sut,
      'actions/crm/pod?code=IT003E03000000',
      helper.requiredHeaders
    )

    expect(response.statusCode).toEqual(404)
  })
})
