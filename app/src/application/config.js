module.exports = {
  port: process.env.PORT || 8080,
  secretValue: 'SECRET',
  elasticUri: 'https://localhost:9200',
  elasticUser: 'newboss',
  elasticPassword: 'newboss',
  elasticIndex: 'responsa-plugin-amga-reclami',
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
  }
}
