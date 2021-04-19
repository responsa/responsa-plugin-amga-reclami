const zohoAuth = require('./zohoAuth')
const config = require('../config')
const axios = require('axios').default
const zohoError = require('./zohoError')

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

const sendCreatorRequest = async (method, target, data) => {
  let response = null
  let ZohoCreatorError = null
  try {
    response = await axios.request(creatorReqOptions(method, target, data))
  } catch (err) {
    if (err.response && err.response.status === 401) {
      await zohoAuth.refreshAccessToken()
      try {
        response = await axios.request(creatorReqOptions(method, target, data))
      } catch (errInner) {
        ZohoCreatorError = zohoError.createZohoError(errInner.response, errInner.response.status)
      }
    } else {
      ZohoCreatorError = zohoError.createZohoError(err.response, err.response.status)
    }
  }
  if (response && !response.data.data) {
    if (response.data.code === 3100) {
      ZohoCreatorError = zohoError.createZohoError(response, 404)
    } else {
      ZohoCreatorError = zohoError.createZohoError(response, 400)
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

module.exports.creatorReqOptions = creatorReqOptions
module.exports.getData = getData
module.exports.postData = postData
module.exports.queryPath = queryPath
module.exports.queryZoho = queryZoho
module.exports.getRecord = getRecord
module.exports.getRecordByQuery = getRecordByQuery

// TICKET
module.exports.tickets = {
  all: async () => await queryZoho(config.zoho.ticketGetTarget),
  query: async (conditions) => await queryZoho(config.zoho.ticketGetTarget, conditions),
  byIdRichiesta: async (idRichiesta) => {
    const conditions = [
      {
        key: 'ID_Richiesta',
        value: idRichiesta
      }
    ]
    return await getRecordByQuery(config.zoho.ticketGetTarget, conditions)
  }
}
