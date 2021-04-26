module.exports.code200 = {
  content: {
    'application/json': {
      schema: {
        type: 'object',
        title: 'CreateComplaintResponse',
        description: 'The data returned after the creation of a new complaint',
        properties: {
          id: {
            type: 'string',
            description: 'Record ID',
            nullable: false
          },
          requestId: {
            type: 'string',
            description: 'Request ID',
            nullable: false
          }
        }
      }
    }
  },
  description: 'The data returned after the creation of a new complaint'
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
