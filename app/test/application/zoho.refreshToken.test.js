/**
 * @jest-environment node
 */

// eslint-disable-next-line
const helper = require('../helper')
const config = require('../../src/application/config')
const sut = require('../../src/application/zoho')

describe('Zoho Authentication', () => {
  it('refreshes authorization token correctly', async () => {
    expect(config.zoho.accessToken.length).toEqual(0)
    await sut.refreshAccessToken()
    expect(config.zoho.accessToken).toBeDefined()
    expect(config.zoho.accessToken.length).toBeGreaterThan(0)
  })

  it('throws with incorrect refresh token', async () => {
    const backup = config.zoho.refreshToken
    config.zoho.refreshToken = 'wrong_token'
    await expect(sut.refreshAccessToken()).rejects.toThrow('invalid_code')
    config.zoho.refreshToken = backup
  })
})
