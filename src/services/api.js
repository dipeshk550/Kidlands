import axios from 'axios'

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL || '/api',
  withCredentials: true,
  timeout: 15000,
})

// Attach token on every request
api.interceptors.request.use(config => {
  const token = localStorage.getItem('ks_token')
  if (token) config.headers.Authorization = `Bearer ${token}`
  return config
})

// Handle 401 globally
api.interceptors.response.use(
  res => res.data ?? res,
  err => {
    if (err.response?.status === 401) {
      localStorage.removeItem('ks_token')
      if (!window.location.pathname.startsWith('/admin/login')) {
        window.location.href = '/admin/login'
      }
    }
    return Promise.reject(err.response?.data?.message
      ? new Error(err.response.data.message)
      : err)
  }
)

export default api
