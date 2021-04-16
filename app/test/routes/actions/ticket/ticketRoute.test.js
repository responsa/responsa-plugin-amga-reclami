const helper = require('../../../helper')
const zoho = require('../../../../src/application/zoho')
const responses = require('./responses')
require('jest-extended')

describe('Get Ticket schema and querystring validation', () => {
  it('Get Ticket - answers correctly', async () => {
    helper.checkResponses('/actions/ticket', responses)
  })

  it('Get Ticket - answers 400 without querystring', async () => {
    await helper.checkQueryString('actions/ticket', 400)
  })

  it('Get Ticket - answers 400 without required id querystring parameter', async () => {
    await helper.checkQueryString('actions/ticket?extended=true', 400, "querystring should have required property 'id'")
  })

  it('Get Ticket - answers 400 with required id querystring parameter wrong type [string]', async () => {
    await helper.checkQueryString('actions/ticket?id=wrong_type', 400, 'querystring.id should be number')
  })

  it('Get Ticket - answers 400 with required id querystring parameter wrong type [boolean]', async () => {
    await helper.checkQueryString('actions/ticket?id=true', 400, 'querystring.id should be number')
  })

  it('Get Ticket - answers 400 with extended querystring parameter wrong type [string]', async () => {
    await helper.checkQueryString('actions/ticket?id=2&extended=wrong_type', 400, 'querystring.extended should be boolean')
  })

  it('Get Ticket - answers 400 with extended querystring parameter wrong type [number]', async () => {
    await helper.checkQueryString('actions/ticket?id=2&extended=12', 400, 'querystring.extended should be boolean')
  })
})

describe('Get Ticket E2E tests', () => {
  it('ticket - answers 200 with existing ticket', async () => {
    const sut = await helper.setupTestEnvironment()
    const firstTicket = (await zoho.tickets.all())[0]

    const response = await helper.doGet(
      sut,
      'actions/ticket',
      {
        id: +firstTicket.ID_Richiesta,
        extended: true
      },
      helper.requiredHeaders
    )

    expect(response.statusCode).toEqual(200)
  })

  it('ticket - answers 404 with not existing ticket', async () => {
    const sut = await helper.setupTestEnvironment()

    const response = await helper.doGet(
      sut,
      'actions/ticket?id=0&extended=true',
      helper.requiredHeaders
    )

    expect(response.statusCode).toEqual(404)
  })
})
