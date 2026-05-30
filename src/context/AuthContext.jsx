import { createContext, useContext, useState, useEffect, useCallback } from 'react'
import axios from '../services/api'
import toast from 'react-hot-toast'

const AuthContext = createContext(null)

export function AuthProvider({ children }) {
  const [user, setUser]       = useState(null)
  const [loading, setLoading] = useState(true)

  // Verify token on mount
  useEffect(() => {
    const token = localStorage.getItem('ks_token')
    if (token) {
      axios.defaults.headers.common['Authorization'] = `Bearer ${token}`
      axios.get('/auth/me')
        .then(r => setUser(r.data.user))
        .catch(() => { localStorage.removeItem('ks_token'); delete axios.defaults.headers.common['Authorization'] })
        .finally(() => setLoading(false))
    } else { setLoading(false) }
  }, [])

  const login = useCallback(async (email, password) => {
    const r = await axios.post('/auth/login', { email, password })
    const { token, user } = r.data
    localStorage.setItem('ks_token', token)
    axios.defaults.headers.common['Authorization'] = `Bearer ${token}`
    setUser(user)
    toast.success(`Welcome back, ${user.name}!`)
    return user
  }, [])

  const logout = useCallback(() => {
    localStorage.removeItem('ks_token')
    delete axios.defaults.headers.common['Authorization']
    setUser(null)
    toast.success('Logged out successfully')
  }, [])

  const isSuperAdmin = user?.role === 'superadmin'
  const isAdmin      = user?.role === 'superadmin' || user?.role === 'coadmin'

  return (
    <AuthContext.Provider value={{ user, loading, login, logout, isSuperAdmin, isAdmin }}>
      {children}
    </AuthContext.Provider>
  )
}

export const useAuth = () => useContext(AuthContext)
