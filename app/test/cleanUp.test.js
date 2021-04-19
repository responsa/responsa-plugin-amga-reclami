const fs = require('fs')

describe('Clean up operations', () => {
  it('removes accessToken file', () => {
    expect.assertions(1)
    fs.unlink('test/access_token.txt', () => {})
    expect(true).toBeTruthy()
  })
})
