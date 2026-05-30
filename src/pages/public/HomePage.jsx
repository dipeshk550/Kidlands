import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import { useInView } from 'react-intersection-observer'
import CountUp from 'react-countup'
import { FaArrowRight, FaPlay, FaChevronLeft, FaChevronRight, FaQuoteLeft, FaStar, FaCheckCircle,
         FaGraduationCap, FaUsers, FaTrophy, FaBook, FaCalendar, FaBell, FaMapMarkerAlt,
         FaPhone, FaEnvelope, FaChalkboardTeacher } from 'react-icons/fa'
import { SectionHeader, ScrollTop } from '../../components/ui/index'

// ── DATA ─────────────────────────────────────────────────────
const SLIDES = [
  { bg:'https://kidlandschool.edu.np/wp-content/uploads/2026/03/WhatsApp-Image-2026-03-19-at-4.52.21-PM.jpeg',
    tag:'Welcome to Kidland School', title:'Providing the Best of Academic Standards',
    sub:'Shaping tomorrow\'s leaders through quality Montessori education and strong discipline since 2005.',
    cta1:{label:'Apply for Admission', to:'/apply'}, cta2:{label:'Explore Programmes', to:'/academics'} },
  { bg:'https://kidlandschool.edu.np/wp-content/uploads/2026/03/IMG_5326-scaled.jpg',
    tag:'Est. 2005 · Kusunti, Lalitpur', title:'Duty, Honor and Country',
    sub:'Innovative, challenging and enterprising — Montessori methodology with a rich national curriculum.',
    cta1:{label:'Our Curriculum', to:'/academics'}, cta2:{label:'Why Kidland?', to:'/about'} },
  { bg:'https://kidlandschool.edu.np/wp-content/uploads/2025/08/IMG_2262-1-scaled.jpg',
    tag:'NMTC Affiliated · Montessori Method', title:'Building Confident Future Leaders',
    sub:'"Education is not preparation for life; education is life itself." — Join the Kidland family.',
    cta1:{label:'Admission Open 2083', to:'/apply'}, cta2:{label:'Contact Us', to:'/contact'} },
]

const STATS = [
  { icon: FaGraduationCap, val: 1200, suf:'+', label:'Students Enrolled',   color:'bg-green-50 dark:bg-green-900/20',  ic:'text-green-500' },
  { icon: FaChalkboardTeacher, val: 60, suf:'+', label:'Qualified Teachers',color:'bg-blue-50 dark:bg-blue-900/20',    ic:'text-blue-500' },
  { icon: FaTrophy,      val: 19,   suf:'+', label:'Years of Excellence',   color:'bg-yellow-50 dark:bg-yellow-900/20',ic:'text-yellow-500' },
  { icon: FaBook,        val: 5,    suf:'',  label:'Academic Levels',       color:'bg-purple-50 dark:bg-purple-900/20',ic:'text-purple-500' },
]

const PROGRAMS = [
  { icon:'🌱', level:'Pre-Primary', badge:'Age 2–5', color:'from-rose-500 to-pink-400',
    desc:'NMTC-certified Montessori programme developing independence, language and sensorial skills.' },
  { icon:'📖', level:'Primary Level', badge:'Grade 1–5', color:'from-primary-500 to-green-400',
    desc:'Montessori blended with CDC curriculum in English, Maths, Science and Social Studies.' },
  { icon:'🔬', level:'Lower Secondary', badge:'Grade 6–8', color:'from-blue-500 to-indigo-400',
    desc:'Subject specialists, science labs, computer classes and project-based learning.' },
  { icon:'🏆', level:'Secondary (SEE)', badge:'Grade 9–10', color:'from-amber-500 to-orange-400',
    desc:'SEE board preparation with mock exams, individual counselling and extra classes.' },
]

const NOTICES = [
  { cat:'Admission', title:'Admission Open – Academic Year 2083 B.S.', date:'May 20, 2025', hot:true },
  { cat:'Academic',  title:'SEE Preparation Special Batch – June 1',   date:'May 18, 2025', hot:true },
  { cat:'Event',     title:'Annual Sports Day – June 5, 2025',          date:'May 15, 2025', hot:false },
  { cat:'Academic',  title:'Scholarship Test – May 25, 2025',           date:'May 8, 2025',  hot:true },
  { cat:'Event',     title:'Parent-Teacher Meeting – May 30',           date:'May 12, 2025', hot:false },
]

const EVENTS = [
  { icon: FaTrophy,   title:'Annual Sports Day', date:'June 5', venue:'School Ground',      cat:'Sports' },
  { icon: FaBook,     title:'Science Fair 2025',  date:'June 20', venue:'Auditorium',        cat:'Academic' },
  { icon: FaCalendar, title:'Cultural Programme', date:'July 15', venue:'School Ground',     cat:'Cultural' },
]

