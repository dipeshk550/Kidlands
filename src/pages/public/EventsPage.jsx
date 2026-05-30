import { useState } from 'react'
import { motion } from 'framer-motion'
import { FaCalendar, FaMapMarkerAlt, FaClock, FaFilter } from 'react-icons/fa'
import { PageHero, SectionHeader, ScrollTop, EmptyState } from '../../components/ui/index'

const EVENTS = [
  { id:1, title:'Annual Sports Day 2025', date:'June 5, 2025', time:'7:00 AM – 5:00 PM', venue:'School Ground', cat:'Sports', desc:'House competitions, athletic events and team sports. Parents warmly welcome.' },
  { id:2, title:'Science and Innovation Fair', date:'June 20, 2025', time:'9:00 AM – 4:00 PM', venue:'Auditorium', cat:'Academic', desc:'Students showcase science projects and innovations. Prizes for top three in each category.' },
  { id:3, title:'Annual Cultural Programme', date:'July 15, 2025', time:'10:00 AM – 6:00 PM', venue:'School Ground', cat:'Cultural', desc:'Grand celebration with folk dances, music, drama and traditional dress.' },
  { id:4, title:'Inter-School Debate Championship', date:'August 10, 2025', time:'11:00 AM – 5:00 PM', venue:'Conference Hall', cat:'Academic', desc:'10+ schools compete in English and Nepali debate.' },
  { id:5, title:'World Child Day Celebration', date:'November 20, 2025', time:'10:00 AM – 2:00 PM', venue:'School Ground', cat:'Cultural', desc:'Special activities, artwork and presentations celebrating children.' },
  { id:6, title:'Graduation Ceremony 2025', date:'December 15, 2025', time:'9:00 AM – 12:00 PM', venue:'Auditorium', cat:'Academic', desc:'Annual graduation and prize distribution ceremony for SEE completers.' },
]

const CATS = ['All','Academic','Cultural','Sports']
const CAT_COLORS = { Academic:'badge-blue', Cultural:'badge-yellow', Sports:'badge-green' }

export default function EventsPage() {
  const [cat, setCat] = useState('All')
  const filtered = cat==='All' ? EVENTS : EVENTS.filter(e=>e.cat===cat)
  return (
    <>
      <PageHero tag="Events" title="School Events" sub="Upcoming events, competitions and celebrations that make school life vibrant and memorable." breadcrumbs={[{label:'Events'}]}/>
      <section className="py-20 bg-white dark:bg-gray-950">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-wrap items-center justify-between gap-4 mb-10">
            <SectionHeader tag="Calendar" title="Upcoming Events" center={false}/>
            <div className="flex items-center gap-2">
              <FaFilter className="text-gray-400" size={13}/>
              {CATS.map(c=>(
                <button key={c} onClick={()=>setCat(c)} className={`px-4 py-1.5 rounded-lg text-sm font-semibold transition-all ${c===cat?'bg-primary-400 text-white shadow-md shadow-primary-400/30':'bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-400 hover:bg-primary-50 dark:hover:bg-primary-900/20'}`}>{c}</button>
              ))}
            </div>
          </div>
          {filtered.length === 0 ? <EmptyState title="No events found"/> : (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filtered.map((e,i)=>(
                <motion.div key={e.id} initial={{opacity:0,y:20}} whileInView={{opacity:1,y:0}} viewport={{once:true}} transition={{delay:i*0.08}} className="card overflow-hidden hover:shadow-xl transition-all duration-300 group">
                  <div className="p-5 border-l-4 border-primary-400">
                    <div className="flex items-start justify-between gap-2 mb-3">
                      <span className={`badge ${CAT_COLORS[e.cat]||'badge-gray'}`}>{e.cat}</span>
                      <div className="text-xs text-primary-500 font-bold bg-primary-50 dark:bg-primary-900/20 px-2 py-1 rounded">{e.date.split(',')[0]}</div>
                    </div>
                    <h3 className="font-bold text-gray-900 dark:text-white mb-2 group-hover:text-primary-500 transition-colors">{e.title}</h3>
                    <p className="text-gray-500 dark:text-gray-400 text-sm mb-4 leading-relaxed">{e.desc}</p>
                    <div className="space-y-1.5 pt-3 border-t border-gray-100 dark:border-gray-800">
                      <div className="flex items-center gap-2 text-xs text-gray-500"><FaCalendar className="text-primary-400" size={11}/>{e.date}</div>
                      <div className="flex items-center gap-2 text-xs text-gray-500"><FaClock className="text-primary-400" size={11}/>{e.time}</div>
                      <div className="flex items-center gap-2 text-xs text-gray-500"><FaMapMarkerAlt className="text-primary-400" size={11}/>{e.venue}</div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          )}
        </div>
      </section>
      <ScrollTop/>
    </>
  )
}
