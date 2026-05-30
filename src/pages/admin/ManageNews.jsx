import { useState } from 'react'
import { useForm } from 'react-hook-form'
import toast from 'react-hot-toast'
import { FaEye } from 'react-icons/fa'
import { Badge, Modal, Pagination } from '../../components/ui/index'
import { AdminPage, SearchBar, DataTable } from '../../components/ui/AdminTable'

const INITIAL = [
  { id: 1, title: 'Kidland Wins Inter-School Debate 2025', author: 'Admin', cat: 'Achievement', status: 'published', date: '2025-05-15', views: 248 },
  { id: 2, title: 'New Computer Lab Inaugurated',          author: 'Admin', cat: 'Infrastructure', status: 'published', date: '2025-05-10', views: 183 },
  { id: 3, title: 'Annual Science Fair 2025',              author: 'Admin', cat: 'Academic',    status: 'published', date: '2025-04-28', views: 312 },
  { id: 4, title: 'SEE Results 2082 Outstanding Grades',  author: 'Admin', cat: 'Achievement', status: 'published', date: '2025-04-10', views: 521 },
  { id: 5, title: 'Scholarship Programme Open 2083',       author: 'Admin', cat: 'Admission',  status: 'draft',     date: '2025-03-25', views: 0 },
]

const CATS = ['Achievement', 'Infrastructure', 'Academic', 'Admission', 'Event', 'General']

export default function ManageNews() {
  const [items, setItems] = useState(INITIAL)
  const [search, setSearch] = useState('')
  const [statusFilter, setStatusFilter] = useState('All')
  const [page, setPage] = useState(1)
  const [modal, setModal] = useState(false)
  const [editing, setEditing] = useState(null)
  const { register, handleSubmit, reset, setValue, formState: { errors } } = useForm()

  const filtered = items.filter(it =>
    (statusFilter === 'All' || it.status === statusFilter.toLowerCase()) &&
    it.title.toLowerCase().includes(search.toLowerCase())
  )
  const PER = 5
  const paged = filtered.slice((page - 1) * PER, page * PER)

  const openAdd = () => { setEditing(null); reset({ title: '', cat: 'General', status: 'draft', excerpt: '', content: '' }); setModal(true) }
  const openEdit = (item) => { setEditing(item); Object.entries(item).forEach(([k, v]) => setValue(k, v)); setModal(true) }

  const onSubmit = (data) => {
    if (editing) {
      setItems(its => its.map(it => it.id === editing.id ? { ...it, ...data } : it))
      toast.success('Article updated successfully')
    } else {
      setItems(its => [...its, { ...data, id: Date.now(), author: 'Admin', date: new Date().toISOString().split('T')[0], views: 0 }])
      toast.success('Article created successfully')
    }
    setModal(false); reset()
  }

  const onDelete = (id) => {
    setItems(its => its.filter(it => it.id !== id))
    toast.success('Article deleted')
  }

  const columns = [
    { key: 'title',  label: 'Title',   render: v => <span className="font-semibold text-gray-800 dark:text-gray-100 line-clamp-1">{v}</span> },
    { key: 'cat',    label: 'Category' },
    { key: 'author', label: 'Author' },
    { key: 'date',   label: 'Date' },
    { key: 'views',  label: 'Views', render: v => <span className="flex items-center gap-1 text-gray-500"><FaEye size={11}/>{v}</span> },
    { key: 'status', label: 'Status', render: v => <Badge status={v} /> },
  ]

  return (
    <AdminPage title="News & Blog" subtitle="Manage school news articles and blog posts" onAdd={openAdd} addLabel="New Article">
      <SearchBar value={search} onChange={v => { setSearch(v); setPage(1) }} placeholder="Search articles..."
        filters={['All', 'Published', 'Draft']} activeFilter={statusFilter} onFilter={f => { setStatusFilter(f); setPage(1) }} />
      <DataTable columns={columns} data={paged} onEdit={openEdit} onDelete={onDelete} emptyTitle="No articles found" />
      <Pagination page={page} total={filtered.length} perPage={PER} onChange={setPage} />

      <Modal open={modal} onClose={() => setModal(false)} title={editing ? 'Edit Article' : 'New Article'} size="lg">
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div>
            <label className="label">Title *</label>
            <input {...register('title', { required: 'Required' })} className={`field ${errors.title ? 'field-error' : ''}`} placeholder="Article title" />
            {errors.title && <p className="error-msg">{errors.title.message}</p>}
          </div>
          <div className="grid sm:grid-cols-2 gap-4">
            <div>
              <label className="label">Category</label>
              <select {...register('cat')} className="field">
                {CATS.map(c => <option key={c}>{c}</option>)}
              </select>
            </div>
            <div>
              <label className="label">Status</label>
              <select {...register('status')} className="field">
                <option value="draft">Draft</option>
                <option value="published">Published</option>
              </select>
            </div>
          </div>
          <div>
            <label className="label">Excerpt</label>
            <textarea {...register('excerpt')} rows={2} className="field resize-none" placeholder="Short summary..." />
          </div>
          <div>
            <label className="label">Content *</label>
            <textarea {...register('content', { required: 'Required' })} rows={6} className={`field resize-none ${errors.content ? 'field-error' : ''}`} placeholder="Full article content..." />
            {errors.content && <p className="error-msg">{errors.content.message}</p>}
          </div>
          <div>
            <label className="label">Featured Image URL</label>
            <input {...register('img')} className="field" placeholder="https://..." />
          </div>
          <div className="flex justify-end gap-3 pt-2">
            <button type="button" onClick={() => setModal(false)} className="btn-ghost">Cancel</button>
            <button type="submit" className="btn-primary py-2 px-6">{editing ? 'Update Article' : 'Publish Article'}</button>
          </div>
        </form>
      </Modal>
    </AdminPage>
  )
}
