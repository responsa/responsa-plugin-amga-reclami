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
  it('Validation - OK - number', () => {
    const actual = sut.validate('number', '3123456789')
    expect(actual).not.toBeNull()
    expect(actual).toEqual(true)
  })
  it('Validation - KO - number with dot', () => {
    const actual = sut.validate('number', '1234.5')
    expect(actual).not.toBeNull()
    expect(actual).toEqual(false)
  })
  it('Validation - KO - number with comma', () => {
    const actual = sut.validate('number', '1234,5')
    expect(actual).not.toBeNull()
    expect(actual).toEqual(false)
  })
  it('Validation - KO - number with chars', () => {
    const actual = sut.validate('number', 'chars 23123')
    expect(actual).not.toBeNull()
    expect(actual).toEqual(false)
  })
  it('Validation - OK - phone with country code', () => {
    const actual = sut.validate('phone', '+393930975687')
    expect(actual).not.toBeNull()
    expect(actual).toEqual(true)
  })
  it('Validation - OK - phone without country code', () => {
    const actual = sut.validate('phone', '3930975687')
    expect(actual).not.toBeNull()
    expect(actual).toEqual(true)
  })
  it('Validation - KO - phone with whitespaces', () => {
    const actual = sut.validate('phone', '+39 393 0975687')
    expect(actual).not.toBeNull()
    expect(actual).toEqual(false)
  })
  it('Validation - KO - phone with dot', () => {
    const actual = sut.validate('phone', '+39393.0975687')
    expect(actual).not.toBeNull()
    expect(actual).toEqual(false)
  })
  it('Validation - KO - phone with dash', () => {
    const actual = sut.validate('phone', '+39393-0975687')
    expect(actual).not.toBeNull()
    expect(actual).toEqual(false)
  })
  it('Validation - KO - phone with chars', () => {
    const actual = sut.validate('phone', '(+39)23423123')
    expect(actual).not.toBeNull()
    expect(actual).toEqual(false)
  })
})
