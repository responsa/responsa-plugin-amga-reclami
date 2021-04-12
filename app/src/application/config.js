module.exports = {
  appName: 'Responsa Plugin for Amga Reclami',
  port: process.env.PORT || 8080,
  secretValue: 'SECRET',
  elasticUri: 'https://localhost:9200',
  elasticUser: 'newboss',
  elasticPassword: 'newboss',
  elasticIndex: 'responsa-plugin-amga-reclami',
  awsSmsService: {
    gatewayUrl: 'https://pwk4jbtmo6.execute-api.eu-west-1.amazonaws.com/production/v1/sms',
    apiKey: '8tDHWjlZD9AKISdQ5Nu79Hb8b1owU8Z7gu0BXVaa',
    fromField: 'ZWare'
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
