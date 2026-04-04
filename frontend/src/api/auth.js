const API_BASE = '/api';

export async function register({ name, email, password, password_confirmation }) {
  const res = await fetch(`${API_BASE}/register`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ name, email, password, password_confirmation, role: 'customer' }),
  });
  const data = await res.json();
  if (!res.ok) throw new Error(data.errors?.join(', ') || 'Registration failed');
  return data;
}

export async function login({ email, password }) {
  const res = await fetch(`${API_BASE}/login`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email, password }),
  });
  const data = await res.json();
  if (!res.ok) throw new Error(data.error || 'Login failed');
  return data;
}
