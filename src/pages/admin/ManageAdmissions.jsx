import { useState, useMemo } from 'react'
import { motion } from 'framer-motion'
import toast from 'react-hot-toast'
import { FaEye, FaDownload, FaHourglass, FaCheckCircle, FaTimesCircle, FaUsers } from 'react-icons/fa'
import { Badge, Modal, Pagination } from '../../components/ui/index'
import { AdminPage, SearchBar } from '../../components/ui/AdminTable'

const INITIAL = [
  { id:1,  name:'Aarav Shrestha',   class:'Grade 6',  parent:'Ram Shrestha',  phone:'9841XXXXXX', email:'ram@email.com', date:'2025-05-20', status:'pending',  gender:'Male',   prev:'ABC School' },
  { id:2,  name:'Priya Maharjan',   class:'Grade 3',  parent:'Sita Maharjan', phone:'9840XXXXXX', email:'sita@email.com',date:'2025-05-19', status:'approved', gender:'Female', prev:'XYZ School' },
  { id:3,  name:'Rohit Thapa',      class:'Nursery',  parent:'Hari Thapa',    phone:'9845XXXXXX', email:'hari@email.com', date:'2025-05-18', status:'approved', gender:'Male',   prev:'—' },
  { id:4,  name:'Sneha Gurung',     class:'Grade 9',  parent:'Kiran Gurung',  phone:'9843XXXXXX', email:'kiran@email.com',date:'2025-05-18', status:'pending',  gender:'Female', prev:'DEF School' },
  { id:5,  name:'Bikram Tamang',    class:'Grade 1',  parent:'Dil Tamang',    phone:'9842XXXXXX', email:'dil@email.com',  date:'2025-05-17', status:'rejected', gender:'Male',   prev:'—' },
  { id:6,  name:'Anisha Rai',       class:'Grade 5',  parent:'Sunita Rai',    phone:'9847XXXXXX', email:'sun@email.com',  date:'2025-05-16', status:'approved', gender:'Female', prev:'GHI School' },
  { id:7,  name:'Dipesh Karki',     class:'Grade 7',  parent:'Binod Karki',   phone:'9846XXXXXX', email:'bin@email.com',  date:'2025-05-15', status:'pending',  gender:'Male',   prev:'JKL School' },
  { id:8,  name:'Suman Pandey',     class:'Grade 10', parent:'Arjun Pandey',  phone:'9848XXXXXX', email:'arj@email.com',  date:'2025-05-14', status:'approved', gender:'Male',   prev:'MNO School' },
]

const STATUS_OPTIONS = ['pending','approved','rejected']
const STATUS_COLORS = { pending:'badge-yellow', approved:'badge-green', rejected:'badge-red' }

