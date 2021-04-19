// eslint-disable-next-line
const helper = require('../../helper')
const config = require('../../../src/application/config')
const sut = require('../../../src/application/zoho/zoho-client')
const sutError = require('../../../src/application/zoho/zoho-error')
require('jest-extended')

const validTarget = config.zoho.complaintGetTarget
const invalidTarget = 'wrong_target'

const checkZohoCreatorError = async (message, code, throwingFunc) => {
  expect.assertions(2)
  const expectedError = sutError({ data: { message } }, code)()
  try {
    await throwingFunc()
  } catch (err) {
    expect(err.statusCode).toEqual(expectedError.statusCode)
    expect(err.message).toEqual(expectedError.message)
  }
}

describe('Zoho APIs', () => {
  describe('Get Records - Quick View', () => {
    it('correctly gets data with valid target', async () => {
      const actual = await sut.getData(validTarget)
      expect(actual).toBeDefined()
      expect(actual).toBeArray()
    })

    it('throws 404 ZohoCreatorError with invalid target', async () => {
      await checkZohoCreatorError('Invalid API URL format.', 404, () => sut.getData(invalidTarget))
    })
  })

  describe('Get Record - Detail View', () => {
    it('correctly gets a record by id', async () => {
      const existingId = '47306000019357175'
      const actual = await sut.getRecord(validTarget, existingId)
      expect(actual).toBeDefined()
      expect(actual).toBeObject()
      expect(actual).not.toBeEmpty()
    })

    it('throws a 404 ZohoCreatorError if id does not exists', async () => {
      const unexistingId = 1
      await checkZohoCreatorError('No Data Available', 404, () => sut.getRecord(validTarget, unexistingId))
    })

    it('correctly gets a record by query', async () => {
      const firstRecord = (await sut.getData(validTarget))[0]
      const conditions = [{ key: 'ID_Richiesta', value: +firstRecord.ID_Richiesta }]
      const actual =
        await sut.getRecordByQuery(validTarget, conditions)
      expect(actual).not.toBeNull()
      expect(actual).toBeObject()
      expect(actual.ID_Richiesta).toBeDefined()
      expect(actual.ID_Richiesta).toEqual(firstRecord.ID_Richiesta)
    })

    it('throws a 404 ZohoCreatorError if query finds nothing', async () => {
      const conditions = [{ key: 'ID_Richiesta', value: 0 }]
      await checkZohoCreatorError('No records found for the given criteria.', 404, () => sut.getRecordByQuery(validTarget, conditions))
    })

    it('throws a 400 ZohoCreatorError if query for unexisting field', async () => {
      const conditions = [{ key: 'Unexisting_Field', value: 0 }]
      await checkZohoCreatorError(
        `Invalid criteria specified - Variable ${conditions[0].key} does not exist in Nuova_Richiesta_Cliente`,
        400,
        () => sut.getRecordByQuery(validTarget, conditions))
    })
  })
})
