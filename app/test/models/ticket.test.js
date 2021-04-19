const sut = require('../../src/models/ticket')

const openTicket = {
  Risposta_Oggetto: '',
  Assegnatario_STC: 'Assegnatario',
  Assegnato_A: 'STC',
  Stato: 'DA VALIDARE',
  Stato_Richiesta_Cliente: 'PRESA IN CARICO',
  Assegnatario_ALTRO: '',
  Risposta_Testo: '',
  Email_Inserimento: 'riccardo.demarco@euris.it'
}

const openStcTicket = {
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

const closedTicket = {
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

const closedStcTicket = {
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

const checkTicketInfos = (outputTicket, expectedTicket) => {
  expect(outputTicket.status).toEqual(expectedTicket.status)
  expect(outputTicket.email).toEqual(expectedTicket.email)
  expect(outputTicket.subject).toEqual(expectedTicket.subject)
  expect(outputTicket.content).toEqual(expectedTicket.content)
  expect(outputTicket.department).toEqual(expectedTicket.department)
  expect(outputTicket.assignee).toEqual(expectedTicket.assignee)
}

describe('Ticket - Info building', () => {
  it('builds open ticket infos in basic format', () => {
    const expected = {
      status: openTicket.Stato_Richiesta_Cliente
    }
    const actual = sut.infos(openTicket, false)
    checkTicketInfos(actual, expected)
  })

  it('builds open ticket infos in extended format', () => {
    const expected = {
      status: openTicket.Stato,
      department: openTicket.Assegnato_A,
      assignee: openTicket.Assegnatario_ALTRO
    }
    const actual = sut.infos(openTicket, true)
    checkTicketInfos(actual, expected)
  })
  it('builds open stc ticket infos in basic format', () => {
    const expected = {
      status: openStcTicket.Stato_Richiesta_Cliente
    }
    const actual = sut.infos(openStcTicket, false)
    checkTicketInfos(actual, expected)
  })

  it('builds open stc ticket infos in extended format', () => {
    const expected = {
      status: openStcTicket.Stato,
      department: openStcTicket.Assegnato_A,
      assignee: openStcTicket.Assegnatario_STC
    }
    const actual = sut.infos(openStcTicket, true)
    checkTicketInfos(actual, expected)
  })

  it('builds closed ticket infos in basic format', () => {
    const expected = {
      status: closedTicket.Stato_Richiesta_Cliente,
      email: closedTicket.Email_Inserimento,
      subject: closedTicket.Risposta_Oggetto,
      content: closedTicket.Risposta_Testo
    }
    const actual = sut.infos(closedTicket, false)
    checkTicketInfos(actual, expected)
  })

  it('builds closed ticket infos in extended format', () => {
    const expected = {
      status: closedTicket.Stato,
      department: closedTicket.Assegnato_A,
      assignee: closedTicket.Assegnatario_ALTRO,
      email: closedTicket.Email_Inserimento,
      subject: closedTicket.Risposta_Oggetto,
      content: closedTicket.Risposta_Testo
    }
    const actual = sut.infos(closedTicket, true)
    checkTicketInfos(actual, expected)
  })

  it('builds closed stc ticket infos in basic format', () => {
    const expected = {
      status: closedStcTicket.Stato_Richiesta_Cliente,
      email: closedStcTicket.Email_Inserimento,
      subject: closedStcTicket.Risposta_Oggetto,
      content: closedStcTicket.Risposta_Testo
    }
    const actual = sut.infos(closedStcTicket, false)
    checkTicketInfos(actual, expected)
  })

  it('builds closed stc ticket infos in extended format', () => {
    const expected = {
      status: closedStcTicket.Stato,
      department: closedStcTicket.Assegnato_A,
      assignee: closedStcTicket.Assegnatario_STC,
      email: closedStcTicket.Email_Inserimento,
      subject: closedStcTicket.Risposta_Oggetto,
      content: closedStcTicket.Risposta_Testo
    }
    const actual = sut.infos(closedStcTicket, true)
    checkTicketInfos(actual, expected)
  })
})
