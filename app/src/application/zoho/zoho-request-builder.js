const config = require('../config')

module.exports = (method, target, data, isMultiPart) => {
  const req = {
    url: `${config.zoho.dataUrl}/${config.zoho.account}/${config.zoho.project}/${target}`,
    baseURL: config.zoho.dataBaseUrl,
    headers: {
      Authorization: `Zoho-oauthtoken ${config.zoho.accessToken}`
    },
    method,
    data,
    responseType: 'json',
    responseEncoding: 'utf8'
  }

  if (isMultiPart) {
    req.headers['Content-Type'] = `multipart/form-data; boundary=${data._boundary}`
  }

  return req
}
