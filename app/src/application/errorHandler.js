module.exports = (error, request, reply) => {
  if (request.url.indexOf('/?q') !== -1) return reply.sendFile('root400.html')

  if (error instanceof Error) {
    return reply.type('application/json').send({
      statusCode: reply.statusCode,
      error: error.message,
      message: error.message,
      stackTrace: error.stack
    })
  } else if (typeof error === 'function') {
    const errorContent = error()
    return reply.code(errorContent.statusCode).type('application/json').send({
      statusCode: errorContent.statusCode,
      error: errorContent.code,
      message: errorContent.message
    })
  } else if (typeof error === 'string') {
    return reply.code(520).type('application/json').send({
      statusCode: 520,
      error: error,
      message: error
    })
  } else {
    return reply.code(520).type('application/json').send({
      statusCode: 520,
      error: 'Unknown',
      message: `Unknown error. Error type is ${typeof error}`
    })
  }
}
