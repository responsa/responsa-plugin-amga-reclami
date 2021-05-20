require('jest-extended')
const sut = require('../../src/models/counterSelfReading')

describe('SelfReading', () => {
  it('Self Reading Request', () => {
    const data = {
      requestArea: '',
      code: '',
      phone: '',
      counterType: '',
      email: '',
      value1: '',
      photo1: '',
      value2: '',
      photo2: '',
      value3: '',
      photo3: ''
    }
    const actual = sut.toSelfReadingRequest(data)
    expect(actual).not.toBeNull()
    expect(actual.data).not.toBeNull()
    expect(actual.data.Stato).toBeDefined()
    expect(actual.data.Tipologia_Utenza).toBeDefined()
    expect(actual.data.Codice_Utenza).toBeDefined()
    expect(actual.data.Cellulare).toBeDefined()
    expect(actual.data.Tipologia_Contatore).toBeDefined()
    expect(actual.data.Email).toBeDefined()
    expect(actual.data.Valore_1).toBeDefined()
    expect(actual.data.Foto_autolettura_1).toBeDefined()
    expect(actual.data.Valore_2).toBeDefined()
    expect(actual.data.Foto_autolettura_2).toBeDefined()
    expect(actual.data.Valore_3).toBeDefined()
    expect(actual.data.Foto_autolettura_3).toBeDefined()
  })
  it('Self Reading Request - Check for correct values', () => {
    const data = {
      requestArea: 'gas',
      counterType: 'electromechanical'
    }

    let actual = sut.toSelfReadingRequest(data)
    expect(actual.data.Tipologia_Utenza).toEqual('GAS')
    expect(actual.data.Tipologia_Contatore).toEqual('ELETTROMECCANICO')
    expect(actual.data.Stato).toEqual('DA VALIDARE')

    data.requestArea = 'energy'
    data.counterType = 'digital'
    actual = sut.toSelfReadingRequest(data)
    expect(actual.data.Tipologia_Utenza).toEqual('ENERGIA')
    expect(actual.data.Tipologia_Contatore).toEqual('DIGITALE')
    expect(actual.data.Stato).toEqual('DA VALIDARE')

    data.requestArea = 'water'
    data.counterType = 'electromechanical'
    actual = sut.toSelfReadingRequest(data)
    expect(actual.data.Tipologia_Utenza).toEqual('ACQUA')
    expect(actual.data.Tipologia_Contatore).toEqual('ELETTROMECCANICO')
    expect(actual.data.Stato).toEqual('DA VALIDARE')
  })
  it('Zoho field Name', () => {
    let actual = sut.toZohoFieldName('photo1')
    expect(actual).not.toBeNull()
    expect(actual).not.toBeNull()
    expect(actual).toEqual('Foto_autolettura_1')

    actual = sut.toZohoFieldName('photo2')
    expect(actual).not.toBeNull()
    expect(actual).not.toBeNull()
    expect(actual).toEqual('Foto_autolettura_2')

    actual = sut.toZohoFieldName('photo3')
    expect(actual).not.toBeNull()
    expect(actual).not.toBeNull()
    expect(actual).toEqual('Foto_autolettura_3')

    const t = () => { sut.toZohoFieldName('notExists') }
    expect(t).toThrow(Error)
    expect(t).toThrow('Field Name not found')
  })
  it('Check for retrieving file extension', () => {
    const actual = sut.getFileExtension('a.b.c.txt')
    expect(actual).not.toBeNull()
    expect(actual).not.toBeNull()
    expect(actual).toEqual('txt')
  })
})
