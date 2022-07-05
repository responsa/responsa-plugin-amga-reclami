module.exports.code200 = {
  content: {
    'application/json': {
      schema: {
        type: 'object',
        title: 'PODPDRInfoResponse',
        description: 'The data returned about the informations of a POD/PDR/H2O related contract',
        properties: {
          streetName: {
            type: 'string',
            description: 'Street name',
            nullable: true
          },
          streetNumber: {
            type: 'string',
            description: 'Street number',
            nullable: true
          },
          city: {
            type: 'string',
            description: 'City',
            nullable: true
          },
          province: {
            type: 'string',
            description: 'Province',
            nullable: true
          }
        }
      }
    }
  },
  description: 'The data returned about the informations of a POD/PDR/H2O related contract'
}

module.exports.code400 = {
  content: {
    'application/json': {
      schema: {
        type: 'object',
        description: 'Bad request',
        properties: {
          statusCode: {
            type: 'integer',
            format: 'int32',
            nullable: false
          },
          error: {
            type: 'string',
            nullable: false
          },
          message: {
            type: 'string',
            nullable: false
          },
          stackTrace: {
            type: 'string',
            nullable: true
          }
        },
        additionalProperties: true
      }
    }
  },
  description: 'Bad request'
}

module.exports.code401 = {
  content: {
    'application/json': {
      schema: {
        type: 'object',
        description: 'Unauthorized',
        properties: {
          statusCode: {
            type: 'integer',
            format: 'int32',
            nullable: false
          },
          error: {
            type: 'string',
            nullable: false
          },
          message: {
            type: 'string',
            nullable: false
          },
          stackTrace: {
            type: 'string',
            nullable: true
          }
        },
        additionalProperties: true
      }
    }
  },
  description: 'Unauthorized'
}

module.exports.code404 = {
  content: {
    'application/json': {
      schema: {
        type: 'object',
        description: 'Contract not found',
        properties: {
          statusCode: {
            type: 'integer',
            format: 'int32',
            nullable: false
          },
          error: {
            type: 'string',
            nullable: false
          },
          message: {
            type: 'string',
            nullable: false
          },
          stackTrace: {
            type: 'string',
            nullable: true
          }
        },
        additionalProperties: true
      }
    }
  },
  description: 'Contract not found'
}

module.exports.code500 = {
  content: {
    'application/json': {
      schema: {
        type: 'object',
        description: 'Internal error',
        properties: {
          statusCode: {
            type: 'integer',
            format: 'int32',
            nullable: false
          },
          error: {
            type: 'string',
            nullable: false
          },
          message: {
            type: 'string',
            nullable: false
          },
          stackTrace: {
            type: 'string',
            nullable: true
          }
        },
        additionalProperties: true
      }
    }
  },
  description: 'Internal error'
}

module.exports.code503 = {
  content: {
    'application/json': {
      schema: {
        type: 'object',
        description: 'Zoho APIs temporary unavailable',
        properties: {
          statusCode: {
            type: 'integer',
            format: 'int32',
            nullable: false
          },
          error: {
            type: 'string',
            nullable: false
          },
          message: {
            type: 'string',
            nullable: false
          },
          stackTrace: {
            type: 'string',
            nullable: true
          }
        },
        additionalProperties: true
      }
    }
  },
  description: 'Zoho APIs temporary unavailable'
}
