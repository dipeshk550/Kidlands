import { motion, AnimatePresence } from 'framer-motion'
import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { FaArrowUp, FaChevronRight, FaInbox } from 'react-icons/fa'

// Page hero banner (inner pages)
export function PageHero({ tag, title, sub, breadcrumbs = [], bg = 'bg-navy' }) {
  return (
    <div className={`relative py-20 md:py-28 overflow-hidden ${bg}`}>
      <div className="absolute inset-0 bg-dots opacity-30" />
      <div className="h-1 absolute top-0 left-0 right-0 bg-gradient-to-r from-primary-400 via-primary-300 to-primary-400" />
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        {tag && <p className="section-tag text-primary-300 mb-2">{tag}</p>}
        <motion.h1 initial={{opacity:0,y:20}} animate={{opacity:1,y:0}}
          className="text-3xl md:text-5xl font-bold text-white mb-3">{title}</motion.h1>
        {sub && <p className="text-gray-300 max-w-xl mx-auto text-sm">{sub}</p>}
        {breadcrumbs.length > 0 && (
          <div className="flex items-center justify-center gap-1.5 mt-5 text-xs text-gray-400">
            <Link to="/" className="hover:text-primary-300 transition-colors">Home</Link>
            {breadcrumbs.map(b => (
              <span key={b.label} className="flex items-center gap-1.5">
                <FaChevronRight size={9} />
                {b.to ? <Link to={b.to} className="hover:text-primary-300">{b.label}</Link>
                       : <span className="text-white font-semibold">{b.label}</span>}
              </span>
            ))}
          </div>
        )}
      </div>
      <div className="h-1 absolute bottom-0 left-0 right-0 bg-gradient-to-r from-primary-400 via-primary-300 to-primary-400" />
    </div>
  )
}

// Section header
export function SectionHeader({ tag, title, sub, center = true }) {
  return (
    <div className={`mb-12 ${center ? 'text-center' : ''}`}>
      {tag && <p className={`section-tag mb-2 ${!center ? '' : ''}`}>{tag}</p>}
      <h2 className="section-title">{title}</h2>
      <div className={`section-divider ${center ? 'mx-auto' : ''}`} />
      {sub && <p className={`section-sub ${center ? 'mx-auto' : ''}`}>{sub}</p>}
    </div>
  )
}

// Scroll to top
export function ScrollTop() {
  const [show, setShow] = useState(false)
  useEffect(() => {
    const h = () => setShow(window.scrollY > 400)
    window.addEventListener('scroll', h)
    return () => window.removeEventListener('scroll', h)
  }, [])
  return (
    <AnimatePresence>
      {show && (
        <motion.button initial={{opacity:0,scale:0}} animate={{opacity:1,scale:1}} exit={{opacity:0,scale:0}}
          whileHover={{scale:1.1}} whileTap={{scale:0.9}}
          onClick={() => window.scrollTo({top:0,behavior:'smooth'})}
          className="fixed bottom-7 right-7 z-50 w-11 h-11 rounded-xl bg-primary-400 hover:bg-primary-500 text-white flex items-center justify-center shadow-lg shadow-primary-400/30"
          aria-label="Scroll to top">
          <FaArrowUp size={16} />
        </motion.button>
      )}
    </AnimatePresence>
  )
}

// Stat card
export function StatCard({ icon: Icon, value, label, color = 'bg-primary-50 dark:bg-primary-900/20', iconColor = 'text-primary-500' }) {
  return (
    <div className="stat-card">
      <div className={`stat-icon ${color}`}>
        <Icon className={iconColor} />
      </div>
      <div>
        <div className="text-2xl font-bold text-gray-900 dark:text-white">{value}</div>
        <div className="text-sm text-gray-500 dark:text-gray-400">{label}</div>
      </div>
    </div>
  )
}

