// eslint-disable-next-line
const helper = require('../../helper')
const sut = require('../../../src/application/zoho/zoho-image-data-builder')
require('jest-extended')

describe('Image data builder', () => {
  it('Check for build of multi part form', async () => {
    const actual = await sut.buildMultiPart('https://www.euristechnology.it/wp-content/uploads/2020/04/4.png')
    expect(actual).toBeDefined()
    expect(actual._boundary).toBeDefined()
    expect(actual._boundary).not.toBeNull()
    expect(actual._boundary.length).toBeGreaterThan(0)

    expect(actual._streams).toBeDefined()
    expect(actual._streams).not.toBeNull()
    expect(actual._streams).toBeArray()
    expect(actual._streams.length).toBeGreaterThan(0)
  })
  it('Check for retrieving file extension  - valid input', () => {
    const actual = sut.getFileExtension('a.b.c.png')
    expect(actual).toBeDefined()
    expect(actual.length).toBeGreaterThan(0)
    expect(actual).toEqual('png')
  })
  it('Check for retrieving file extension  - invalid input', () => {
    const actual = sut.getFileExtension('png')
    expect(actual).toBeDefined()
    expect(actual.length).toEqual(0)
    expect(actual).toEqual('')
  })
  it('Check for retrieving file extension  - invalid input', () => {
    const actual = sut.getFileExtension()
    expect(actual).toBeDefined()
    expect(actual.length).toEqual(0)
    expect(actual).toEqual('')
  })
})
