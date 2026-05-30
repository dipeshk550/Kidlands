import { createContext, useContext, useState, useEffect } from 'react'
const Ctx = createContext()
export function ThemeProvider({ children }) {
  const [dark, setDark] = useState(() => localStorage.getItem('ks_theme') === 'dark')
  useEffect(() => {
    document.documentElement.classList.toggle('dark', dark)
    localStorage.setItem('ks_theme', dark ? 'dark' : 'light')
  }, [dark])
  return <Ctx.Provider value={{ dark, toggle: () => setDark(d => !d) }}>{children}</Ctx.Provider>
}
export const useTheme = () => useContext(Ctx)
