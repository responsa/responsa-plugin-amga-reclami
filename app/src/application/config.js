module.exports = {
  appName: 'Responsa Plugin for Amga Reclami',
  port: process.env.PORT || 8080,
  secretValue: 'SECRET',
  elasticUri: 'https://localhost:9200',
  elasticUser: 'newboss',
  elasticPassword: 'newboss',
  elasticIndex: 'responsa-plugin-amga-reclami',
  awsSmsService: {
    gatewayUrl: process.env.OTP_GATEWAY_URL,
    apiKey: process.env.OTP_API_KEY,
    fromField: process.env.OTP_FROM_FIELD
  },
  zoho: {
    clientId: process.env.ZOHO_CLIENT_ID,
    clientSecret: process.env.ZOHO_CLIENT_SECRET,
    accessToken: '',
    refreshToken: process.env.ZOHO_REFRESH_TOKEN,
    refreshAuthBaseUrl: 'https://accounts.zoho.eu/',
    refreshAuthUrl: '/oauth/v2/token',
    dataBaseUrl: 'https://creator.zoho.eu/',
    dataUrl: '/api/v2',
    account: 'acegasapsamga',
    project: 'test1-gestione-reclami'
  },
  servers: [
    { url: 'server1 url', description: 'server1 description' },
    { url: 'server2 url', description: 'server2 description' }
  ]
}
