const sut = require('../../src/application/smsService')

describe('SMS Service API', () => {
  it('Send message properly', async () => {
    const actual = await sut.sendSms('Test Message', '390000000000')
    expect(actual).toBe(true)
  })
})
