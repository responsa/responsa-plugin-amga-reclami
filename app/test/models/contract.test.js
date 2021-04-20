require('jest-extended')
const sut = require('../../src/models/contract').parseZohoResponse

describe('PODPDR', () => {
  it('PODPDR - correctly converts zoho response', () => {
    const zohoRes = [{
      Nome_della_strada: 'street name',
      Numero_civico: 'street number',
      Nome_ISTAT_della_provincia: 'province name'
    }]
    const actual = sut(zohoRes)
    expect(actual).not.toBeNull()
    expect(actual.streetName).toEqual('street name')
    expect(actual.streetNumber).toEqual('street number')
    expect(actual.city).toEqual('province name')
  })

  it('PODPDR - returns null if zoho response has empty data array', () => {
    const zohoRes = [{ }]
    const actual = sut(zohoRes)
    expect(actual).toBeNull()
  })

  it('PODPDR - returns null if zoho response has missing content data', () => {
    const zohoRes = [{
      anotherProp: []
    }]
    const actual = sut(zohoRes)
    expect(actual).toBeNull()
  })

  it('PODPDR - returns null if zoho response has missing root data', () => {
    const zohoRes = [{
      anotherProp: {
        data: []
      }
    }]
    const actual = sut(zohoRes)
    expect(actual).toBeNull()
  })
})
