// eslint-disable-next-line
const helper = require('../helper')
const config = require('../../src/application/config')
const sut = require('../../src/application/zoho')
require('jest-extended')

const validTarget = 'report/Privacy_Report'
const invalidTarget = 'wrong_target'

describe('Zoho APIs', () => {
  describe('Creator Data', () => {
    it('builds valid creator request options', () => {
      const actual = sut.creatorReqOptions('method', 'target', { key: 'value' })
      expect(actual).toBeObject()
      expect(actual).toContainKeys(['url', 'baseURL', 'headers', 'method', 'data', 'responseType', 'responseEncoding'])
      expect(actual.url).toEqual(`${config.zoho.dataUrl}/${config.zoho.account}/${config.zoho.project}/target`)
      expect(actual.baseURL).toEqual(config.zoho.dataBaseUrl)
      expect(actual.headers).toBeObject()
      expect(actual.method).toEqual('method')
      expect(actual.data).toBeObject()
      expect(actual.data).toContainKey('key')
      expect(actual.data.key).toEqual('value')
      expect(actual.responseType).toEqual('json')
      expect(actual.responseEncoding).toEqual('utf8')
    })

    it('correctly gets data with valid target', async () => {
      const actual = await sut.getData(validTarget)
      expect(actual).toBeDefined()
      expect(actual.status).toBeDefined()
      expect(actual.status).toEqual(200)
      expect(actual.data).toBeDefined()
      expect(actual.data).toBeObject()
      expect(actual.data).toContainKey('data')
      expect(actual.data.data).toBeArray()
    })

    it('throws with invalid target', async () => {
      await expect(sut.getData(invalidTarget)).rejects.toThrow()
    })
  })
})
