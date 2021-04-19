module.exports.code200 = {
  content: {
    'application/json': {
      schema: {
        type: 'object',
        description: 'Complaint infos successfully returned',
        properties: {
          status: {
            type: 'string',
            description: 'Complaint Status',
            nullable: false
          },
          department: {
            type: 'string',
            description: 'Complaint Department',
            nullable: true
          },
          assignee: {
            type: 'string',
            description: 'Complaint Assignee',
            nullable: true
          },
          email: {
            type: 'string',
            description: 'Mail address complaint was sent to',
            nullable: true
          },
          subject: {
            type: 'string',
            description: 'Complaint mail subject',
            nullable: true
          },
          content: {
            type: 'string',
            description: 'Complaint mail content',
            nullable: true
          }
        },
        required: [
          'status'
        ]
      }
    }
  },
  description: 'Complaint infos successfully returned'
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
        description: 'Complaint not found',
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
  description: 'Complaint not found'
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
