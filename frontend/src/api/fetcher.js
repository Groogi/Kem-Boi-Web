import { API_BASE } from './config'

export const fetcher = async ([url, token]) => {
  let processedUrl = url
  if (API_BASE.startsWith('http') && url.startsWith('/api')) {
    processedUrl = url.replace(/^\/api/, '')
  }
  const fullUrl = processedUrl.startsWith('http') ? processedUrl : `${API_BASE}${processedUrl.startsWith('/') ? processedUrl : `/${processedUrl}`}`
  const res = await fetch(fullUrl, {
    headers: {
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json',
    },
  })
  if (!res.ok) {
    const error = new Error('An error occurred while fetching the data.')
    error.info = await res.json()
    error.status = res.status
    throw error
  }
  return res.json()
}
