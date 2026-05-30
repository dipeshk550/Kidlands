import { useState } from 'react'
import { motion } from 'framer-motion'
import { FaCalendar, FaUser, FaSearch, FaArrowRight } from 'react-icons/fa'
import { PageHero, ScrollTop, Pagination } from '../../components/ui/index'

const NEWS = [
  { id:1, title:'Kidland School Wins Inter-School Debate Championship 2025', date:'May 15, 2025', author:'Admin', cat:'Achievement', img:'https://kidlandschool.edu.np/wp-content/uploads/2026/03/IMG_5326-scaled.jpg', excerpt:'Our students brought home the first-place trophy at the annual inter-school debate competition held in Lalitpur.' },
  { id:2, title:'New Computer Lab Inaugurated with 40 Modern Workstations', date:'May 10, 2025', author:'Admin', cat:'Infrastructure', img:'https://kidlandschool.edu.np/wp-content/uploads/2026/03/IMG_5607-scaled.jpg', excerpt:'The school inaugurated its state-of-the-art computer lab featuring high-speed internet and the latest software.' },
  { id:3, title:'Annual Science Fair 2025 Showcases Student Innovation', date:'April 28, 2025', author:'Admin', cat:'Academic', img:'https://kidlandschool.edu.np/wp-content/uploads/2025/08/IMG_2262-1-scaled.jpg', excerpt:'Students from all grades presented innovative science projects, experiments and creative solutions.' },
  { id:4, title:'Kidland School Celebrates World Child Day with Special Events', date:'April 20, 2025', author:'Admin', cat:'Event', img:'https://kidlandschool.edu.np/wp-content/uploads/2026/03/WhatsApp-Image-2026-03-19-at-4.52.21-PM.jpeg', excerpt:'The school celebrated World Child Day with special activities, artwork and meaningful presentations.' },
  { id:5, title:'SEE Results 2082: Kidland Students Achieve Outstanding Grades', date:'April 10, 2025', author:'Admin', cat:'Achievement', img:'https://kidlandschool.edu.np/wp-content/uploads/2025/07/IMG_0893-scaled.jpg', excerpt:'We are proud to announce that our SEE batch of 2082 achieved an average GPA of 3.72 with multiple distinction holders.' },
  { id:6, title:'Scholarship Programme Open for New Admissions 2083', date:'March 25, 2025', author:'Admin', cat:'Admission', img:'https://kidlandschool.edu.np/wp-content/uploads/2026/03/IMG_5260-scaled.jpg', excerpt:'Merit-based and need-based scholarships are now available for qualifying students applying for 2083 B.S.' },
]

const CAT_COLORS = { Achievement:'badge-green', Infrastructure:'badge-blue', Academic:'badge-yellow', Event:'badge-gray', Admission:'badge-blue' }

export default function NewsPage() {
  const [search, setSearch] = useState('')
  const [page, setPage] = useState(1)
  const filtered = NEWS.filter(n => n.title.toLowerCase().includes(search.toLowerCase()) || n.excerpt.toLowerCase().includes(search.toLowerCase()))
  return (
    <>
      <PageHero tag="News & Blog" title="Latest News" sub="Stay updated with achievements, events and important announcements from Kidland School." breadcrumbs={[{label:'News'}]}/>
      <section className="py-20 bg-white dark:bg-gray-950">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col sm:flex-row gap-4 mb-10 items-start sm:items-center justify-between">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white">All Articles</h2>
            <div className="relative w-full sm:w-72">
              <FaSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={13}/>
              <input value={search} onChange={e=>{setSearch(e.target.value);setPage(1)}} placeholder="Search news..." className="field pl-9"/>
            </div>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filtered.slice((page-1)*6,page*6).map((n,i)=>(
              <motion.article key={n.id} initial={{opacity:0,y:20}} whileInView={{opacity:1,y:0}} viewport={{once:true}} transition={{delay:i*0.07}} className="card overflow-hidden hover:shadow-xl transition-all duration-300 group">
                <div className="aspect-video overflow-hidden bg-gray-100 dark:bg-gray-800">
                  <img src={n.img} alt={n.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" onError={e=>{e.target.parentElement.style.background='linear-gradient(135deg,#54B435,#41a020)';e.target.style.display='none'}}/>
                </div>
                <div className="p-5">
                  <div className="flex items-center justify-between mb-3">
                    <span className={`badge ${CAT_COLORS[n.cat]||'badge-gray'}`}>{n.cat}</span>
                    <span className="text-xs text-gray-400 flex items-center gap-1"><FaCalendar size={9}/>{n.date}</span>
                  </div>
                  <h3 className="font-bold text-gray-900 dark:text-white mb-2 leading-snug group-hover:text-primary-500 transition-colors line-clamp-2">{n.title}</h3>
                  <p className="text-gray-500 dark:text-gray-400 text-sm leading-relaxed mb-4 line-clamp-2">{n.excerpt}</p>
                  <div className="flex items-center justify-between">
                    <span className="text-xs text-gray-400 flex items-center gap-1"><FaUser size={9}/>{n.author}</span>
                    <button className="text-xs font-semibold text-primary-500 hover:underline flex items-center gap-1">Read More <FaArrowRight size={9}/></button>
                  </div>
                </div>
              </motion.article>
            ))}
          </div>
          <Pagination page={page} total={filtered.length} perPage={6} onChange={setPage}/>
        </div>
      </section>
      <ScrollTop/>
    </>
  )
}
