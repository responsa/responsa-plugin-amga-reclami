module.exports = (baseTarget, conditions) => {
  let query = baseTarget
  let quote = ''
  let op = ''
  conditions?.forEach((keyValuePair, index) => {
    if (index === 0) query += '?criteria=('
    quote = (typeof keyValuePair.value === 'string') ? '"' : ''
    op = (index < conditions.length - 1) ? ' && ' : ''
    query += `${keyValuePair.key}==${quote}${keyValuePair.value}${quote}${op}`
  })
  if (conditions?.length > 0) query += ')'
  return query
}
