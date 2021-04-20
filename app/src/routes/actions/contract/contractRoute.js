require('../../../models/contract')
const zoho = require('../../../application/zoho/zoho')
const contract = require('../../../models/contract')

const getByCode = async (code, reply) => {
  const zohoRes = await zoho.podpdr.getByCode(code)
  const res = contract.parseZohoResponse(zohoRes)
  reply.code(200).send(res)
}

module.exports = async function (fastify) {
  fastify.get('/pod', { schema: contract.buildRouteSchema('POD', '^IT\\d{3}E\\d{8}$') }, async (req, reply) => await getByCode(req.query.code, reply))
  fastify.get('/pdr', { schema: contract.buildRouteSchema('PDR', '^\\d{14}$') }, async (req, reply) => await getByCode(req.query.code, reply))
}
