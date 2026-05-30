import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useForm } from 'react-hook-form'
import { motion } from 'framer-motion'
import { FaEye, FaEyeSlash, FaGraduationCap, FaLock, FaEnvelope } from 'react-icons/fa'
import { useAuth } from '../../context/AuthContext'

export default function AdminLogin() {
  const [showPw, setShowPw] = useState(false)
  const [loading, setLoading] = useState(false)
  const { login } = useAuth()
  const navigate = useNavigate()
  const { register, handleSubmit, setError, formState: { errors } } = useForm()

  const onSubmit = async (data) => {
    setLoading(true)
    try {
      const user = await login(data.email, data.password)
      navigate('/admin')
    } catch (e) {
      setError('root', { message: e.message || 'Invalid credentials' })
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-950 flex items-center justify-center px-4">
      <div className="absolute inset-0 bg-navy/95 dark:bg-gray-950" />
      <div className="absolute inset-0 bg-dots opacity-20" />

      <motion.div
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="relative z-10 w-full max-w-md"
      >
        {/* Logo */}
        <div className="text-center mb-8">
          <div className="w-16 h-16 rounded-2xl bg-primary-400 flex items-center justify-center mx-auto mb-4 shadow-lg shadow-primary-400/30">
            <FaGraduationCap className="text-white text-3xl" />
          </div>
          <h1 className="text-2xl font-bold text-white">Kidland School</h1>
          <p className="text-gray-400 text-sm mt-1">Admin Management System</p>
        </div>

        {/* Card */}
        <div className="bg-white dark:bg-gray-900 rounded-2xl shadow-2xl p-8 border border-gray-100 dark:border-gray-800">
          <h2 className="font-bold text-xl text-gray-900 dark:text-white mb-1">Sign In</h2>
          <p className="text-gray-500 dark:text-gray-400 text-sm mb-6">Enter your credentials to access the admin panel</p>

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            {errors.root && (
              <div className="p-3 rounded-lg bg-red-50 dark:bg-red-900/20 border border-red-100 dark:border-red-800 text-red-600 dark:text-red-400 text-sm">
                {errors.root.message}
              </div>
            )}

            <div>
              <label className="label">Email Address</label>
              <div className="relative">
                <FaEnvelope className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400" size={14} />
                <input
                  {...register('email', { required: 'Email is required', pattern: { value: /\S+@\S+\.\S+/, message: 'Invalid email' } })}
                  type="email"
                  placeholder="admin@kidlandschool.edu.np"
                  className={`field pl-10 ${errors.email ? 'field-error' : ''}`}
                />
              </div>
              {errors.email && <p className="error-msg">{errors.email.message}</p>}
            </div>

            <div>
              <label className="label">Password</label>
              <div className="relative">
                <FaLock className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400" size={14} />
                <input
                  {...register('password', { required: 'Password is required', minLength: { value: 6, message: 'Min 6 characters' } })}
                  type={showPw ? 'text' : 'password'}
                  placeholder="Enter your password"
                  className={`field pl-10 pr-10 ${errors.password ? 'field-error' : ''}`}
                />
                <button type="button" onClick={() => setShowPw(s => !s)}
                  className="absolute right-3.5 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 transition-colors">
                  {showPw ? <FaEyeSlash size={14} /> : <FaEye size={14} />}
                </button>
              </div>
              {errors.password && <p className="error-msg">{errors.password.message}</p>}
            </div>

            <button type="submit" disabled={loading} className="btn-primary w-full justify-center py-3 mt-2">
              {loading
                ? <><span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />Signing In...</>
                : 'Sign In to Admin Panel'
              }
            </button>
          </form>

          <div className="mt-6 pt-5 border-t border-gray-100 dark:border-gray-800">
            <p className="text-xs text-gray-400 text-center">
              Demo: <span className="font-mono text-primary-500">admin@kidland.edu.np</span> / <span className="font-mono text-primary-500">admin123</span>
            </p>
          </div>
        </div>

        <p className="text-center text-xs text-gray-500 mt-6">
          © {new Date().getFullYear()} Kidland School. Secure Admin Access.
        </p>
      </motion.div>
    </div>
  )
}
