import { useState } from 'react'
import { useForm } from 'react-hook-form'
import toast from 'react-hot-toast'
import { Badge, Modal, Pagination } from '../../components/ui/index'
import { AdminPage, SearchBar, DataTable } from '../../components/ui/AdminTable'

const INITIAL = [
  { id: 1, title: 'Annual Sports Day 2025',        date: 'June 5, 2025',   time: '7:00 AM',  venue: 'School Ground',   cat: 'Sports',   status: 'active' },
  { id: 2, title: 'Science and Innovation Fair',    date: 'June 20, 2025',  time: '9:00 AM',  venue: 'Auditorium',      cat: 'Academic', status: 'active' },
  { id: 3, title: 'Annual Cultural Programme',      date: 'July 15, 2025',  time: '10:00 AM', venue: 'School Ground',   cat: 'Cultural', status: 'active' },
  { id: 4, title: 'Inter-School Debate',            date: 'August 10, 2025',time: '11:00 AM', venue: 'Conference Hall', cat: 'Academic', status: 'active' },
]

const CATS = ['Academic', 'Cultural', 'Sports', 'Social', 'Other']

export default function ManageEvents() {
  const [items, setItems] = useState(INITIAL)
  const [search, setSearch] = useState('')
  const [page, setPage] = useState(1)
  const [modal, setModal] = useState(false)
  const [editing, setEditing] = useState(null)
  const { register, handleSubmit, reset, setValue, formState: { errors } } = useForm()

  const filtered = items.filter(it => it.title.toLowerCase().includes(search.toLowerCase()))
  const PER = 5
  const paged = filtered.slice((page - 1) * PER, page * PER)

  const openAdd = () => { setEditing(null); reset(); setModal(true) }
  const openEdit = (item) => { setEditing(item); Object.entries(item).forEach(([k, v]) => setValue(k, v)); setModal(true) }

  const onSubmit = (data) => {
    if (editing) {
      setItems(its => its.map(it => it.id === editing.id ? { ...it, ...data } : it))
      toast.success('Event updated')
    } else {
      setItems(its => [...its, { ...data, id: Date.now(), status: 'active' }])
      toast.success('Event created')
    }
    setModal(false); reset()
  }

  const onDelete = (id) => { setItems(its => its.filter(it => it.id !== id)); toast.success('Event deleted') }

  const columns = [
    { key: 'title',  label: 'Event Title', render: v => <span className="font-semibold text-gray-800 dark:text-gray-100">{v}</span> },
    { key: 'cat',    label: 'Category' },
    { key: 'date',   label: 'Date' },
    { key: 'time',   label: 'Time' },
    { key: 'venue',  label: 'Venue' },
    { key: 'status', label: 'Status', render: v => <Badge status={v} /> },
  ]

  return (
    <AdminPage title="Events" subtitle="Manage school events and activities" onAdd={openAdd} addLabel="New Event">
      <SearchBar value={search} onChange={v => { setSearch(v); setPage(1) }} placeholder="Search events..." />
      <DataTable columns={columns} data={paged} onEdit={openEdit} onDelete={onDelete} emptyTitle="No events found" />
      <Pagination page={page} total={filtered.length} perPage={PER} onChange={setPage} />

      <Modal open={modal} onClose={() => setModal(false)} title={editing ? 'Edit Event' : 'New Event'} size="lg">
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div>
            <label className="label">Event Title *</label>
            <input {...register('title', { required: 'Required' })} className={`field ${errors.title ? 'field-error' : ''}`} placeholder="Event name" />
            {errors.title && <p className="error-msg">{errors.title.message}</p>}
          </div>
          <div className="grid sm:grid-cols-3 gap-4">
            <div>
              <label className="label">Category</label>
              <select {...register('cat')} className="field">{CATS.map(c => <option key={c}>{c}</option>)}</select>
            </div>
            <div>
              <label className="label">Date *</label>
              <input {...register('date', { required: 'Required' })} className={`field ${errors.date ? 'field-error' : ''}`} placeholder="June 5, 2025" />
              {errors.date && <p className="error-msg">{errors.date.message}</p>}
            </div>
            <div>
              <label className="label">Time</label>
              <input {...register('time')} className="field" placeholder="9:00 AM" />
            </div>
          </div>
          <div>
            <label className="label">Venue *</label>
            <input {...register('venue', { required: 'Required' })} className={`field ${errors.venue ? 'field-error' : ''}`} placeholder="School Ground" />
            {errors.venue && <p className="error-msg">{errors.venue.message}</p>}
          </div>
          <div>
            <label className="label">Description</label>
            <textarea {...register('desc')} rows={3} className="field resize-none" placeholder="Event description..." />
          </div>
          <div className="flex justify-end gap-3 pt-2">
            <button type="button" onClick={() => setModal(false)} className="btn-ghost">Cancel</button>
            <button type="submit" className="btn-primary py-2 px-6">{editing ? 'Update Event' : 'Create Event'}</button>
          </div>
        </form>
      </Modal>
    </AdminPage>
  )
}
