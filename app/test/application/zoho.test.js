/**
 * @jest-environment node
 */

// eslint-disable-next-line
const helper = require('../helper')
const config = require('../../src/application/config')
const sut = require('../../src/application/zoho')
require('jest-extended')

describe('Zoho APIs', () => {
  describe('Authentication', () => {
    it('refreshes authorization token correctly', async () => {
      const actual = await sut.refreshAuth()
      expect(actual).toBeDefined()
      expect(actual.data).toBeDefined()
      expect(actual.data).toBeObject()
      expect(actual.data).toContainKey('access_token')
      expect(actual.data.access_token.length).toBeGreaterThan(0)
    })

    it('sets access token in config', async () => {
      expect(config.zoho.accessToken.length).toEqual(0)
      await sut.updateAccessToken()
      expect(config.zoho.accessToken.length).toBeGreaterThan(0)
    })
  })
})
