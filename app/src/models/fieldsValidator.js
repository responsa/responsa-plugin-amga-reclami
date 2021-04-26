const genericErrors = require('./genericErrors')

const fieldsMapper = {
  quotationCode: '^25\\d{6}$'
}

module.exports.validateField = {
  type: 'object',
  addToSwagger: true,
  title: 'Fields Validator Response',
  description: 'Validation response successfully',
  properties: {
  }
}

module.exports.validate = (fieldName, fieldValue) => {
  if (!fieldsMapper[fieldName]) {
    return null
  } else {
    const result = fieldValue.match(fieldsMapper[fieldName])
    return result !== null
  }
}

module.exports.validateField200 = {
  type: 'object',
  description: 'Validation response successfully',
  $ref: 'validateField#'
}

module.exports.validateField400 = genericErrors.generic400
module.exports.validateField401 = genericErrors.generic401
module.exports.validateField404 = genericErrors.generic404('Field name not found')
module.exports.validateField500 = genericErrors.generic500
module.exports.validateField503 = genericErrors.generic503

module.exports.addSchemas = (fastifyInstance) => {
  fastifyInstance.addSchema({ $id: 'validateField', ...this.validateField })
  fastifyInstance.addSchema({ $id: 'validateField200', ...this.validateField200 })
  fastifyInstance.addSchema({ $id: 'validateField400', ...this.validateField400 })
  fastifyInstance.addSchema({ $id: 'validateField401', ...this.validateField401 })
  fastifyInstance.addSchema({ $id: 'validateField404', ...this.validateField404 })
  fastifyInstance.addSchema({ $id: 'validateField500', ...this.validateField500 })
  fastifyInstance.addSchema({ $id: 'validateField503', ...this.validateField503 })
}
