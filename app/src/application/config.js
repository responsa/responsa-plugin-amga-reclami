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
    refreshAuthUrl: 'https://accounts.zoho.eu/oauth/v2/token?refresh_token={0}&client_id={1}&client_secret={2}&grant_type=refresh_token',
    dataUrl: 'https://creator.zoho.eu/api/v2/{0}/{1}',
    account: 'acegasapsamga',
    project: 'test1-gestione-reclami'
  }
}
