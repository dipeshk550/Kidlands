import { useState } from 'react'
import { useForm } from 'react-hook-form'
import toast from 'react-hot-toast'
import { Badge, Modal, Pagination } from '../../components/ui/index'
import { AdminPage, SearchBar, DataTable } from '../../components/ui/AdminTable'

const INITIAL = [
  { id:1, name:'Ms. Shanti Khadka',    role:'Founder and Director', dept:'Management',   qual:'M.Ed', exp:'20+', status:'active' },
  { id:2, name:'Mr. Ram P. Adhikari',  role:'Principal',            dept:'Administration',qual:'M.Ed', exp:'15+', status:'active' },
  { id:3, name:'Ms. Sunita Gurung',    role:'Montessori Coordinator',dept:'Pre-Primary', qual:'NMTC Certified', exp:'12+', status:'active' },
  { id:4, name:'Mr. Bikash Shrestha',  role:'Head of Science',      dept:'Science',      qual:'M.Sc', exp:'10+', status:'active' },
  { id:5, name:'Ms. Puja Maharjan',    role:'English HOD',          dept:'English',      qual:'M.A English', exp:'8+', status:'active' },
  { id:6, name:'Mr. Deepak Tamang',    role:'Mathematics Teacher',  dept:'Mathematics',  qual:'B.Sc Math', exp:'7+', status:'active' },
  { id:7, name:'Ms. Anita Rai',        role:'ECA Coordinator',      dept:'Arts',         qual:'BFA', exp:'6+', status:'active' },
  { id:8, name:'Mr. Sagar Karki',      role:'Computer Teacher',     dept:'IT',           qual:'B.Tech IT', exp:'5+', status:'active' },
]

const DEPTS = ['Administration','Management','Pre-Primary','Primary','Science','Mathematics','English','Social Studies','IT','Arts','Sports']

export default function ManageTeachers() {
  const [items, setItems] = useState(INITIAL)
  const [search, setSearch] = useState('')
  const [page, setPage] = useState(1)
  const [modal, setModal] = useState(false)
  const [editing, setEditing] = useState(null)
  const { register, handleSubmit, reset, setValue, formState: { errors } } = useForm()

  const filtered = items.filter(it =>
    it.name.toLowerCase().includes(search.toLowerCase()) ||
    it.role.toLowerCase().includes(search.toLowerCase()) ||
    it.dept.toLowerCase().includes(search.toLowerCase())
  )
  const PER = 6
  const paged = filtered.slice((page - 1) * PER, page * PER)

  const openAdd = () => { setEditing(null); reset({ dept: 'Primary', status: 'active' }); setModal(true) }
  const openEdit = (item) => { setEditing(item); Object.entries(item).forEach(([k, v]) => setValue(k, v)); setModal(true) }

  const onSubmit = (data) => {
    if (editing) {
      setItems(its => its.map(it => it.id === editing.id ? { ...it, ...data } : it))
      toast.success('Teacher profile updated')
    } else {
      setItems(its => [...its, { ...data, id: Date.now() }])
      toast.success('Teacher added')
    }
    setModal(false); reset()
  }

  const onDelete = (id) => { setItems(its => its.filter(it => it.id !== id)); toast.success('Teacher removed') }

  const columns = [
    { key: 'name',   label: 'Name',          render: (v, row) => (
      <div className="flex items-center gap-3">
        <div className="w-8 h-8 rounded-full bg-primary-100 dark:bg-primary-900/30 flex items-center justify-center text-primary-600 dark:text-primary-400 font-bold text-xs shrink-0">
          {v.split(' ').map(n => n[0]).slice(0, 2).join('')}
        </div>
        <div>
          <div className="font-semibold text-gray-800 dark:text-gray-100 text-sm">{v}</div>
          <div className="text-xs text-gray-400">{row.role}</div>
        </div>
      </div>
    )},
    { key: 'dept',   label: 'Department' },
    { key: 'qual',   label: 'Qualification' },
    { key: 'exp',    label: 'Experience' },
    { key: 'status', label: 'Status', render: v => <Badge status={v} /> },
  ]

  return (
    <AdminPage title="Teachers and Staff" subtitle="Manage faculty profiles and staff information" onAdd={openAdd} addLabel="Add Teacher">
      <SearchBar value={search} onChange={v => { setSearch(v); setPage(1) }} placeholder="Search by name, role or department..." />
      <DataTable columns={columns} data={paged} onEdit={openEdit} onDelete={onDelete} emptyTitle="No teachers found" />
      <Pagination page={page} total={filtered.length} perPage={PER} onChange={setPage} />

      <Modal open={modal} onClose={() => setModal(false)} title={editing ? 'Edit Teacher' : 'Add Teacher'} size="lg">
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div className="grid sm:grid-cols-2 gap-4">
            <div>
              <label className="label">Full Name *</label>
              <input {...register('name', { required: 'Required' })} className={`field ${errors.name ? 'field-error' : ''}`} placeholder="Full name" />
              {errors.name && <p className="error-msg">{errors.name.message}</p>}
            </div>
            <div>
              <label className="label">Role / Position *</label>
              <input {...register('role', { required: 'Required' })} className={`field ${errors.role ? 'field-error' : ''}`} placeholder="e.g. Mathematics Teacher" />
              {errors.role && <p className="error-msg">{errors.role.message}</p>}
            </div>
          </div>
          <div className="grid sm:grid-cols-3 gap-4">
            <div>
              <label className="label">Department</label>
              <select {...register('dept')} className="field">{DEPTS.map(d => <option key={d}>{d}</option>)}</select>
            </div>
            <div>
              <label className="label">Qualification</label>
              <input {...register('qual')} className="field" placeholder="e.g. M.Sc Physics" />
            </div>
            <div>
              <label className="label">Experience</label>
              <input {...register('exp')} className="field" placeholder="e.g. 8+" />
            </div>
          </div>
          <div className="grid sm:grid-cols-2 gap-4">
            <div>
              <label className="label">Email</label>
              <input type="email" {...register('email')} className="field" placeholder="teacher@kidland.edu.np" />
            </div>
            <div>
              <label className="label">Phone</label>
              <input {...register('phone')} className="field" placeholder="98XXXXXXXX" />
            </div>
          </div>
          <div>
            <label className="label">Short Bio</label>
            <textarea {...register('bio')} rows={3} className="field resize-none" placeholder="Brief teacher biography..." />
          </div>
          <div className="grid sm:grid-cols-2 gap-4">
            <div>
              <label className="label">Photo URL</label>
              <input {...register('photo')} className="field" placeholder="https://..." />
            </div>
            <div>
              <label className="label">Status</label>
              <select {...register('status')} className="field">
                <option value="active">Active</option>
                <option value="inactive">Inactive</option>
              </select>
            </div>
          </div>
          <div className="flex justify-end gap-3 pt-2">
            <button type="button" onClick={() => setModal(false)} className="btn-ghost">Cancel</button>
            <button type="submit" className="btn-primary py-2 px-6">{editing ? 'Update Teacher' : 'Add Teacher'}</button>
          </div>
        </form>
      </Modal>
    </AdminPage>
  )
}
