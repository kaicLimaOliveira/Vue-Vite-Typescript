function dateFormat(date: Date, language='pt-BR') {
  return new Intl.DateTimeFormat(language).format(date)
}

function currencyMask(value: number, currency='BRL'): string {
  return new Intl.NumberFormat('pt-BR', {
    style: 'currency',
    currency
  }).format(value)
}


function dateHistoryMask(date: string | Date, showTime: boolean = true) {
  date = new Date(date)
  const time = showTime ? `, ${timeMask(date)}` : ''

  const today = new Date()
  const yesterday = new Date()

  yesterday.setDate(yesterday.getDate() - 1)

  if (date.toLocaleDateString() == today.toLocaleDateString())
    return `Hoje${time}`

  else if (date.toLocaleDateString() == yesterday.toLocaleDateString())
    return `Ontem${time}`

  return dateMask(date, showTime)
}

function timeMask(date: Date, showSeconds = false) {
  if (showSeconds)
    return new Date(date).toLocaleTimeString()

  return new Date(date).toLocaleTimeString().slice(0, 5)
}

function dateMask(date: Date | string, showTime = true, showSeconds = false) {
  if (!date) return ''
  if (showTime && showSeconds)
    return new Date(date).toLocaleString().replace(', ', ' - ')
  else if (showTime)
    return new Date(date).toLocaleString().slice(0, -3).replace(', ', ' - ')

  return new Date(date).toLocaleDateString()
}

function phraseDotsMask(data: string, limit = 38) {
  data = data.toString()

  if (data.length >= limit)
    return data.slice(0, limit) + '...'

  return data
}

export {
  dateFormat,
  currencyMask,
  dateHistoryMask,
  phraseDotsMask
}