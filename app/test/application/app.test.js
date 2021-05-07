const helper = require('../helper')

// setup a basic test to verify routes and schemas
describe('App', () => {
  it('Status API answers properly', async () => {
    const sut = await helper.setupTestEnvironment()

    const response = await helper.doGet(
      sut,
      'status',
      helper.requiredHeaders
    )
    expect(response.statusCode).toEqual(200)
  })

  it('config has correct values', async () => {
    const config = require('../../src/application/config')

    expect(config.zoho).not.toBeNull()
    expect(config.zoho.clientId).toBeDefined()
    expect(config.zoho.clientId.length).toBeGreaterThan(0)
    expect(config.zoho.clientSecret).toBeDefined()
    expect(config.zoho.clientSecret.length).toBeGreaterThan(0)
    expect(config.zoho.refreshToken).toBeDefined()
    expect(config.zoho.refreshToken.length).toBeGreaterThan(0)

    expect(config.awsSmsService).not.toBeNull()
    expect(config.awsSmsService.gatewayUrl).toBeDefined()
    expect(config.awsSmsService.gatewayUrl.length).toBeGreaterThan(0)
    expect(config.awsSmsService.apiKey).toBeDefined()
    expect(config.awsSmsService.apiKey.length).toBeGreaterThan(0)
    expect(config.awsSmsService.fromField).toBeDefined()
    expect(config.awsSmsService.fromField.length).toBeGreaterThan(0)
  })
})
