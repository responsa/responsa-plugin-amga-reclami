const client = require('./zoho-client')
const config = require('../config')

// TICKET
module.exports.complaints = {
  all: async () => await client.queryZoho(config.zoho.complaintGetTarget),
  query: async (conditions) => await client.queryZoho(config.zoho.complaintGetTarget, conditions),
  byIdRichiesta: async (idRichiesta) => await client.getRecordByQuery(config.zoho.complaintGetTarget, [{ key: 'ID_Richiesta', value: idRichiesta }]),
  createNew: async (data) => await client.postData(config.zoho.complaintPostTarget, data)
}

module.exports.podpdr = {
  getByCode: async (code) => await client.queryZoho(config.zoho.podpdrGetTarget, [{ key: 'PODPDR', value: code }])
}

module.exports.privacy = {
  accept: async (data) => await client.postData(config.zoho.privacyPostTarget, data),
  get: async (email) => await client.queryZoho(config.zoho.privacyGetTarget, [{ key: 'Cliente_email', value: email }])
}

module.exports.selfReading = {
  create: async (data) => await client.postData(config.zoho.selfReadingPostTarget, data),
  update: async (id, field, data) => await client.postData(`${config.zoho.selfReadingUploadFileTarget}/${id}/${field}/upload`, data, true)
}
