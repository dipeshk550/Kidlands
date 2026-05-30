import { useState, useMemo } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { FaSearch, FaFilter, FaChevronDown, FaChevronLeft, FaChevronRight } from 'react-icons/fa'
import { PageHero, ScrollTop } from '../../components/ui/index'

const NOTICES = [
  { id:1, title:'Admission Open – Academic Year 2083 B.S.', date:'2025-05-20', cat:'Admission', hot:true, desc:'Kidland School is pleased to announce admissions are now open for 2083 B.S. from Pre-Primary to Grade 10. Limited seats. Apply early.' },
  { id:2, title:'SEE Preparation Special Batch Starts June 1', date:'2025-05-18', cat:'Academic', hot:true, desc:'Special SEE preparation batch starting June 1. Morning and afternoon shifts available. Enrol at the school office.' },
  { id:3, title:'Annual Sports Day – June 5, 2025', date:'2025-05-15', cat:'Event', hot:false, desc:'Annual Sports Day at the school ground on June 5. All students participate. Parents warmly invited to join and cheer.' },
  { id:4, title:'Parent-Teacher Meeting – May 30', date:'2025-05-12', cat:'Event', hot:false, desc:'PTM on May 30 from 10:00 AM to 1:00 PM. Collect progress reports and meet subject teachers.' },
  { id:5, title:'Scholarship Test – May 25, 2025', date:'2025-05-08', cat:'Academic', hot:true, desc:'Merit-based and Need-based Scholarship Test on May 25. Register at the admissions office.' },
  { id:6, title:'Summer Vacation – Ashadh 1 to Shrawan 15', date:'2025-05-05', cat:'Holiday', hot:false, desc:'School closed for summer from Ashadh 1. Classes resume Shrawan 16, 2082 B.S.' },
  { id:7, title:'Computer Lab Inauguration – May 30', date:'2025-05-01', cat:'Achievement', hot:false, desc:'Our new 40-workstation Computer Lab with high-speed internet will be inaugurated on May 30.' },
  { id:8, title:'World Child Day – School Celebration', date:'2025-04-28', cat:'Event', hot:false, desc:'Students and teachers celebrated World Child Day with special activities, artwork and presentations.' },
  { id:9, title:'New Academic Session Begins June 1', date:'2025-04-20', cat:'Academic', hot:false, desc:'The new academic session for 2082-83 B.S. will commence from June 1, 2025.' },
  { id:10, title:'SEE Results 2082 Announced', date:'2025-04-15', cat:'Achievement', hot:false, desc:'We congratulate all our SEE students on outstanding results. Average GPA achieved was 3.72.' },
]

const CATS = ['All','Admission','Academic','Event','Holiday','Achievement']
const CAT_COLORS = { Admission:'badge-blue', Academic:'badge-green', Event:'badge-yellow', Holiday:'badge-gray', Achievement:'badge-green' }
const PER_PAGE = 6

export default function NoticePage() {
  const [search, setSearch] = useState('')
  const [cat, setCat] = useState('All')
  const [page, setPage] = useState(1)
  const [expanded, setExpanded] = useState(null)

  const filtered = useMemo(()=>NOTICES.filter(n=>
    (cat==='All'||n.cat===cat) &&
    (n.title.toLowerCase().includes(search.toLowerCase())||n.desc.toLowerCase().includes(search.toLowerCase()))
  ),[search,cat])

  const paged = filtered.slice((page-1)*PER_PAGE, page*PER_PAGE)
  const totalPages = Math.ceil(filtered.length/PER_PAGE)

  return (
    <>
      <PageHero tag="Notices" title="Notice Board" sub="Stay up to date with the latest announcements and notices from Kidland School." breadcrumbs={[{label:'Notices'}]}/>
      <section className="py-20 bg-white dark:bg-gray-950">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col sm:flex-row gap-3 mb-6">
            <div className="relative flex-1">
              <FaSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={13}/>
              <input value={search} onChange={e=>{setSearch(e.target.value);setPage(1)}} placeholder="Search notices..." className="field pl-9"/>
            </div>
            <div className="flex items-center gap-2 flex-wrap">
              <FaFilter className="text-gray-400" size={13}/>
              {CATS.map(c=>(
                <button key={c} onClick={()=>{setCat(c);setPage(1)}} className={`px-3 py-2 rounded-lg text-xs font-semibold transition-all ${c===cat?'bg-primary-400 text-white':'bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-400 hover:bg-primary-50 dark:hover:bg-primary-900/20'}`}>{c}</button>
              ))}
            </div>
          </div>
          <div className="space-y-3">
            <AnimatePresence>
              {paged.length===0 ? (
                <div className="text-center py-16 text-gray-400"><p>No notices found.</p></div>
              ) : paged.map((n,i)=>(
                <motion.div key={n.id} initial={{opacity:0,y:8}} animate={{opacity:1,y:0}} transition={{delay:i*0.05}} className="card overflow-hidden cursor-pointer" onClick={()=>setExpanded(expanded===n.id?null:n.id)}>
                  <div className="p-5 flex gap-4">
                    <div className="shrink-0 text-center w-14">
                      <div className="text-xs font-bold text-white bg-primary-400 rounded-t px-1 py-0.5">{new Date(n.date).toLocaleString('en',{month:'short'})}</div>
                      <div className="text-xl font-bold text-gray-800 dark:text-white border border-t-0 border-gray-200 dark:border-gray-700 rounded-b pb-1">{new Date(n.date).getDate()}</div>
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex flex-wrap items-center gap-2 mb-1.5">
                        {n.hot && <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-red-500 text-white">NEW</span>}
                        <span className={`badge ${CAT_COLORS[n.cat]||'badge-gray'}`}>{n.cat}</span>
                      </div>
                      <p className="font-semibold text-gray-900 dark:text-white text-sm">{n.title}</p>
                      <AnimatePresence>
                        {expanded===n.id && (
                          <motion.p initial={{height:0,opacity:0}} animate={{height:'auto',opacity:1}} exit={{height:0,opacity:0}} className="text-xs text-gray-500 dark:text-gray-400 mt-2 leading-relaxed overflow-hidden">{n.desc}</motion.p>
                        )}
                      </AnimatePresence>
                    </div>
                    <FaChevronDown className={`text-gray-300 shrink-0 transition-transform mt-1 ${expanded===n.id?'rotate-180':''}`} size={14}/>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>
          {totalPages > 1 && (
            <div className="flex justify-center items-center gap-2 mt-8">
              <button onClick={()=>setPage(p=>p-1)} disabled={page===1} className="w-9 h-9 rounded-lg border border-gray-200 dark:border-gray-700 flex items-center justify-center disabled:opacity-40 hover:border-primary-400 transition-colors"><FaChevronLeft size={12}/></button>
              {[...Array(totalPages)].map((_,i)=>(
                <button key={i} onClick={()=>setPage(i+1)} className={`w-9 h-9 rounded-lg text-sm font-semibold transition-all border ${page===i+1?'bg-primary-400 border-primary-400 text-white':'border-gray-200 dark:border-gray-700 text-gray-600 dark:text-gray-400 hover:border-primary-400'}`}>{i+1}</button>
              ))}
              <button onClick={()=>setPage(p=>p+1)} disabled={page===totalPages} className="w-9 h-9 rounded-lg border border-gray-200 dark:border-gray-700 flex items-center justify-center disabled:opacity-40 hover:border-primary-400 transition-colors"><FaChevronRight size={12}/></button>
            </div>
          )}
        </div>
      </section>
      <ScrollTop/>
    </>
  )
}
