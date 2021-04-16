const genericErrors = require('./genericErrors')

const DEFAULT_STATO_RICHIESTA_CLIENTE = 'SCONOSCIUTO'

module.exports.ticket = {
  type: 'object',
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
  required: ['status']
}

module.exports.ticket200 = {
  type: 'object',
  description: 'Ticket infos successfully returned',
  $ref: 'ticket#'
}
module.exports.ticket400 = genericErrors.generic400
module.exports.ticket404 = genericErrors.generic404('Ticket not found')
module.exports.ticket500 = genericErrors.generic500

module.exports.addSchemas = (fastifyInstance) => {
  fastifyInstance.addSchema({ $id: 'ticket', ...this.ticket })
  fastifyInstance.addSchema({ $id: 'ticket200', ...this.ticket200 })
  fastifyInstance.addSchema({ $id: 'ticket400', ...this.ticket400 })
  fastifyInstance.addSchema({ $id: 'ticket404', ...this.ticket404 })
  fastifyInstance.addSchema({ $id: 'ticket500', ...this.ticket500 })
}

module.exports.infos = (data, extended) => {
  const output = {}
  output.status = (!extended) ? (data.Stato_Richiesta_Cliente ?? DEFAULT_STATO_RICHIESTA_CLIENTE) : data.Stato

  if (extended) {
    output.department = data.Assegnato_A
    output.assignee = (data.STC) ? data.Assegnatario_STC : data.Assegnatario_ALTRO
  }

  if (data.Stato !== 'CHIUSO') return output

  output.email = data.Email_Inserimento
  output.subject = data.Risposta_Oggetto
  output.content = data.Risposta_Testo

  return output
}
