const createError = require('fastify-error')

const printError = (response) => {
  if (response.data) {
    if (response.data.message) {
      return response.data.message
    }

    if (response.data.description) {
      return response.data.description
    }
  }

  return 'Generic error'
}

module.exports = (response, code, tag) => {
  const ZohoError = createError(tag ?? 'ZOHO_CREATOR_ERROR', `Zoho Creator Error -> ${printError(response)}`, code)
  return new ZohoError()
}
