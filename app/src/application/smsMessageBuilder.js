module.exports.smsMsgITA = 'è il tuo codice verifica del chatbot richiesta informazioni AcegasApsAmga.'

module.exports.buildSmsMessage = (code) => {
  return `${code} ${this.smsMsgITA}`
}
