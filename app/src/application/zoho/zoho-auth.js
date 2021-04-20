const config = require('../config')
const createZohoError = require('./zoho-error')
const axios = require('axios').default

const authErrorTag = 'ZOHO_AUTHENTICATION_ERROR'
const initCustomZohoError = (err) => createZohoError({ data: { message: `Zoho replied with error message ${err}` } }, 503, authErrorTag)

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

module.exports.refreshAccessToken = async () => {
  let response = null
  try {
    response = await axios.request(this.refreshAuthOptions())
  } catch (err) {
    throw initCustomZohoError(err)
  }

  if (response.data && response.data.error) {
    if (response.data.error === 'access_denied') {
      throw createZohoError({ data: { message: 'Zoho token refresh temporary unavailable' } }, 503, 'ZOHO_AUTHENTICATION_ERROR')
    }
    throw initCustomZohoError(response.data.error)
  }

  config.zoho.accessToken = response.data.access_token
}
