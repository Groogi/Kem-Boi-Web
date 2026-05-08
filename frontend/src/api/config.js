let rawBase = import.meta.env.VITE_API_URL || '/api'

// Safety: Remove trailing slash if present
rawBase = rawBase.replace(/\/$/, '')

// If it's a full URL, we strip the /api prefix because the backend doesn't use it
export const API_BASE = rawBase.startsWith('http') ? rawBase.replace(/\/api$/, '') : '/api'
