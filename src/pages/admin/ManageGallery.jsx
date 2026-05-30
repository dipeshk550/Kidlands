import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { motion, AnimatePresence } from 'framer-motion'
import toast from 'react-hot-toast'
import { FaTrash, FaPlus, FaUpload, FaFilter } from 'react-icons/fa'
import { Confirm } from '../../components/ui/index'
import { AdminPage, SearchBar } from '../../components/ui/AdminTable'

const INITIAL_GALLERY = [
  { id:1,  src:'https://kidlandschool.edu.np/wp-content/uploads/2026/03/WhatsApp-Image-2026-03-19-at-4.52.21-PM.jpeg', title:'School Activities', cat:'Campus' },
  { id:2,  src:'https://kidlandschool.edu.np/wp-content/uploads/2026/03/IMG_5326-scaled.jpg', title:'Student Life', cat:'Students' },
  { id:3,  src:'https://kidlandschool.edu.np/wp-content/uploads/2025/08/IMG_2262-1-scaled.jpg', title:'School Events', cat:'Events' },
  { id:4,  src:'https://kidlandschool.edu.np/wp-content/uploads/2025/07/IMG_0893-scaled.jpg', title:'Campus Life', cat:'Campus' },
  { id:5,  src:'https://kidlandschool.edu.np/wp-content/uploads/2026/03/IMG_5607-scaled.jpg', title:'Student Activities', cat:'Students' },
  { id:6,  src:'https://kidlandschool.edu.np/wp-content/uploads/2026/03/IMG_5260-scaled.jpg', title:'ECA Activities', cat:'ECA' },
  { id:7,  src:'https://kidlandschool.edu.np/wp-content/uploads/2025/09/IMG_3237-1-scaled.jpg', title:'Cultural Events', cat:'Events' },
  { id:8,  src:'https://kidlandschool.edu.np/wp-content/uploads/2026/02/WhatsApp-Image-2026-02-19-at-4.33.27-PM-2-1.jpeg', title:'School Life', cat:'Campus' },
]

const CATS = ['Campus', 'Students', 'Events', 'ECA', 'Sports']

