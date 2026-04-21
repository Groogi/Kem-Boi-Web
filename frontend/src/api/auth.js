const API_BASE = '/api'

export async function register({ name, email, password, password_confirmation, referral_code }) {
  const res = await fetch(`${API_BASE}/register`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ name, email, password, password_confirmation, referral_code, role: 'customer' }),
  })
  const data = await res.json()
  if (!res.ok) throw new Error(data.errors?.join(', ') || 'Registration failed')
  return data
}

export async function login({ email, password }) {
  const res = await fetch(`${API_BASE}/login`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email, password }),
  })
  const data = await res.json()
  if (!res.ok) throw new Error(data.error || 'Login failed')
  return data
}

export async function updateProfile(userData, token) {
  const res = await fetch(`${API_BASE}/profile`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(userData),
  })
  const data = await res.json()
  if (!res.ok) throw new Error(data.errors?.join(', ') || 'Update failed')
  return data
}
