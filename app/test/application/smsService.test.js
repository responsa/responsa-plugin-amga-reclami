const sut = require('../../src/application/smsService')

describe('SMS Service API', () => {
  it('Send message properly', async () => {
    const actual = await sut.sendSms('+390000000000')
    expect(actual).not.toBe(null)
    expect(actual.verificationCode).not.toBe(null)
  })
  it('Send message with error - No phone number', async () => {
    await expect(sut.sendSms())
      .rejects
      .toThrow(sut.sendSmsErrorMessage)
  })
  it('Send message with error - bad phone number', async () => {
    await expect(sut.sendSms('4564asdasda6546'))
      .rejects
      .toThrow(sut.sendSmsErrorMessage)
  })
})
