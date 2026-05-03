const API_BASE = '/api'

export async function register({
  first_name,
  last_name,
  email,
  password,
  password_confirmation,
  referral_code
}) {
  const res = await fetch(`${API_BASE}/register`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      first_name,
      last_name,
      email,
      password,
      password_confirmation,
      referral_code,
      role: 'customer'
    }),
  })

  let data;
  try {
    data = await res.json()
  } catch (err) {
    if (!res.ok) {
      throw new Error('The server is currently waking up from sleep. Please wait 30 seconds and try again!')
    }
    throw new Error('An unexpected error occurred.')
  }

  if (!res.ok) throw new Error(data.errors?.join(', ') || 'Registration failed')
  return data
}

export async function login({ email, password }) {
  const res = await fetch(`${API_BASE}/login`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email, password }),
  })
  let data;
  try {
    data = await res.json()
  } catch (err) {
    if (!res.ok) {
      throw new Error('The server is currently waking up from sleep. Please wait 30 seconds and try again!')
    }
    throw new Error('An unexpected error occurred.')
  }
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

export async function forgotPassword(email) {
  const res = await fetch(`${API_BASE}/password/forgot`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email }),
  })
  let data;
  try {
    data = await res.json()
  } catch (err) {
    throw new Error('Server error sending email. Please make sure your email is verified in Mailgun Sandbox.')
  }
  if (!res.ok) throw new Error(data.error || 'Failed to send reset link')
  return data
}

export async function resetPassword({ email, token, password }) {
  const res = await fetch(`${API_BASE}/password/reset`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email, token, password }),
  })
  const data = await res.json()
  if (!res.ok) throw new Error(data.error || 'Failed to reset password')
  return data
}
