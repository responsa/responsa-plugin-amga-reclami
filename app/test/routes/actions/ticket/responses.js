module.exports.code200 = {
  content: {
    'application/json': {
      schema: {
        type: 'object',
        description: 'Ticket infos successfully returned',
        properties: {
          status: {
            type: 'string',
            description: 'Ticket Status',
            nullable: false
          },
          department: {
            type: 'string',
            description: 'Ticket Department',
            nullable: true
          },
          assignee: {
            type: 'string',
            description: 'Ticket Assignee',
            nullable: true
          },
          email: {
            type: 'string',
            description: 'Mail address ticket was sent to',
            nullable: true
          },
          subject: {
            type: 'string',
            description: 'Ticket mail subject',
            nullable: true
          },
          content: {
            type: 'string',
            description: 'Ticket mail content',
            nullable: true
          }
        },
        required: [
          'status'
        ]
      }
    }
  },
  description: 'Ticket infos successfully returned'
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

module.exports.code404 = {
  content: {
    'application/json': {
      schema: {
        type: 'object',
        description: 'Ticket not found',
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
  description: 'Ticket not found'
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
