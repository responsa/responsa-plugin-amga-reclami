// const zoho = require('../../../application/zoho/zoho')
// const counter = require('../../../models/counterSelfReading')
// const fs = require('fs')
// const zohoAuth = require('../../../application/zoho/zoho-auth')
// const config = require('../../../application/config')
// const requestBuilder = require('../../../application/zoho/zoho-request-builder')

// module.exports = async function (fastify) {
//   fastify.post('/', { schema: counter.postRouteSchema }, async (req, reply) => {
    // --- Works fine ---
    // await zohoAuth.refreshAccessToken()
    // try {
    //   const FormData = require('form-data')
    //   const body = new FormData()
    //   body.append('file', fs.createReadStream('C:/temp/photo.jpg'), 'simpleFileName.jpg')
    //   const client = require('axios').default
    //   const request = requestBuilder('POST', `${config.zoho.counterSelfReadingUploadFileTarget}/47306000024323915/Foto_autolettura_1/upload`, body)
    //   request.headers['Content-Type'] = `multipart/form-data; boundary=${body._boundary}`
    //   request['Accept-Encoding'] = 'gzip, deflate'
    //   const resxxx = await client.request(request)
    //   console.log(resxxx)
    // } catch (err) {
    //   console.log(err)
    // }
    // --- ---

     // --- prova ok!!---
    // await zohoAuth.refreshAccessToken()
    // try {
    //   const client = require('axios').default
    //   const imgFromUrl = await client.get('https://luce-gas.it/sites/default/files/images/matricola-contatore-gas1.jpg', { responseType: 'stream' })
      
    //   const FormData = require('form-data')
    //   const body = new FormData()
    //   body.append('file', imgFromUrl.data, 'simpleFileName.jpg')
      
    //   const request = requestBuilder('POST', `${config.zoho.counterSelfReadingUploadFileTarget}/47306000024326587/Foto_autolettura_1/upload`, body)
    //   request.headers['Content-Type'] = `multipart/form-data; boundary=${body._boundary}`
    //   const resxxx = await client.request(request)
    //   console.log(resxxx)
    // } catch (err) {
    //   console.log(err)
    // }
    //   })
    // }

    // --- ---

//     // Write record
//     // const response = await zoho.counterSelfReading.create(counter.toSelfReadingRequest(req.body))
//     await zohoAuth.refreshAccessToken()
//     try {
//       const client = require('axios').default
//       const imgFromUrl = await client.get('https://luce-gas.it/sites/default/files/images/matricola-contatore-gas1.jpg', { responseType: 'arraybuffer' })
//       const path = 'C:/temp/file.jpg'
//       fs.open(path, 'w', (err, fd) => {
//         if (err) {
//           throw new Error('could not open file: ' + err)
//         }
//         fs.write(fd, imgFromUrl.data, 0, imgFromUrl.data.length, null, (err) => {
//           if (err) throw new Error('error writing file: ' + err)
//           fs.close(fd, async () => {
//             console.log('wrote the file successfully')
//             const FormData = require('form-data')
//             const body = new FormData()
//             body.append('file', fs.createReadStream(path), 'simpleFileName.jpg')
//             const request = requestBuilder('POST', `${config.zoho.counterSelfReadingUploadFileTarget}/47306000024323915/Foto_autolettura_1/upload`, body)
//             request.headers['Content-Type'] = `multipart/form-data; boundary=${body._boundary}`
//             // request['Accept-Encoding'] = 'gzip, deflate'
//             const resxxx = await client.request(request)
//             console.log(resxxx)
//             reply.code(200).send({
//               // id: response.ID
//             })
//           })
//         })
//       })
//     } catch (err) {
//       console.log(err)
//     }
//   })
// }

const zoho = require('../../../application/zoho/zoho')
const counter = require('../../../models/counterSelfReading')
const zohoAuth = require('../../../application/zoho/zoho-auth')

module.exports = async function (fastify) {
  fastify.post('/', { schema: counter.postRouteSchema }, async (req, reply) => {
    // // 47306000024326587
    // await zohoAuth.refreshAccessToken()
    // await uploadPhoto('47306000024325755', photo1, counter.toZohoFieldName('photo1'))
    // return

    // Sanificate body as required by Zoho
    const photo1 = req.body.photo1
    delete req.body.photo1
    const photo2 = req.body.photo2
    delete req.body.photo2
    const photo3 = req.body.photo3
    delete req.body.photo3

    // Force to refresh Toekn, otherwise it will fails
    await zohoAuth.refreshAccessToken()

    // Create Record
    const response = await zoho.counterSelfReading.create(counter.toSelfReadingRequest(req.body))

    // Update images
    if (photo1) {
      await uploadPhoto(response.ID, photo1, counter.toZohoFieldName('photo1'))
    }
    if (req.body.value2 && photo2) {
      await uploadPhoto(response.ID, photo2, counter.toZohoFieldName('photo2'))
    }
    if (req.body.value3 && photo3) {
      await uploadPhoto(response.ID, photo3, counter.toZohoFieldName('photo3'))
    }

    // Final result
    reply.code(200).send({
      id: response.ID
    })
  })

  const uploadPhoto = async (id, photoUrl, fieldName) => {
    const client = require('axios').default
    const imgFromUrl = await client.get(photoUrl, { responseType: 'stream' })

    const FormData = require('form-data')
    const body = new FormData()
    body.append('file', imgFromUrl.data, `Foto.${counter.getFileExtension(photoUrl)}`)
    await zoho.counterSelfReading.update(id, fieldName, body)
  }
}
