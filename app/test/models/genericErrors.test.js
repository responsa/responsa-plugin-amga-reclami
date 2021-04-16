const sut = require('../../src/models/genericErrors')

describe('Generic Errors', () => {
  it('Builds correct generic 404 error schema', () => {
    const description = 'message'
    const actual = sut.generic404(description)
    expect(actual.description).toBeDefined()
    expect(actual.description).toEqual(description)
  })
})
