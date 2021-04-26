const helper = require('../../../helper')
const zoho = require('../../../../src/application/zoho/zoho')
const responses = require('./responses')
const writeResponses = require('./writeResponses')
require('jest-extended')

describe('Get Complaint schema and querystring validation', () => {
  it('Get Complaint - answers correctly', async () => {
    await helper.checkResponses('/actions/complaint', responses)
    await helper.checkResponses('/actions/complaint', writeResponses, 'post')
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

const expect400 = async (body) => {
  const sut = await helper.setupTestEnvironment()
  const response = await helper.doPost(sut, 'actions/complaint', body, helper.requiredHeaders)
  expect(response.statusCode).toEqual(400)
}

describe('Create complaint - 400 - basic fields', () => {
  it('400 - fails without usage', async () =>
    expect400({
      requestArea: 'gas',
      email: 'sergio.iacobellis@gmail.com',
      phone: '+393290000000',
      isPrivateApplicant: true,
      streetName: 'via sample',
      streetNumber: '1',
      city: 'Bologna',
      province: 'Emilia Romagna',
      question: 'domanda..'
    })
  )

  it('400 - fails without requestArea', async () =>
    expect400({
      usage: 'domestic',
      email: 'sergio.iacobellis@gmail.com',
      phone: '+393290000000',
      isPrivateApplicant: true,
      streetName: 'via sample',
      streetNumber: '1',
      city: 'Bologna',
      province: 'Emilia Romagna',
      question: 'domanda..'
    })
  )

  it('400 - fails without email', async () =>
    expect400({
      usage: 'domestic',
      requestArea: 'gas',
      phone: '+393290000000',
      isPrivateApplicant: true,
      streetName: 'via sample',
      streetNumber: '1',
      city: 'Bologna',
      province: 'Emilia Romagna',
      question: 'domanda..'
    })
  )

  it('400 - fails without phone', async () =>
    expect400({
      usage: 'domestic',
      requestArea: 'gas',
      email: 'sergio.iacobellis@gmail.com',
      isPrivateApplicant: true,
      streetName: 'via sample',
      streetNumber: '1',
      city: 'Bologna',
      province: 'Emilia Romagna',
      question: 'domanda..'
    })
  )

  it('400 - fails without isPrivateApplicant', async () =>
    expect400({
      usage: 'domestic',
      requestArea: 'gas',
      email: 'sergio.iacobellis@gmail.com',
      phone: '+393290000000',
      streetName: 'via sample',
      streetNumber: '1',
      city: 'Bologna',
      province: 'Emilia Romagna',
      question: 'domanda..'
    })
  )

  it('400 - fails without streetName', async () =>
    expect400({
      usage: 'domestic',
      requestArea: 'gas',
      email: 'sergio.iacobellis@gmail.com',
      phone: '+393290000000',
      isPrivateApplicant: true,
      streetNumber: '1',
      city: 'Bologna',
      province: 'Emilia Romagna',
      question: 'domanda..'
    })
  )

  it('400 - fails without streetNumber', async () =>
    expect400({
      usage: 'domestic',
      requestArea: 'gas',
      email: 'sergio.iacobellis@gmail.com',
      phone: '+393290000000',
      isPrivateApplicant: true,
      streetName: 'via sample',
      city: 'Bologna',
      province: 'Emilia Romagna',
      question: 'domanda..'
    })
  )

  it('400 - fails without city', async () =>
    expect400({
      usage: 'domestic',
      requestArea: 'gas',
      email: 'sergio.iacobellis@gmail.com',
      phone: '+393290000000',
      isPrivateApplicant: true,
      streetName: 'via sample',
      streetNumber: '1',
      province: 'Emilia Romagna',
      question: 'domanda..'
    })
  )

  it('400 - fails without province', async () =>
    expect400({
      usage: 'domestic',
      requestArea: 'gas',
      email: 'sergio.iacobellis@gmail.com',
      phone: '+393290000000',
      isPrivateApplicant: true,
      streetName: 'via sample',
      streetNumber: '1',
      city: 'Bologna',
      question: 'domanda..'
    })
  )

  it('400 - fails without question', async () =>
    expect400({
      usage: 'domestic',
      requestArea: 'gas',
      email: 'sergio.iacobellis@gmail.com',
      phone: '+393290000000',
      isPrivateApplicant: true,
      streetName: 'via sample',
      streetNumber: '1',
      city: 'Bologna',
      province: 'Emilia Romagna'
    })
  )
})

describe('Create complaint - 400 - conditional fields', () => {
  it('400 - fails without firstName if isPrivateApplicant === true && requestArea === \'gas\'', async () =>
    expect400({
      usage: 'domestic',
      requestArea: 'gas',
      email: 'sergio.iacobellis@gmail.com',
      phone: '+393290000000',
      isPrivateApplicant: true,
      streetName: 'via sample',
      streetNumber: '1',
      city: 'Bologna',
      province: 'Emilia Romagna',
      question: 'domanda..',
      lastName: 'cognome',
      fiscalCode: 'RNDNDR90R11C573X'
    })
  )
  it('400 - fails without lastName if isPrivateApplicant === true && requestArea === \'gas\'', async () =>
    expect400({
      usage: 'domestic',
      requestArea: 'gas',
      email: 'sergio.iacobellis@gmail.com',
      phone: '+393290000000',
      isPrivateApplicant: true,
      streetName: 'via sample',
      streetNumber: '1',
      city: 'Bologna',
      province: 'Emilia Romagna',
      question: 'domanda..',
      firstName: 'nome',
      fiscalCode: 'RNDNDR90R11C573X'
    })
  )
  it('400 - fails without fiscalCode if isPrivateApplicant === true && requestArea === \'gas\'', async () =>
    expect400({
      usage: 'domestic',
      requestArea: 'gas',
      email: 'sergio.iacobellis@gmail.com',
      phone: '+393290000000',
      isPrivateApplicant: true,
      streetName: 'via sample',
      streetNumber: '1',
      city: 'Bologna',
      province: 'Emilia Romagna',
      question: 'domanda..',
      firstName: 'nome',
      lastName: 'cognome'
    })
  )
  it('400 - fails without businessName if isPrivateApplicant === false && requestArea === \'gas\'', async () =>
    expect400({
      usage: 'domestic',
      requestArea: 'gas',
      email: 'sergio.iacobellis@gmail.com',
      phone: '+393290000000',
      isPrivateApplicant: false,
      streetName: 'via sample',
      streetNumber: '1',
      city: 'Bologna',
      province: 'Emilia Romagna',
      question: 'domanda..',
      vatNumber: '01079320329'
    })
  )
  it('400 - fails without vatNumber if isPrivateApplicant === false && requestArea === \'gas\'', async () =>
    expect400({
      usage: 'domestic',
      requestArea: 'gas',
      email: 'sergio.iacobellis@gmail.com',
      phone: '+393290000000',
      isPrivateApplicant: false,
      streetName: 'via sample',
      streetNumber: '1',
      city: 'Bologna',
      province: 'Emilia Romagna',
      question: 'domanda..',
      businessName: 'nome azienda'
    })
  )

  it('400 - fails without firstName if isPrivateApplicant === true && requestArea === \'energy\'', async () =>
    expect400({
      usage: 'domestic',
      requestArea: 'energy',
      email: 'sergio.iacobellis@gmail.com',
      phone: '+393290000000',
      isPrivateApplicant: true,
      streetName: 'via sample',
      streetNumber: '1',
      city: 'Bologna',
      province: 'Emilia Romagna',
      question: 'domanda..',
      lastName: 'cognome',
      fiscalCode: 'RNDNDR90R11C573X',
      isEnergyProducer: true
    })
  )
  it('400 - fails without lastName if isPrivateApplicant === true && requestArea === \'energy\'', async () =>
    expect400({
      usage: 'domestic',
      requestArea: 'energy',
      email: 'sergio.iacobellis@gmail.com',
      phone: '+393290000000',
      isPrivateApplicant: true,
      streetName: 'via sample',
      streetNumber: '1',
      city: 'Bologna',
      province: 'Emilia Romagna',
      question: 'domanda..',
      firstName: 'nome',
      fiscalCode: 'RNDNDR90R11C573X',
      isEnergyProducer: true
    })
  )
  it('400 - fails without fiscalCode if isPrivateApplicant === true && requestArea === \'energy\'', async () =>
    expect400({
      usage: 'domestic',
      requestArea: 'energy',
      email: 'sergio.iacobellis@gmail.com',
      phone: '+393290000000',
      isPrivateApplicant: true,
      streetName: 'via sample',
      streetNumber: '1',
      city: 'Bologna',
      province: 'Emilia Romagna',
      question: 'domanda..',
      firstName: 'nome',
      lastName: 'cognome',
      isEnergyProducer: true
    })
  )
  it('400 - fails without isEnergyProducer if isPrivateApplicant === true && requestArea === \'energy\'', async () =>
    expect400({
      usage: 'domestic',
      requestArea: 'energy',
      email: 'sergio.iacobellis@gmail.com',
      phone: '+393290000000',
      isPrivateApplicant: true,
      streetName: 'via sample',
      streetNumber: '1',
      city: 'Bologna',
      province: 'Emilia Romagna',
      question: 'domanda..',
      firstName: 'nome',
      lastName: 'cognome',
      fiscalCode: 'RNDNDR90R11C573X'
    })
  )
  it('400 - fails without businessName if isPrivateApplicant === false && requestArea === \'energy\'', async () =>
    expect400({
      usage: 'domestic',
      requestArea: 'energy',
      email: 'sergio.iacobellis@gmail.com',
      phone: '+393290000000',
      isPrivateApplicant: false,
      streetName: 'via sample',
      streetNumber: '1',
      city: 'Bologna',
      province: 'Emilia Romagna',
      question: 'domanda..',
      vatNumber: '01079320329',
      isEnergyProducer: true
    })
  )
  it('400 - fails without vatNumber if isPrivateApplicant === false && requestArea === \'energy\'', async () =>
    expect400({
      usage: 'domestic',
      requestArea: 'energy',
      email: 'sergio.iacobellis@gmail.com',
      phone: '+393290000000',
      isPrivateApplicant: false,
      streetName: 'via sample',
      streetNumber: '1',
      city: 'Bologna',
      province: 'Emilia Romagna',
      question: 'domanda..',
      businessName: 'nome azienda',
      isEnergyProducer: true
    })
  )
  it('400 - fails without isEnergyProducer if isPrivateApplicant === false && requestArea === \'energy\'', async () =>
    expect400({
      usage: 'domestic',
      requestArea: 'energy',
      email: 'sergio.iacobellis@gmail.com',
      phone: '+393290000000',
      isPrivateApplicant: false,
      streetName: 'via sample',
      streetNumber: '1',
      city: 'Bologna',
      province: 'Emilia Romagna',
      question: 'domanda..',
      businessName: 'nome azienda',
      vatNumber: '01079320329'
    })
  )
})

describe('Create complaint - 400 - fields patterns', () => {
  it('400 - fails with invalid email', async () =>
    expect400({
      usage: 'domestic',
      requestArea: 'gas',
      code: '11825000002505',
      email: 'sergio.iacobellis',
      phone: '+393292225509',
      isPrivateApplicant: true,
      firstName: 'Mario',
      lastName: 'Rossi',
      fiscalCode: 'cblsrg79m08a662b',
      businessName: '',
      vatNumber: '',
      streetName: 'via nomeVia',
      streetNumber: '1',
      city: 'Bologna',
      province: 'Emilia Romagna',
      isEnergyyProducer: false,
      quotationCode: '25123456',
      question: 'Domanda finale...'
    })
  )

  it('400 - fails with invalid phone', async () =>
    expect400({
      usage: 'domestic',
      requestArea: 'gas',
      code: '11825000002505',
      email: 'sergio.iacobellis@gmail.com',
      phone: '+395509abcd',
      isPrivateApplicant: true,
      firstName: 'Mario',
      lastName: 'Rossi',
      fiscalCode: 'cblsrg79m08a662b',
      businessName: '',
      vatNumber: '',
      streetName: 'via nomeVia',
      streetNumber: '1',
      city: 'Bologna',
      province: 'Emilia Romagna',
      isEnergyyProducer: false,
      quotationCode: '25123456',
      question: 'Domanda finale...'
    })
  )

  it('400 - fails with invalid quotationCode', async () =>
    expect400({
      usage: 'domestic',
      requestArea: 'gas',
      code: '11825000002505',
      email: 'sergio.iacobellis@gmail.com',
      phone: '+393292225509',
      isPrivateApplicant: true,
      firstName: 'Mario',
      lastName: 'Rossi',
      fiscalCode: 'cblsrg79m08a662b',
      businessName: '',
      vatNumber: '',
      streetName: 'via nomeVia',
      streetNumber: '1',
      city: 'Bologna',
      province: 'Emilia Romagna',
      isEnergyyProducer: false,
      quotationCode: 'invalidcode',
      question: 'Domanda finale...'
    })
  )

  it('400 - fails with another invalid quotationCode', async () =>
    expect400({
      usage: 'domestic',
      requestArea: 'gas',
      code: '11825000002505',
      email: 'sergio.iacobellis@gmail.com',
      phone: '+393292225509',
      isPrivateApplicant: true,
      firstName: 'Mario',
      lastName: 'Rossi',
      fiscalCode: 'cblsrg79m08a662b',
      businessName: '',
      vatNumber: '',
      streetName: 'via nomeVia',
      streetNumber: '1',
      city: 'Bologna',
      province: 'Emilia Romagna',
      isEnergyyProducer: false,
      quotationCode: '25123456-',
      question: 'Domanda finale...'
    })
  )
})

describe('Create complaint - 200 - happy ending', () => {
  it('complaint - answers 200 with id and requestId', async () => {
    const sut = await helper.setupTestEnvironment()
    const bodyObj = {
      usage: 'domestic',
      requestArea: 'gas',
      code: '11825000002505',
      email: 'sergio.iacobellis@gmail.com',
      phone: '+393292225509',
      isPrivateApplicant: true,
      firstName: 'Mario',
      lastName: 'Rossi',
      fiscalCode: 'cblsrg79m08a662b',
      businessName: '',
      vatNumber: '',
      streetName: 'via nomeVia',
      streetNumber: '1',
      city: 'Bologna',
      province: 'Emilia Romagna',
      quotationCode: '25123456',
      isEnergyyProducer: false,
      question: 'Domanda finale...'
    }

    const response = await helper.doPost(sut, 'actions/complaint', bodyObj, helper.requiredHeaders)

    expect(response.statusCode).toEqual(200)
    expect(response.body).toBeDefined()
    const body = JSON.parse(response.body)
    expect(body.id).toBeDefined()
    expect(body.requestId).toBeDefined()
  })
  it('complaint - gas & isPrivateApplicant scenario - answers 200 with id and requestId', async () => {
    const sut = await helper.setupTestEnvironment()
    const bodyObj = {
      usage: 'domestic',
      requestArea: 'gas',
      email: 'sergio.iacobellis@gmail.com',
      phone: '+393292225509',
      isPrivateApplicant: true,
      firstName: 'Mario',
      lastName: 'Rossi',
      fiscalCode: 'cblsrg79m08a662b',
      streetName: 'via nomeVia',
      streetNumber: '1',
      city: 'Bologna',
      province: 'Emilia Romagna',
      quotationCode: '25123456',
      question: 'Domanda finale...'
    }

    const response = await helper.doPost(sut, 'actions/complaint', bodyObj, helper.requiredHeaders)

    expect(response.statusCode).toEqual(200)
    expect(response.body).toBeDefined()
    const body = JSON.parse(response.body)
    expect(body.id).toBeDefined()
    expect(body.requestId).toBeDefined()
  })
  it('complaint - gas & not isPrivateApplicantscenario - answers 200 with id and requestId', async () => {
    const sut = await helper.setupTestEnvironment()
    const bodyObj = {
      usage: 'domestic',
      requestArea: 'gas',
      email: 'sergio.iacobellis@gmail.com',
      phone: '+393292225509',
      isPrivateApplicant: false,
      businessName: 'nome azienda',
      vatNumber: '01079320329',
      streetName: 'via nomeVia',
      streetNumber: '1',
      city: 'Bologna',
      province: 'Emilia Romagna',
      quotationCode: '25123456',
      isEnergyyProducer: false,
      question: 'Domanda finale...'
    }

    const response = await helper.doPost(sut, 'actions/complaint', bodyObj, helper.requiredHeaders)

    expect(response.statusCode).toEqual(200)
    expect(response.body).toBeDefined()
    const body = JSON.parse(response.body)
    expect(body.id).toBeDefined()
    expect(body.requestId).toBeDefined()
  })
  it('complaint - energy & isPrivateApplicant scenario - answers 200 with id and requestId', async () => {
    const sut = await helper.setupTestEnvironment()
    const bodyObj = {
      usage: 'domestic',
      requestArea: 'energy',
      email: 'sergio.iacobellis@gmail.com',
      phone: '+393292225509',
      isPrivateApplicant: true,
      firstName: 'Mario',
      lastName: 'Rossi',
      fiscalCode: 'cblsrg79m08a662b',
      streetName: 'via nomeVia',
      streetNumber: '1',
      city: 'Bologna',
      province: 'Emilia Romagna',
      quotationCode: '25123456',
      question: 'Domanda finale...',
      isEnergyProducer: true
    }

    const response = await helper.doPost(sut, 'actions/complaint', bodyObj, helper.requiredHeaders)

    expect(response.statusCode).toEqual(200)
    expect(response.body).toBeDefined()
    const body = JSON.parse(response.body)
    expect(body.id).toBeDefined()
    expect(body.requestId).toBeDefined()
  })
  it('complaint - energy & not isPrivateApplicant scenario - answers 200 with id and requestId', async () => {
    const sut = await helper.setupTestEnvironment()
    const bodyObj = {
      usage: 'domestic',
      requestArea: 'energy',
      email: 'sergio.iacobellis@gmail.com',
      phone: '+393292225509',
      isPrivateApplicant: false,
      businessName: 'nome azienda',
      vatNumber: '01079320329',
      streetName: 'via nomeVia',
      streetNumber: '1',
      city: 'Bologna',
      province: 'Emilia Romagna',
      quotationCode: '25123456',
      question: 'Domanda finale...',
      isEnergyProducer: true
    }

    const response = await helper.doPost(sut, 'actions/complaint', bodyObj, helper.requiredHeaders)

    expect(response.statusCode).toEqual(200)
    expect(response.body).toBeDefined()
    const body = JSON.parse(response.body)
    expect(body.id).toBeDefined()
    expect(body.requestId).toBeDefined()
  })
})
