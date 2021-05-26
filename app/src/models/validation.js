const genericErrors = require('./genericErrors')

const fieldsMapper = {
  quotationCode: '^25\\d{6}$',
  energy: '^IT\\d{3}E\\d{8}$',
  gas: '^\\d{14}$',
  water: '^3\\d{9}$'
}

module.exports.validation = {
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

module.exports.validation200 = {
  type: 'object',
  description: 'Validation response successfully',
  $ref: 'validation#'
}

module.exports.validation400 = genericErrors.generic400
module.exports.validation401 = genericErrors.generic401
module.exports.validation404 = genericErrors.generic404('Field name not found')
module.exports.validation500 = genericErrors.generic500
module.exports.validation503 = genericErrors.generic503

module.exports.addSchemas = (fastifyInstance) => {
  fastifyInstance.addSchema({ $id: 'validation', ...this.validation })
  fastifyInstance.addSchema({ $id: 'validation200', ...this.validation200 })
  fastifyInstance.addSchema({ $id: 'validation400', ...this.validation400 })
  fastifyInstance.addSchema({ $id: 'validation401', ...this.validation401 })
  fastifyInstance.addSchema({ $id: 'validation404', ...this.validation404 })
  fastifyInstance.addSchema({ $id: 'validation500', ...this.validation500 })
  fastifyInstance.addSchema({ $id: 'validation503', ...this.validation503 })
}
