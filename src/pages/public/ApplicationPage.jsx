import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { motion, AnimatePresence } from 'framer-motion'
import toast from 'react-hot-toast'
import { FaArrowRight, FaArrowLeft, FaCheckCircle, FaUpload, FaUser, FaGraduationCap, FaFileAlt, FaEye } from 'react-icons/fa'
import { ScrollTop } from '../../components/ui/index'

const STEPS = [
  { id:0, label:'Personal Info', icon: FaUser },
  { id:1, label:'Academic Info', icon: FaGraduationCap },
  { id:2, label:'Documents',     icon: FaFileAlt },
  { id:3, label:'Review',        icon: FaEye },
]

const STEP_FIELDS = [
  ['studentName','dob','gender','nationality'],
  ['classApplying','parentName','phone','email','address'],
  [],['agree'],
]

export default function ApplicationPage() {
  const [step, setStep] = useState(0)
  const [loading, setLoading] = useState(false)
  const [submitted, setSubmitted] = useState(false)
  const [photo, setPhoto] = useState(null)
  const { register, handleSubmit, watch, trigger, formState: { errors } } = useForm()

  const next = async () => { if (await trigger(STEP_FIELDS[step])) setStep(s => s+1) }

  const onSubmit = async (data) => {
    setLoading(true)
    await new Promise(r => setTimeout(r, 1800))
    toast.success('Application submitted! We will contact you within 2 business days.')
    setSubmitted(true)
    setLoading(false)
  }

  if (submitted) return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-900 px-4">
      <motion.div initial={{scale:0.9,opacity:0}} animate={{scale:1,opacity:1}} className="card p-10 max-w-md w-full text-center">
        <div className="w-20 h-20 rounded-full bg-green-100 dark:bg-green-900/30 flex items-center justify-center mx-auto mb-5">
          <FaCheckCircle className="text-green-500 text-4xl"/>
        </div>
        <h2 className="font-bold text-2xl text-gray-900 dark:text-white mb-3">Application Submitted!</h2>
        <p className="text-gray-500 dark:text-gray-400 text-sm mb-5">Your admission application has been received. Our team will contact you within 2 business days.</p>
        <div className="p-3 rounded-lg bg-primary-50 dark:bg-primary-900/20 text-sm font-semibold text-primary-600 dark:text-primary-400">
          Ref: KS-{Math.random().toString(36).slice(2,8).toUpperCase()}
        </div>
      </motion.div>
    </div>
  )

  const v = watch()

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-12">
      <div className="max-w-3xl mx-auto px-4 sm:px-6">
        <div className="text-center mb-8">
          <p className="section-tag mb-2">Online Admission</p>
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">Student Application Form</h1>
          <p className="text-gray-500 dark:text-gray-400 text-sm">Kidland School · Kusunti, Lalitpur-13 · 9841404920</p>
        </div>

        {/* Step bar */}
        <div className="relative flex items-center justify-between mb-8 px-4">
          <div className="absolute top-5 left-8 right-8 h-0.5 bg-gray-200 dark:bg-gray-700">
            <div className="h-full bg-primary-400 transition-all duration-500 rounded-full" style={{width:`${(step/(STEPS.length-1))*100}%`}}/>
          </div>
          {STEPS.map(s => (
            <div key={s.id} className="relative z-10 flex flex-col items-center gap-2">
              <div className={`w-10 h-10 rounded-full flex items-center justify-center transition-all font-bold text-sm ${s.id<step?'bg-primary-400 text-white':s.id===step?'bg-primary-400 text-white ring-4 ring-primary-100 dark:ring-primary-900':'bg-gray-200 dark:bg-gray-700 text-gray-400'}`}>
                {s.id < step ? <FaCheckCircle size={14}/> : <s.icon size={14}/>}
              </div>
              <span className={`text-[11px] font-semibold hidden sm:block ${s.id===step?'text-primary-500':'text-gray-400'}`}>{s.label}</span>
            </div>
          ))}
        </div>

        <div className="card p-8">
          <form onSubmit={handleSubmit(onSubmit)}>
            <AnimatePresence mode="wait">
              {step === 0 && (
                <motion.div key="s0" initial={{opacity:0,x:30}} animate={{opacity:1,x:0}} exit={{opacity:0,x:-30}} className="space-y-5">
                  <h2 className="font-bold text-lg text-gray-900 dark:text-white mb-6 flex items-center gap-2"><FaUser className="text-primary-400"/>Personal Information</h2>
                  <div>
                    <label className="label">Student Full Name *</label>
                    <input {...register('studentName',{required:'Required'})} placeholder="Full name as per birth certificate" className={`field ${errors.studentName?'field-error':''}`}/>
                    {errors.studentName && <p className="error-msg">{errors.studentName.message}</p>}
                  </div>
                  <div className="grid sm:grid-cols-3 gap-4">
                    <div>
                      <label className="label">Date of Birth *</label>
                      <input type="date" {...register('dob',{required:'Required'})} className={`field ${errors.dob?'field-error':''}`}/>
                      {errors.dob && <p className="error-msg">{errors.dob.message}</p>}
                    </div>
                    <div>
                      <label className="label">Gender *</label>
                      <select {...register('gender',{required:'Required'})} className={`field ${errors.gender?'field-error':''}`}>
                        <option value="">Select</option><option>Male</option><option>Female</option><option>Other</option>
                      </select>
                      {errors.gender && <p className="error-msg">{errors.gender.message}</p>}
                    </div>
                    <div>
                      <label className="label">Nationality</label>
                      <input {...register('nationality')} defaultValue="Nepali" className="field"/>
                    </div>
                  </div>
                  <div>
                    <label className="label">Passport Photo</label>
                    <label className="flex items-center gap-4 border-2 border-dashed border-gray-200 dark:border-gray-700 rounded-xl p-4 cursor-pointer hover:border-primary-400 transition-colors">
                      {photo ? <img src={photo} alt="Preview" className="w-16 h-16 rounded-lg object-cover border-2 border-primary-200"/> : <div className="w-16 h-16 rounded-lg bg-gray-100 dark:bg-gray-800 flex items-center justify-center"><FaUpload className="text-gray-400" size={20}/></div>}
                      <div><div className="text-sm font-medium text-gray-700 dark:text-gray-300">Click to upload photo</div><div className="text-xs text-gray-400">JPG, PNG · max 2MB</div></div>
                      <input type="file" accept="image/*" className="hidden" onChange={e=>{const f=e.target.files[0];if(f){const r=new FileReader();r.onload=()=>setPhoto(r.result);r.readAsDataURL(f)}}}/>
                    </label>
                  </div>
                </motion.div>
              )}
              {step === 1 && (
                <motion.div key="s1" initial={{opacity:0,x:30}} animate={{opacity:1,x:0}} exit={{opacity:0,x:-30}} className="space-y-5">
                  <h2 className="font-bold text-lg text-gray-900 dark:text-white mb-6 flex items-center gap-2"><FaGraduationCap className="text-primary-400"/>Academic and Contact Information</h2>
                  <div className="grid sm:grid-cols-2 gap-4">
                    <div>
                      <label className="label">Class Applying For *</label>
                      <select {...register('classApplying',{required:'Required'})} className={`field ${errors.classApplying?'field-error':''}`}>
                        <option value="">Select class</option>
                        {['Nursery','LKG','UKG',...[1,2,3,4,5,6,7,8,9,10].map(g=>`Grade ${g}`)].map(c=><option key={c}>{c}</option>)}
                      </select>
                      {errors.classApplying && <p className="error-msg">{errors.classApplying.message}</p>}
                    </div>
                    <div>
                      <label className="label">Previous School</label>
                      <input {...register('prevSchool')} placeholder="Previous school name" className="field"/>
                    </div>
                  </div>
                  <div>
                    <label className="label">Parent / Guardian Name *</label>
                    <input {...register('parentName',{required:'Required'})} placeholder="Full name of parent or guardian" className={`field ${errors.parentName?'field-error':''}`}/>
                    {errors.parentName && <p className="error-msg">{errors.parentName.message}</p>}
                  </div>
                  <div className="grid sm:grid-cols-2 gap-4">
                    <div>
                      <label className="label">Phone Number *</label>
                      <input {...register('phone',{required:'Required'})} placeholder="98XXXXXXXX" className={`field ${errors.phone?'field-error':''}`}/>
                      {errors.phone && <p className="error-msg">{errors.phone.message}</p>}
                    </div>
                    <div>
                      <label className="label">Email Address *</label>
                      <input type="email" {...register('email',{required:'Required',pattern:{value:/\S+@\S+\.\S+/,message:'Invalid email'}})} placeholder="parent@email.com" className={`field ${errors.email?'field-error':''}`}/>
                      {errors.email && <p className="error-msg">{errors.email.message}</p>}
                    </div>
                  </div>
                  <div>
                    <label className="label">Home Address *</label>
                    <textarea {...register('address',{required:'Required'})} rows={3} placeholder="Full residential address" className={`field resize-none ${errors.address?'field-error':''}`}/>
                    {errors.address && <p className="error-msg">{errors.address.message}</p>}
                  </div>
                  <div>
                    <label className="label">Additional Message</label>
                    <textarea {...register('message')} rows={2} placeholder="Any additional information" className="field resize-none"/>
                  </div>
                </motion.div>
              )}
              {step === 2 && (
                <motion.div key="s2" initial={{opacity:0,x:30}} animate={{opacity:1,x:0}} exit={{opacity:0,x:-30}} className="space-y-5">
                  <h2 className="font-bold text-lg text-gray-900 dark:text-white mb-2 flex items-center gap-2"><FaFileAlt className="text-primary-400"/>Upload Documents</h2>
                  <p className="text-sm text-gray-500 dark:text-gray-400 mb-5">Upload clear scans or photos. PDF, JPG, PNG · max 5MB each.</p>
                  {[{k:'birthCert',l:'Birth Certificate',r:true},{k:'markSheet',l:'Previous Year Mark Sheet',r:true},{k:'transferCert',l:'Transfer Certificate',r:true},{k:'photo2',l:'Passport Photos (2 copies)',r:true},{k:'charCert',l:'Character Certificate',r:false}].map(({k,l,r})=>(
                    <div key={k}>
                      <label className="label">{l} {r&&'*'}</label>
                      <label className="flex items-center gap-3 border-2 border-dashed border-gray-200 dark:border-gray-700 rounded-xl p-4 cursor-pointer hover:border-primary-400 transition-colors">
                        <div className="w-10 h-10 rounded-lg bg-primary-50 dark:bg-primary-900/20 flex items-center justify-center shrink-0"><FaUpload className="text-primary-400" size={16}/></div>
                        <div><div className="text-sm text-gray-700 dark:text-gray-300 font-medium">Upload {l}</div><div className="text-xs text-gray-400">PDF, JPG, PNG · max 5MB</div></div>
                        <input type="file" accept=".pdf,.jpg,.jpeg,.png" className="hidden" {...register(k)}/>
                      </label>
                    </div>
                  ))}
                </motion.div>
              )}
              {step === 3 && (
                <motion.div key="s3" initial={{opacity:0,x:30}} animate={{opacity:1,x:0}} exit={{opacity:0,x:-30}} className="space-y-5">
                  <h2 className="font-bold text-lg text-gray-900 dark:text-white mb-6 flex items-center gap-2"><FaEye className="text-primary-400"/>Review and Submit</h2>
                  <div className="rounded-xl border border-gray-100 dark:border-gray-700 overflow-hidden">
                    {[['Student Name',v.studentName],['Date of Birth',v.dob],['Gender',v.gender],['Class Applying',v.classApplying],['Parent Name',v.parentName],['Phone',v.phone],['Email',v.email],['Address',v.address]].map(([l,val])=>(
                      <div key={l} className="flex justify-between px-5 py-3 border-b border-gray-50 dark:border-gray-800 last:border-0 even:bg-gray-50/50 dark:even:bg-gray-800/30">
                        <span className="text-xs font-semibold text-gray-400 uppercase tracking-wide w-36">{l}</span>
                        <span className="text-sm text-gray-800 dark:text-gray-200 text-right">{val||'—'}</span>
                      </div>
                    ))}
                  </div>
                  <div className="p-4 rounded-xl bg-primary-50 dark:bg-primary-900/20 border border-primary-100 dark:border-primary-800 flex items-start gap-3">
                    <input type="checkbox" id="agree" {...register('agree',{required:'You must agree to proceed'})} className="mt-1 accent-primary-500"/>
                    <label htmlFor="agree" className="text-sm text-gray-700 dark:text-gray-300 cursor-pointer">I confirm all information is accurate and agree to Kidland School's admission terms and conditions.</label>
                  </div>
                  {errors.agree && <p className="error-msg">{errors.agree.message}</p>}
                </motion.div>
              )}
            </AnimatePresence>

            <div className="flex justify-between mt-8 pt-6 border-t border-gray-100 dark:border-gray-800">
              {step > 0 ? <button type="button" onClick={()=>setStep(s=>s-1)} className="btn-outline flex items-center gap-2 py-2.5"><FaArrowLeft size={12}/>Back</button> : <div/>}
              {step < 3
                ? <button type="button" onClick={next} className="btn-primary py-2.5">Next Step <FaArrowRight size={12}/></button>
                : <button type="submit" disabled={loading} className="btn-primary py-2.5 min-w-40 justify-center">
                    {loading ? <><span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"/>Submitting...</> : <>Submit Application <FaArrowRight size={12}/></>}
                  </button>}
            </div>
          </form>
        </div>
      </div>
      <ScrollTop/>
    </div>
  )
}
