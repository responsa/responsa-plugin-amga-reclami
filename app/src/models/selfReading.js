const genericErrors = require('./genericErrors')

const STATE = 'DA VALIDARE'
const WATER_AREA = 'ACQUA'
const ENERGY_AREA = 'ENERGIA'
const GAS_AREA = 'GAS'
const DIGITAL_COUNTER_TYPE = 'DIGITALE'
const ELECTROMECHANICAL_COUNTER_TYPE = 'ELETTROMECCANICO'

module.exports.postRouteSchema = {
  tags: ['Self Reading'],
  summary: 'Declaration of gauge counter value',
  description: 'Execute a post to send a value of counter',
  security: [{ ApiKeyAuth: [] }],
  body: {
    type: 'object',
    required: ['email', 'requestArea', 'phone', 'counterType', 'code', 'value1'],
    properties: {
      email: {
        type: 'string',
        nullable: false,
        description: 'User mail address'
      },
      requestArea: {
        type: 'string',
        nullable: false,
        description: 'Request area'
      },
      phone: {
        type: 'string',
        nullable: false,
        description: 'Phone number of user'
      },
      counterType: {
        type: 'string',
        nullable: false,
        description: 'type of counter'
      },
      code: {
        type: 'string',
        nullable: false,
        description: 'Counter code'
      },
      value1: {
        type: 'string',
        nullable: false,
        description: 'value 1'
      },
      photo1: {
        type: 'string',
        nullable: true,
        description: 'photo 1'
      },
      value2: {
        type: 'string',
        nullable: true,
        description: 'value 2'
      },
      photo2: {
        type: 'string',
        nullable: true,
        description: 'photo 2'
      },
      value3: {
        type: 'string',
        nullable: true,
        description: 'value 3'
      },
      photo3: {
        type: 'string',
        nullable: true,
        description: 'photo 3'
      }
    },
    if: {
      properties: { requestArea: { const: 'energy' }, counterType: { const: 'digital' } }
    },
    then: {
      required: ['value1', 'value2', 'value3']
    }
  },
  response: {
    200: {
      $ref: 'selfReading200#'
    },
    400: {
      $ref: 'selfReading400#'
    },
    401: {
      $ref: 'selfReading401#'
    },
    500: {
      $ref: 'selfReading500#'
    },
    503: {
      $ref: 'selfReading503#'
    }
  }
}

module.exports.selfReading = {
  type: 'object',
  addToSwagger: true,
  title: 'SelfReadingResponse',
  description: 'The response returned when write counter value',
  properties: {
    id: {
      type: 'string',
      description: 'Record ID',
      nullable: false
    }
  }
}

module.exports.selfReading200 = {
  type: 'object',
  description: 'Self Reading generated successfully',
  $ref: 'selfReading#'
}

module.exports.selfReading400 = genericErrors.generic400
module.exports.selfReading401 = genericErrors.generic401
module.exports.selfReading500 = genericErrors.generic500
module.exports.selfReading503 = genericErrors.generic503

module.exports.addSchemas = (fastifyInstance) => {
  fastifyInstance.addSchema({ $id: 'selfReading', ...this.selfReading })
  fastifyInstance.addSchema({ $id: 'selfReading200', ...this.selfReading200 })
  fastifyInstance.addSchema({ $id: 'selfReading400', ...this.selfReading400 })
  fastifyInstance.addSchema({ $id: 'selfReading401', ...this.selfReading401 })
  fastifyInstance.addSchema({ $id: 'selfReading500', ...this.selfReading500 })
  fastifyInstance.addSchema({ $id: 'selfReading503', ...this.selfReading503 })
}

module.exports.toSelfReadingRequest = (row) => {
  let requestArea = null
  switch (row.requestArea) {
    case 'energy':
      requestArea = ENERGY_AREA
      break
    case 'gas':
      requestArea = GAS_AREA
      break
    case 'water':
      requestArea = WATER_AREA
      break
  }

  let counterType = null
  switch (row.counterType) {
    case 'digital':
      counterType = DIGITAL_COUNTER_TYPE
      break
    case 'electromechanical':
      counterType = ELECTROMECHANICAL_COUNTER_TYPE
      break
  }

  const req = {
    data: {
      Stato: STATE,
      Tipologia_Utenza: requestArea,
      Codice_Utenza: row.code,
      Cellulare: row.phone,
      Tipologia_Contatore: counterType,
      Email: row.email,
      Valore_1: row.value1
    }
  }

  if (row.value2) req.data.Valore_2 = row.value2
  if (row.value2) req.data.Valore_3 = row.value3

  return req
}

module.exports.toZohoFieldName = (fieldName) => {
  let result = null
  switch (fieldName) {
    case 'photo1':
      result = 'Foto_autolettura_1'
      break
    case 'photo2':
      result = 'Foto_autolettura_2'
      break
    case 'photo3':
      result = 'Foto_autolettura_3'
      break
    default:
      throw new Error('Field Name not found')
  }
  return result
}
