const config = require('./../config')
const axios = require('axios')
const otp = require('./otpGenerator')
const msgBuilder = require('./otpMessageBuilder')

module.exports.sendOtpErrorMessage = 'Unable to send message'

module.exports.sendSms = async (phone) => {
  const code = otp.generateOtp()
  const msg = msgBuilder.buildOtpMessage(code)
  const apiKey = config.awsSmsService.apiKey
  const fromField = config.awsSmsService.fromField
  const url = config.awsSmsService.gatewayUrl
  const body = { from: fromField, to: phone, message: msg }
  const headers = { 'Content-Type': 'application/json', 'x-api-key': apiKey }

  let result = null

  await axios.post(url, body, { headers: headers })
    .then((response) => {
      if (response.status === 200 && response.data.body === 'Message sent') {
        result = { verificationCode: code }
      }
    })
    .catch((error) => {
      throw error
    })

  if (result) {
    return result
  } else {
    throw Error(this.sendSmsErrorMessage)
  }
}
