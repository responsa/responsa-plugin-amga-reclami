const config = require('../config')
const zoho = require('./zoho')
const axios = require('axios').default

module.exports.refreshAuthOptions = () => {
  return {
    url: config.zoho.refreshAuthUrl,
    baseURL: config.zoho.refreshAuthBaseUrl,
    method: 'POST',
    params: {
      refresh_token: config.zoho.refreshToken,
      client_id: config.zoho.clientId,
      client_secret: config.zoho.clientSecret,
      grant_type: 'refresh_token'
    },
    responseType: 'json',
    responseEncoding: 'utf8'
  }
}

const createZohoAuthenticationError = (response, code) =>
  zoho.createZohoError('ZOHO_AUTHENTICATION_ERROR',
    `Zoho Authentication Error -> ${response.data.message ?? response.data.description}`,
    code)

module.exports.refreshAccessToken = async () => {
  let response = null
  try {
    response = await axios.request(this.refreshAuthOptions())
  } catch (err) {
    throw new Error(err)
  }
  if (response.data && response.data.error) {
    if (response.data.error === 'access_denied') {
      const ZohoAuthenticationError =
      createZohoAuthenticationError(
        {
          data:
          {
            message: 'Zoho token refresh temporary unavailable'
          }
        },
        503)
      throw new ZohoAuthenticationError()
    }
    throw new Error(response.data.error)
  }
  config.zoho.accessToken = response.data.access_token
}
