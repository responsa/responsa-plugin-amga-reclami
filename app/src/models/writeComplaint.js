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

module.exports.convertToComplaintBody = (row) => {
  const currentDate = new Date()
  let useType = null
  let requestArea = null

  switch (row.usage) {
    case 'domestic':
      useType = this.DOMESTIC_USAGE_TYPE
      break
    case 'not_domestic':
      useType = this.NOT_DOMESTIC_USAGE_TYPE
      break
  }

  switch (row.requestArea) {
    case 'gas':
      requestArea = this.GAS_AREA_TYPE
      break
    case 'energy':
      requestArea = this.ENERGY_AREA_TYPE
      break
  }

  return {
    data: {
      Servizio: requestArea,
      Nome_Richiedente: {
        display_value: `${row.firstName} ${row.lastName}`,
        last_name: row.lastName,
        first_name: row.firstName
      },
      Telefono_Richiedente: row.phone,
      Tipologia_Richiedente: row.isPrivateApplicant ? this.PRIVATE_APPLICANT : this.COMPANY_APPLICANT,
      Ragione_Sociale_Richiedente: row.businessName,
      Indirizzo_Fornitura: {
        address_line_12: `${row.streetName}, ${row.streetNumber}`,
        district_city2: row.city,
        state_province2: row.province
      },
      Tipologia_Risposta: this.RESPONSE_TYPE,
      Richiesta_Inserita_Cliente: this.CLIENT_REQUEST_INSERT,
      Codice_PDR_POD: row.code,
      Codice_Fiscale: row.fiscalCode,
      Data_Richiesta: this.formatDate(currentDate),
      Partita_Iva: row.vatNumber,
      Tipo_Richiesta: this.REQUEST_TYPE,
      Cliente_Produttore_Energia: row.isEnergyProducer ? this.IS_ENERGY_PRODUCER : this.IS_NOT_ENERGY_PRODUCER,
      Stato: this.STATE,
      Tipo_USO: useType,
      Richiesta_Oggetto: this.REQUEST_SUBJECT,
      Stato_Richiesta_Cliente: this.REQUEST_CLIENT_STATUS,
      Assegnato_A: this.ASSIGNED_TO,
      Richiesta_Testo: row.question,
      Data_Risposta_Entro: this.formatDate(this.addDays(currentDate, this.elapsedDays))
    },
    result: {
      fields: [
        'ID_Richiesta'
      ]
    }
  }
}
