const Sequencer = require('@jest/test-sequencer').default

class CustomSequencer extends Sequencer {
  sort (tests) {
    const copyTests = Array.from(tests)
    return copyTests.sort((testA, testB) => {
      if (testA.path.indexOf('zoho.refreshToken.test.js') > 0) return -1
      if (testB.path.indexOf('zoho.refreshToken.test.js') > 0) return 1
      return 0
    })
  }
}

module.exports = CustomSequencer
