const config = require('../config')

module.exports = (method, target, data) => {
  return {
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
}
