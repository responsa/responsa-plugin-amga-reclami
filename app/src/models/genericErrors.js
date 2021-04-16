module.exports.generic400 = {
  type: 'object',
  description: 'Bad request',
  $ref: 'Error#'
}

module.exports.generic404 = (description) => {
  return {
    type: 'object',
    description,
    $ref: 'Error#'
  }
}

module.exports.generic500 = {
  type: 'object',
  description: 'Internal error',
  $ref: 'Error#'
}
