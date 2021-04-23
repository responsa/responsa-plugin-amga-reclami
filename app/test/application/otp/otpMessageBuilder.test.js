const sut = require('../../../src/application/otp/otpMessageBuilder')

describe('OTP Message Builder', () => {
  it('Build Message properly', () => {
    const code = 1
    const actual = sut.buildOtpMessage(code)
    expect(actual).toEqual(`${code} ${sut.otpMsgITA}`)
  })
})
