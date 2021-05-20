const axios = require('axios').default
const zohoAuth = require('./zoho-auth')
const createZohoError = require('./zoho-error')
const requestBuilder = require('./zoho-request-builder')
const targetPathBuilder = require('./zoho-target-path-builder')

const sendCreatorRequest = async (method, target, data, isMultiPart) => {
  let response = null
  let error = null
  try {
    response = await axios.request(createRequestBuilder(method, target, data, isMultiPart))
  } catch (err) {
    if (err.response && err.response.status === 401) {
      await zohoAuth.refreshAccessToken()
      try {
        response = await axios.request(createRequestBuilder(method, target, data, isMultiPart))
      } catch (errInner) {
        error = createZohoError(errInner.response, errInner.response.status)
      }
    } else {
      error = createZohoError(err.response, err.response.status)
    }
  }
  if (response && !response.data.data) {
    if (response.data.code === 3100) {
      error = createZohoError(response, 404)
    } else {
      error = createZohoError(response, 400)
    }
  }
  if (error) throw error
  return response.data.data
}

const createRequestBuilder = (method, target, data, isMultiPart) => {
  const result = requestBuilder(method, target, data)
  if (isMultiPart) {
    result.headers['Content-Type'] = `multipart/form-data; boundary=${data._boundary}`
  }
  return result
}

const getData = async (target) => await sendCreatorRequest('GET', target, {})
const postData = async (target, data, isMultiPart) => await sendCreatorRequest('POST', target, data, isMultiPart)

const queryZoho = async (baseTarget, conditions) => await getData(targetPathBuilder(baseTarget, conditions))
const getRecord = async (baseTarget, id) => await getData(`${baseTarget}/${id}`)
const getRecordByQuery = async (baseTarget, conditions) => {
  const queryResult = await queryZoho(baseTarget, conditions)
  if (!queryResult || queryResult.length === 0) return null
  const record = await getRecord(baseTarget, queryResult[0].ID)
  if (!record || record === {}) return null
  return record
}

module.exports.getData = getData
module.exports.postData = postData
module.exports.queryZoho = queryZoho
module.exports.getRecord = getRecord
module.exports.getRecordByQuery = getRecordByQuery
