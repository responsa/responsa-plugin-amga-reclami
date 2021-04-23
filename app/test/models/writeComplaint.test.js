require('jest-extended')
const sut = require('../../src/models/writeComplaint')

const inputWriteComplaint = {
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
  quotationCode: '12345',
  isEnergyProducer: false,
  question: 'Domanda finale...'
}

describe('Write complaint - Test obj mapping function', () => {
  it('Correctly maps input object to zoho format', () => {
    const actual = sut.convertToComplaintBody(inputWriteComplaint)
    const currentDate = new Date()
    const currentFormattedDate = sut.formatDate(new Date())

    expect(actual).not.toBeNull()
    expect(actual.data).not.toBeNull()
    expect(actual.data.Tipo_USO).toEqual(sut.DOMESTIC_USAGE_TYPE)
    expect(actual.data.Servizio).toEqual(sut.GAS_AREA_TYPE)
    expect(actual.data.Nome_Richiedente.first_name).toEqual(`${inputWriteComplaint.firstName}`)
    expect(actual.data.Nome_Richiedente.last_name).toEqual(`${inputWriteComplaint.lastName}`)
    expect(actual.data.Nome_Richiedente.display_value).toEqual(`${inputWriteComplaint.firstName} ${inputWriteComplaint.lastName}`)
    expect(actual.data.Telefono_Richiedente).toEqual(`${inputWriteComplaint.phone}`)
    expect(actual.data.Tipologia_Richiedente).toEqual(sut.PRIVATE_APPLICANT)
    expect(actual.data.Indirizzo_Fornitura.address_line_12).toEqual(`${inputWriteComplaint.streetName}, ${inputWriteComplaint.streetNumber}`)
    expect(actual.data.Indirizzo_Fornitura.district_city2).toEqual(`${inputWriteComplaint.city}`)
    expect(actual.data.Indirizzo_Fornitura.state_province2).toEqual(`${inputWriteComplaint.province}`)
    expect(actual.data.Tipologia_Risposta).toEqual(sut.RESPONSE_TYPE)
    expect(actual.data.Richiesta_Inserita_Cliente).toEqual(sut.CLIENT_REQUEST_INSERT)
    expect(actual.data.Codice_Fiscale).toEqual(`${inputWriteComplaint.fiscalCode}`)
    expect(actual.data.Data_Richiesta).toEqual(currentFormattedDate)
    expect(actual.data.Tipo_Richiesta).toEqual(sut.REQUEST_TYPE)
    expect(actual.data.Cliente_Produttore_Energia).toEqual(sut.IS_NOT_ENERGY_PRODUCER)
    expect(actual.data.Stato).toEqual(sut.STATE)
    expect(actual.data.Tipo_USO).toEqual(sut.DOMESTIC_USAGE_TYPE)
    expect(actual.data.Richiesta_Oggetto).toEqual(sut.REQUEST_SUBJECT)
    expect(actual.data.Stato_Richiesta_Cliente).toEqual(sut.REQUEST_CLIENT_STATUS)
    expect(actual.data.Assegnato_A).toEqual(sut.ASSIGNED_TO)
    expect(actual.data.Richiesta_Testo).toEqual(`${inputWriteComplaint.question}${sut.QUOTATION_CODE}${inputWriteComplaint.quotationCode}`)

    const elapsedDate = sut.formatDate(sut.addDays(currentDate, sut.elapsedDays))
    expect(actual.data.Data_Risposta_Entro).toEqual(elapsedDate)
  })
})
