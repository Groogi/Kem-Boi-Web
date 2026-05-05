export const fetcher = async ([url, token]) => {
  const res = await fetch(url, {
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
