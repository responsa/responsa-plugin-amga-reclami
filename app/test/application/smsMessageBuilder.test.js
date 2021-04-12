const sut = require('../../src/application/smsMessageBuilder')

describe('SMS Message Builder', () => {
  it('Build Message properly', () => {
    const code = 1
    const actual = sut.buildSmsMessage(code)
    expect(actual).toEqual(`${code} ${sut.smsMsgITA}`)
  })
})
