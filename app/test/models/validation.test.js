require('jest-extended')
const sut = require('../../src/models/validation')

describe('Validation Works Properly', () => {
  it('Validation - OK - quotation code', () => {
    const actual = sut.validate('quotationCode', '25123456')
    expect(actual).not.toBeNull()
    expect(actual).toEqual(true)
  })
  it('Validation - KO - quotation code', () => {
    const actual = sut.validate('quotationCode', '00123456')
    expect(actual).not.toBeNull()
    expect(actual).toEqual(false)
  })
  it('Validation - OK - water', () => {
    const actual = sut.validate('water', '3123456789')
    expect(actual).not.toBeNull()
    expect(actual).toEqual(true)
  })
  it('Validation - KO - water', () => {
    const actual = sut.validate('water', '312345678')
    expect(actual).not.toBeNull()
    expect(actual).toEqual(false)
  })
})