const TESTIMONIALS = [
  { name:'Mrs. Sita Sharma',  role:'Parent – Grade 5', init:'SS', rating:5,
    text:'My son has been at Kidland since Nursery and his transformation in confidence, discipline and academics is extraordinary. The teachers genuinely care.' },
  { name:'Aarav Thapa',       role:'SEE Alumni – GPA 3.9', init:'AT', rating:5,
    text:'I passed SEE with GPA 3.9 thanks to Kidland\'s dedicated teachers. The mock exams and personal counselling made all the difference.' },
  { name:'Mr. Rajesh Gurung', role:'Parent – Two children', init:'RG', rating:5,
    text:'Both my children study at Kidland and we could not be happier. The school balances academics and extracurriculars perfectly.' },
]

const CAT_COLORS = { Admission:'badge-blue', Academic:'badge-green', Event:'badge-yellow', Holiday:'badge-gray' }

// ── HERO ─────────────────────────────────────────────────────
function Hero() {
  const [cur, setCur] = useState(0)
  useEffect(() => {
    const t = setInterval(() => setCur(c => (c+1)%SLIDES.length), 5500)
    return () => clearInterval(t)
  }, [])
  const s = SLIDES[cur]
  return (
    <section className="relative min-h-[90vh] flex items-center overflow-hidden">
      {SLIDES.map((sl, i) => (
        <motion.div key={i} className="absolute inset-0 z-0"
          animate={{ opacity: cur===i ? 1 : 0, scale: cur===i ? 1 : 1.04 }} transition={{ duration: 1.2 }}>
          <img src={sl.bg} alt="" className="w-full h-full object-cover"
            onError={e => { e.target.parentElement.style.background='linear-gradient(135deg,#1e3a5f,#54B435)'; e.target.style.display='none' }} />
          <div className="absolute inset-0" style={{background:'linear-gradient(110deg,rgba(15,30,50,0.88) 0%,rgba(15,30,50,0.6) 55%,rgba(15,30,50,0.25) 100%)'}} />
        </motion.div>
      ))}
      {/* Green stripe */}
      <div className="absolute top-0 left-0 right-0 h-1 z-10 bg-gradient-to-r from-primary-400 via-primary-300 to-primary-400" />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full py-24">
        <div className="max-w-3xl">
          <motion.div key={cur+'t'} initial={{opacity:0,y:12}} animate={{opacity:1,y:0}} transition={{duration:0.4}}
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-primary-400/40 text-primary-300 text-xs font-bold uppercase tracking-widest mb-5"
            style={{background:'rgba(84,180,53,0.12)'}}>
            <span className="w-1.5 h-1.5 rounded-full bg-primary-400 animate-pulse" />
            {s.tag}
          </motion.div>
          <motion.h1 key={cur+'h'} initial={{opacity:0,x:-24}} animate={{opacity:1,x:0}} transition={{duration:0.55}}
            className="text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-bold text-white leading-[1.08] mb-5">
            {s.title.split(' ').slice(0,-2).join(' ')}{' '}
            <span className="text-primary-300">{s.title.split(' ').slice(-2).join(' ')}</span>
          </motion.h1>
          <motion.p key={cur+'s'} initial={{opacity:0}} animate={{opacity:1}} transition={{delay:0.15}}
            className="text-gray-200 text-lg leading-relaxed mb-8 max-w-xl">{s.sub}</motion.p>
          <motion.div initial={{opacity:0,y:12}} animate={{opacity:1,y:0}} transition={{delay:0.4}} className="flex flex-wrap gap-4">
            <Link to={s.cta1.to} className="btn-primary text-base px-8 py-4">{s.cta1.label} <FaArrowRight size={13}/></Link>
            <Link to={s.cta2.to} className="inline-flex items-center gap-2 px-8 py-4 border-2 border-white/25 text-white font-semibold rounded-lg hover:bg-white/10 transition-all">
              <FaPlay size={11}/> {s.cta2.label}
            </Link>
          </motion.div>
          <motion.div initial={{opacity:0}} animate={{opacity:1}} transition={{delay:0.6}}
            className="flex flex-wrap gap-8 mt-12 pt-8 border-t border-white/15">
            {[['2005','Est.'],['1200+','Students'],['60+','Teachers'],['Montessori','Method']].map(([v,l])=>(
              <div key={l}><div className="text-white font-bold text-xl">{v}</div><div className="text-gray-300 text-xs">{l}</div></div>
            ))}
          </motion.div>
        </div>
      </div>

      {/* Controls */}
      <button onClick={() => setCur(c => (c-1+SLIDES.length)%SLIDES.length)}
        className="absolute left-4 top-1/2 -translate-y-1/2 z-20 w-10 h-10 rounded-full bg-white/10 border border-white/25 text-white flex items-center justify-center hover:bg-white/20 transition-all">
        <FaChevronLeft size={14}/>
      </button>
      <button onClick={() => setCur(c => (c+1)%SLIDES.length)}
        className="absolute right-4 top-1/2 -translate-y-1/2 z-20 w-10 h-10 rounded-full bg-white/10 border border-white/25 text-white flex items-center justify-center hover:bg-white/20 transition-all">
        <FaChevronRight size={14}/>
      </button>
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-20 flex gap-2">
        {SLIDES.map((_,i) => (
          <button key={i} onClick={() => setCur(i)}
            className="transition-all duration-300 rounded-full"
            style={{width:i===cur?28:10,height:10,background:i===cur?'#54B435':'rgba(255,255,255,0.35)'}} />
        ))}
      </div>
    </section>
  )
}

