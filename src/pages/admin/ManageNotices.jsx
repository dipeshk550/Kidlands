import { useState } from 'react'
import { useForm } from 'react-hook-form'
import toast from 'react-hot-toast'
import { Badge, Modal, Pagination } from '../../components/ui/index'
import { AdminPage, SearchBar, DataTable } from '../../components/ui/AdminTable'

const INITIAL = [
  { id:1, title:'Admission Open – 2083 B.S.',           cat:'Admission', priority:'high',   status:'published', date:'2025-05-20' },
  { id:2, title:'SEE Preparation Batch – June 1',       cat:'Academic',  priority:'high',   status:'published', date:'2025-05-18' },
  { id:3, title:'Annual Sports Day – June 5',           cat:'Event',     priority:'medium', status:'published', date:'2025-05-15' },
  { id:4, title:'Parent-Teacher Meeting – May 30',      cat:'Event',     priority:'medium', status:'published', date:'2025-05-12' },
  { id:5, title:'Scholarship Test – May 25, 2025',     cat:'Academic',  priority:'high',   status:'published', date:'2025-05-08' },
  { id:6, title:'Summer Vacation Notice',               cat:'Holiday',   priority:'low',    status:'published', date:'2025-05-05' },
]

const CATS = ['Admission','Academic','Event','Holiday','Achievement','General']
const PRIORITIES = ['high','medium','low']

const PRIORITY_BADGE = { high: 'badge-red', medium: 'badge-yellow', low: 'badge-green' }

export default function ManageNotices() {
  const [items, setItems] = useState(INITIAL)
  const [search, setSearch] = useState('')
  const [catFilter, setCatFilter] = useState('All')
  const [page, setPage] = useState(1)
  const [modal, setModal] = useState(false)
  const [editing, setEditing] = useState(null)
  const { register, handleSubmit, reset, setValue, formState: { errors } } = useForm()

  const filtered = items.filter(it =>
    (catFilter === 'All' || it.cat === catFilter) &&
    it.title.toLowerCase().includes(search.toLowerCase())
  )
  const PER = 6
  const paged = filtered.slice((page - 1) * PER, page * PER)

  const openAdd = () => { setEditing(null); reset({ priority: 'medium', cat: 'General', status: 'published' }); setModal(true) }
  const openEdit = (item) => { setEditing(item); Object.entries(item).forEach(([k, v]) => setValue(k, v)); setModal(true) }

  const onSubmit = (data) => {
    if (editing) {
      setItems(its => its.map(it => it.id === editing.id ? { ...it, ...data } : it))
      toast.success('Notice updated')
    } else {
      setItems(its => [{ ...data, id: Date.now(), date: new Date().toISOString().split('T')[0] }, ...its])
      toast.success('Notice published')
    }
    setModal(false); reset()
  }

  const onDelete = (id) => { setItems(its => its.filter(it => it.id !== id)); toast.success('Notice removed') }

  const columns = [
    { key: 'title',    label: 'Title', render: v => <span className="font-semibold text-gray-800 dark:text-gray-100 line-clamp-1">{v}</span> },
    { key: 'cat',      label: 'Category' },
    { key: 'priority', label: 'Priority', render: v => <span className={`badge ${PRIORITY_BADGE[v]}`}>{v}</span> },
    { key: 'date',     label: 'Date' },
    { key: 'status',   label: 'Status', render: v => <Badge status={v} /> },
  ]

  return (
    <AdminPage title="Notice Board" subtitle="Publish and manage school announcements" onAdd={openAdd} addLabel="New Notice">
      <SearchBar value={search} onChange={v => { setSearch(v); setPage(1) }} placeholder="Search notices..."
        filters={['All', ...CATS]} activeFilter={catFilter} onFilter={f => { setCatFilter(f); setPage(1) }} />
      <DataTable columns={columns} data={paged} onEdit={openEdit} onDelete={onDelete} emptyTitle="No notices found" />
      <Pagination page={page} total={filtered.length} perPage={PER} onChange={setPage} />

      <Modal open={modal} onClose={() => setModal(false)} title={editing ? 'Edit Notice' : 'New Notice'} size="lg">
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div>
            <label className="label">Notice Title *</label>
            <input {...register('title', { required: 'Required' })} className={`field ${errors.title ? 'field-error' : ''}`} placeholder="Notice title" />
            {errors.title && <p className="error-msg">{errors.title.message}</p>}
          </div>
          <div className="grid sm:grid-cols-3 gap-4">
            <div>
              <label className="label">Category</label>
              <select {...register('cat')} className="field">{CATS.map(c => <option key={c}>{c}</option>)}</select>
            </div>
            <div>
              <label className="label">Priority</label>
              <select {...register('priority')} className="field">{PRIORITIES.map(p => <option key={p}>{p}</option>)}</select>
            </div>
            <div>
              <label className="label">Status</label>
              <select {...register('status')} className="field">
                <option value="published">Published</option>
                <option value="draft">Draft</option>
              </select>
            </div>
          </div>
          <div>
            <label className="label">Description *</label>
            <textarea {...register('desc', { required: 'Required' })} rows={4} className={`field resize-none ${errors.desc ? 'field-error' : ''}`} placeholder="Notice details..." />
            {errors.desc && <p className="error-msg">{errors.desc.message}</p>}
          </div>
          <div className="flex justify-end gap-3 pt-2">
            <button type="button" onClick={() => setModal(false)} className="btn-ghost">Cancel</button>
            <button type="submit" className="btn-primary py-2 px-6">{editing ? 'Update' : 'Publish Notice'}</button>
          </div>
        </form>
      </Modal>
    </AdminPage>
  )
}
