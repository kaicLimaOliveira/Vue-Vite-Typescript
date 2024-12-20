function parseQueryParams(params: Record<string, any>): string {
  let query = '' 

  Object.entries(params).forEach(([key, val]) => {
    if (val) {
      val = val.toString().replaceAll(' ', '+')
      query.includes('=') ? query += '&' : ''
      query += `${key}=${val}`
    }
  })
  
  return query
}

export {
  parseQueryParams
}