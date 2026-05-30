import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { motion } from 'framer-motion'
import toast from 'react-hot-toast'
import { FaPhone, FaEnvelope, FaMapMarkerAlt, FaClock, FaFacebook, FaInstagram, FaWhatsapp, FaPaperPlane } from 'react-icons/fa'
import { PageHero, ScrollTop } from '../../components/ui/index'

export default function ContactPage() {
  const [loading, setLoading] = useState(false)
  const { register, handleSubmit, reset, formState:{errors} } = useForm()
  const onSubmit = async (data) => {
    setLoading(true)
    await new Promise(r=>setTimeout(r,1600))
    toast.success('Message sent! We will get back to you soon.')
    reset(); setLoading(false)
  }
  return (
    <>
      <PageHero tag="Contact" title="Get In Touch" sub="We would love to hear from you. Visit us at Kusunti, Lalitpur or call us anytime." breadcrumbs={[{label:'Contact'}]}/>
      <section className="py-20 bg-white dark:bg-gray-950">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid lg:grid-cols-5 gap-10">
          <motion.div initial={{opacity:0,x:-30}} whileInView={{opacity:1,x:0}} viewport={{once:true}} className="lg:col-span-2 space-y-5">
            <div className="card p-6 bg-navy text-white">
              <div className="flex items-center gap-3 pb-5 mb-5 border-b border-white/10">
                <div className="w-10 h-10 rounded-xl bg-primary-400 flex items-center justify-center font-bold">K</div>
                <div><div className="font-bold">Kidland School</div><div className="text-xs text-primary-300">Duty · Honor · Country</div></div>
              </div>
              {[[FaMapMarkerAlt,'Address','Kusunti, Lalitpur-13 (Opp. Yatayat Office), Nepal'],[FaPhone,'Phone','9841404920 / 01-5430237'],[FaEnvelope,'Email','kidlandmontessori@gmail.com'],[FaClock,'Office Hours','Sunday – Friday: 10:00 AM – 4:00 PM']].map(([Icon,l,v])=>(
                <div key={l} className="flex items-start gap-3 mb-4">
                  <div className="w-8 h-8 rounded-lg bg-primary-400/20 flex items-center justify-center shrink-0 mt-0.5"><Icon className="text-primary-300" size={13}/></div>
                  <div><div className="text-xs text-gray-400 font-semibold mb-0.5">{l}</div><div className="text-sm text-white">{v}</div></div>
                </div>
              ))}
              <div className="pt-4 border-t border-white/10">
                <div className="text-xs text-gray-400 font-semibold mb-3">Follow Us</div>
                <div className="flex gap-2">
                  {[['https://facebook.com/kidlandmontessori',FaFacebook,'hover:bg-blue-600'],['https://instagram.com/kidlandeducation',FaInstagram,'hover:bg-pink-600'],['https://api.whatsapp.com/send?phone=9779841404920',FaWhatsapp,'hover:bg-green-600']].map(([href,Icon,hov],i)=>(
                    <a key={i} href={href} target="_blank" rel="noopener noreferrer" className={`w-9 h-9 rounded-lg bg-white/10 ${hov} flex items-center justify-center transition-colors`}><Icon size={16}/></a>
                  ))}
                </div>
              </div>
            </div>
            <div className="card overflow-hidden h-52">
              <iframe title="Kidland Location" src="https://maps.google.com/maps?q=Kidland+Montessori+School+Kusunti+Lalitpur&t=m&z=15&output=embed" width="100%" height="100%" style={{border:0}} loading="lazy"/>
            </div>
          </motion.div>
          <motion.div initial={{opacity:0,x:30}} whileInView={{opacity:1,x:0}} viewport={{once:true}} className="lg:col-span-3">
            <div className="card p-8">
              <h3 className="font-bold text-xl text-gray-900 dark:text-white mb-6">Send Us a Message</h3>
              <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                <div className="grid sm:grid-cols-2 gap-4">
                  <div><label className="label">Your Name *</label><input {...register('name',{required:'Required'})} placeholder="Full name" className={`field ${errors.name?'field-error':''}`}/>{errors.name&&<p className="error-msg">{errors.name.message}</p>}</div>
                  <div><label className="label">Email *</label><input type="email" {...register('email',{required:'Required',pattern:{value:/\S+@\S+\.\S+/,message:'Invalid email'}})} placeholder="you@email.com" className={`field ${errors.email?'field-error':''}`}/>{errors.email&&<p className="error-msg">{errors.email.message}</p>}</div>
                </div>
                <div className="grid sm:grid-cols-2 gap-4">
                  <div><label className="label">Phone</label><input {...register('phone')} placeholder="98XXXXXXXX" className="field"/></div>
                  <div><label className="label">Subject *</label>
                    <select {...register('subject',{required:'Required'})} className={`field ${errors.subject?'field-error':''}`}>
                      <option value="">Select subject</option>
                      {['Admission Inquiry','Curriculum and Programmes','Fee Structure','Scholarship','Transportation','ECA Activities','General Query'].map(s=><option key={s}>{s}</option>)}
                    </select>{errors.subject&&<p className="error-msg">{errors.subject.message}</p>}
                  </div>
                </div>
                <div><label className="label">Message *</label><textarea {...register('message',{required:'Required',minLength:{value:10,message:'Min 10 characters'}})} rows={6} placeholder="Write your message here..." className={`field resize-none ${errors.message?'field-error':''}`}/>{errors.message&&<p className="error-msg">{errors.message.message}</p>}</div>
                <button type="submit" disabled={loading} className="btn-primary w-full justify-center py-3.5">
                  {loading?<><span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"/>Sending...</>:<><FaPaperPlane size={13}/>Send Message</>}
                </button>
              </form>
            </div>
          </motion.div>
        </div>
      </section>
      <ScrollTop/>
    </>
  )
}
