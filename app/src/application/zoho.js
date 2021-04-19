const createError = require('fastify-error')
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

const createZohoCreatorError = (response, code) => {
  const error = createError('ZOHO_CREATOR_ERROR',
    `Zoho Creator Error -> ${response.data.message ?? response.data.description}`,
    code)
  return error
}

const createZohoAuthenticationError = (response, code) =>
  createZohoError('ZOHO_AUTHENTICATION_ERROR',
    `Zoho Authentication Error -> ${response.data.message ?? response.data.description}`,
    code)

const createZohoError = (type, message, code) => createError(type, message, code)

const sendCreatorRequest = async (method, target, data) => {
  let response = null
  let ZohoCreatorError = null
  try {
    response = await axios.request(creatorReqOptions(method, target, data))
  } catch (err) {
    if (err.response && err.response.status === 401) {
      await refreshAccessToken()
      try {
        response = await axios.request(creatorReqOptions(method, target, data))
      } catch (errInner) {
        ZohoCreatorError = createZohoCreatorError(errInner.response, errInner.response.status)
      }
    } else {
      ZohoCreatorError = createZohoCreatorError(err.response, err.response.status)
    }
  }
  if (response && !response.data.data) {
    if (response.data.code === 3100) {
      ZohoCreatorError = createZohoCreatorError(response, 404)
    } else {
      ZohoCreatorError = createZohoCreatorError(response, 400)
    }
  }
  if (ZohoCreatorError) throw new ZohoCreatorError()
  return response.data.data
}

const getData = async (target) => await sendCreatorRequest('GET', target, {})
const postData = async (target, data) => await sendCreatorRequest('POST', target, data)

const queryPath = (baseTarget, conditions) => {
  let query = baseTarget
  let quote = ''
  let op = ''
  conditions?.forEach((keyValuePair, index) => {
    if (index === 0) query += '?criteria=('
    quote = (typeof keyValuePair.value === 'string') ? '"' : ''
    op = (index < conditions.length - 1) ? ' && ' : ''
    query += `${keyValuePair.key}==${quote}${keyValuePair.value}${quote}${op}`
  })
  if (conditions?.length > 0) query += ')'
  return query
}

const queryZoho = async (baseTarget, conditions) => await getData(queryPath(baseTarget, conditions))
const getRecord = async (baseTarget, id) => await getData(`${baseTarget}/${id}`)
const getRecordByQuery = async (baseTarget, conditions) => {
  const queryResult = await queryZoho(baseTarget, conditions)
  if (!queryResult || queryResult.length === 0) return null
  const record = await getRecord(baseTarget, queryResult[0].ID)
  if (!record || record === {}) return null
  return record
}

module.exports.refreshAccessToken = refreshAccessToken
module.exports.creatorReqOptions = creatorReqOptions
module.exports.sendCreatorRequest = sendCreatorRequest
module.exports.getData = getData
module.exports.postData = postData
module.exports.queryPath = queryPath
module.exports.queryZoho = queryZoho
module.exports.getRecord = getRecord
module.exports.getRecordByQuery = getRecordByQuery
module.exports.createZohoCreatorError = createZohoCreatorError

// TICKET
module.exports.complaints = {
  all: async () => await queryZoho(config.zoho.complaintGetTarget),
  query: async (conditions) => await queryZoho(config.zoho.complaintGetTarget, conditions),
  byIdRichiesta: async (idRichiesta) => {
    const conditions = [
      {
        key: 'ID_Richiesta',
        value: +idRichiesta
      }
    ]
    return await getRecordByQuery(config.zoho.complaintGetTarget, conditions)
  }
}
