const sut = require('../../src/models/complaint')

const openComplaint = {
  Risposta_Oggetto: '',
  Assegnatario_STC: 'Assegnatario',
  Assegnato_A: 'STC',
  Stato: 'DA VALIDARE',
  Stato_Richiesta_Cliente: 'PRESA IN CARICO',
  Assegnatario_ALTRO: '',
  Risposta_Testo: '',
  Email_Inserimento: 'riccardo.demarco@euris.it'
}

const openStcComplaint = {
  Risposta_Oggetto: '',
  Assegnatario_STC: 'Assegnatario STC',
  Assegnato_A: 'STC',
  Stato: 'DA VALIDARE',
  STC: true,
  Stato_Richiesta_Cliente: 'PRESA IN CARICO',
  Assegnatario_ALTRO: 'Assegnatario ALTRO',
  Risposta_Testo: '',
  Email_Inserimento: 'riccardo.demarco@euris.it'
}

const closedComplaint = {
  Risposta_Oggetto: '',
  Assegnatario_STC: 'Assegnatario STC',
  Assegnato_A: '',
  Stato: 'CHIUSO',
  STC: false,
  Stato_Richiesta_Cliente: 'STATO CLIENTE',
  Assegnatario_ALTRO: 'Assegnatario ALTRO',
  Risposta_Testo: 'Testo',
  Email_Inserimento: 'riccardo.demarco@euris.it'
}

const closedStcComplaint = {
  Risposta_Oggetto: '',
  Assegnatario_STC: 'Assegnatario STC',
  Assegnato_A: 'STC',
  Stato: 'CHIUSO',
  STC: true,
  Stato_Richiesta_Cliente: 'STATO CLIENTE',
  Assegnatario_ALTRO: 'Assegnatario ALTRO',
  Risposta_Testo: '',
  Email_Inserimento: 'riccardo.demarco@euris.it'
}

const checkComplaintInfos = (outputComplaint, expectedComplaint) => {
  expect(outputComplaint.status).toEqual(expectedComplaint.status)
  expect(outputComplaint.email).toEqual(expectedComplaint.email)
  expect(outputComplaint.subject).toEqual(expectedComplaint.subject)
  expect(outputComplaint.content).toEqual(expectedComplaint.content)
  expect(outputComplaint.department).toEqual(expectedComplaint.department)
  expect(outputComplaint.assignee).toEqual(expectedComplaint.assignee)
}

describe('Complaint - Info building', () => {
  it('builds open complaint infos in basic format', () => {
    const expected = {
      status: openComplaint.Stato_Richiesta_Cliente,
      email: openComplaint.Email_Inserimento
    }
    const actual = sut.infos(openComplaint, false)
    checkComplaintInfos(actual, expected)
  })

  it('builds open complaint infos in extended format', () => {
    const expected = {
      status: openComplaint.Stato,
      email: openComplaint.Email_Inserimento,
      department: openComplaint.Assegnato_A,
      assignee: openComplaint.Assegnatario_ALTRO
    }
    const actual = sut.infos(openComplaint, true)
    checkComplaintInfos(actual, expected)
  })
  it('builds open stc complaint infos in basic format', () => {
    const expected = {
      status: openStcComplaint.Stato_Richiesta_Cliente,
      email: openStcComplaint.Email_Inserimento
    }
    const actual = sut.infos(openStcComplaint, false)
    checkComplaintInfos(actual, expected)
  })

  it('builds open stc complaint infos in extended format', () => {
    const expected = {
      status: openStcComplaint.Stato,
      email: openStcComplaint.Email_Inserimento,
      department: openStcComplaint.Assegnato_A,
      assignee: openStcComplaint.Assegnatario_STC
    }
    const actual = sut.infos(openStcComplaint, true)
    checkComplaintInfos(actual, expected)
  })

  it('builds closed complaint infos in basic format', () => {
    const expected = {
      status: closedComplaint.Stato_Richiesta_Cliente,
      email: closedComplaint.Email_Inserimento,
      subject: closedComplaint.Risposta_Oggetto,
      content: closedComplaint.Risposta_Testo
    }
    const actual = sut.infos(closedComplaint, false)
    checkComplaintInfos(actual, expected)
  })

  it('builds closed complaint infos in extended format', () => {
    const expected = {
      status: closedComplaint.Stato,
      department: closedComplaint.Assegnato_A,
      assignee: closedComplaint.Assegnatario_ALTRO,
      email: closedComplaint.Email_Inserimento,
      subject: closedComplaint.Risposta_Oggetto,
      content: closedComplaint.Risposta_Testo
    }
    const actual = sut.infos(closedComplaint, true)
    checkComplaintInfos(actual, expected)
  })

  it('builds closed stc complaint infos in basic format', () => {
    const expected = {
      status: closedStcComplaint.Stato_Richiesta_Cliente,
      email: closedStcComplaint.Email_Inserimento,
      subject: closedStcComplaint.Risposta_Oggetto,
      content: closedStcComplaint.Risposta_Testo
    }
    const actual = sut.infos(closedStcComplaint, false)
    checkComplaintInfos(actual, expected)
  })

  it('builds closed stc complaint infos in extended format', () => {
    const expected = {
      status: closedStcComplaint.Stato,
      department: closedStcComplaint.Assegnato_A,
      assignee: closedStcComplaint.Assegnatario_STC,
      email: closedStcComplaint.Email_Inserimento,
      subject: closedStcComplaint.Risposta_Oggetto,
      content: closedStcComplaint.Risposta_Testo
    }
    const actual = sut.infos(closedStcComplaint, true)
    checkComplaintInfos(actual, expected)
  })
})
