require('jest-extended')
const helper = require('../../../helper')
const responses = require('./responses')

describe('Self Reading - POST', () => {
  it('Self Reading  - answers correctly', async () => {
    helper.checkResponses('/actions/selfReading', responses, 'post')
  })
  it('Self Reading  - Create row [GAS] with one image', async () => {
    const sut = await helper.setupTestEnvironment()
    const response = await helper.doPost(
      sut,
      'actions/selfReading',
      {
        email: 'euris@test.com',
        requestArea: 'gas',
        code: '11825000004052',
        phone: '+393290000000',
        counterType: 'electromechanical',
        value1: '100000',
        photo1: 'https://www.euristechnology.it/wp-content/uploads/2020/04/4.png'
      },
      helper.requiredHeaders
    )
    expect(response.statusCode).toEqual(200)
    const body = JSON.parse(response.body)
    expect(body.id).toBeDefined()
  })
  it('Self Reading  - Create row [ENERGY] with three images', async () => {
    const sut = await helper.setupTestEnvironment()
    const response = await helper.doPost(
      sut,
      'actions/selfReading',
      {
        email: 'euris@test.com',
        requestArea: 'energy',
        code: 'IT003E03009532',
        phone: '+393290000000',
        counterType: 'digital',
        value1: '100001',
        photo1: 'https://www.euristechnology.it/wp-content/uploads/2020/04/4.png',
        value2: '100002',
        photo2: 'https://media-exp1.licdn.com/dms/image/C4D0BAQHnwxtRpezn6g/company-logo_200_200/0/1519856365346?e=2159024400&v=beta&t=7LGYVkIjpx-axP_E1-u3GKZ2Xsfln8OJlMHiI4i01FA',
        value3: '100003',
        photo3: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQh9vcTdkkclDgQWuy9bACVJ90kIc9RDBG8MmqfGYwwf_1WkZBg2ev7iMQwzOH06HkMLR4&usqp=CAU'
      },
      helper.requiredHeaders
    )
    expect(response.statusCode).toEqual(200)
    const body = JSON.parse(response.body)
    expect(body.id).toBeDefined()
  })
})
