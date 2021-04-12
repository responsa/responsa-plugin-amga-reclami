module.exports.minOtpCodeValue = 100000
module.exports.maxOtpCodeValue = 999999

module.exports.generateOtp = () => {
  const code = Math.floor(Math.random() * (this.maxOtpCodeValue - this.minOtpCodeValue + 1)) + this.minOtpCodeValue
  return code
}
