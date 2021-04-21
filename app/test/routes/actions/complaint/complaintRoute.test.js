const helper = require('../../../helper')
const zoho = require('../../../../src/application/zoho/zoho')
const responses = require('./responses')
const writeResponses = require('./writeResponses')
require('jest-extended')

describe('Get Complaint schema and querystring validation', () => {
  it('Get Complaint - answers correctly', async () => {
    helper.checkResponses('/actions/complaint', responses)
    helper.checkResponses('/actions/complaint', writeResponses, 'post')
  })

  it('Get Complaint - answers 400 without querystring', async () => {
    await helper.checkQueryString('actions/complaint', 400)
  })

  it('Get Complaint - answers 400 without required id querystring parameter', async () => {
    await helper.checkQueryString('actions/complaint?extended=true', 400, "querystring should have required property 'id'")
  })

  it('Get Complaint - answers 400 with required id querystring parameter wrong type [string]', async () => {
    await helper.checkQueryString('actions/complaint?id=wrong_type', 400, 'querystring.id should be number')
  })

  it('Get Complaint - answers 400 with required id querystring parameter wrong type [boolean]', async () => {
    await helper.checkQueryString('actions/complaint?id=true', 400, 'querystring.id should be number')
  })

  it('Get Complaint - answers 400 with extended querystring parameter wrong type [string]', async () => {
    await helper.checkQueryString('actions/complaint?id=2&extended=wrong_type', 400, 'querystring.extended should be boolean')
  })

  it('Get Complaint - answers 400 with extended querystring parameter wrong type [number]', async () => {
    await helper.checkQueryString('actions/complaint?id=2&extended=12', 400, 'querystring.extended should be boolean')
  })
})

describe('Get Complaint E2E tests', () => {
  it('complaint - answers 200 with existing complaint', async () => {
    const sut = await helper.setupTestEnvironment()
    const firstComplaint = (await zoho.complaints.all())[0]

    const response = await helper.doGet(
      sut,
      `actions/complaint?id=${firstComplaint.ID_Richiesta}&extended=true`,
      helper.requiredHeaders
    )
    expect(response.statusCode).toEqual(200)
  })

  it('complaint - answers 404 with not existing complaint', async () => {
    const sut = await helper.setupTestEnvironment()

    const response = await helper.doGet(
      sut,
      'actions/complaint?id=0&extended=true',
      helper.requiredHeaders
    )

    expect(response.statusCode).toEqual(404)
  })
})

describe('Post Complaint tests', () => {
  it('complaint - answers 200 with id and requestId', async () => {
    const sut = await helper.setupTestEnvironment()
    const bodyObj = {
      usage: 'domestic',
      requestArea: 'gas',
      code: '11825000002505',
      email: 'sergio.iacobellis@gmail.com',
      phone: '+393292225509',
      isPrivateApplicant: 'true',
      firstName: 'Mario',
      lastName: 'Rossi',
      fiscalCode: 'cblsrg79m08a662b',
      businessName: '',
      vatNumber: '',
      streetName: 'via nomeVia',
      streetNumber: '1',
      city: 'Bologna',
      province: 'Emilia Romagna',
      quotationCode: '12345',
      isEnergyyProducer: 'false',
      question: 'Domanda finale...'
    }

    const response = await helper.doPost(
      sut,
      'actions/complaint',
      bodyObj,
      helper.requiredHeaders
    )
    expect(response.statusCode).toEqual(200)
  })
})
