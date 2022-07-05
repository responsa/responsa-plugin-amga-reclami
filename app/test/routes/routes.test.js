require('jest-extended')
const helper = require('../helper')

const verify401 = async ($promise) => {
  const response = await $promise
  expect(response.statusCode).toEqual(401)
}

describe('Auth: x-secret', () => {
  it('[POST] /actions/otp fails with 401 without x-secret header', async () => {
    const sut = await helper.setupTestEnvironment()
    await verify401(helper.doPost(sut, 'actions/otp', { phone: '+393930975687' }, helper.requiredHeaders401))
  })

  it('[GET] /actions/complaint fails with 401 without x-secret header', async () => {
    const sut = await helper.setupTestEnvironment()
    await verify401(helper.doGet(sut, '/actions/complaint?id=0&extended=true', helper.requiredHeaders401))
  })

  it('[POST] /actions/complaint fails with 401 without x-secret header', async () => {
    const sut = await helper.setupTestEnvironment()
    await verify401(helper.doPost(sut, '/actions/complaint',
      {
        usage: 'domestic',
        requestArea: 'gas',
        email: 'mail@mail.it',
        phone: '+393292225509',
        isPrivateApplicant: true,
        streetName: 'via euris',
        streetNumber: '10',
        city: 'Roma',
        province: 'Lazio',
        question: 'ask',
        code: '11825000002505',
        firstName: 'gio',
        lastName: 'iaco',
        fiscalCode: 'cblsrg79m08a662b'
      },
      helper.requiredHeaders401))
  })

  it('[GET] /actions/contract/pdr fails with 401 without x-secret header', async () => {
    const sut = await helper.setupTestEnvironment()
    await verify401(helper.doGet(sut, '/actions/pdr?code=11825000002472', helper.requiredHeaders401))
  })

  it('[GET] /actions/contract/pod fails with 401 without x-secret header', async () => {
    const sut = await helper.setupTestEnvironment()
    await verify401(helper.doGet(sut, '/actions/pod?code=IT820E00000247', helper.requiredHeaders401))
  })

  it('[GET] /actions/contract/h2o fails with 401 without x-secret header', async () => {
    const sut = await helper.setupTestEnvironment()
    await verify401(helper.doGet(sut, '/actions/h2o?code=PDACP_223320000', helper.requiredHeaders401))
  })

  it('[GET] /actions/privacy fails with 401 without x-secret header', async () => {
    const sut = await helper.setupTestEnvironment()
    await verify401(helper.doGet(sut, '/actions/privacy?email=sergio.79@libero.it', helper.requiredHeaders401))
  })

  it('[POST] /actions/privacy fails with 401 without x-secret header', async () => {
    const sut = await helper.setupTestEnvironment()
    await verify401(helper.doPost(sut, '/actions/privacy', { email: 'mail@provider.com', accepted: true }, helper.requiredHeaders401))
  })

  it('[GET] /actions/fieldsValidator fails with 401 without x-secret header', async () => {
    const sut = await helper.setupTestEnvironment()
    await verify401(helper.doGet(sut, '/actions/fieldsValidator?fieldName=x&fieldValue=y', helper.requiredHeaders401))
  })
})
