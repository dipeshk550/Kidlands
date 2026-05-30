import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { FaExpand, FaTimes, FaChevronLeft, FaChevronRight } from 'react-icons/fa'
import { PageHero, ScrollTop } from '../../components/ui/index'

const GALLERY = [
  { id:1, src:'https://kidlandschool.edu.np/wp-content/uploads/2026/03/WhatsApp-Image-2026-03-19-at-4.52.21-PM.jpeg', title:'School Activities', cat:'Campus' },
  { id:2, src:'https://kidlandschool.edu.np/wp-content/uploads/2026/03/IMG_5326-scaled.jpg', title:'Student Life', cat:'Students' },
  { id:3, src:'https://kidlandschool.edu.np/wp-content/uploads/2025/08/IMG_2262-1-scaled.jpg', title:'School Events', cat:'Events' },
  { id:4, src:'https://kidlandschool.edu.np/wp-content/uploads/2025/07/IMG_0893-scaled.jpg', title:'Campus Life', cat:'Campus' },
  { id:5, src:'https://kidlandschool.edu.np/wp-content/uploads/2026/03/IMG_5607-scaled.jpg', title:'Student Activities', cat:'Students' },
  { id:6, src:'https://kidlandschool.edu.np/wp-content/uploads/2026/03/WhatsApp-Image-2026-03-19-at-4.52.23-PM.jpeg', title:'School Programme', cat:'Events' },
  { id:7, src:'https://kidlandschool.edu.np/wp-content/uploads/2026/03/IMG_5260-scaled.jpg', title:'ECA Activities', cat:'ECA' },
  { id:8, src:'https://kidlandschool.edu.np/wp-content/uploads/2025/09/IMG_3237-1-scaled.jpg', title:'Cultural Events', cat:'Events' },
  { id:9, src:'https://kidlandschool.edu.np/wp-content/uploads/2026/02/WhatsApp-Image-2026-02-19-at-4.33.27-PM-2-1.jpeg', title:'School Life', cat:'Campus' },
  { id:10, src:'https://kidlandschool.edu.np/wp-content/uploads/2026/02/WhatsApp-Image-2026-02-19-at-4.33.15-PM-1-1.jpeg', title:'Student Activities', cat:'Students' },
  { id:11, src:'https://kidlandschool.edu.np/wp-content/uploads/2026/03/IMG_5299-1-scaled.jpg', title:'School Events', cat:'Events' },
  { id:12, src:'https://kidlandschool.edu.np/wp-content/uploads/2026/03/IMG_5549-scaled.jpg', title:'ECA Programme', cat:'ECA' },
  { id:13, src:'https://kidlandschool.edu.np/wp-content/uploads/2026/03/IMG_5532-scaled.jpg', title:'Campus Activities', cat:'Campus' },
  { id:14, src:'https://kidlandschool.edu.np/wp-content/uploads/2026/03/IMG_5623-scaled.jpg', title:'Student Events', cat:'Students' },
  { id:15, src:'https://kidlandschool.edu.np/wp-content/uploads/2026/03/IMG_5395-scaled.jpg', title:'School Life', cat:'ECA' },
  { id:16, src:'https://kidlandschool.edu.np/wp-content/uploads/2026/03/IMG_5454-scaled.jpg', title:'Activities', cat:'Events' },
]

const CATS = ['All','Campus','Students','Events','ECA']

