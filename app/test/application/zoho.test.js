// eslint-disable-next-line
const helper = require('../helper')
const config = require('../../src/application/config')
const sut = require('../../src/application/zoho')
require('jest-extended')

const validTarget = config.zoho.ticketGetTarget
const invalidTarget = 'wrong_target'

const checkZohoCreatorError = async (message, code, throwingFunc) => {
  expect.assertions(2)
  const expectedError = sut.createZohoCreatorError({ data: { message } }, code)()
  try {
    await throwingFunc()
  } catch (err) {
    expect(err.statusCode).toEqual(expectedError.statusCode)
    expect(err.message).toEqual(expectedError.message)
  }
}

describe('Zoho APIs', () => {
  describe('Zoho - Quick View', () => {
    it('correctly gets data with valid target', async () => {
      const actual = await sut.getData(validTarget)
      expect(actual).toBeDefined()
      expect(actual).toBeArray()
    })

    it('throws 404 ZohoCreatorError with invalid target', async () => {
      await checkZohoCreatorError('Invalid API URL format.', 404, () => sut.getData(invalidTarget))
    })
  })

  describe('Zoho - Detail View', () => {
    it('correctly gets a record by id', async () => {
      const firstRecord = (await sut.tickets.all())[0]
      const actual = await sut.getRecord(config.zoho.ticketGetTarget, firstRecord.ID)
      expect(actual).toBeDefined()
      expect(actual).toBeObject()
      expect(actual).not.toBeEmpty()
    })

    it('throws a 404 ZohoCreatorError if id does not exists', async () => {
      const unexistingId = 1
      await checkZohoCreatorError('No Data Available', 404, () => sut.getRecord(config.zoho.ticketGetTarget, unexistingId))
    })

    it('correctly gets a record by query', async () => {
      const firstRecord = (await sut.getData(config.zoho.ticketGetTarget))[0]
      const conditions = [
        {
          key: 'ID_Richiesta',
          value: +firstRecord.ID_Richiesta
        }
      ]
      const actual =
        await sut.getRecordByQuery(config.zoho.ticketGetTarget, conditions)
      expect(actual).not.toBeNull()
      expect(actual).toBeObject()
      expect(actual.ID_Richiesta).toBeDefined()
      expect(actual.ID_Richiesta).toEqual(firstRecord.ID_Richiesta)
    })

    it('throws a 404 ZohoCreatorError if query finds nothing', async () => {
      const conditions = [
        {
          key: 'ID_Richiesta',
          value: 0
        }
      ]
      await checkZohoCreatorError('No records found for the given criteria.', 404, () => sut.getRecordByQuery(config.zoho.ticketGetTarget, conditions))
    })

    it('throws a 400 ZohoCreatorError if query for unexisting field', async () => {
      const conditions = [
        {
          key: 'Unexisting_Field',
          value: 0
        }
      ]
      await checkZohoCreatorError(
        `Invalid criteria specified - Variable ${conditions[0].key} does not exist in Nuova_Richiesta_Cliente`,
        400,
        () => sut.getRecordByQuery(config.zoho.ticketGetTarget, conditions))
    })
  })
})

const simpleTest = {
  baseTarget: config.zoho.ticketGetTarget,
  conditions: [
    { key: 'field1', value: 'value1' }
  ],
  expected: `${config.zoho.ticketGetTarget}?criteria=(field1=="value1")`
}

const doubleTest = {
  baseTarget: config.zoho.ticketGetTarget,
  conditions: [
    { key: 'field1', value: 'value1' },
    { key: 'field2', value: 'value2' }
  ],
  expected: `${config.zoho.ticketGetTarget}?criteria=(field1=="value1" && field2=="value2")`
}

const integerTest = {
  baseTarget: config.zoho.ticketGetTarget,
  conditions: [
    { key: 'field1', value: 12 },
    { key: 'field2', value: 'value2' }
  ],
  expected: `${config.zoho.ticketGetTarget}?criteria=(field1==12 && field2=="value2")`
}

const booleanTest = {
  baseTarget: config.zoho.ticketGetTarget,
  conditions: [
    { key: 'field1', value: true },
    { key: 'field2', value: 'value2' }
  ],
  expected: `${config.zoho.ticketGetTarget}?criteria=(field1==true && field2=="value2")`
}

const emptyConditionsTest = {
  baseTarget: config.zoho.ticketGetTarget,
  conditions: [],
  expected: `${config.zoho.ticketGetTarget}`
}

const missingConditionsTest = {
  baseTarget: config.zoho.ticketGetTarget,
  expected: `${config.zoho.ticketGetTarget}`
}

const verifyQueryPath = (test) => {
  const actual = sut.queryPath(test.baseTarget, test.conditions)
  expect(actual).toBeDefined()
  expect(actual.length).toBeGreaterThan(0)
  expect(actual).toEqual(test.expected)
}

describe('Zoho Request & Query Build', () => {
  it('builds valid creator request options', () => {
    const actual = sut.creatorReqOptions('method', 'target', { key: 'value' })
    expect(actual).toBeObject()
    expect(actual).toContainKeys(['url', 'baseURL', 'headers', 'method', 'data', 'responseType', 'responseEncoding'])
    expect(actual.url).toEqual(`${config.zoho.dataUrl}/${config.zoho.account}/${config.zoho.project}/target`)
    expect(actual.baseURL).toEqual(config.zoho.dataBaseUrl)
    expect(actual.headers).toBeObject()
    expect(actual.method).toEqual('method')
    expect(actual.data).toBeObject()
    expect(actual.data).toContainKey('key')
    expect(actual.data.key).toEqual('value')
    expect(actual.responseType).toEqual('json')
    expect(actual.responseEncoding).toEqual('utf8')
  })
  it('Zoho - builds correct query with simple test', () => {
    verifyQueryPath(simpleTest)
  })

  it('Zoho - builds correct query with double test', () => {
    verifyQueryPath(doubleTest)
  })

  it('Zoho - builds correct query with integer test', () => {
    verifyQueryPath(integerTest)
  })

  it('Zoho - builds correct query with boolean test', () => {
    verifyQueryPath(booleanTest)
  })

  it('Zoho - builds correct query with empty conditions test', () => {
    verifyQueryPath(emptyConditionsTest)
  })

  it('Zoho - builds correct query with missing conditions test', () => {
    verifyQueryPath(missingConditionsTest)
  })
})
