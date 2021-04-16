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

module.exports.podpdr400 = {
  type: 'object',
  description: 'Bad request',
  $ref: 'Error#'
}

module.exports.podpdr404 = {
  type: 'object',
  description: 'Contract not found',
  $ref: 'Error#'
}

module.exports.podpdr500 = {
  type: 'object',
  description: 'Internal error',
  $ref: 'Error#'
}

module.exports.addSchemas = (fastifyInstance) => {
  fastifyInstance.addSchema({ $id: 'podpdr', ...this.podpdr })
  fastifyInstance.addSchema({ $id: 'podpdr200', ...this.podpdr200 })
  fastifyInstance.addSchema({ $id: 'podpdr400', ...this.podpdr400 })
  fastifyInstance.addSchema({ $id: 'podpdr404', ...this.podpdr404 })
  fastifyInstance.addSchema({ $id: 'podpdr500', ...this.podpdr500 })
}

module.exports.parseZohoResponse = (res) => {
  if (res.data && res.data.data && res.data.data.length > 0) {
    const data = res.data.data[0]
    return {
      streetName: data.Nome_della_strada,
      streetNumber: data.Numero_civico,
      city: data.Nome_ISTAT_della_provincia
    }
  } else {
    return null
  }
}
