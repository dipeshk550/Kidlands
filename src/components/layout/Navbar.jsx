import { useState, useEffect, useRef } from 'react'
import { Link, NavLink, useLocation } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { FaBars, FaTimes, FaMoon, FaSun, FaChevronDown, FaGraduationCap } from 'react-icons/fa'
import { useTheme } from '../../context/ThemeContext'

const NAV = [
  { label: 'Home', to: '/' },
  { label: 'About', to: '/about', sub: [
    { label: 'About Kidland', to: '/about' },
    { label: 'Faculty & Staff', to: '/teachers' },
  ]},
  { label: 'Academics', to: '/academics', sub: [
    { label: 'Curriculum Overview', to: '/academics' },
    { label: 'Facilities', to: '/facilities' },
  ]},
  { label: 'Admission', to: '/admission', sub: [
    { label: 'Admission Info', to: '/admission' },
    { label: 'Apply Online', to: '/apply' },
  ]},
  { label: 'Events', to: '/events' },
  { label: 'News', to: '/news' },
  { label: 'Gallery', to: '/gallery' },
  { label: 'Notices', to: '/notices' },
  { label: 'Contact', to: '/contact' },
]

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [open, setOpen] = useState(false)
  const [drop, setDrop] = useState(null)
  const [mExp, setMExp] = useState(null)
  const { dark, toggle } = useTheme()
  const loc = useLocation()
  const timer = useRef(null)

  useEffect(() => {
    const h = () => setScrolled(window.scrollY > 30)
    window.addEventListener('scroll', h)
    return () => window.removeEventListener('scroll', h)
  }, [])
  useEffect(() => { setOpen(false); setDrop(null) }, [loc])

  const enter = l => { clearTimeout(timer.current); setDrop(l) }
  const leave = () => { timer.current = setTimeout(() => setDrop(null), 160) }

  return (
    <header className={`sticky top-0 z-40 transition-all duration-300 ${
      scrolled ? 'bg-white/97 dark:bg-gray-900/97 backdrop-blur-xl shadow-lg' : 'bg-white dark:bg-gray-900 shadow-sm'
    }`}>
      {/* Green accent line */}
      <div className="h-0.5 bg-gradient-to-r from-primary-400 via-primary-300 to-primary-400" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 md:h-[68px]">

          {/* Logo */}
          <Link to="/" className="flex items-center gap-3 shrink-0">
            <div className="w-11 h-11 rounded-xl bg-primary-400 flex items-center justify-center shadow-md shadow-primary-400/30">
              <FaGraduationCap className="text-white text-xl" />
            </div>
            <div>
              <div className="font-bold text-lg text-gray-900 dark:text-white leading-none">Kidland School</div>
              <div className="text-[10px] font-semibold text-primary-400 tracking-widest uppercase">Duty · Honor · Country</div>
            </div>
          </Link>

          {/* Desktop nav */}
          <nav className="hidden xl:flex items-center gap-0.5">
            {NAV.map(n => (
              <div key={n.label} className="relative"
                onMouseEnter={() => n.sub && enter(n.label)}
                onMouseLeave={leave}>
                {n.sub ? (
                  <button className={`flex items-center gap-1 px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                    loc.pathname.startsWith(n.to) ? 'text-primary-500 bg-primary-50 dark:bg-primary-900/20' : 'text-gray-600 dark:text-gray-300 hover:text-primary-500 hover:bg-gray-50 dark:hover:bg-gray-800'
                  }`}>
                    {n.label}
                    <FaChevronDown className={`text-[10px] transition-transform ${drop===n.label?'rotate-180':''}`} />
                  </button>
                ) : (
                  <NavLink to={n.to} className={({ isActive }) =>
                    `block px-3 py-2 rounded-lg text-sm font-medium transition-colors ${isActive ? 'text-primary-500 bg-primary-50 dark:bg-primary-900/20' : 'text-gray-600 dark:text-gray-300 hover:text-primary-500 hover:bg-gray-50 dark:hover:bg-gray-800'}`
                  }>{n.label}</NavLink>
                )}
                <AnimatePresence>
                  {n.sub && drop===n.label && (
                    <motion.div initial={{opacity:0,y:6}} animate={{opacity:1,y:0}} exit={{opacity:0,y:6}}
                      transition={{duration:0.15}}
                      className="absolute top-full left-0 w-48 bg-white dark:bg-gray-800 rounded-xl shadow-xl border border-gray-100 dark:border-gray-700 py-2 z-50 border-t-2 border-t-primary-400"
                      onMouseEnter={() => enter(n.label)} onMouseLeave={leave}>
                      {n.sub.map(s => (
                        <Link key={s.label} to={s.to}
                          className="block px-4 py-2.5 text-sm text-gray-700 dark:text-gray-300 hover:bg-primary-50 dark:hover:bg-primary-900/20 hover:text-primary-500 transition-colors">
                          {s.label}
                        </Link>
                      ))}
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            ))}
          </nav>

          {/* Actions */}
          <div className="flex items-center gap-2">
            <button onClick={toggle} aria-label="Toggle theme"
              className="w-9 h-9 rounded-lg border border-gray-200 dark:border-gray-700 flex items-center justify-center text-gray-500 dark:text-gray-400 hover:border-primary-400 hover:text-primary-500 transition-all">
              {dark ? <FaSun size={14} /> : <FaMoon size={14} />}
            </button>
            <Link to="/apply" className="hidden md:inline-flex btn-primary text-sm py-2 px-5">Apply Now</Link>
            <button onClick={() => setOpen(o => !o)} className="xl:hidden w-9 h-9 rounded-lg border border-gray-200 dark:border-gray-700 flex items-center justify-center">
              {open ? <FaTimes size={15} className="text-gray-700 dark:text-gray-300" /> : <FaBars size={15} className="text-gray-700 dark:text-gray-300" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      <AnimatePresence>
        {open && (
          <motion.div initial={{opacity:0,height:0}} animate={{opacity:1,height:'auto'}} exit={{opacity:0,height:0}}
            className="xl:hidden bg-white dark:bg-gray-900 border-t border-gray-100 dark:border-gray-800 overflow-auto max-h-[75vh]">
            <div className="max-w-7xl mx-auto px-4 py-3 space-y-0.5">
              {NAV.map(n => (
                <div key={n.label}>
                  {n.sub ? (
                    <>
                      <button onClick={() => setMExp(mExp===n.label?null:n.label)}
                        className="w-full flex justify-between items-center px-4 py-3 text-sm font-medium text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-800">
                        {n.label}
                        <FaChevronDown className={`text-xs transition-transform ${mExp===n.label?'rotate-180':''}`} />
                      </button>
                      <AnimatePresence>
                        {mExp===n.label && (
                          <motion.div initial={{height:0}} animate={{height:'auto'}} exit={{height:0}} className="overflow-hidden">
                            {n.sub.map(s => (
                              <Link key={s.label} to={s.to}
                                className="block pl-8 pr-4 py-2 text-sm text-gray-500 dark:text-gray-400 hover:text-primary-500 rounded-lg">
                                {s.label}
                              </Link>
                            ))}
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </>
                  ) : (
                    <NavLink to={n.to} className={({isActive}) =>
                      `block px-4 py-3 rounded-lg text-sm font-medium ${isActive ? 'bg-primary-50 dark:bg-primary-900/20 text-primary-500' : 'text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-800'}`
                    }>{n.label}</NavLink>
                  )}
                </div>
              ))}
              <div className="pt-2 pb-1">
                <Link to="/apply" className="btn-primary w-full justify-center py-3">Apply Now</Link>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  )
}