// Empty state
export function EmptyState({ title = 'No data found', sub = '' }) {
  return (
    <div className="text-center py-16 text-gray-400">
      <FaInbox size={40} className="mx-auto mb-3 opacity-30" />
      <p className="font-semibold text-gray-500">{title}</p>
      {sub && <p className="text-sm mt-1">{sub}</p>}
    </div>
  )
}

// Loading spinner
export function Spinner({ size = 'md' }) {
  const s = { sm: 'w-5 h-5', md: 'w-8 h-8', lg: 'w-12 h-12' }[size]
  return <div className={`${s} border-4 border-primary-200 border-t-primary-400 rounded-full animate-spin`} />
}

// Modal wrapper
export function Modal({ open, onClose, title, children, size = 'md' }) {
  const w = { sm:'max-w-sm', md:'max-w-lg', lg:'max-w-2xl', xl:'max-w-4xl' }[size]
  return (
    <AnimatePresence>
      {open && (
        <motion.div initial={{opacity:0}} animate={{opacity:1}} exit={{opacity:0}}
          className="fixed inset-0 z-50 bg-black/60 flex items-center justify-center p-4"
          onClick={onClose}>
          <motion.div initial={{scale:0.9,opacity:0}} animate={{scale:1,opacity:1}} exit={{scale:0.9,opacity:0}}
            className={`bg-white dark:bg-gray-900 rounded-2xl shadow-2xl w-full ${w} max-h-[90vh] overflow-y-auto`}
            onClick={e => e.stopPropagation()}>
            <div className="flex items-center justify-between px-6 py-4 border-b border-gray-100 dark:border-gray-800">
              <h3 className="font-bold text-gray-900 dark:text-white text-lg">{title}</h3>
              <button onClick={onClose} className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-200 transition-colors">
                <FaArrowUp className="rotate-45" size={16} />
              </button>
            </div>
            <div className="p-6">{children}</div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}

// Confirmation dialog
export function Confirm({ open, onClose, onConfirm, title, message }) {
  return (
    <Modal open={open} onClose={onClose} title={title} size="sm">
      <p className="text-gray-600 dark:text-gray-400 text-sm mb-6">{message}</p>
      <div className="flex gap-3 justify-end">
        <button onClick={onClose} className="btn-ghost">Cancel</button>
        <button onClick={() => { onConfirm(); onClose() }} className="btn-danger">Delete</button>
      </div>
    </Modal>
  )
}

// Badge component
export function Badge({ status }) {
  const map = {
    pending:  'badge-yellow',
    approved: 'badge-green',
    rejected: 'badge-red',
    active:   'badge-green',
    inactive: 'badge-gray',
    published:'badge-green',
    draft:    'badge-gray',
  }
  return <span className={`badge ${map[status] || 'badge-gray'}`}>{status}</span>
}

// Pagination
export function Pagination({ page, total, perPage = 10, onChange }) {
  const pages = Math.ceil(total / perPage)
  if (pages <= 1) return null
  return (
    <div className="flex items-center justify-center gap-2 mt-6">
      <button onClick={() => onChange(page - 1)} disabled={page === 1}
        className="w-9 h-9 rounded-lg border border-gray-200 dark:border-gray-700 text-sm flex items-center justify-center disabled:opacity-40 hover:border-primary-400 transition-colors">
        <FaChevronRight className="rotate-180" size={12} />
      </button>
      {[...Array(pages)].map((_, i) => (
        <button key={i} onClick={() => onChange(i + 1)}
          className={`w-9 h-9 rounded-lg text-sm font-semibold transition-all border ${page === i+1 ? 'bg-primary-400 border-primary-400 text-white' : 'border-gray-200 dark:border-gray-700 text-gray-600 dark:text-gray-400 hover:border-primary-400'}`}>
          {i + 1}
        </button>
      ))}
      <button onClick={() => onChange(page + 1)} disabled={page === pages}
        className="w-9 h-9 rounded-lg border border-gray-200 dark:border-gray-700 text-sm flex items-center justify-center disabled:opacity-40 hover:border-primary-400 transition-colors">
        <FaChevronRight size={12} />
      </button>
    </div>
  )
}
