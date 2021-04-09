const config = require('./config')
const axios = require('axios').default

const refreshAuthOptions = {
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

const refreshAuth = async () => {
  let response = null
  try {
    response = await axios.request(refreshAuthOptions)
  } catch (err) {
    throw new Error(err)
  }
  return response
}

const updateAccessToken = async () => {
  const updatedData = await refreshAuth()
  config.zoho.accessToken = updatedData.data.access_token
}

module.exports.refreshAuth = refreshAuth
module.exports.updateAccessToken = updateAccessToken
