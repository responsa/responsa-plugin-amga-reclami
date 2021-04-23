const sut = require('../../../src/application/otp/otpGenerator')

describe('OTP Generator', () => {
  it('OTP Generator works correctly with random values', () => {
    const loop = 10
    const sample = []
    for (let i = 0; i < loop; i++) {
      sample.push(sut.generateOtp())
    }
    const actual = [...new Set(sample)]
    expect(actual.length).toEqual(sample.length)
    expect(Math.min.apply(actual)).toBeGreaterThanOrEqual(sut.minOtpCodeValue)
    expect(Math.max.apply(actual)).toBeLessThanOrEqual(sut.maxOtpCodeValue)
  })
})
