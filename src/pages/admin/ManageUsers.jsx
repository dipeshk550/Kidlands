import { useState } from 'react'
import { useForm } from 'react-hook-form'
import toast from 'react-hot-toast'
import { FaShieldAlt, FaUserShield } from 'react-icons/fa'
import { Badge, Modal, Pagination } from '../../components/ui/index'
import { AdminPage, SearchBar, DataTable } from '../../components/ui/AdminTable'
import { useAuth } from '../../context/AuthContext'

const INITIAL = [
  { id:1, name:'Super Admin',     email:'superadmin@kidland.edu.np', role:'superadmin', status:'active', last:'2025-05-20' },
  { id:2, name:'Ramesh Adhikari', email:'ramesh@kidland.edu.np',     role:'coadmin',    status:'active', last:'2025-05-19' },
  { id:3, name:'Sunita Thapa',    email:'sunita@kidland.edu.np',     role:'coadmin',    status:'active', last:'2025-05-18' },
  { id:4, name:'Bikash Rai',      email:'bikash@kidland.edu.np',     role:'coadmin',    status:'inactive',last:'2025-05-01' },
]

export default function ManageUsers() {
  const { isSuperAdmin } = useAuth()
  const [items, setItems] = useState(INITIAL)
  const [search, setSearch]   = useState('')
  const [page, setPage]       = useState(1)
  const [modal, setModal]     = useState(false)
  const [editing, setEditing] = useState(null)
  const { register, handleSubmit, reset, setValue, formState: { errors } } = useForm()

  const filtered = items.filter(it =>
    it.name.toLowerCase().includes(search.toLowerCase()) ||
    it.email.toLowerCase().includes(search.toLowerCase())
  )
  const PER = 8
  const paged = filtered.slice((page - 1) * PER, page * PER)

  const openAdd  = () => { setEditing(null); reset({ role:'coadmin', status:'active' }); setModal(true) }
  const openEdit = (item) => {
    if (item.role === 'superadmin' && !isSuperAdmin) { toast.error('Cannot edit Super Admin'); return }
    setEditing(item); Object.entries(item).forEach(([k,v]) => setValue(k,v)); setModal(true)
  }

  const onSubmit = (data) => {
    if (editing) {
      setItems(its => its.map(it => it.id === editing.id ? { ...it, ...data } : it))
      toast.success('User updated')
    } else {
      setItems(its => [...its, { ...data, id: Date.now(), last: 'Never' }])
      toast.success('User created. Send them their credentials.')
    }
    setModal(false); reset()
  }

  const onDelete = (id) => {
    const target = items.find(it => it.id === id)
    if (target?.role === 'superadmin') { toast.error('Cannot delete Super Admin'); return }
    setItems(its => its.filter(it => it.id !== id))
    toast.success('User removed')
  }

  const columns = [
    { key:'name',   label:'Name', render:(v,row) => (
      <div className="flex items-center gap-3">
        <div className="w-8 h-8 rounded-full bg-primary-100 dark:bg-primary-900/30 flex items-center justify-center text-primary-600 dark:text-primary-400 font-bold text-xs">{v[0]}</div>
        <div>
          <div className="font-semibold text-sm text-gray-800 dark:text-gray-100">{v}</div>
          <div className="text-xs text-gray-400">{row.email}</div>
        </div>
      </div>
    )},
    { key:'role',   label:'Role', render: v => (
      <span className={`badge ${v === 'superadmin' ? 'badge-blue' : 'badge-green'} gap-1`}>
        {v === 'superadmin' ? <FaShieldAlt size={9}/> : <FaUserShield size={9}/>}
        {v === 'superadmin' ? 'Super Admin' : 'Co Admin'}
      </span>
    )},
    { key:'status', label:'Status', render: v => <Badge status={v} /> },
    { key:'last',   label:'Last Login' },
  ]

  return (
    <AdminPage title="User Management" subtitle="Manage admin accounts and role-based permissions (Super Admin only)" onAdd={openAdd} addLabel="Add User">
      <div className="p-4 rounded-xl bg-blue-50 dark:bg-blue-900/20 border border-blue-100 dark:border-blue-800 text-sm text-blue-700 dark:text-blue-300 flex items-start gap-2">
        <FaShieldAlt size={14} className="mt-0.5 shrink-0"/>
        <span><strong>Super Admin</strong> can add, edit and remove users. <strong>Co Admin</strong> cannot access this page or change security settings.</span>
      </div>

      <SearchBar value={search} onChange={v => { setSearch(v); setPage(1) }} placeholder="Search users by name or email..." />
      <DataTable columns={columns} data={paged} onEdit={openEdit} onDelete={onDelete} emptyTitle="No users found" />
      <Pagination page={page} total={filtered.length} perPage={PER} onChange={setPage} />

      <Modal open={modal} onClose={() => setModal(false)} title={editing ? 'Edit User' : 'Add New User'}>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div>
            <label className="label">Full Name *</label>
            <input {...register('name',{ required:'Required' })} className={`field ${errors.name?'field-error':''}`} placeholder="Full name" />
            {errors.name && <p className="error-msg">{errors.name.message}</p>}
          </div>
          <div>
            <label className="label">Email Address *</label>
            <input type="email" {...register('email',{ required:'Required', pattern:{ value:/\S+@\S+\.\S+/, message:'Invalid email' } })} className={`field ${errors.email?'field-error':''}`} placeholder="user@kidland.edu.np" />
            {errors.email && <p className="error-msg">{errors.email.message}</p>}
          </div>
          {!editing && (
            <div>
              <label className="label">Password *</label>
              <input type="password" {...register('password',{ required:'Required', minLength:{ value:8, message:'Min 8 characters' } })} className={`field ${errors.password?'field-error':''}`} placeholder="Minimum 8 characters" />
              {errors.password && <p className="error-msg">{errors.password.message}</p>}
            </div>
          )}
          <div className="grid sm:grid-cols-2 gap-4">
            <div>
              <label className="label">Role</label>
              <select {...register('role')} className="field">
                <option value="coadmin">Co Admin</option>
                <option value="superadmin">Super Admin</option>
              </select>
            </div>
            <div>
              <label className="label">Status</label>
              <select {...register('status')} className="field">
                <option value="active">Active</option>
                <option value="inactive">Inactive</option>
              </select>
            </div>
          </div>
          <div className="p-3 rounded-lg bg-gray-50 dark:bg-gray-800 text-xs text-gray-500 dark:text-gray-400">
            <strong className="text-gray-700 dark:text-gray-300">Permissions:</strong>
            <br/>Super Admin: full access including user management and settings.
            <br/>Co Admin: can manage news, events, gallery, notices, teachers and admissions.
          </div>
          <div className="flex justify-end gap-3 pt-2">
            <button type="button" onClick={() => setModal(false)} className="btn-ghost">Cancel</button>
            <button type="submit" className="btn-primary py-2 px-6">{editing ? 'Update User' : 'Create User'}</button>
          </div>
        </form>
      </Modal>
    </AdminPage>
  )
}
