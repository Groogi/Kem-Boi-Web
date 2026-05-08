import { API_BASE } from './config'

export const fetcher = async ([url, token]) => {
  const fullUrl = url.startsWith('http') ? url : `${API_BASE}${url.startsWith('/') ? url : `/${url}`}`
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
