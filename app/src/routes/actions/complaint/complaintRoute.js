const zoho = require('../../../application/zoho/zoho')
const complaint = require('../../../models/complaint')
const writeComplaint = require('../../../models/writeComplaint')

const getRouteSchema = {
  tags: ['Complaint'],
  summary: 'Gets complaint infos',
  description: 'Reads complaint informations in basic or extended formats',
  security: [{ ApiKeyAuth: [] }],
  querystring: {
    type: 'object',
    properties: {
      id: {
        type: 'number',
        pattern: '^[0-9]+$',
        description: 'Complaint number'
      },
      extended: {
        type: 'boolean',
        default: false,
        pattern: '^[true|false]$',
        description: 'Extended format required'
      }
    },
    required: ['id']
  },
  response: {
    200: {
      $ref: 'complaint200#'
    },
    400: {
      $ref: 'complaint400#'
    },
    401: {
      $ref: 'complaint401#'
    },
    404: {
      $ref: 'complaint404#'
    },
    500: {
      $ref: 'complaint500#'
    },
    503: {
      $ref: 'complaint503#'
    }
  }
}

const postRouteSchema = {
  tags: ['Complaint'],
  summary: 'Complaint issue',
  description: 'Execute a post to send a complaint issue',
  security: [{ ApiKeyAuth: [] }],
  body: {
    type: 'object',
    required: ['usage', 'requestArea', 'email', 'phone', 'isPrivateApplicant', 'streetName', 'streetNumber', 'city', 'province', 'question'],
    properties: {
      usage: {
        type: 'string',
        nullable: false,
        description: 'Domestic or not domestic'
      },
      requestArea: {
        type: 'string',
        nullable: false,
        description: 'Request area (GAS or Energy)'
      },
      code: {
        type: 'string',
        nullable: true,
        description: 'POD or PDR code'
      },
      email: {
        type: 'string',
        nullable: false,
        description: 'User mail address',
        pattern: '^\\w+([-+.\']\\w+)*@\\w+([-.]\\w+)*\\.\\w+([-.]\\w+)*$'
      },
      phone: {
        type: 'string',
        nullable: false,
        description: 'Phone number',
        pattern: '^^\\+\\d{7,15}$'
      },
      isPrivateApplicant: {
        type: 'boolean',
        nullable: false,
        description: 'Determines whether a natural or legal person'
      },
      firstName: {
        type: 'string',
        nullable: false,
        description: 'First name'
      },
      lastName: {
        type: 'string',
        nullable: false,
        description: 'Last name'
      },
      fiscalCode: {
        type: 'string',
        nullable: false,
        description: 'Fiscal code'
      },
      businessName: {
        type: 'string',
        nullable: false,
        description: 'Business name'
      },
      vatNumber: {
        type: 'string',
        nullable: false,
        description: 'VAT number'
      },
      streetName: {
        type: 'string',
        nullable: false,
        description: 'Street name'
      },
      streetNumber: {
        type: 'string',
        nullable: false,
        description: 'Street number'
      },
      city: {
        type: 'string',
        nullable: false,
        description: 'City name'
      },
      province: {
        type: 'string',
        nullable: false,
        description: 'Province name'
      },
      quotationCode: {
        type: 'string',
        nullable: true,
        pattern: '^25\\d{6}$',
        description: 'Quotation code'
      },
      isEnergyProducer: {
        type: 'boolean',
        nullable: true,
        description: 'Determines whether is an energy producer or not'
      },
      question: {
        type: 'string',
        nullable: false,
        description: 'Question to send to the bot'
      }
    },
    if: {
      properties: { isPrivateApplicant: { const: true }, requestArea: { const: 'gas' } }
    },
    then: {
      required: ['firstName', 'lastName', 'fiscalCode']
    },
    else: {
      if: {
        properties: { isPrivateApplicant: { const: false }, requestArea: { const: 'gas' } }
      },
      then: {
        required: ['businessName', 'vatNumber']
      },
      else: {
        if: {
          properties: { isPrivateApplicant: { const: true }, requestArea: { const: 'energy' } }
        },
        then: {
          required: ['firstName', 'lastName', 'fiscalCode', 'isEnergyProducer']
        },
        else: {
          if: {
            properties: { isPrivateApplicant: { const: false }, requestArea: { const: 'energy' } }
          },
          then: {
            required: ['businessName', 'vatNumber', 'isEnergyProducer']
          }
        }
      }
    }
  },
  response: {
    200: {
      $ref: 'writeComplaint200#'
    },
    400: {
      $ref: 'writeComplaint400#'
    },
    401: {
      $ref: 'writeComplaint401#'
    },
    500: {
      $ref: 'writeComplaint500#'
    },
    503: {
      $ref: 'writeComplaint503#'
    }
  }
}

module.exports = async function (fastify) {
  fastify.get('/', { schema: getRouteSchema }, async (req, reply) => {
    const foundComplaint = await zoho.complaints.byIdRichiesta(req.query.id)
    const response = complaint.infos(foundComplaint, req.query.extended)
    reply.code(200).send({ ...response })
  })
  fastify.post('/', { schema: postRouteSchema }, async (req, reply) => {
    const response = await zoho.complaints.createNew(writeComplaint.toComplaintRequest(req.body))
    reply.code(200).send({
      id: response.ID,
      requestId: response.ID_Richiesta
    })
  })
}
