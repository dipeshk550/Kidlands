import { motion } from 'framer-motion'
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, LineChart, Line, PieChart, Pie, Cell } from 'recharts'
import { FaUserGraduate, FaNewspaper, FaCalendarAlt, FaBell, FaUsers, FaImages, FaArrowUp, FaArrowDown, FaClock, FaCheckCircle, FaTimesCircle, FaHourglass } from 'react-icons/fa'
import { useAuth } from '../../context/AuthContext'

const monthlyAdmissions = [
  { month: 'Jan', applications: 12, approved: 8 },
  { month: 'Feb', applications: 19, approved: 14 },
  { month: 'Mar', applications: 34, approved: 28 },
  { month: 'Apr', applications: 41, approved: 35 },
  { month: 'May', applications: 52, approved: 44 },
  { month: 'Jun', applications: 38, approved: 30 },
]

const visitData = [
  { day: 'Mon', visits: 120 }, { day: 'Tue', visits: 190 }, { day: 'Wed', visits: 150 },
  { day: 'Thu', visits: 220 }, { day: 'Fri', visits: 180 }, { day: 'Sat', visits: 90 }, { day: 'Sun', visits: 60 },
]

const admissionStatus = [
  { name: 'Approved', value: 44, color: '#54B435' },
  { name: 'Pending',  value: 18, color: '#FBBF24' },
  { name: 'Rejected', value: 8,  color: '#EF4444' },
]

const STATS = [
  { icon: FaUserGraduate, label: 'Total Students',       value: '1,247', change: '+12%', up: true,  color: 'bg-green-50 dark:bg-green-900/20',  ic: 'text-green-500' },
  { icon: FaUsers,         label: 'Applications (Month)', value: '52',    change: '+26%', up: true,  color: 'bg-blue-50 dark:bg-blue-900/20',    ic: 'text-blue-500' },
  { icon: FaCalendarAlt,   label: 'Upcoming Events',      value: '4',     change: '0%',   up: true,  color: 'bg-yellow-50 dark:bg-yellow-900/20',ic: 'text-yellow-500' },
  { icon: FaNewspaper,     label: 'Published Articles',   value: '28',    change: '+8%',  up: true,  color: 'bg-purple-50 dark:bg-purple-900/20',ic: 'text-purple-500' },
  { icon: FaBell,          label: 'Active Notices',        value: '6',     change: '-2',   up: false, color: 'bg-red-50 dark:bg-red-900/20',      ic: 'text-red-500' },
  { icon: FaImages,        label: 'Gallery Items',          value: '156',   change: '+24',  up: true,  color: 'bg-pink-50 dark:bg-pink-900/20',    ic: 'text-pink-500' },
]

const recentApps = [
  { name: 'Aarav Shrestha',  class: 'Grade 6',  date: 'May 20', status: 'pending' },
  { name: 'Priya Maharjan',  class: 'Grade 3',  date: 'May 19', status: 'approved' },
  { name: 'Rohit Thapa',     class: 'Nursery',  date: 'May 18', status: 'approved' },
  { name: 'Sneha Gurung',    class: 'Grade 9',  date: 'May 18', status: 'pending' },
  { name: 'Bikram Tamang',   class: 'Grade 1',  date: 'May 17', status: 'rejected' },
]

const recentActivity = [
  { text: 'New admission application from Aarav Shrestha', time: '5 min ago', icon: FaUserGraduate, color: 'text-green-500' },
  { text: 'Notice "Admission Open 2083" published', time: '1 hour ago', icon: FaBell, color: 'text-blue-500' },
  { text: 'Gallery updated with 8 new photos', time: '2 hours ago', icon: FaImages, color: 'text-purple-500' },
  { text: 'Event "Sports Day" created', time: '3 hours ago', icon: FaCalendarAlt, color: 'text-yellow-500' },
  { text: 'Blog post "SEE Results 2082" published', time: '1 day ago', icon: FaNewspaper, color: 'text-pink-500' },
]

const STATUS_ICONS = { pending: FaHourglass, approved: FaCheckCircle, rejected: FaTimesCircle }
const STATUS_COLORS = { pending: 'badge-yellow', approved: 'badge-green', rejected: 'badge-red' }

