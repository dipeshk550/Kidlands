import { useState } from 'react'
import { Outlet, Link, NavLink, useNavigate } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { useAuth } from '../../context/AuthContext'
import { useTheme } from '../../context/ThemeContext'
import {
  FaTachometerAlt, FaNewspaper, FaCalendarAlt, FaImages, FaBell,
  FaChalkboardTeacher, FaUserGraduate, FaUsers, FaCog, FaBars,
  FaTimes, FaMoon, FaSun, FaSignOutAlt, FaChevronLeft, FaGraduationCap, FaExternalLinkAlt
} from 'react-icons/fa'

const NAV = [
  { icon: FaTachometerAlt, label: 'Dashboard',    to: '/admin' },
  { icon: FaNewspaper,     label: 'News & Blog',   to: '/admin/news' },
  { icon: FaCalendarAlt,   label: 'Events',         to: '/admin/events' },
  { icon: FaImages,        label: 'Gallery',         to: '/admin/gallery' },
  { icon: FaBell,          label: 'Notices',          to: '/admin/notices' },
  { icon: FaChalkboardTeacher, label: 'Teachers',   to: '/admin/teachers' },
  { icon: FaUserGraduate,  label: 'Admissions',    to: '/admin/admissions' },
  { icon: FaUsers,         label: 'Users',           to: '/admin/users', superOnly: true },
  { icon: FaCog,           label: 'Settings',         to: '/admin/settings' },
]

export default function AdminLayout() {
  const [collapsed, setCollapsed] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)
  const { user, logout, isSuperAdmin } = useAuth()
  const { dark, toggle } = useTheme()
  const navigate = useNavigate()

  const handleLogout = () => { logout(); navigate('/admin/login') }

  const SidebarContent = ({ mobile = false }) => (
    <div className="flex flex-col h-full">
      {/* Logo */}
      <div className={`flex items-center gap-3 px-5 py-5 border-b border-white/10 ${collapsed && !mobile ? 'justify-center' : ''}`}>
        <div className="w-9 h-9 rounded-lg bg-primary-400 flex items-center justify-center shrink-0">
          <FaGraduationCap className="text-white text-base" />
        </div>
        {(!collapsed || mobile) && (
          <div className="min-w-0">
            <div className="font-bold text-white text-sm truncate">Kidland School</div>
            <div className="text-primary-300 text-[10px] uppercase tracking-widest">Admin Panel</div>
          </div>
        )}
        {!mobile && (
          <button onClick={() => setCollapsed(c => !c)}
            className="ml-auto text-gray-400 hover:text-white transition-colors shrink-0">
            <FaChevronLeft className={`transition-transform ${collapsed ? 'rotate-180' : ''}`} size={13} />
          </button>
        )}
      </div>

      {/* Nav */}
      <nav className="flex-1 px-3 py-4 space-y-0.5 overflow-y-auto">
        {NAV.filter(n => !n.superOnly || isSuperAdmin).map(n => (
          <NavLink key={n.to} to={n.to} end={n.to === '/admin'}
            onClick={() => mobile && setMobileOpen(false)}
            className={({ isActive }) =>
              `admin-nav-item ${isActive ? 'active' : ''} ${collapsed && !mobile ? 'justify-center px-3' : ''}`
            }>
            <n.icon size={16} className="shrink-0" />
            {(!collapsed || mobile) && <span className="truncate">{n.label}</span>}
          </NavLink>
        ))}
      </nav>

      {/* User */}
      <div className={`p-4 border-t border-white/10 ${collapsed && !mobile ? 'flex justify-center' : ''}`}>
        {(!collapsed || mobile) ? (
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-full bg-primary-400 flex items-center justify-center text-white font-bold text-sm shrink-0">
              {user?.name?.[0]?.toUpperCase() || 'A'}
            </div>
            <div className="flex-1 min-w-0">
              <div className="text-white text-sm font-semibold truncate">{user?.name || 'Admin'}</div>
              <div className="text-primary-300 text-xs capitalize">{user?.role || 'admin'}</div>
            </div>
            <button onClick={handleLogout} className="text-gray-400 hover:text-red-400 transition-colors shrink-0" title="Logout">
              <FaSignOutAlt size={15} />
            </button>
          </div>
        ) : (
          <button onClick={handleLogout} className="text-gray-400 hover:text-red-400 transition-colors" title="Logout">
            <FaSignOutAlt size={16} />
          </button>
        )}
      </div>
    </div>
  )

  const sidebarW = collapsed ? 'w-16' : 'w-60'

  return (
    <div className="flex h-screen bg-gray-100 dark:bg-gray-950 overflow-hidden">
      {/* Desktop sidebar */}
      <div className={`hidden lg:flex flex-col admin-sidebar ${sidebarW} transition-all duration-300`}>
        <SidebarContent />
      </div>

      {/* Mobile sidebar overlay */}
      <AnimatePresence>
        {mobileOpen && (
          <>
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
              className="lg:hidden fixed inset-0 bg-black/50 z-40" onClick={() => setMobileOpen(false)} />
            <motion.div initial={{ x: -240 }} animate={{ x: 0 }} exit={{ x: -240 }}
              transition={{ type: 'spring', stiffness: 300, damping: 30 }}
              className="lg:hidden fixed left-0 top-0 bottom-0 w-60 admin-sidebar z-50">
              <SidebarContent mobile />
            </motion.div>
          </>
        )}
      </AnimatePresence>

      {/* Main */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Topbar */}
        <header className="bg-white dark:bg-gray-900 border-b border-gray-200 dark:border-gray-800 px-4 sm:px-6 h-14 flex items-center justify-between shrink-0 shadow-sm">
          <div className="flex items-center gap-3">
            <button onClick={() => setMobileOpen(o => !o)} className="lg:hidden text-gray-500 hover:text-gray-700 dark:hover:text-gray-300">
              {mobileOpen ? <FaTimes size={18} /> : <FaBars size={18} />}
            </button>
            <div>
              <div className="text-sm font-semibold text-gray-800 dark:text-white">Admin Panel</div>
              <div className="text-xs text-gray-400">Kidland School Management</div>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <Link to="/" target="_blank" className="btn-ghost text-xs py-1.5 px-3 gap-1.5">
              <FaExternalLinkAlt size={11} /> View Site
            </Link>
            <button onClick={toggle} className="w-9 h-9 rounded-lg border border-gray-200 dark:border-gray-700 flex items-center justify-center text-gray-500 hover:border-primary-400 hover:text-primary-500 transition-all">
              {dark ? <FaSun size={14} /> : <FaMoon size={14} />}
            </button>
            <div className="w-9 h-9 rounded-full bg-primary-400 flex items-center justify-center text-white font-bold text-sm">
              {user?.name?.[0]?.toUpperCase() || 'A'}
            </div>
          </div>
        </header>

        {/* Content */}
        <main className="flex-1 overflow-y-auto p-4 sm:p-6">
          <Outlet />
        </main>
      </div>
    </div>
  )
}
