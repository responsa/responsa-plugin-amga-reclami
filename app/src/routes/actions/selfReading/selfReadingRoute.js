const zoho = require('../../../application/zoho/zoho')
const counter = require('../../../models/selfReading')

module.exports = async function (fastify) {
  fastify.post('/', { schema: counter.postRouteSchema }, async (req, reply) => {
    // const p1 = req.body.photo1
    // await uploadPhoto('47306000024325755', p1, counter.toZohoFieldName('photo1'))
    // return

    // Create Record
    const response = await zoho.selfReading.create(counter.toSelfReadingRequest(req.body))

    // Update images
    if (req.body.photo1) {
      await zoho.selfReading.uploadPhoto(response.ID, counter.toZohoFieldName('photo1'), req.body.photo1)
    }
    if (req.body.value2 && req.body.photo2) {
      await zoho.selfReading.uploadPhoto(response.ID, counter.toZohoFieldName('photo2'), req.body.photo2)
    }
    if (req.body.value3 && req.body.photo3) {
      await zoho.selfReading.uploadPhoto(response.ID, counter.toZohoFieldName('photo3'), req.body.photo3)
    }

    // Final result
    reply.code(200).send({
      id: response.ID
    })
  })
}
