// eslint-disable-next-line
const helper = require('../../helper')
const sut = require('../../../src/application/zoho/zoho-error')
require('jest-extended')

const responseWithMessage = {
  data: {
    message: 'my message'
  }
}
const responseWithDescription = {
  data: {
    description: 'my description'
  }
}
const responseWithBotmMessageAndDescription = {
  data: {
    message: 'my message',
    description: 'my description'
  }
}

const responseWithError = {
  data: {
    error: 'my error'
  }
}

describe('Zoho Error', () => {
  it('creates a valid error with only data.message', () => {
    const actual = sut(responseWithMessage, 400)
    expect(actual).toBeDefined()
    expect(actual.statusCode).toEqual(400)
    expect(actual.code).toEqual('ZOHO_CREATOR_ERROR')
    expect(actual.message).toEqual(`Zoho Creator Error -> ${responseWithMessage.data.message}`)
  })

  it('creates a valid error with only data.description', () => {
    const actual = sut(responseWithDescription, 401)
    expect(actual).toBeDefined()
    expect(actual.statusCode).toEqual(401)
    expect(actual.code).toEqual('ZOHO_CREATOR_ERROR')
    expect(actual.message).toEqual(`Zoho Creator Error -> ${responseWithDescription.data.description}`)
  })

  it('creates a valid error with both data.message and data.description', () => {
    const actual = sut(responseWithBotmMessageAndDescription, 404)
    expect(actual).toBeDefined()
    expect(actual.statusCode).toEqual(404)
    expect(actual.code).toEqual('ZOHO_CREATOR_ERROR')
    expect(actual.message).toEqual(`Zoho Creator Error -> ${responseWithBotmMessageAndDescription.data.message}`)
  })

  it('creates a valid error with data.error', () => {
    const actual = sut(responseWithError, 400)
    expect(actual).toBeDefined()
    expect(actual.statusCode).toEqual(400)
    expect(actual.code).toEqual('ZOHO_CREATOR_ERROR')
    expect(actual.message).toEqual(`Zoho Creator Error -> "${responseWithError.data.error}"`)
  })

  it('creates a valid error without both data.message and data.description', () => {
    const actual = sut({ data: { anotherProp: 'another prop' } }, 500)
    expect(actual).toBeDefined()
    expect(actual.statusCode).toEqual(500)
    expect(actual.code).toEqual('ZOHO_CREATOR_ERROR')
    expect(actual.message).toEqual('Zoho Creator Error -> Generic error')
  })

  it('creates a valid error without a valid response', () => {
    const actual = sut({ }, 503, 'my custom tag')
    expect(actual).toBeDefined()
    expect(actual.statusCode).toEqual(503)
    expect(actual.code).toEqual('MY CUSTOM TAG')
    expect(actual.message).toEqual('Zoho Creator Error -> Generic error')
  })
})
