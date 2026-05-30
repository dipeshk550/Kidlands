import { motion } from 'framer-motion'
import { FaCheckCircle, FaArrowRight } from 'react-icons/fa'
import { Link } from 'react-router-dom'
import { PageHero, SectionHeader, ScrollTop } from '../../components/ui/index'

const WHY = [
  { title:'Certified Teachers', desc:'Highly qualified, NMTC-certified and experienced educators who drive positive academic improvement.' },
  { title:'Strong Foundation', desc:'Nearly two decades delivering life-learning skills to every child through Montessori and national curriculum.' },
  { title:'Healthy Environment', desc:'A clean, safe and nurturing campus environment essential for holistic student development.' },
  { title:'Modern Infrastructure', desc:'Fully equipped labs, library, computer centre and smart classrooms that boost learning outcomes.' },
]

export default function AboutPage() {
  return (
    <>
      <PageHero tag="About Us" title="About Kidland School" sub="Est. 2005 · Kusunti, Lalitpur — A legacy of quality education." breadcrumbs={[{label:'About Us'}]} />
      <section className="py-20 bg-white dark:bg-gray-950">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid lg:grid-cols-2 gap-14 items-center">
          <motion.div initial={{opacity:0,x:-30}} whileInView={{opacity:1,x:0}} viewport={{once:true}}>
            <p className="section-tag mb-2">Our Story</p>
            <h2 className="section-title mb-4">Two Decades of <span className="text-primary-400">Educational Excellence</span></h2>
            <div className="section-divider" />
            <div className="space-y-4 text-gray-600 dark:text-gray-400 text-sm leading-relaxed mb-6">
              <p>Kidland School was established in 2005 A.D. by Ms. Shanti Khadka with a vision to provide international-standard education to children in Lalitpur.</p>
              <p>We apply the Montessori Method up to the Primary level under Nepal Montessori Training Centre (NMTC) guidance, blended with the national CDC curriculum for higher grades.</p>
              <p>Our school prioritises equal opportunity for all students with modern scientific materials, a conducive environment, quality teaching and moderate class sizes.</p>
            </div>
            <div className="grid sm:grid-cols-2 gap-4 mb-7">
              {[{t:'Mission',d:'To provide quality education that shapes young minds through inclusive, inspiring learning.'},
                {t:'Vision',d:'To be a centre of academic excellence fostering discipline and holistic development.'}].map(({t,d})=>(
                <div key={t} className="p-4 rounded-xl border-l-4 border-primary-400 bg-primary-50 dark:bg-primary-900/20">
                  <div className="font-bold text-gray-900 dark:text-white mb-1">{t}</div>
                  <p className="text-gray-600 dark:text-gray-400 text-xs">{d}</p>
                </div>
              ))}
            </div>
            <Link to="/apply" className="btn-primary">Apply for Admission <FaArrowRight size={12}/></Link>
          </motion.div>
          <motion.div initial={{opacity:0,x:30}} whileInView={{opacity:1,x:0}} viewport={{once:true}} className="relative">
            <div className="rounded-2xl overflow-hidden shadow-2xl aspect-[4/3]">
              <img src="https://kidlandschool.edu.np/wp-content/uploads/2024/12/IMG_2676-scaled-e1734762974391-1024x803.jpg" alt="School" className="w-full h-full object-cover" onError={e=>{e.target.parentElement.style.background='linear-gradient(135deg,#54B435,#41a020)';e.target.style.display='none'}}/>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Founder message */}
      <section className="py-20 bg-gray-50 dark:bg-gray-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid lg:grid-cols-2 gap-14 items-center">
          <motion.div initial={{opacity:0,x:-30}} whileInView={{opacity:1,x:0}} viewport={{once:true}} className="relative max-w-sm mx-auto lg:mx-0 w-full">
            <div className="rounded-2xl overflow-hidden shadow-2xl aspect-[3/4] bg-gradient-to-br from-primary-600 to-navy flex items-center justify-center">
              <img src="https://kidlandschool.edu.np/wp-content/uploads/2024/12/IMG_0190.jpg" alt="Ms. Shanti Khadka" className="w-full h-full object-cover object-top" onError={e=>{e.target.style.display='none'}}/>
            </div>
            <div className="absolute bottom-5 left-5 right-5 bg-white dark:bg-gray-900 rounded-xl p-4 shadow-xl">
              <div className="font-bold text-gray-900 dark:text-white">Ms. Shanti Khadka</div>
              <div className="text-primary-500 text-xs font-semibold">Founder and Director</div>
            </div>
          </motion.div>
          <motion.div initial={{opacity:0,x:30}} whileInView={{opacity:1,x:0}} viewport={{once:true}}>
            <p className="section-tag mb-2">Founder's Message</p>
            <h2 className="section-title mb-4">Welcome to <span className="text-primary-400">Kidland</span></h2>
            <div className="section-divider" />
            <div className="space-y-4 text-gray-600 dark:text-gray-400 text-sm leading-relaxed italic mb-6">
              <p>Since our establishment in 2005, we have been deeply committed to nurturing the minds of future leaders, innovators and changemakers.</p>
              <p>At Kidland, education extends beyond academic achievement — it is about shaping character, cultivating creativity and empowering students to navigate an ever-evolving world.</p>
              <p className="not-italic font-semibold text-gray-800 dark:text-gray-200">Together, we can inspire the leaders of tomorrow.</p>
            </div>
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-full bg-primary-400 flex items-center justify-center text-white font-bold">SK</div>
              <div>
                <div className="font-bold text-gray-900 dark:text-white">Ms. Shanti Khadka</div>
                <div className="text-xs text-gray-500">Founder and Director, Kidland School</div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Why Kidland */}
      <section className="py-20 bg-white dark:bg-gray-950">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeader tag="Why Choose Us" title="Why Choose Kidland?" sub="We aim at inspiring our students to dream more, learn more and become more." />
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {WHY.map((w,i) => (
              <motion.div key={w.title} initial={{opacity:0,y:24}} whileInView={{opacity:1,y:0}} viewport={{once:true}} transition={{delay:i*0.1}}
                className="card p-6 hover:border-primary-200 dark:hover:border-primary-800 hover:shadow-lg transition-all">
                <div className="w-10 h-10 rounded-xl bg-primary-50 dark:bg-primary-900/20 flex items-center justify-center mb-4">
                  <FaCheckCircle className="text-primary-400 text-lg" />
                </div>
                <h3 className="font-bold text-gray-900 dark:text-white mb-2">{w.title}</h3>
                <p className="text-gray-500 dark:text-gray-400 text-sm leading-relaxed">{w.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
      <ScrollTop />
    </>
  )
}
