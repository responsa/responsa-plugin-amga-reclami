const sut = require('../../src/application/smsService')

describe('SMS Service API', () => {
  it('Send message properly', async () => {
    const actual = await sut.sendSms('+390000000000')
    expect(actual).not.toBe(null)
    expect(actual.verificationCode).not.toBe(null)
  })
  it('Send message with error', async () => {
    const actual = await sut.sendSms()
    expect(actual).toBe(null)
  })
})
