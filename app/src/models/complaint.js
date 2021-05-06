const genericErrors = require('./genericErrors')

const DEFAULT_STATO_RICHIESTA_CLIENTE = 'SCONOSCIUTO'

module.exports.complaint = {
  type: 'object',
  addToSwagger: true,
  title: 'ComplaintStatusResponse',
  description: 'The complaint data returned when requesting info on the status',
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
      nullable: false
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
  required: ['status']
}

module.exports.complaint200 = {
  type: 'object',
  description: 'Complaint infos successfully returned',
  $ref: 'complaint#'
}
module.exports.complaint400 = genericErrors.generic400
module.exports.complaint401 = genericErrors.generic401
module.exports.complaint404 = genericErrors.generic404('Complaint not found')
module.exports.complaint500 = genericErrors.generic500
module.exports.complaint503 = genericErrors.generic503

module.exports.addSchemas = (fastifyInstance) => {
  fastifyInstance.addSchema({ $id: 'complaint', ...this.complaint })
  fastifyInstance.addSchema({ $id: 'complaint200', ...this.complaint200 })
  fastifyInstance.addSchema({ $id: 'complaint400', ...this.complaint400 })
  fastifyInstance.addSchema({ $id: 'complaint401', ...this.complaint401 })
  fastifyInstance.addSchema({ $id: 'complaint404', ...this.complaint404 })
  fastifyInstance.addSchema({ $id: 'complaint500', ...this.complaint500 })
  fastifyInstance.addSchema({ $id: 'complaint503', ...this.complaint503 })
}

module.exports.infos = (data, extended) => {
  const output = {}
  output.status = (!extended) ? (data.Stato_Richiesta_Cliente ?? DEFAULT_STATO_RICHIESTA_CLIENTE) : data.Stato
  output.email = data.Email_Inserimento

  if (extended) {
    output.department = data.Assegnato_A
    output.assignee = (data.STC) ? data.Assegnatario_STC : data.Assegnatario_ALTRO
  }

  if (data.Stato !== 'CHIUSO') return output

  output.subject = data.Risposta_Oggetto
  output.content = data.Risposta_Testo

  return output
}
