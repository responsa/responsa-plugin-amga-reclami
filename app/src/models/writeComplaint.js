const genericErrors = require('./genericErrors')

module.exports.writeComplaint = {
  type: 'object',
  addToSwagger: true,
  title: 'CreateComplaintResponse',
  description: 'The data returned after the creation of a new complaint',
  properties: {
    requestId: {
      type: 'string',
      description: 'Request ID',
      nullable: false
    },
    id: {
      type: 'string',
      description: 'Record ID',
      nullable: false
    }
  }
}

module.exports.writeComplaint200 = {
  type: 'object',
  description: 'Complaint add issue generated successfully',
  $ref: 'writeComplaint#'
}
module.exports.writeComplaint400 = genericErrors.generic400
module.exports.writeComplaint401 = genericErrors.generic401
module.exports.writeComplaint500 = genericErrors.generic500
module.exports.writeComplaint503 = genericErrors.generic503

module.exports.addSchemas = (fastifyInstance) => {
  fastifyInstance.addSchema({ $id: 'writeComplaint', ...this.writeComplaint })
  fastifyInstance.addSchema({ $id: 'writeComplaint200', ...this.writeComplaint200 })
  fastifyInstance.addSchema({ $id: 'writeComplaint400', ...this.writeComplaint400 })
  fastifyInstance.addSchema({ $id: 'writeComplaint401', ...this.writeComplaint401 })
  fastifyInstance.addSchema({ $id: 'writeComplaint500', ...this.writeComplaint500 })
  fastifyInstance.addSchema({ $id: 'writeComplaint503', ...this.writeComplaint503 })
}

module.exports.elapsedDays = 29
module.exports.PRIVATE_APPLICANT = 'PERSONA FISICA'
module.exports.COMPANY_APPLICANT = 'SOCIETA'
module.exports.DOMESTIC_USAGE_TYPE = 'DOMESTICO'
module.exports.NOT_DOMESTIC_USAGE_TYPE = 'NON DOMESTICO'
module.exports.GAS_AREA_TYPE = 'GAS'
module.exports.ENERGY_AREA_TYPE = 'ENERGIA ELETTRICA'
module.exports.RESPONSE_TYPE = 'PROTOCOLLO'
module.exports.CLIENT_REQUEST_INSERT = 'SI CHAT'
module.exports.REQUEST_TYPE = 'RICHIESTA INFORMAZIONI'
module.exports.IS_ENERGY_PRODUCER = 'SI'
module.exports.IS_NOT_ENERGY_PRODUCER = 'NO'
module.exports.STATE = 'DA VALIDARE'
module.exports.REQUEST_SUBJECT = 'Richiesta informazioni da BOT'
module.exports.ASSIGNED_TO = 'STC'
module.exports.REQUEST_CLIENT_STATUS = 'PRESA IN CARICO'
module.exports.RESPONSE_COMPLAINT_ID = 'ID_Richiesta'
module.exports.QUOTATION_CODE = ' --- Numero preventivo: '

module.exports.addDays = (date, days) => {
  const result = new Date(date)
  result.setDate(result.getDate() + days)
  return result
}

module.exports.formatDate = (date) => {
  return `${
    date.getDate().toString().padStart(2, '0')}-${
    (date.getMonth() + 1).toString().padStart(2, '0')}-${
    date.getFullYear().toString().padStart(4, '0')} ${
    date.getHours().toString().padStart(2, '0')}:${
    date.getMinutes().toString().padStart(2, '0')}:${
    date.getSeconds().toString().padStart(2, '0')}`
}

module.exports.mappers = {
  usage: (value) => {
    switch (value) {
      case 'domestic':
        return this.DOMESTIC_USAGE_TYPE
      case 'not_domestic':
        return this.NOT_DOMESTIC_USAGE_TYPE
      default:
        return null
    }
  },
  requestArea: (value) => {
    switch (value) {
      case 'gas':
        return this.GAS_AREA_TYPE
      case 'energy':
        return this.ENERGY_AREA_TYPE
      default:
        return null
    }
  },
  isPrivateApplicant: (value) => {
    return value ? this.PRIVATE_APPLICANT : this.COMPANY_APPLICANT
  },
  isEnergyProducer: (value) => {
    return value ? this.IS_ENERGY_PRODUCER : this.IS_NOT_ENERGY_PRODUCER
  }
}

module.exports.toComplaintRequest = (row) => {
  const currentDate = new Date()

  const data = {
    Stato: this.STATE,
    Servizio: this.mappers.requestArea(row.requestArea),
    Telefono_Richiedente: row.phone,
    Tipologia_Richiedente: this.mappers.isPrivateApplicant(row.isPrivateApplicant),
    Indirizzo_Fornitura: {
      address_line_12: `${row.streetName}, ${row.streetNumber}`,
      district_city2: row.city,
      state_province2: row.province
    },
    Tipologia_Risposta: this.RESPONSE_TYPE,
    Richiesta_Inserita_Cliente: this.CLIENT_REQUEST_INSERT,
    Data_Richiesta: this.formatDate(currentDate),
    Tipo_Richiesta: this.REQUEST_TYPE,
    Tipo_USO: this.mappers.usage(row.usage),
    Richiesta_Oggetto: this.REQUEST_SUBJECT,
    Stato_Richiesta_Cliente: this.REQUEST_CLIENT_STATUS,
    Assegnato_A: this.ASSIGNED_TO,
    Richiesta_Testo: row.question,
    Data_Risposta_Entro: this.formatDate(this.addDays(currentDate, this.elapsedDays))
  }

  if (row.firstName || row.lastName) {
    data.Nome_Richiedente = {
      display_value: `${row.firstName} ${row.lastName}`,
      last_name: row.lastName,
      first_name: row.firstName
    }
  }

  if (row.fiscalCode) {
    data.Codice_Fiscale = row.fiscalCode
  }

  if (row.businessName) {
    data.Ragione_Sociale_Richiedente = row.businessName
  }

  if (row.vatNumber) {
    data.Partita_Iva = row.vatNumber
  }

  if (row.code) {
    data.Codice_PDR_POD = row.code
  }

  if (row.isEnergyProducer === false || row.isEnergyProducer === true) {
    data.Cliente_Produttore_Energia = this.mappers.isEnergyProducer(row.isEnergyProducer)
  }

  if (row.quotationCode) {
    data.Richiesta_Testo = `${data.Richiesta_Testo}${this.QUOTATION_CODE}${row.quotationCode}`
  }

  return {
    data: data,
    result: {
      fields: [
        this.RESPONSE_COMPLAINT_ID
      ]
    }
  }
}
