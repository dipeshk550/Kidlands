import { useState } from 'react'
import { useForm } from 'react-hook-form'
import toast from 'react-hot-toast'
import { FaSave, FaSchool, FaPhone, FaImage, FaShareAlt } from 'react-icons/fa'
import { useAuth } from '../../context/AuthContext'

const TABS = [
  { id:'school',    label:'School Info',        icon:FaSchool },
  { id:'contact',   label:'Contact Details',    icon:FaPhone },
  { id:'principal', label:"Principal's Message",icon:FaImage },
  { id:'social',    label:'Social Links',       icon:FaShareAlt },
]

function TabContent({ tab }) {
  const { register, handleSubmit } = useForm()
  const onSubmit = () => toast.success('Settings saved successfully')

  if (tab === 'school') return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
      <div className="grid sm:grid-cols-2 gap-5">
        <div><label className="label">School Name</label><input {...register('name')} defaultValue="Kidland School" className="field"/></div>
        <div><label className="label">Tagline / Motto</label><input {...register('tagline')} defaultValue="Duty, Honor, Country" className="field"/></div>
      </div>
      <div className="grid sm:grid-cols-2 gap-5">
        <div><label className="label">Established Year</label><input {...register('est')} defaultValue="2005" className="field"/></div>
        <div><label className="label">Affiliation</label><input {...register('affiliation')} defaultValue="NMTC — Nepal Montessori Training Centre" className="field"/></div>
      </div>
      <div><label className="label">Short Description</label><textarea {...register('desc')} rows={4} defaultValue="Kidland School is a leading NMTC-affiliated institution at Kusunti, Lalitpur, providing quality Montessori and academic education since 2005." className="field resize-none"/></div>
      <div><label className="label">Address</label><input {...register('address')} defaultValue="Kusunti, Lalitpur-13 (Opposite Yatayat Office), Nepal" className="field"/></div>
      <div className="grid sm:grid-cols-2 gap-5">
        <div><label className="label">School Logo URL</label><input {...register('logo')} className="field" placeholder="https://..."/></div>
        <div><label className="label">Hero Image URL</label><input {...register('hero')} className="field" placeholder="https://..."/></div>
      </div>
      <button type="submit" className="btn-primary"><FaSave size={13}/> Save School Info</button>
    </form>
  )

  if (tab === 'contact') return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
      <div className="grid sm:grid-cols-2 gap-5">
        <div><label className="label">Primary Phone</label><input {...register('phone1')} defaultValue="9841404920" className="field"/></div>
        <div><label className="label">Secondary Phone</label><input {...register('phone2')} defaultValue="01-5430237" className="field"/></div>
      </div>
      <div className="grid sm:grid-cols-2 gap-5">
        <div><label className="label">Primary Email</label><input {...register('email1')} defaultValue="kidlandmontessori@gmail.com" className="field"/></div>
        <div><label className="label">Secondary Email</label><input {...register('email2')} defaultValue="info@kidlandschool.edu.np" className="field"/></div>
      </div>
      <div><label className="label">Full Address</label><input {...register('address')} defaultValue="Kusunti, Lalitpur-13 (Opposite Yatayat Office), Nepal" className="field"/></div>
      <div className="grid sm:grid-cols-2 gap-5">
        <div><label className="label">Office Hours</label><input {...register('hours')} defaultValue="Sunday – Friday: 10:00 AM – 4:00 PM" className="field"/></div>
        <div><label className="label">Google Maps URL</label><input {...register('map')} className="field" placeholder="https://maps.google.com/..."/></div>
      </div>
      <button type="submit" className="btn-primary"><FaSave size={13}/> Save Contact Details</button>
    </form>
  )

  if (tab === 'principal') return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
      <div className="grid sm:grid-cols-2 gap-5">
        <div><label className="label">Principal Name</label><input {...register('pname')} defaultValue="Ms. Shanti Khadka" className="field"/></div>
        <div><label className="label">Title / Designation</label><input {...register('ptitle')} defaultValue="Founder and Director" className="field"/></div>
      </div>
      <div><label className="label">Principal Photo URL</label><input {...register('pphoto')} className="field" placeholder="https://..."/></div>
      <div>
        <label className="label">Message (Paragraph 1)</label>
        <textarea {...register('pmsg1')} rows={3} defaultValue="Since our establishment in 2005, we have been deeply committed to nurturing the minds of future leaders, innovators and changemakers." className="field resize-none"/>
      </div>
      <div>
        <label className="label">Message (Paragraph 2)</label>
        <textarea {...register('pmsg2')} rows={3} defaultValue="At Kidland, education extends beyond academic achievement — it is about shaping character, cultivating creativity and empowering students to navigate an ever-evolving world." className="field resize-none"/>
      </div>
      <div>
        <label className="label">Closing Line</label>
        <input {...register('pclosing')} defaultValue="Together, we can inspire the leaders of tomorrow." className="field"/>
      </div>
      <button type="submit" className="btn-primary"><FaSave size={13}/> Save Principal Message</button>
    </form>
  )

  if (tab === 'social') return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
      <div><label className="label">Facebook Page URL</label><input {...register('facebook')} defaultValue="https://www.facebook.com/kidlandmontessori/" className="field"/></div>
      <div><label className="label">Instagram Profile URL</label><input {...register('instagram')} defaultValue="https://www.instagram.com/kidlandeducation/" className="field"/></div>
      <div><label className="label">WhatsApp Number</label><input {...register('whatsapp')} defaultValue="9779841404920" className="field" placeholder="Country code + number"/></div>
      <div><label className="label">YouTube Channel URL</label><input {...register('youtube')} className="field" placeholder="https://youtube.com/..."/></div>
      <div><label className="label">TikTok URL</label><input {...register('tiktok')} className="field" placeholder="https://tiktok.com/..."/></div>
      <button type="submit" className="btn-primary"><FaSave size={13}/> Save Social Links</button>
    </form>
  )

  return null
}

export default function ManageSettings() {
  const [activeTab, setActiveTab] = useState('school')
  const { isSuperAdmin } = useAuth()

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-xl font-bold text-gray-900 dark:text-white">Settings</h1>
        <p className="text-sm text-gray-500 dark:text-gray-400 mt-0.5">Manage school information, contact details and site configuration</p>
      </div>

      {!isSuperAdmin && (
        <div className="p-4 rounded-xl bg-yellow-50 dark:bg-yellow-900/20 border border-yellow-200 dark:border-yellow-800 text-sm text-yellow-700 dark:text-yellow-300">
          Some settings are restricted to Super Admin only.
        </div>
      )}

      <div className="card overflow-hidden">
        {/* Tabs */}
        <div className="flex border-b border-gray-100 dark:border-gray-800 overflow-x-auto scrollbar-hide">
          {TABS.map(t => (
            <button key={t.id} onClick={() => setActiveTab(t.id)}
              className={`flex items-center gap-2 px-5 py-3.5 text-sm font-medium whitespace-nowrap transition-colors border-b-2 -mb-px ${
                activeTab === t.id
                  ? 'border-primary-400 text-primary-500 bg-primary-50/50 dark:bg-primary-900/10'
                  : 'border-transparent text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-200'
              }`}>
              <t.icon size={13}/>{t.label}
            </button>
          ))}
        </div>
        <div className="p-6">
          <TabContent tab={activeTab} />
        </div>
      </div>
    </div>
  )
}