export default function Dashboard() {
  const { user } = useAuth()

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Dashboard</h1>
          <p className="text-gray-500 dark:text-gray-400 text-sm mt-0.5">
            Welcome back, <span className="font-semibold text-primary-500">{user?.name || 'Admin'}</span> — here is what is happening today.
          </p>
        </div>
        <div className="flex items-center gap-2 text-xs text-gray-400 bg-white dark:bg-gray-900 px-3 py-2 rounded-lg border border-gray-200 dark:border-gray-700 shadow-sm">
          <FaClock size={11} className="text-primary-400" />
          {new Date().toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}
        </div>
      </div>

      {/* Stat cards */}
      <div className="grid grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-4">
        {STATS.map((s, i) => (
          <motion.div key={s.label} initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.06 }}
            className="card p-4 hover:shadow-lg transition-shadow">
            <div className={`w-10 h-10 rounded-xl ${s.color} flex items-center justify-center mb-3`}>
              <s.icon className={`text-lg ${s.ic}`} />
            </div>
            <div className="text-2xl font-bold text-gray-900 dark:text-white">{s.value}</div>
            <div className="text-xs text-gray-500 dark:text-gray-400 mt-0.5 mb-2">{s.label}</div>
            <div className={`flex items-center gap-1 text-xs font-semibold ${s.up ? 'text-green-500' : 'text-red-500'}`}>
              {s.up ? <FaArrowUp size={9} /> : <FaArrowDown size={9} />}
              {s.change}
            </div>
          </motion.div>
        ))}
      </div>

      {/* Charts row */}
      <div className="grid lg:grid-cols-3 gap-6">
        {/* Monthly admissions bar chart */}
        <div className="lg:col-span-2 card p-6">
          <h3 className="font-bold text-gray-900 dark:text-white mb-1">Monthly Admissions</h3>
          <p className="text-xs text-gray-400 mb-5">Applications received vs approved per month</p>
          <ResponsiveContainer width="100%" height={220}>
            <BarChart data={monthlyAdmissions} barSize={16} barGap={6}>
              <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" />
              <XAxis dataKey="month" tick={{ fontSize: 11 }} axisLine={false} tickLine={false} />
              <YAxis tick={{ fontSize: 11 }} axisLine={false} tickLine={false} />
              <Tooltip contentStyle={{ borderRadius: 8, border: 'none', boxShadow: '0 4px 24px rgba(0,0,0,0.12)', fontSize: 12 }} />
              <Bar dataKey="applications" fill="#93c5fd" radius={[4, 4, 0, 0]} name="Applications" />
              <Bar dataKey="approved" fill="#54B435" radius={[4, 4, 0, 0]} name="Approved" />
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* Pie chart */}
        <div className="card p-6">
          <h3 className="font-bold text-gray-900 dark:text-white mb-1">Application Status</h3>
          <p className="text-xs text-gray-400 mb-4">Current month breakdown</p>
          <ResponsiveContainer width="100%" height={160}>
            <PieChart>
              <Pie data={admissionStatus} cx="50%" cy="50%" innerRadius={45} outerRadius={70} paddingAngle={4} dataKey="value">
                {admissionStatus.map((entry, i) => <Cell key={i} fill={entry.color} />)}
              </Pie>
              <Tooltip contentStyle={{ borderRadius: 8, fontSize: 12 }} />
            </PieChart>
          </ResponsiveContainer>
          <div className="space-y-2 mt-2">
            {admissionStatus.map(s => (
              <div key={s.name} className="flex items-center justify-between text-sm">
                <div className="flex items-center gap-2">
                  <div className="w-2.5 h-2.5 rounded-full" style={{ background: s.color }} />
                  <span className="text-gray-600 dark:text-gray-400">{s.name}</span>
                </div>
                <span className="font-bold text-gray-900 dark:text-white">{s.value}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Bottom row */}
      <div className="grid lg:grid-cols-2 gap-6">
        {/* Recent applications */}
        <div className="card">
          <div className="px-5 py-4 border-b border-gray-100 dark:border-gray-800 flex items-center justify-between">
            <h3 className="font-bold text-gray-900 dark:text-white">Recent Applications</h3>
            <a href="/admin/admissions" className="text-xs text-primary-500 hover:underline font-semibold">View All</a>
          </div>
          <div className="divide-y divide-gray-50 dark:divide-gray-800">
            {recentApps.map((a, i) => {
              const Icon = STATUS_ICONS[a.status]
              return (
                <div key={i} className="px-5 py-3.5 flex items-center justify-between hover:bg-gray-50 dark:hover:bg-gray-800/50 transition-colors">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-full bg-primary-100 dark:bg-primary-900/30 flex items-center justify-center text-primary-600 dark:text-primary-400 font-bold text-xs">
                      {a.name[0]}
                    </div>
                    <div>
                      <div className="text-sm font-semibold text-gray-800 dark:text-gray-100">{a.name}</div>
                      <div className="text-xs text-gray-400">{a.class} · {a.date}</div>
                    </div>
                  </div>
                  <span className={`badge ${STATUS_COLORS[a.status]}`}>{a.status}</span>
                </div>
              )
            })}
          </div>
        </div>

        {/* Activity log */}
        <div className="card">
          <div className="px-5 py-4 border-b border-gray-100 dark:border-gray-800">
            <h3 className="font-bold text-gray-900 dark:text-white">Recent Activity</h3>
          </div>
          <div className="p-5 space-y-4">
            {recentActivity.map((a, i) => (
              <div key={i} className="flex items-start gap-3">
                <div className={`w-8 h-8 rounded-full bg-gray-50 dark:bg-gray-800 flex items-center justify-center shrink-0 mt-0.5`}>
                  <a.icon className={a.color} size={13} />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm text-gray-700 dark:text-gray-300 leading-snug">{a.text}</p>
                  <p className="text-xs text-gray-400 mt-0.5 flex items-center gap-1"><FaClock size={9} />{a.time}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