// ── STATS BAR ─────────────────────────────────────────────────
function StatsBar() {
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.3 })
  return (
    <section ref={ref} className="py-16 bg-navy">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-2 lg:grid-cols-4 gap-8">
        {STATS.map((s, i) => (
          <motion.div key={s.label} initial={{opacity:0,y:20}} whileInView={{opacity:1,y:0}} viewport={{once:true}} transition={{delay:i*0.1}}
            className="text-center">
            <div className={`w-14 h-14 mx-auto mb-3 rounded-2xl ${s.color} flex items-center justify-center`}>
              <s.icon className={`text-2xl ${s.ic}`} />
            </div>
            <div className="text-3xl md:text-4xl font-bold text-white mb-1">
              {inView ? <CountUp end={s.val} duration={2.5} delay={i*0.1} /> : 0}
              <span className="text-primary-400">{s.suf}</span>
            </div>
            <div className="text-gray-400 text-sm">{s.label}</div>
          </motion.div>
        ))}
      </div>
    </section>
  )
}

// ── ABOUT ─────────────────────────────────────────────────────
function AboutSection() {
  return (
    <section className="py-20 bg-white dark:bg-gray-950">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid lg:grid-cols-2 gap-14 items-center">
        <motion.div initial={{opacity:0,x:-30}} whileInView={{opacity:1,x:0}} viewport={{once:true}}>
          <p className="section-tag mb-2">About Our School</p>
          <h2 className="section-title mb-4">Welcome to<br /><span className="text-primary-400">Kidland School</span></h2>
          <div className="section-divider" />
          <div className="space-y-3 text-gray-600 dark:text-gray-400 text-sm leading-relaxed mb-6">
            <p>Kidland School is located at Kusunti, Lalitpur-13, opposite the Yatayat Office. Since its establishment in <strong className="text-gray-800 dark:text-gray-200">2005 A.D.</strong>, the school has been delivering internationally-standard education for children.</p>
            <p>We apply the <strong className="text-primary-500">Montessori Method</strong> up to the Primary level under Nepal Montessori Training Centre (NMTC) guidance, alongside a rigorous national curriculum for higher grades.</p>
          </div>
          <ul className="space-y-2 mb-7">
            {['NMTC Certified Montessori Programme','Qualified and Experienced Teaching Staff','Modern Infrastructure and Science Labs','Safe Transportation Throughout the Valley','Rich ECA and CCA Programme'].map(f => (
              <li key={f} className="flex items-center gap-2.5 text-sm text-gray-700 dark:text-gray-300">
                <FaCheckCircle className="text-primary-400 shrink-0" size={14} />{f}
              </li>
            ))}
          </ul>
          <Link to="/about" className="btn-primary">Read More <FaArrowRight size={12}/></Link>
        </motion.div>
        <motion.div initial={{opacity:0,x:30}} whileInView={{opacity:1,x:0}} viewport={{once:true}} className="relative">
          <div className="rounded-2xl overflow-hidden shadow-2xl aspect-[4/3]">
            <img src="https://kidlandschool.edu.np/wp-content/uploads/2024/12/IMG_2676-scaled-e1734762974391-1024x803.jpg"
              alt="Kidland School" className="w-full h-full object-cover"
              onError={e => { e.target.parentElement.style.background='linear-gradient(135deg,#54B435,#41a020)'; e.target.style.display='none' }} />
          </div>
          <motion.div animate={{y:[-5,5,-5]}} transition={{duration:4,repeat:Infinity}}
            className="absolute -bottom-5 -left-5 card px-5 py-4 shadow-xl">
            <div className="text-2xl font-bold text-primary-500">19+</div>
            <div className="text-xs text-gray-500">Years of Excellence</div>
          </motion.div>
          <motion.div animate={{y:[5,-5,5]}} transition={{duration:5,repeat:Infinity}}
            className="absolute -top-5 -right-5 card px-5 py-4 shadow-xl">
            <div className="text-2xl font-bold text-navy dark:text-white">1200+</div>
            <div className="text-xs text-gray-500">Happy Students</div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}

// ── PROGRAMS ─────────────────────────────────────────────────
function ProgramsSection() {
  return (
    <section className="py-20 bg-gray-50 dark:bg-gray-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeader tag="Academics" title="Our Programmes" sub="Comprehensive education from Pre-Primary Montessori through Secondary level." />
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {PROGRAMS.map((p, i) => (
            <motion.div key={p.level} initial={{opacity:0,y:24}} whileInView={{opacity:1,y:0}} viewport={{once:true}} transition={{delay:i*0.08}}
              className="card-hover overflow-hidden group">
              <div className={`bg-gradient-to-br ${p.color} p-6 relative`}>
                <div className="absolute inset-0 bg-dots opacity-10" />
                <div className="text-4xl mb-3 relative">{p.icon}</div>
                <h3 className="text-white font-bold text-lg">{p.level}</h3>
                <div className="text-white/80 text-xs mt-0.5">{p.badge}</div>
              </div>
              <div className="p-5">
                <p className="text-gray-600 dark:text-gray-400 text-sm leading-relaxed mb-4">{p.desc}</p>
                <Link to="/academics" className="inline-flex items-center gap-1.5 text-sm font-semibold text-primary-500 hover:gap-3 transition-all">
                  Learn More <FaArrowRight size={11}/>
                </Link>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}

// ── NOTICES + EVENTS ─────────────────────────────────────────
function NoticesEvents() {
  return (
    <section className="py-20 bg-white dark:bg-gray-950">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-10">
          {/* Notices */}
          <div>
            <div className="flex items-center justify-between mb-5">
              <div className="flex items-center gap-2">
                <FaBell className="text-primary-400" />
                <h3 className="font-bold text-gray-900 dark:text-white text-xl">Notice Board</h3>
              </div>
              <Link to="/notices" className="text-xs font-semibold text-primary-500 hover:underline flex items-center gap-1">
                View All <FaArrowRight size={10}/>
              </Link>
            </div>
            {/* Ticker */}
            <div className="flex items-center gap-2 bg-navy text-white text-xs px-4 py-2 rounded-lg mb-4 overflow-hidden">
              <span className="shrink-0 bg-primary-400 text-white text-[10px] font-bold px-2 py-0.5 rounded">LIVE</span>
              <div className="overflow-hidden flex-1">
                <span className="ticker">{NOTICES.filter(n=>n.hot).map(n=>n.title).join('   •   ')}</span>
              </div>
            </div>
            <div className="space-y-2">
              {NOTICES.map((n, i) => (
                <motion.div key={i} initial={{opacity:0,x:-12}} whileInView={{opacity:1,x:0}} viewport={{once:true}} transition={{delay:i*0.06}}
                  className="flex items-start gap-4 p-4 rounded-xl border border-gray-100 dark:border-gray-800 hover:border-primary-200 dark:hover:border-primary-800 hover:bg-primary-50/30 dark:hover:bg-primary-900/10 transition-all cursor-pointer group">
                  <div className="shrink-0 w-12 text-center">
                    <div className="text-xs font-bold text-white bg-primary-400 rounded-t px-1 py-0.5">{n.date.split(' ')[0]}</div>
                    <div className="text-lg font-bold text-gray-800 dark:text-white border border-t-0 border-gray-200 dark:border-gray-700 rounded-b">{n.date.split(' ')[1].replace(',','')}</div>
                  </div>
                  <div>
                    <div className="flex items-center gap-2 mb-1">
                      {n.hot && <span className="text-[10px] font-bold px-1.5 py-0.5 rounded text-white bg-red-500">NEW</span>}
                      <span className={`badge ${CAT_COLORS[n.cat]||'badge-gray'}`}>{n.cat}</span>
                    </div>
                    <p className="font-semibold text-sm text-gray-800 dark:text-gray-100 group-hover:text-primary-600 dark:group-hover:text-primary-400 transition-colors">{n.title}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
          {/* Events */}
          <div>
            <div className="flex items-center justify-between mb-5">
              <div className="flex items-center gap-2">
                <FaCalendar className="text-primary-400" />
                <h3 className="font-bold text-gray-900 dark:text-white text-xl">Upcoming Events</h3>
              </div>
              <Link to="/events" className="text-xs font-semibold text-primary-500 hover:underline flex items-center gap-1">
                View All <FaArrowRight size={10}/>
              </Link>
            </div>
            <div className="space-y-4">
              {EVENTS.map((e, i) => (
                <motion.div key={i} initial={{opacity:0,x:12}} whileInView={{opacity:1,x:0}} viewport={{once:true}} transition={{delay:i*0.1}}
                  className="card p-5 flex items-start gap-4 hover:shadow-lg transition-shadow">
                  <div className="w-14 h-14 rounded-xl bg-primary-50 dark:bg-primary-900/20 flex items-center justify-center shrink-0">
                    <e.icon className="text-primary-500 text-xl" />
                  </div>
                  <div>
                    <div className="badge badge-green mb-1">{e.cat}</div>
                    <h4 className="font-bold text-gray-900 dark:text-white text-sm">{e.title}</h4>
                    <div className="text-xs text-gray-500 mt-1 flex items-center gap-3">
                      <span className="flex items-center gap-1"><FaCalendar size={9}/>{e.date}</span>
                      <span className="flex items-center gap-1"><FaMapMarkerAlt size={9}/>{e.venue}</span>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

// ── TESTIMONIALS ─────────────────────────────────────────────
function TestimonialsSection() {
  const [cur, setCur] = useState(0)
  useEffect(() => {
    const t = setInterval(() => setCur(c => (c+1)%TESTIMONIALS.length), 5000)
    return () => clearInterval(t)
  }, [])
  const t = TESTIMONIALS[cur]
  return (
    <section className="py-20 bg-navy relative overflow-hidden">
      <div className="absolute inset-0 bg-dots opacity-20" />
      <div className="h-1 absolute top-0 left-0 right-0 bg-gradient-to-r from-primary-400 via-primary-300 to-primary-400" />
      <div className="relative z-10 max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <p className="section-tag text-primary-300 mb-2">Testimonials</p>
        <h2 className="text-3xl font-bold text-white mb-8">What Our Community Says</h2>
        <motion.div key={cur} initial={{opacity:0,x:40}} animate={{opacity:1,x:0}} exit={{opacity:0}}
          className="bg-white/10 border border-white/15 rounded-2xl p-8 md:p-10">
          <FaQuoteLeft className="text-5xl mx-auto mb-5 text-primary-400/40" />
          <div className="flex justify-center gap-1 mb-4">
            {[...Array(t.rating)].map((_,i) => <FaStar key={i} className="text-yellow-400" size={16}/>)}
          </div>
          <p className="text-gray-200 text-lg leading-relaxed italic mb-7">"{t.text}"</p>
          <div className="w-14 h-14 mx-auto rounded-full bg-primary-400 flex items-center justify-center text-white font-bold text-lg mb-3">{t.init}</div>
          <div className="text-white font-bold">{t.name}</div>
          <div className="text-gray-400 text-sm">{t.role}</div>
        </motion.div>
        <div className="flex justify-center gap-2 mt-6">
          {TESTIMONIALS.map((_,i) => (
            <button key={i} onClick={() => setCur(i)}
              className="transition-all duration-300 rounded-full"
              style={{width:i===cur?24:8,height:8,background:i===cur?'#54B435':'rgba(255,255,255,0.3)'}} />
          ))}
        </div>
      </div>
    </section>
  )
}

// ── CONTACT STRIP ─────────────────────────────────────────────
function ContactStrip() {
  return (
    <section className="py-14 bg-primary-400">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid md:grid-cols-3 gap-6 text-center">
          {[[FaPhone,'Call Us','9841404920 / 01-5430237'],[FaEnvelope,'Email Us','kidlandmontessori@gmail.com'],[FaMapMarkerAlt,'Visit Us','Kusunti, Lalitpur-13, Nepal']].map(([Icon,l,v]) => (
            <div key={l} className="flex flex-col items-center gap-2">
              <div className="w-12 h-12 rounded-xl bg-white/20 flex items-center justify-center"><Icon className="text-white text-xl"/></div>
              <div className="text-white/80 text-xs font-semibold uppercase tracking-wide">{l}</div>
              <div className="text-white font-bold">{v}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

// ── MAIN ─────────────────────────────────────────────────────
export default function HomePage() {
  return (
    <>
      <Hero />
      <StatsBar />
      <AboutSection />
      <ProgramsSection />
      <NoticesEvents />
      <TestimonialsSection />
      <ContactStrip />
      <ScrollTop />
    </>
  )
}
