// eslint-disable-next-line
const helper = require('../../helper')
const config = require('../../../src/application/config')
const sut = require('../../../src/application/zoho/zoho-request-builder')
require('jest-extended')

describe('Zoho Request', () => {
  it('builds valid creator request options', () => {
    const actual = sut('method', 'target', { key: 'value' })
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
})
