module.exports = {
  appName: 'Responsa Plugin for Amga Reclami',
  apiVersion: 'v3',
  port: process.env.PORT || 8080,
  secretValue: 'SECRET',
  elasticUri: 'Ciccio:',
  elasticUser: 'newboss',
  elasticPassword: 'newboss',
  elasticIndex: 'some-index',
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
    dataUrl: 'api/v2',
    account: 'acegasapsamga',
    project: 'test1-gestione-reclami',
    complaintGetTarget: 'report/Report_Generale',
    complaintPostTarget: 'form/Nuova_Richiesta_Cliente',
    contractGetTarget: 'report/PODPDR_Report',
    privacyGetTarget: 'report/Privacy_Report',
    privacyPostTarget: 'form/Privacy',
    selfReadingPostTarget: 'form/AutoLetture',
    selfReadingUploadFileTarget: 'report/AutoLetture_Report'
  },
  servers: [
    { url: 'server1 url', description: 'server1 description' },
    { url: 'server2 url', description: 'server2 description' }
  ]
}
