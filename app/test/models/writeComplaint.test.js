require('jest-extended')
const sut = require('../../src/models/writeComplaint')

describe('Write complaint - Test mappers', () => {
  it('Maps area', () => {
    let actual = sut.mappers.requestArea('gas')
    expect(actual).toEqual(sut.GAS_AREA_TYPE)

    actual = sut.mappers.requestArea('energy')
    expect(actual).toEqual(sut.ENERGY_AREA_TYPE)

    actual = sut.mappers.requestArea('anything else')
    expect(actual).toEqual(null)
  })

  it('Maps usage', () => {
    let actual = sut.mappers.usage('domestic')
    expect(actual).toEqual(sut.DOMESTIC_USAGE_TYPE)

    actual = sut.mappers.usage('not_domestic')
    expect(actual).toEqual(sut.NOT_DOMESTIC_USAGE_TYPE)

    actual = sut.mappers.usage('anything else')
    expect(actual).toEqual(null)
  })

  it('Maps isPrivateApplicant', () => {
    let actual = sut.mappers.isPrivateApplicant(true)
    expect(actual).toEqual(sut.PRIVATE_APPLICANT)

    actual = sut.mappers.isPrivateApplicant(false)
    expect(actual).toEqual(sut.COMPANY_APPLICANT)
  })

  it('Maps isEnergyProducer', () => {
    let actual = sut.mappers.isEnergyProducer(true)
    expect(actual).toEqual(sut.IS_ENERGY_PRODUCER)

    actual = sut.mappers.isEnergyProducer(false)
    expect(actual).toEqual(sut.IS_NOT_ENERGY_PRODUCER)
  })
})

describe('Write complaint - Test obj mapping function', () => {
  it('Correctly maps basic complaint data', () => {
    const actual = sut.convertToComplaintBody(sampleData.basic)

    testBasic(actual)
    expect(actual.data.Richiesta_Testo).toEqual('Domanda finale...')

    // not defined properties
    expect(actual.Nome_Richiedente).not.toBeDefined()
    expect(actual.Codice_Fiscale).not.toBeDefined()
    expect(actual.Ragione_Sociale_Richiedente).not.toBeDefined()
    expect(actual.Partita_Iva).not.toBeDefined()
    expect(actual.Cliente_Produttore_Energia).not.toBeDefined()
  })

  it('Correctly maps all complaint data without quotation code', () => {
    const actual = sut.convertToComplaintBody(sampleData.allButQuotationCode)

    testBasic(actual)
    testExtra(actual)
    expect(actual.data.Richiesta_Testo).toEqual('Domanda finale...')
  })

  it('Correctly maps all complaint data with quotation code', () => {
    const actual = sut.convertToComplaintBody(sampleData.all)

    testBasic(actual)
    testExtra(actual)
    expect(actual.data.Richiesta_Testo).toEqual('Domanda finale... --- Numero preventivo: 12345')
  })
})

const testBasic = (actual) => {
  const currentDate = new Date()
  const currentFormattedDate = sut.formatDate(new Date())
  const elapsedDate = sut.formatDate(sut.addDays(currentDate, sut.elapsedDays))

  expect(actual).not.toBeNull()
  expect(actual.data).not.toBeNull()
  expect(actual.data.Tipo_USO).toEqual(sut.DOMESTIC_USAGE_TYPE)
  expect(actual.data.Servizio).toEqual(sut.GAS_AREA_TYPE)
  expect(actual.data.Telefono_Richiedente).toEqual('+393292225509')
  expect(actual.data.Tipologia_Richiedente).toEqual('PERSONA FISICA')
  expect(actual.data.Indirizzo_Fornitura.address_line_12).toEqual('via nomeVia, 1')
  expect(actual.data.Indirizzo_Fornitura.district_city2).toEqual('Bologna')
  expect(actual.data.Indirizzo_Fornitura.state_province2).toEqual('Emilia Romagna')
  expect(actual.data.Tipologia_Risposta).toEqual(sut.RESPONSE_TYPE)
  expect(actual.data.Richiesta_Inserita_Cliente).toEqual(sut.CLIENT_REQUEST_INSERT)
  expect(actual.data.Data_Richiesta).toEqual(currentFormattedDate)
  expect(actual.data.Tipo_Richiesta).toEqual(sut.REQUEST_TYPE)
  expect(actual.data.Stato).toEqual(sut.STATE)
  expect(actual.data.Tipo_USO).toEqual(sut.DOMESTIC_USAGE_TYPE)
  expect(actual.data.Richiesta_Oggetto).toEqual(sut.REQUEST_SUBJECT)
  expect(actual.data.Stato_Richiesta_Cliente).toEqual(sut.REQUEST_CLIENT_STATUS)
  expect(actual.data.Assegnato_A).toEqual(sut.ASSIGNED_TO)
  expect(actual.data.Data_Risposta_Entro).toEqual(elapsedDate)

  expect(actual.result).toBeDefined()
  expect(actual.result.fields).toBeDefined()
  expect(actual.result.fields).toHaveLength(1)
  expect(actual.result.fields[0]).toEqual(sut.RESPONSE_COMPLAINT_ID)
}

const testExtra = (actual) => {
  expect(actual.data.Nome_Richiedente.first_name).toEqual('nome')
  expect(actual.data.Nome_Richiedente.last_name).toEqual('cognome')
  expect(actual.data.Nome_Richiedente.display_value).toEqual('nome cognome')
  expect(actual.data.Cliente_Produttore_Energia).toEqual(sut.IS_ENERGY_PRODUCER)
  expect(actual.data.Ragione_Sociale_Richiedente).toEqual('nome azienda')
  expect(actual.data.Partita_Iva).toEqual('partita iva')
}

const sampleData = {
  basic: {
    usage: 'domestic',
    requestArea: 'gas',
    email: 'sergio.iacobellis@gmail.com',
    phone: '+393292225509',
    isPrivateApplicant: true,
    streetName: 'via nomeVia',
    streetNumber: '1',
    city: 'Bologna',
    province: 'Emilia Romagna',
    question: 'Domanda finale...'
  },
  allButQuotationCode: {
    usage: 'domestic',
    requestArea: 'gas',
    email: 'sergio.iacobellis@gmail.com',
    phone: '+393292225509',
    firstName: 'nome',
    lastName: 'cognome',
    fiscalCode: 'codice fiscale',
    isPrivateApplicant: true,
    businessName: 'nome azienda',
    vatNumber: 'partita iva',
    isEnergyProducer: true,
    streetName: 'via nomeVia',
    streetNumber: '1',
    city: 'Bologna',
    province: 'Emilia Romagna',
    question: 'Domanda finale...'
  },
  all: {
    usage: 'domestic',
    requestArea: 'gas',
    email: 'sergio.iacobellis@gmail.com',
    phone: '+393292225509',
    firstName: 'nome',
    lastName: 'cognome',
    fiscalCode: 'codice fiscale',
    isPrivateApplicant: true,
    businessName: 'nome azienda',
    vatNumber: 'partita iva',
    isEnergyProducer: true,
    streetName: 'via nomeVia',
    streetNumber: '1',
    city: 'Bologna',
    province: 'Emilia Romagna',
    quotationCode: '12345',
    question: 'Domanda finale...'
  }
}
