const genericErrors = require('./genericErrors')

module.exports.podpdr = {
  type: 'object',
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
    }
  }
}

module.exports.podpdr200 = {
  type: 'object',
  description: 'Contract address info retrieved successfully',
  $ref: 'podpdr#'
}

module.exports.podpdr400 = genericErrors.generic400
module.exports.podpdr404 = genericErrors.generic404('Contract not found')
module.exports.podpdr500 = genericErrors.generic500

module.exports.addSchemas = (fastifyInstance) => {
  fastifyInstance.addSchema({ $id: 'podpdr', ...this.podpdr })
  fastifyInstance.addSchema({ $id: 'podpdr200', ...this.podpdr200 })
  fastifyInstance.addSchema({ $id: 'podpdr400', ...this.podpdr400 })
  fastifyInstance.addSchema({ $id: 'podpdr404', ...this.podpdr404 })
  fastifyInstance.addSchema({ $id: 'podpdr500', ...this.podpdr500 })
}

module.exports.parseZohoResponse = (data) => {
  if (data && data.length > 0) {
    const contract = data[0]
    if (contract.Nome_ISTAT_della_provincia || contract.Numero_civico || contract.Nome_della_strada) {
      return {
        streetName: contract.Nome_della_strada,
        streetNumber: contract.Numero_civico,
        city: contract.Nome_ISTAT_della_provincia
      }
    }
  }

  return null
}
