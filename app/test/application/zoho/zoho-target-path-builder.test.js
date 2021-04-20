// eslint-disable-next-line
const helper = require('../../helper')
const config = require('../../../src/application/config')
const sut = require('../../../src/application/zoho/zoho-target-path-builder')
require('jest-extended')

describe('Zoho Target Path', () => {
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

const simpleTest = {
  baseTarget: config.zoho.complaintGetTarget,
  conditions: [
    { key: 'field1', value: 'value1' }
  ],
  expected: `${config.zoho.complaintGetTarget}?criteria=(field1=="value1")`
}

const doubleTest = {
  baseTarget: config.zoho.complaintGetTarget,
  conditions: [
    { key: 'field1', value: 'value1' },
    { key: 'field2', value: 'value2' }
  ],
  expected: `${config.zoho.complaintGetTarget}?criteria=(field1=="value1" && field2=="value2")`
}

const integerTest = {
  baseTarget: config.zoho.complaintGetTarget,
  conditions: [
    { key: 'field1', value: 12 },
    { key: 'field2', value: 'value2' }
  ],
  expected: `${config.zoho.complaintGetTarget}?criteria=(field1==12 && field2=="value2")`
}

const booleanTest = {
  baseTarget: config.zoho.complaintGetTarget,
  conditions: [
    { key: 'field1', value: true },
    { key: 'field2', value: 'value2' }
  ],
  expected: `${config.zoho.complaintGetTarget}?criteria=(field1==true && field2=="value2")`
}

const emptyConditionsTest = {
  baseTarget: config.zoho.complaintGetTarget,
  conditions: [],
  expected: `${config.zoho.complaintGetTarget}`
}

const missingConditionsTest = {
  baseTarget: config.zoho.complaintGetTarget,
  expected: `${config.zoho.complaintGetTarget}`
}

const verifyQueryPath = (test) => {
  const actual = sut(test.baseTarget, test.conditions)
  expect(actual).toBeDefined()
  expect(actual.length).toBeGreaterThan(0)
  expect(actual).toEqual(test.expected)
}
