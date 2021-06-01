require('../../helper')
const sut = require('../../../src/application/otp/otpService')
const config = require('../../../src/application/config')

describe('SMS Service COnfiguration', () => {
  it('Get all configurations properly', async () => {
    expect(config.awsSmsService.gatewayUrl.length).toBeGreaterThan(0)
    expect(config.awsSmsService.apiKey.length).toBeGreaterThan(0)
    expect(config.awsSmsService.fromField.length).toBeGreaterThan(0)
  })
})

describe('SMS Service API', () => {
  it('Send message properly', async () => {
    const actual = await sut.sendSms('+390000000000')
    expect(actual).not.toBe(null)
    expect(actual.verificationCode).not.toBe(null)
  })
  it('Send message with error - No phone number', async () => {
    await expect(sut.sendSms())
      .rejects
      .toThrow(sut.sendOtpErrorMessage)
  })
  it('Send message with error - bad phone number', async () => {
    await expect(sut.sendSms('4564asdasda6546'))
      .rejects
      .toThrow(sut.sendOtpErrorMessage)
  })
})
