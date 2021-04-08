module.exports = {
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
  }
}