export default function ManageAdmissions() {
  const [items, setItems] = useState(INITIAL)
  const [search, setSearch] = useState('')
  const [statusFilter, setStatusFilter] = useState('All')
  const [page, setPage] = useState(1)
  const [viewing, setViewing] = useState(null)

  const filtered = useMemo(() => items.filter(it =>
    (statusFilter === 'All' || it.status === statusFilter.toLowerCase()) &&
    (it.name.toLowerCase().includes(search.toLowerCase()) ||
     it.class.toLowerCase().includes(search.toLowerCase()) ||
     it.parent.toLowerCase().includes(search.toLowerCase()))
  ), [items, search, statusFilter])

  const PER = 7
  const paged = filtered.slice((page - 1) * PER, page * PER)

  const updateStatus = (id, status) => {
    setItems(its => its.map(it => it.id === id ? { ...it, status } : it))
    toast.success(`Application ${status}`)
    setViewing(null)
  }

  const exportCSV = () => {
    const headers = ['Name','Class','Parent','Phone','Email','Date','Status','Gender','Previous School']
    const rows = filtered.map(it => [it.name,it.class,it.parent,it.phone,it.email,it.date,it.status,it.gender,it.prev])
    const csv = [headers, ...rows].map(r => r.join(',')).join('\n')
    const blob = new Blob([csv], { type: 'text/csv' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a'); a.href = url; a.download = 'admissions.csv'; a.click()
    toast.success('CSV exported')
  }

  const counts = {
    total: items.length,
    pending:  items.filter(i => i.status === 'pending').length,
    approved: items.filter(i => i.status === 'approved').length,
    rejected: items.filter(i => i.status === 'rejected').length,
  }

  return (
    <AdminPage title="Admission Applications" subtitle="Review, approve and manage student applications">
      {/* Stat cards */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        {[
          { label:'Total Applications', val:counts.total,    icon:FaUsers,      color:'bg-blue-50 dark:bg-blue-900/20',   ic:'text-blue-500' },
          { label:'Pending Review',     val:counts.pending,  icon:FaHourglass,  color:'bg-yellow-50 dark:bg-yellow-900/20',ic:'text-yellow-500' },
          { label:'Approved',           val:counts.approved, icon:FaCheckCircle,color:'bg-green-50 dark:bg-green-900/20',  ic:'text-green-500' },
          { label:'Rejected',           val:counts.rejected, icon:FaTimesCircle,color:'bg-red-50 dark:bg-red-900/20',     ic:'text-red-500' },
        ].map(s => (
          <motion.div key={s.label} initial={{opacity:0,y:16}} animate={{opacity:1,y:0}} className="card p-4">
            <div className={`w-10 h-10 rounded-xl ${s.color} flex items-center justify-center mb-2`}>
              <s.icon className={s.ic} size={18} />
            </div>
            <div className="text-2xl font-bold text-gray-900 dark:text-white">{s.val}</div>
            <div className="text-xs text-gray-500 dark:text-gray-400">{s.label}</div>
          </motion.div>
        ))}
      </div>

      {/* Controls */}
      <div className="flex flex-col sm:flex-row gap-3 items-start sm:items-center justify-between">
        <SearchBar value={search} onChange={v => { setSearch(v); setPage(1) }} placeholder="Search by name, class or parent..."
          filters={['All','Pending','Approved','Rejected']} activeFilter={statusFilter === 'All' ? 'All' : statusFilter.charAt(0).toUpperCase()+statusFilter.slice(1)}
          onFilter={f => { setStatusFilter(f === 'All' ? 'All' : f.toLowerCase()); setPage(1) }} />
        <button onClick={exportCSV} className="btn-outline py-2 px-4 text-sm shrink-0">
          <FaDownload size={12} /> Export CSV
        </button>
      </div>

      {/* Table */}
      <div className="card overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50 dark:bg-gray-800/50 border-b border-gray-100 dark:border-gray-700">
              <tr>
                {['Applicant','Class','Parent / Guardian','Phone','Applied Date','Status','Actions'].map(h => (
                  <th key={h} className="table-head whitespace-nowrap">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {paged.length === 0 ? (
                <tr><td colSpan={7} className="text-center py-16 text-gray-400">No applications found</td></tr>
              ) : paged.map((app, i) => (
                <motion.tr key={app.id} initial={{opacity:0,y:6}} animate={{opacity:1,y:0}} transition={{delay:i*0.04}} className="table-row">
                  <td className="table-cell">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-full bg-primary-100 dark:bg-primary-900/30 flex items-center justify-center text-primary-600 dark:text-primary-400 font-bold text-xs shrink-0">
                        {app.name[0]}
                      </div>
                      <div>
                        <div className="font-semibold text-sm text-gray-800 dark:text-gray-100">{app.name}</div>
                        <div className="text-xs text-gray-400">{app.gender}</div>
                      </div>
                    </div>
                  </td>
                  <td className="table-cell font-medium">{app.class}</td>
                  <td className="table-cell">{app.parent}</td>
                  <td className="table-cell">{app.phone}</td>
                  <td className="table-cell text-gray-500">{app.date}</td>
                  <td className="table-cell"><span className={`badge ${STATUS_COLORS[app.status]}`}>{app.status}</span></td>
                  <td className="table-cell">
                    <button onClick={() => setViewing(app)}
                      className="w-8 h-8 rounded-lg bg-blue-50 dark:bg-blue-900/20 text-blue-500 flex items-center justify-center hover:bg-blue-100 transition-colors">
                      <FaEye size={13} />
                    </button>
                  </td>
                </motion.tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
      <Pagination page={page} total={filtered.length} perPage={PER} onChange={setPage} />

      {/* View modal */}
      <Modal open={!!viewing} onClose={() => setViewing(null)} title="Application Details" size="lg">
        {viewing && (
          <div className="space-y-5">
            <div className="flex items-center gap-4 p-4 rounded-xl bg-gray-50 dark:bg-gray-800">
              <div className="w-14 h-14 rounded-full bg-primary-400 flex items-center justify-center text-white font-bold text-xl">{viewing.name[0]}</div>
              <div>
                <div className="font-bold text-lg text-gray-900 dark:text-white">{viewing.name}</div>
                <div className="text-gray-500 text-sm">{viewing.class} · {viewing.gender}</div>
                <span className={`badge ${STATUS_COLORS[viewing.status]} mt-1`}>{viewing.status}</span>
              </div>
            </div>
            <div className="grid sm:grid-cols-2 gap-4">
              {[['Parent / Guardian', viewing.parent],['Phone', viewing.phone],['Email', viewing.email],['Previous School', viewing.prev],['Applied Date', viewing.date]].map(([l, v]) => (
                <div key={l} className="p-3 rounded-lg bg-gray-50 dark:bg-gray-800">
                  <div className="text-xs font-semibold text-gray-400 uppercase tracking-wide mb-0.5">{l}</div>
                  <div className="text-sm text-gray-800 dark:text-gray-100 font-medium">{v}</div>
                </div>
              ))}
            </div>
            {viewing.status === 'pending' && (
              <div className="flex gap-3 pt-2">
                <button onClick={() => updateStatus(viewing.id, 'approved')} className="btn-primary flex-1 justify-center py-2.5">
                  <FaCheckCircle size={13} /> Approve Application
                </button>
                <button onClick={() => updateStatus(viewing.id, 'rejected')} className="btn-danger flex-1 justify-center py-2.5">
                  <FaTimesCircle size={13} /> Reject Application
                </button>
              </div>
            )}
          </div>
        )}
      </Modal>
    </AdminPage>
  )
}
