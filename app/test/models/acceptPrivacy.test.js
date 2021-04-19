require('jest-extended')
const sut = require('../../src/models/acceptPrivacy').buildRequest

describe('Accept Privacy', () => {
  it('correctly creates zoho request with email and positive acceptance', () => {
    const email = 'my.email@address.com'
    const accepted = true
    const actual = sut(email, accepted)
    expect(actual).not.toBeNull()
    expect(actual.data).not.toBeNull()
    expect(actual.data.Cliente_email).toEqual(email)
    expect(actual.data.Consenso).toEqual('SI')
  })

  it('correctly creates zoho request with email and negative acceptance', () => {
    const email = 'my.email@address.com'
    const accepted = false
    const actual = sut(email, accepted)
    expect(actual).not.toBeNull()
    expect(actual.data).not.toBeNull()
    expect(actual.data.Cliente_email).toEqual(email)
    expect(actual.data.Consenso).toEqual('NO')
  })
})