export default function ManageGallery() {
  const [items, setItems] = useState(INITIAL_GALLERY)
  const [search, setSearch] = useState('')
  const [cat, setCat] = useState('All')
  const [modal, setModal] = useState(false)
  const [confirmId, setConfirmId] = useState(null)
  const [preview, setPreview] = useState(null)
  const { register, handleSubmit, reset, watch, formState: { errors } } = useForm()

  const urlVal = watch('src')

  const filtered = items.filter(it =>
    (cat === 'All' || it.cat === cat) &&
    it.title.toLowerCase().includes(search.toLowerCase())
  )

  const onSubmit = (data) => {
    setItems(its => [...its, { ...data, id: Date.now() }])
    toast.success('Image added to gallery')
    setModal(false); reset(); setPreview(null)
  }

  const onDelete = (id) => { setItems(its => its.filter(it => it.id !== id)); toast.success('Image removed') }

  return (
    <AdminPage title="Gallery" subtitle="Manage school photo gallery" onAdd={() => { reset(); setPreview(null); setModal(true) }} addLabel="Add Image">
      <div className="flex flex-col sm:flex-row gap-3">
        <SearchBar value={search} onChange={setSearch} placeholder="Search images..." />
        <div className="flex items-center gap-2 flex-wrap">
          <FaFilter className="text-gray-400" size={13} />
          {['All', ...CATS].map(c => (
            <button key={c} onClick={() => setCat(c)}
              className={`px-3 py-2 rounded-lg text-xs font-semibold transition-all ${c === cat ? 'bg-primary-400 text-white' : 'bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-400'}`}>
              {c}
            </button>
          ))}
        </div>
      </div>

      <div className="text-xs text-gray-500 dark:text-gray-400">{filtered.length} images</div>

      {/* Image grid */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
        <AnimatePresence>
          {filtered.map((img, i) => (
            <motion.div key={img.id} initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.9 }}
              transition={{ delay: i * 0.04 }}
              className="group relative aspect-square rounded-xl overflow-hidden bg-gray-100 dark:bg-gray-800 shadow-md">
              <img src={img.src} alt={img.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                onError={e => { e.target.parentElement.style.background = 'linear-gradient(135deg,#54B435,#41a020)'; e.target.style.display = 'none' }} />
              <div className="absolute inset-0 bg-black/0 group-hover:bg-black/50 transition-all flex flex-col items-center justify-center gap-2 opacity-0 group-hover:opacity-100">
                <p className="text-white text-xs font-semibold px-2 text-center line-clamp-2">{img.title}</p>
                <button onClick={() => setConfirmId(img.id)}
                  className="w-8 h-8 rounded-full bg-red-500 flex items-center justify-center text-white hover:bg-red-600 transition-colors">
                  <FaTrash size={12} />
                </button>
              </div>
              <div className="absolute bottom-2 left-2">
                <span className="text-[10px] font-bold px-1.5 py-0.5 rounded bg-black/60 text-white">{img.cat}</span>
              </div>
            </motion.div>
          ))}

          {/* Add new placeholder */}
          <motion.button initial={{ opacity: 0 }} animate={{ opacity: 1 }}
            onClick={() => { reset(); setPreview(null); setModal(true) }}
            className="aspect-square rounded-xl border-2 border-dashed border-gray-200 dark:border-gray-700 hover:border-primary-400 dark:hover:border-primary-500 flex flex-col items-center justify-center gap-2 text-gray-400 hover:text-primary-500 transition-all group">
            <FaPlus size={20} className="group-hover:scale-110 transition-transform" />
            <span className="text-xs font-medium">Add Image</span>
          </motion.button>
        </AnimatePresence>
      </div>

      {/* Add modal */}
      {modal && (
        <div className="fixed inset-0 z-50 bg-black/60 flex items-center justify-center p-4" onClick={() => setModal(false)}>
          <div className="bg-white dark:bg-gray-900 rounded-2xl shadow-2xl w-full max-w-md p-6" onClick={e => e.stopPropagation()}>
            <h3 className="font-bold text-gray-900 dark:text-white text-lg mb-5">Add Gallery Image</h3>
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
              <div>
                <label className="label">Image URL *</label>
                <input {...register('src', { required: 'Required' })} className={`field ${errors.src ? 'field-error' : ''}`}
                  placeholder="https://..." onChange={e => setPreview(e.target.value)} />
                {errors.src && <p className="error-msg">{errors.src.message}</p>}
              </div>
              {(preview || urlVal) && (
                <div className="rounded-xl overflow-hidden aspect-video bg-gray-100 dark:bg-gray-800">
                  <img src={preview || urlVal} alt="Preview" className="w-full h-full object-cover"
                    onError={e => e.target.style.display = 'none'} />
                </div>
              )}
              <div>
                <label className="label">Title *</label>
                <input {...register('title', { required: 'Required' })} className={`field ${errors.title ? 'field-error' : ''}`} placeholder="Image title" />
                {errors.title && <p className="error-msg">{errors.title.message}</p>}
              </div>
              <div>
                <label className="label">Category</label>
                <select {...register('cat')} className="field">{CATS.map(c => <option key={c}>{c}</option>)}</select>
              </div>
              <div className="flex justify-end gap-3 pt-2">
                <button type="button" onClick={() => setModal(false)} className="btn-ghost">Cancel</button>
                <button type="submit" className="btn-primary py-2 px-6"><FaUpload size={12}/> Add to Gallery</button>
              </div>
            </form>
          </div>
        </div>
      )}

      <Confirm open={confirmId !== null} onClose={() => setConfirmId(null)} onConfirm={() => onDelete(confirmId)}
        title="Remove Image" message="Are you sure you want to remove this image from the gallery?" />
    </AdminPage>
  )
}
