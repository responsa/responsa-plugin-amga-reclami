// const zoho = require('../../../application/zoho/zoho')
// const counter = require('../../../models/selfReading')
// const fs = require('fs')
// const zohoAuth = require('../../../application/zoho/zoho-auth')
// const config = require('../../../application/config')
// const requestBuilder = require('../../../application/zoho/zoho-request-builder')

// module.exports = async function (fastify) {
//   fastify.post('/', { schema: counter.postRouteSchema }, async (req, reply) => {
// --- Works fine ---
// await zohoAuth.refreshAccessToken()
// try {
//   const client = require('axios').default
//   const imgFromUrl = await client.get('https://luce-gas.it/sites/default/files/images/matricola-contatore-gas1.jpg', { responseType: 'stream' })

//   const FormData = require('form-data')
//   const body = new FormData()
//   body.append('file', imgFromUrl.data, 'simpleFileName.jpg')

//   const request = requestBuilder('POST', `${config.zoho.selfReadingUploadFileTarget}/47306000024326587/Foto_autolettura_1/upload`, body)
//   request.headers['Content-Type'] = `multipart/form-data; boundary=${body._boundary}`
//   const resxxx = await client.request(request)
//   console.log(resxxx)
// } catch (err) {
//   console.log(err)
// }
//   })
// }

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
