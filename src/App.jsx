import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import { Toaster } from 'react-hot-toast'
import { AuthProvider, useAuth } from './context/AuthContext'
import { ThemeProvider } from './context/ThemeContext'

// Public layout & pages
import PublicLayout  from './components/layout/PublicLayout'
import HomePage      from './pages/public/HomePage'
import AboutPage     from './pages/public/AboutPage'
import AcademicsPage from './pages/public/AcademicsPage'
import AdmissionPage from './pages/public/AdmissionPage'
import EventsPage    from './pages/public/EventsPage'
import NewsPage      from './pages/public/NewsPage'
import GalleryPage   from './pages/public/GalleryPage'
import TeachersPage  from './pages/public/TeachersPage'
import FacilitiesPage from './pages/public/FacilitiesPage'
import NoticePage    from './pages/public/NoticePage'
import ContactPage   from './pages/public/ContactPage'
import NotFoundPage  from './pages/public/NotFoundPage'
import ApplicationPage from './pages/public/ApplicationPage'

// Admin pages
import AdminLogin    from './pages/admin/AdminLogin'
import AdminLayout   from './components/layout/AdminLayout'
import Dashboard     from './pages/admin/Dashboard'
import ManageNews    from './pages/admin/ManageNews'
import ManageEvents  from './pages/admin/ManageEvents'
import ManageGallery from './pages/admin/ManageGallery'
import ManageNotices from './pages/admin/ManageNotices'
import ManageTeachers from './pages/admin/ManageTeachers'
import ManageAdmissions from './pages/admin/ManageAdmissions'
import ManageUsers   from './pages/admin/ManageUsers'
import ManageSettings from './pages/admin/ManageSettings'

function ProtectedRoute({ children, requireSuper = false }) {
  const { user, loading } = useAuth()
  if (loading) return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="w-8 h-8 border-4 border-primary-400 border-t-transparent rounded-full animate-spin" />
    </div>
  )
  if (!user) return <Navigate to="/admin/login" replace />
  if (requireSuper && user.role !== 'superadmin') return <Navigate to="/admin" replace />
  return children
}

export default function App() {
  return (
    <ThemeProvider>
      <AuthProvider>
        <BrowserRouter>
          <Routes>
            {/* Public */}
            <Route element={<PublicLayout />}>
              <Route path="/"           element={<HomePage />} />
              <Route path="/about"      element={<AboutPage />} />
              <Route path="/academics"  element={<AcademicsPage />} />
              <Route path="/admission"  element={<AdmissionPage />} />
              <Route path="/apply"      element={<ApplicationPage />} />
              <Route path="/events"     element={<EventsPage />} />
              <Route path="/news"       element={<NewsPage />} />
              <Route path="/gallery"    element={<GalleryPage />} />
              <Route path="/teachers"   element={<TeachersPage />} />
              <Route path="/facilities" element={<FacilitiesPage />} />
              <Route path="/notices"    element={<NoticePage />} />
              <Route path="/contact"    element={<ContactPage />} />
              <Route path="*"           element={<NotFoundPage />} />
            </Route>

            {/* Admin */}
            <Route path="/admin/login" element={<AdminLogin />} />
            <Route path="/admin" element={<ProtectedRoute><AdminLayout /></ProtectedRoute>}>
              <Route index                element={<Dashboard />} />
              <Route path="news"          element={<ManageNews />} />
              <Route path="events"        element={<ManageEvents />} />
              <Route path="gallery"       element={<ManageGallery />} />
              <Route path="notices"       element={<ManageNotices />} />
              <Route path="teachers"      element={<ManageTeachers />} />
              <Route path="admissions"    element={<ManageAdmissions />} />
              <Route path="users"         element={<ProtectedRoute requireSuper><ManageUsers /></ProtectedRoute>} />
              <Route path="settings"      element={<ManageSettings />} />
            </Route>
          </Routes>

          <Toaster position="top-right" toastOptions={{
            style: { background:'#1e293b', color:'#f1f5f9', borderRadius:'10px', fontSize:'14px' },
            success: { iconTheme: { primary:'#54B435', secondary:'#fff' } },
            error:   { iconTheme: { primary:'#ef4444', secondary:'#fff' } },
          }} />
        </BrowserRouter>
      </AuthProvider>
    </ThemeProvider>
  )
}
