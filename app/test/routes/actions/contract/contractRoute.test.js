const helper = require('../../../helper')
const podResponses = require('./pod-responses')
const pdrResponses = require('./pdr-responses')
require('jest-extended')

describe('POD', () => {
  it('POD - answers correctly', async () => {
    await helper.checkResponses('/actions/contract/pod', podResponses)
  })

  it('POD - answers 200 with correct querystring', async () => {
    const sut = await helper.setupTestEnvironment()

    const response = await helper.doGet(
      sut,
      'actions/contract/pod?code=IT003E01014837',
      helper.requiredHeaders
    )

    expect(response.statusCode).toEqual(200)
    const addrInfo = JSON.parse(response.body)
    expect(addrInfo.streetName).toEqual('LARGO DELLA BARRIERA VECCHIA')
    expect(addrInfo.streetNumber).toEqual('16')
    expect(addrInfo.city).toEqual('TRIESTE')
    expect(addrInfo.province).toEqual('TRIESTE')
  })

  it('POD - answers 400 without code query param', async () => {
    const sut = await helper.setupTestEnvironment()

    const response = await helper.doGet(
      sut,
      'actions/contract/pod',
      helper.requiredHeaders
    )

    expect(response.statusCode).toEqual(400)
  })

  it('POD - answers 400 with code query param set to null', async () => {
    const sut = await helper.setupTestEnvironment()

    const response = await helper.doGet(
      sut,
      'actions/contract/pod?code=',
      helper.requiredHeaders
    )

    expect(response.statusCode).toEqual(400)
  })

  it('POD - answers 400 with code query param > 14 char long', async () => {
    const sut = await helper.setupTestEnvironment()

    const response = await helper.doGet(
      sut,
      'actions/contract/pod?code=IT1234123412341234',
      helper.requiredHeaders
    )

    expect(response.statusCode).toEqual(400)
  })

  it('POD - answers 400 with number code query param', async () => {
    const sut = await helper.setupTestEnvironment()

    const response = await helper.doGet(
      sut,
      'actions/contract/pod?code=111234123412341234',
      helper.requiredHeaders
    )

    expect(response.statusCode).toEqual(400)
  })

  it('POD - answers 400 with bool code query param', async () => {
    const sut = await helper.setupTestEnvironment()

    const response = await helper.doGet(
      sut,
      'actions/contract/pod?code=true',
      helper.requiredHeaders
    )

    expect(response.statusCode).toEqual(400)
  })

  it('POD - answers 404 with not existing POD code', async () => {
    const sut = await helper.setupTestEnvironment()

    const response = await helper.doGet(
      sut,
      'actions/contract/pod?code=IT003E03000000',
      helper.requiredHeaders
    )

    expect(response.statusCode).toEqual(404)
  })
})

describe('PDR', () => {
  it('PDR - answers correctly', async () => {
    await helper.checkResponses('/actions/contract/pdr', pdrResponses)
  })

  it('PDR - answers 200 with correct querystring', async () => {
    const sut = await helper.setupTestEnvironment()

    const response = await helper.doGet(
      sut,
      'actions/contract/pdr?code=11825000004470',
      helper.requiredHeaders
    )

    expect(response.statusCode).toEqual(200)
    const addrInfo = JSON.parse(response.body)
    expect(addrInfo.streetName).toEqual('VIA DANIELE CERNAZAI')
    expect(addrInfo.streetNumber).toEqual('23')
    expect(addrInfo.city).toEqual('PREMARIACCO')
    expect(addrInfo.province).toEqual('UDINE')
  })

  it('PDR - answers 400 without code query param', async () => {
    const sut = await helper.setupTestEnvironment()

    const response = await helper.doGet(
      sut,
      'actions/contract/pdr',
      helper.requiredHeaders
    )

    expect(response.statusCode).toEqual(400)
  })

  it('PDR - answers 400 with code query param set to null', async () => {
    const sut = await helper.setupTestEnvironment()

    const response = await helper.doGet(
      sut,
      'actions/contract/pdr?code=',
      helper.requiredHeaders
    )

    expect(response.statusCode).toEqual(400)
  })

  it('PDR - answers 400 with invalid code query param', async () => {
    const sut = await helper.setupTestEnvironment()

    const response = await helper.doGet(
      sut,
      'actions/contract/pdr?code=IT1234123412341234',
      helper.requiredHeaders
    )

    expect(response.statusCode).toEqual(400)
  })

  it('PDR - answers 400 with bool code query param', async () => {
    const sut = await helper.setupTestEnvironment()

    const response = await helper.doGet(
      sut,
      'actions/contract/pdr?code=true',
      helper.requiredHeaders
    )

    expect(response.statusCode).toEqual(400)
  })

  it('PDR - answers 404 with not existing PDR code', async () => {
    const sut = await helper.setupTestEnvironment()

    const response = await helper.doGet(
      sut,
      'actions/contract/pdr?code=11825000000000',
      helper.requiredHeaders
    )

    expect(response.statusCode).toEqual(404)
  })
})
