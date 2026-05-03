import { createContext, useContext, useState, useCallback } from 'react'
import { login as apiLogin, register as apiRegister, googleLogin as apiGoogleLogin } from '../api/auth'

const AuthContext = createContext(null)

export function AuthProvider({ children }) {
  const [token, setToken] = useState(() => localStorage.getItem('token'))
  const [user, setUser] = useState(() => {
    const u = localStorage.getItem('user')
    return u ? JSON.parse(u) : null
  })

  const persist = (data) => {
    localStorage.setItem('token', data.token)
    const userData = {
      email: data.email,
      first_name: data.first_name,
      last_name: data.last_name,
      account_id: data.account_id,
      role: data.role,
      points_balance: data.points_balance,
      exp: data.exp,
    }
    localStorage.setItem('user', JSON.stringify(userData))
    setToken(data.token)
    setUser(userData)
  }

  const login = useCallback(async (credentials) => {
    const data = await apiLogin(credentials)
    persist(data)
    return data
  }, [])

  const register = useCallback(async (credentials) => {
    const data = await apiRegister(credentials)
    persist(data)
    return data
  }, [])

  const googleAuth = useCallback(async (token) => {
    const data = await apiGoogleLogin(token)
    persist(data)
    return data
  }, [])

  const logout = useCallback(() => {
    localStorage.removeItem('token')
    localStorage.removeItem('user')
    setToken(null)
    setUser(null)
  }, [])

  const updateUser = useCallback(
    (newData) => {
      setUser((curr) => {
        const updated = { ...curr, ...newData }
        localStorage.setItem('user', JSON.stringify(updated))
        return updated
      })
    },
    [setUser]
  )

  const refreshProfile = useCallback(async () => {
    if (!token) return
    try {
      const res = await fetch('/api/profile', {
        headers: { Authorization: `Bearer ${token}` },
      })
      if (res.ok) {
        const data = await res.json()
        updateUser(data)
      }
    } catch (err) {
      console.error('Failed to refresh profile', err)
    }
  }, [token, updateUser])

  return (
    <AuthContext.Provider
      value={{
        token,
        user,
        isAuthenticated: !!token,
        login,
        register,
        googleAuth,
        logout,
        updateUser,
        refreshProfile,
      }}
    >
      {children}
    </AuthContext.Provider>
  )
}

// eslint-disable-next-line react-refresh/only-export-components
export function useAuth() {
  return useContext(AuthContext)
}
