const config = require('./config')
const axios = require('axios')
const otp = require('./otpGenerator')
const msgBuilder = require('./smsMessageBuilder')

module.exports.sendSmsErrorMessage = 'Unable to send message'

module.exports.sendSms = async (phone) => {
  const code = otp.generateOtp()
  const msg = msgBuilder.buildSmsMessage(code)
  const apiKey = config.awsSmsService.apiKey
  const fromField = config.awsSmsService.fromField
  const url = config.awsSmsService.gatewayUrl
  const body = { from: fromField, to: phone, message: msg }
  const headers = { 'Content-Type': 'application/json', 'x-api-key': apiKey }

  // *** Work Around for Network Error ***
  // We need to change the default axios adapter,
  // reference link:
  // https://github.com/axios/axios/issues/938
  // https://stackoverflow.com/questions/42677387/jest-returns-network-error-when-doing-an-authenticated-request-with-axios

  const path = require('path')
  const lib = path.join(path.dirname(require.resolve('axios')), 'lib/adapters/http')
  const http = require(lib)
  axios.defaults.adapter = http

  let result = null

  await axios.post(url, body, { headers: headers })
    .then((response) => {
      result = response.status === 200 && response.data.body === 'Message sent' ? { verificationCode: code } : null
    })
    .catch((error) => {
      throw error
    })
  return result ?? new Error(this.sendSmsErrorMessage)
}
