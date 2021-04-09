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
    dataUrl: 'https://creator.zoho.eu/api/v2/{0}/{1}',
    account: 'acegasapsamga',
    project: 'test1-gestione-reclami'
  }
}