export default function GalleryPage() {
  const [cat, setCat] = useState('All')
  const [lb, setLb] = useState(null)
  const [lbIdx, setLbIdx] = useState(0)
  const filtered = cat==='All' ? GALLERY : GALLERY.filter(g=>g.cat===cat)
  const openLb = (g) => { setLb(g); setLbIdx(filtered.indexOf(g)) }
  const lbPrev = () => { const n=(lbIdx-1+filtered.length)%filtered.length; setLbIdx(n); setLb(filtered[n]) }
  const lbNext = () => { const n=(lbIdx+1)%filtered.length; setLbIdx(n); setLb(filtered[n]) }
  return (
    <>
      <PageHero tag="Gallery" title="School Gallery" sub="Glimpses of vibrant life, events and ECA activities at Kidland School." breadcrumbs={[{label:'Gallery'}]}/>
      <section className="py-20 bg-white dark:bg-gray-950">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-wrap justify-center gap-2 mb-10">
            {CATS.map(c=>(
              <button key={c} onClick={()=>setCat(c)} className={`px-5 py-2 rounded-lg text-sm font-semibold transition-all ${c===cat?'bg-primary-400 text-white shadow-md shadow-primary-400/30':'bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-400 hover:bg-primary-50 dark:hover:bg-primary-900/20'}`}>{c}</button>
            ))}
          </div>
          <div className="columns-2 sm:columns-3 lg:columns-4 gap-3">
            <AnimatePresence>
              {filtered.map((g,i)=>(
                <motion.div key={g.id} initial={{opacity:0,scale:0.95}} animate={{opacity:1,scale:1}} exit={{opacity:0}} transition={{delay:i*0.03}}
                  className="break-inside-avoid mb-3 group relative cursor-pointer rounded-xl overflow-hidden shadow-md hover:shadow-xl transition-shadow"
                  onClick={()=>openLb(g)}>
                  <img src={g.src} alt={g.title} className="w-full object-cover group-hover:scale-105 transition-transform duration-500" style={{minHeight:'120px'}}
                    onError={e=>{e.target.parentElement.style.background='linear-gradient(135deg,#54B435,#41a020)';e.target.parentElement.style.minHeight='160px';e.target.style.display='none'}}/>
                  <div className="absolute inset-0 bg-black/0 group-hover:bg-black/40 transition-all flex items-center justify-center">
                    <FaExpand className="text-white opacity-0 group-hover:opacity-100 transition-opacity" size={22}/>
                  </div>
                  <div className="absolute bottom-0 left-0 right-0 p-3 bg-gradient-to-t from-black/60 to-transparent translate-y-full group-hover:translate-y-0 transition-transform">
                    <p className="text-white text-xs font-medium">{g.title}</p>
                    <p className="text-primary-300 text-[10px]">{g.cat}</p>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>
        </div>
      </section>
      <AnimatePresence>
        {lb && (
          <motion.div initial={{opacity:0}} animate={{opacity:1}} exit={{opacity:0}} className="fixed inset-0 z-50 bg-black/90 flex items-center justify-center p-4" onClick={()=>setLb(null)}>
            <motion.div initial={{scale:0.9}} animate={{scale:1}} exit={{scale:0.9}} className="relative max-w-4xl w-full" onClick={e=>e.stopPropagation()}>
              <img src={lb.src} alt={lb.title} className="w-full max-h-[80vh] object-contain rounded-xl shadow-2xl"/>
              <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black/70 to-transparent rounded-b-xl">
                <p className="text-white font-semibold">{lb.title}</p>
                <p className="text-primary-300 text-sm">{lb.cat}</p>
              </div>
              <button onClick={()=>setLb(null)} className="absolute -top-4 -right-4 w-10 h-10 bg-white rounded-full flex items-center justify-center shadow-xl hover:bg-gray-100 text-gray-900"><FaTimes size={14}/></button>
              <button onClick={lbPrev} className="absolute left-3 top-1/2 -translate-y-1/2 w-10 h-10 bg-white/10 hover:bg-white/20 rounded-full flex items-center justify-center text-white transition-all"><FaChevronLeft size={14}/></button>
              <button onClick={lbNext} className="absolute right-3 top-1/2 -translate-y-1/2 w-10 h-10 bg-white/10 hover:bg-white/20 rounded-full flex items-center justify-center text-white transition-all"><FaChevronRight size={14}/></button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
      <ScrollTop/>
    </>
  )
}
