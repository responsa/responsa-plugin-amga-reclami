const config = require('./config')
const axios = require('axios')

module.exports.sendSms = async (msg, phone) => {
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

  // axios.defaults.maxBodyLength = 1000000
  // axios.defaults.maxContentLength = 1000000
  let result = false

  await axios.post(url, body, { headers: headers })
    .then((response) => {
      result = response.status === 200
    })
    .catch((error) => {
      throw error
    })
  return result
}
