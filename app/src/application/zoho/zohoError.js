const createError = require('fastify-error')

module.exports.createZohoError = (response, code) => {
  const error = createError('ZOHO_CREATOR_ERROR',
    `Zoho Creator Error -> ${response.data.message ?? response.data.description}`,
    code)
  return error
}
