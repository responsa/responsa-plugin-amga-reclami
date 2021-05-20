const genericErrors = require('./genericErrors')

const STATE = 'DA VALIDARE'
const WATER_AREA = 'ACQUA'
const ENERGY_AREA = 'ENERGIA'
const GAS_AREA = 'GAS'
const DIGITAL_COUNTER_TYPE = 'DIGITALE'
const ELECTROMECHANICAL_COUNTER_TYPE = 'ELETTROMECCANICO'

module.exports.postRouteSchema = {
  tags: ['Counter Self Reading'],
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
        description: 'User mail address',
        pattern: '^\\w+([-+.\']\\w+)*@\\w+([-.]\\w+)*\\.\\w+([-.]\\w+)*$'
      },
      requestArea: {
        type: 'string',
        nullable: false,
        description: 'Request area'
      },
      phone: {
        type: 'string',
        nullable: false,
        description: 'Phone number of user',
        pattern: '^^\\+\\d{7,15}$'
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
    }
  },
  response: {
    200: {
      $ref: 'counterSelfReading200#'
    },
    400: {
      $ref: 'counterSelfReading400#'
    },
    401: {
      $ref: 'counterSelfReading401#'
    },
    500: {
      $ref: 'counterSelfReading500#'
    },
    503: {
      $ref: 'counterSelfReading503#'
    }
  }
}

module.exports.counterSelfReading = {
  type: 'object',
  addToSwagger: true,
  title: 'CounterSelfReadingResponse',
  description: 'The response returned when write counter value',
  properties: {
    id: {
      type: 'string',
      description: 'Record ID',
      nullable: false
    }
  }
}

module.exports.counterSelfReading200 = {
  type: 'object',
  description: 'Counter self reading generated successfully',
  $ref: 'counterSelfReading#'
}

module.exports.counterSelfReading400 = genericErrors.generic400
module.exports.counterSelfReading401 = genericErrors.generic401
module.exports.counterSelfReading500 = genericErrors.generic500
module.exports.counterSelfReading503 = genericErrors.generic503

module.exports.addSchemas = (fastifyInstance) => {
  fastifyInstance.addSchema({ $id: 'counterSelfReading', ...this.counterSelfReading })
  fastifyInstance.addSchema({ $id: 'counterSelfReading200', ...this.counterSelfReading200 })
  fastifyInstance.addSchema({ $id: 'counterSelfReading400', ...this.counterSelfReading400 })
  fastifyInstance.addSchema({ $id: 'counterSelfReading401', ...this.counterSelfReading401 })
  fastifyInstance.addSchema({ $id: 'counterSelfReading500', ...this.counterSelfReading500 })
  fastifyInstance.addSchema({ $id: 'counterSelfReading503', ...this.counterSelfReading503 })
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

  return {
    data: {
      Stato: STATE,
      Tipologia_Utenza: requestArea,
      Codice_Utenza: row.code,
      Cellulare: row.phone,
      Tipologia_Contatore: counterType,
      Email: row.email,
      Valore_1: row.value1,
      Foto_autolettura_1: row.photo1,
      Valore_2: row.value2,
      Foto_autolettura_2: row.photo2,
      Valore_3: row.value3,
      Foto_autolettura_3: row.photo3
    }
  }
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

module.exports.getFileExtension = (fileName) => {
  const ext = require('path').extname(fileName || '').split('.')
  return ext[ext.length - 1]
}
