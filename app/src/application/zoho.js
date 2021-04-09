const config = require('./config')
const axios = require('axios').default

const refreshAuthOptions = () => {
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

const creatorReqOptions = (method, target, data) => {
  return {
    url: `${config.zoho.dataUrl}/${config.zoho.account}/${config.zoho.project}/${target}`,
    baseURL: config.zoho.dataBaseUrl,
    headers: {
      Authorization: `Zoho-oauthtoken ${config.zoho.accessToken}`
    },
    method,
    data,
    responseType: 'json',
    responseEncoding: 'utf8'
  }
}

const refreshAccessToken = async () => {
  let response = null
  try {
    response = await axios.request(refreshAuthOptions())
  } catch (err) {
    throw new Error(err)
  }
  if (response.data && response.data.error) {
    throw new Error(response.data.error)
  }
  config.zoho.accessToken = response.data.access_token
}

const sendCreatorRequest = async (method, target, data) => {
  let response = null
  try {
    response = await axios.request(creatorReqOptions(method, target, data))
  } catch (err) {
    if (err.response && err.response.status === 401) {
      await refreshAccessToken()
      try {
        response = await axios.request(creatorReqOptions(method, target, data))
        return response
      } catch (errInner) {
        throw new Error(errInner)
      }
    }
    throw new Error(err)
  }
  return response
}

const getData = (target) => sendCreatorRequest('GET', target, {})

module.exports.refreshAccessToken = refreshAccessToken
module.exports.creatorReqOptions = creatorReqOptions
module.exports.sendCreatorRequest = sendCreatorRequest
module.exports.getData = getData
