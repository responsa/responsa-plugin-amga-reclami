const helper = require('../helper')

describe('Not Found', () => {
  it('Get - answers 404', async () => {
    const sut = await helper.setupTestEnvironment()
    const actual = await helper.doGet(sut, '/actions/notEists', helper.requiredHeaders)
    expect(actual).not.toBeNull()

    const response = JSON.parse(actual.body)
    expect(response.message).toEqual('Requested route does not exist')
  })
})
