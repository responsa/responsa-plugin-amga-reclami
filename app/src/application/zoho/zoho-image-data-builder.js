const axios = require('axios').default

const getFileExtension = (fileName) => {
  const ext = require('path').extname(fileName || '').split('.')
  return ext[ext.length - 1]
}

module.exports = async (imageUrl) => {
  const imgFromUrl = await axios.get(imageUrl, { responseType: 'stream' })
  const FormData = require('form-data')
  const body = new FormData()
  body.append('file', imgFromUrl.data, `Foto.${getFileExtension(imageUrl)}`)
  return body
}
